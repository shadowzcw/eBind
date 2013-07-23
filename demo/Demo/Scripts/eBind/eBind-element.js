var eBind = eBind || {};

eBind.Element = function (element, value) {
    this.$element = $(element);
    this.type = this.$element.attr('type') || this.$element[0].nodeName || this.$element.attr('data-type');
    this.init(value);
};

eBind.Element.prototype = {
    init: function (value) {
        var t = this.$element;
        var type = this.type.toLowerCase();
        var setSelected = function (elements, arr, attr) {
            elements.each(function () {
                for (var i = 0; i < arr.length; i++) {
                    if (this.value.toString() == arr[i].toString()) {
                        $(this).attr(attr, attr);
                    }
                }
            });
        };
        switch (type) {
            case 'select':
                var eachElements = t.attr('multiple') == 'multiple' ? t.children() : t;
                switch (typeof (value)) {
                    case "object":
                        if ($.isArray(value)) setSelected(eachElements, value, 'selected');
                        else setSelected(eachElements, value[this.$element.attr('name').replace('e', '')].toString().split(','), 'selected');
                        break;
                    case "string":
                    default:
                        if (value.toString().indexOf(',') > -1)
                            setSelected(eachElements, value.toString().split(','), 'selected');
                        else
                            t.val(value);
                        break;
                }
                break;
            case "radio":
            case "checkbox":
                switch (typeof (value)) {
                    case "object":
                        if ($.isArray(value)) setSelected(t, value, 'checked');
                        else setSelected(t, value[this.$element.attr('name').replace('e', '')].toString().split(','), 'checked');
                        break;
                    case "string":
                    default:
                        setSelected(t, value.toString().split(','), 'checked');
                        break;
                }
                break;
            default:
                t.val(value);
                break;
        }
        this.$element.data('bindElement', this);
    }
};


// ReSharper disable WrongExpressionStatement
!function ($) {
    $.fn.bindElement = function (value) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bindElement');
            if (!data) $this.data('bindElement', (data = new eBind.Element(this, value)));
            return data;
        });
    };
} (window.jQuery);
// ReSharper restore WrongExpressionStatement