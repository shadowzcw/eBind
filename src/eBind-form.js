var eBind = eBind || {};

eBind.Form = function (element, model) {
    var t = this.$element = $(element);
    $('input,textarea,select', t).each(function () {
        var vname = $(this).attr('name');
        var value;
        if (vname != undefined) {
            value = model[$(this).attr('name').replace('e', '')];
        }
        if (value) {
            var data = $(this).data('bindElement');
            if (!data) new eBind.Element(this, value);
            else data.init(value);
        }
    });
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindForm = function (model) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bindForm');
            if (!data) $this.data('bindForm', (data = new eBind.Form(this, model)));
            return data;
        });
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement
