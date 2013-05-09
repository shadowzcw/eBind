var eBind = eBind || {};

eBind.Table = function (element, options) {
    this.options = options;
    this.$element = $(element);
    options && this.init(options);
};

eBind.Table.buildSource = function (options) {
    if (options.source.indexOf('?') == -1)
        options.source += '?';
    else
        options.source = options.source.replace(/&?(pageindex|pagesize|sort|desc|_)=([^&]*)/gi, "");
    options.source += '&pagesize=' + options.pagesize + '&pageindex=' + options.pageindex;
    options.source += '&sort=' + options.sort + '&desc=' + options.desc;
    options.source = options.source.replace(/undefined/g, '');
};

eBind.Table.prototype = {
    init: function (options) {
        return options.template ? this.bind() : this;
    },
    page: function (pageindex, pagesize) {
        $.extend(this.options, { pageindex: pageindex, pagesize: pagesize });
        eBind.Table.buildSource(this.options);
        return this;
    },
    sort: function (sort, desc) {
        $.extend(this.options, { sort: sort, desc: desc });
        eBind.Table.buildSource(this.options);
        return this;
    },
    append: function (result) {
        var $table = this.$element;
        var $body = $table.find('tbody');
        $body = $body.length > 0 ? $body : $('<tbody></tbody>');
        $body.empty().append(result).appendTo($table);
    },
    bind: function (template) {
        var options = this.options;
        this.page(options.pageindex, options.pagesize);
        this.sort(options.sort, options.desc);
        if (template) options.template = template;
        var $table = this.$element;
        var that = this;
        $.ajax({
            type: "GET",
            url: options.source,
            cache: false,
            success: function (json) {
                options.recordCount = json.count;
                var result = options.template.process(json);
                that.append(result);

                $table.data('bindTable', that);

                options.paging && options.pagesize && that.bindPage();
                options.sort && that.bindSort();

                typeof options.success == "function" && options.success(json, $table, that);
            }
        });
        return this;
    },
    bindPage: function () {
        try {
            var data = this.$element.data('bindPager');
            if (!data) {
                this.$element.data('bindPager', new eBind.Pager(this.$element, this.options));
            }
            data.init(this.options);
        } catch (ex) {
        }
        return this;
    },
    bindSort: function () {
        try {
            var data = this.$element.data('bindSort');
            if (!data) this.$element.data('bindSort', new eBind.Sort(this.$element, this.options));
            data.init(this.options);
        } catch (ex) {
        }
        return this;
    }
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindTable = function (option) {
        return this.each(function () {
            $.extend($.fn.bindTable.defaults, { template: option.template || $('textarea[data-for="' + this.id + '"]').val() });
            var $this = $(this),
                data = $this.data('bindTable'),
                options = $.extend({}, $.fn.bindTable.defaults, $(this).data(), typeof option == "object" && option);
            if (!data) $this.data('bindTable', (data = new eBind.Table(this, options)));
            return data;
        });
    };

    $.fn.bindTable.defaults = {
        paging: true,
        pagesize: Math.round(Math.round((window.screen.height - 500) / 26) / 5) * 5,
        pageindex: 1,
        sort: '',
        desc: ''
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement


