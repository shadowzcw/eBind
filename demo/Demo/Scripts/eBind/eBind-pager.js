var eBind = eBind || {};

eBind.Pager = function (element, options) {
    this.$element = $(element);
    $.extend(this.options, options);
    this.init(options);
};

eBind.Pager.getPagerHtml = function (pageIndex, pageSize, recordCount, linkText) {
    if (pageSize == 0)
        return "";

    if (recordCount == 0 || recordCount == undefined)
        return "";

    var pageCount = parseInt(recordCount / pageSize);

    if (recordCount % pageSize > 0)
        pageCount++;
    if (pageIndex > pageCount)
        pageIndex = pageCount;

    if (pageCount <= 1)
        return "";

    var getLink = function (index, spanText) {
        spanText = spanText || (linkText || "{0}").replace("{0}", index);
        return "<li><a data-index=\"" + index + "\" href=\"#" + index + "\">" + spanText + "</a></li>";
    };

    var getSpan = function (text) {
        //return "<span>" + text + "</span>";
        return '';
    };

    var html = ["<div class=\"pagination pagination-centered\">", "<ul>"];
    var first = "首页";
    var prev = "上一页";
    var next = "下一页";
    var last = "末页";

    if (pageIndex == 1) {
        html.push(getSpan(first) + getSpan(prev));
    } else {
        html.push(getLink(1, first) + getLink(pageIndex - 1, prev));
    }

    var listSize = 10;

    var listIndex = parseInt(pageIndex / listSize);

    if (pageIndex % listSize == 0) listIndex -= 1;

    if (listIndex > 0)
        html.push(getLink((listIndex - 1) * listSize + 1, "..."));

    var beginPage = listIndex * listSize + 1;

    var loopTimes = beginPage + listSize - 1;

    for (; beginPage <= loopTimes && beginPage <= pageCount; beginPage++) {
        if (beginPage == pageIndex)
            html.push("<li class=\"active\"><a data-index=\"" + pageIndex + "\">" + pageIndex + "</a></li>");
        else
            html.push(getLink(beginPage, beginPage));
    }
    if ((listIndex + 1) * listSize < pageCount)
        html.push(getLink(((listIndex + 1) * listSize) + 1, "..."));

    if (pageIndex == pageCount) {
        html.push(getSpan(next) + getSpan(last));
    } else {
        html.push(getLink(pageIndex + 1, next) + getLink(pageCount, last));
    }
    html.push("</ul></div>");
    return html.join('');
};

eBind.Pager.prototype = {
    init: function (options) {
        var recordCount = options.recordCount || arguments[1],
            pagesize = options.pagesize || arguments[2],
            pageindex = options.pageindex || arguments[3];
        var table = this.$element;
        var pager = table.next('.pagination');
        pager.length > 0 && pager.remove();
        pager = $(eBind.Pager.getPagerHtml(pageindex, pagesize, recordCount));
        table.after(pager);
        var t = table.data('bindTable');
        pager.find('a').unbind('click').click(function () {
            var index = $(this).data('index');
            t.options.pageindex = index;
            t.bind();
        });
        return this;
    }
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindPager = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bindPager'),
                options = $.extend({}, $.fn.defaults, $(this).data(), typeof option == "object" && option);
            if (!data) $this.data('bindPager', (data = new eBind.Pager(this, options)));
            return data;
        });
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement