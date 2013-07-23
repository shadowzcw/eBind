var eBind = eBind || {};

eBind.List = function (element, options) {
    eBind.Table.call(this, element, options);
};

eBind.List.prototype = new eBind.Table();
eBind.List.prototype.append = function (result) {
    this.$element.empty().append(result);
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindList = function (option) {
        return this.each(function () {
            $.extend($.fn.bindList.defaults, { template: option.template || $('textarea[data-for="' + this.id + '"]').val() });
            var $this = $(this),
                data = $this.data('bindList'),
                options = $.extend({}, $.fn.bindList.defaults, $(this).data(), typeof option == "object" && option);
            if (!data) {
                $this.data('bindList', (data = new eBind.List(this, options)));
                return data;
            }
            return data.bind(options);
        });
    };

    $.fn.bindList.defaults = {
        paging: false,
        pagesize: Math.round(Math.round((window.screen.height - 500) / 26) / 5) * 5,
        pageindex: 1,
        sort: '',
        desc: ''
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement