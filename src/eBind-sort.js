var eBind = eBind || {};

eBind.Sort = function (element, options) {
    this.$element = $(element);
    $.extend(this.options, options);
    this.init(options);
};

eBind.Sort.setStyle = function ($obj, dir) {
    $obj.text($obj.text().replace("▼", "").replace("▲", "") + (dir == 1 ? "▼" : "▲")).data('sorting', 'true');
};

eBind.Sort.removeStyle = function ($obj) {
    $obj.text($obj.text().replace("▼", "").replace("▲", "")).removeData('sorting');
};

eBind.Sort.prototype = {
    init: function (options) {
        var sort = options.sort || arguments[1];
        var desc = options.desc == undefined ? arguments[2] : options.desc;
        var table = this.$element;
        var t = table.data('bindTable');
        this.$element.find('thead > tr > th > a').each(function () {
            var a = $(this);
            var aSort = a.data('sort');
            if (aSort == sort) {
                a.data('desc', desc);
                eBind.Sort.setStyle(a, desc);
            } else {
                eBind.Sort.removeStyle(a);
            }
            a.unbind('click').click(function () {
                var dir = Math.abs(a.data('desc') - 1) || 0;
                a.data('desc', dir);
                table.data('sort', aSort);
                table.data('desc', dir);
                $.extend(t.options, { sort: aSort, desc: dir });
                t.bind();
            });
        });
        return this;
    }
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindSort = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bindSort'),
                options = $.extend({}, $.fn.defaults, $(this).data(), typeof option == "object" && option);
            if (!data) $this.data('bindSort', (data = new eBind.Sort(this, options)));
            return data;
        });
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement