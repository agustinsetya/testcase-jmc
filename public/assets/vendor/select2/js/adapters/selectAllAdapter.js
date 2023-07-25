/*
      Define the adapter so that it's reusable
*/         
$.fn.select2.amd.define('selectAllAdapter', [
    'select2/utils',
    'select2/dropdown',
    'select2/dropdown/attachBody',
    'select2/data/array',
    'select2/compat/initSelection'
], function (Utils, Dropdown, AttachBody) {

    function SelectAll() { }
    SelectAll.prototype.render = function (decorated) {
        var self = this;
        let select2 = this.$element;
            $rendered = decorated.call(this),
            $selectAll = $(
                '<a class="btn btn-xs" type="button" style="width: 100%; text-align: left; font-weight: bold; margin-bottom: 8px; margin-top: 8px">Select All</a>'
            ),
            $unselectAll = $(
                '<a class="btn btn-xs hide" type="button" style="width: 100%; text-align: left; font-weight: bold; margin-bottom: 8px; margin-top: 8px">Unselect All</a>'
            ),
            $btnContainer = $('<div style="margin-top:3px;">').append($selectAll).append($unselectAll);
        if (!this.$element.prop("multiple")) {
            // this isn't a multi-select -> don't add the buttons!
            return $rendered;
        }
        $rendered.find('.select2-dropdown').prepend($btnContainer);
        $selectAll.on('click', function (e) {
            let selected = [];
            select2.find('option').each(function() {
                selected.push($(this).attr('value'));
            });
            select2.val(selected).trigger('change');
            $selectAll.addClass('hide');
            $unselectAll.removeClass('hide');
            self.trigger('close');
        });
        $unselectAll.on('click', function (e) {
            let selected = [];
            select2.find('option').each(function() {
                if($(this).attr('locked')) {
                    selected.push($(this).attr('value'));
                }
            });
            select2.val(selected).trigger('change');
            $selectAll.removeClass('hide');
            $unselectAll.addClass('hide');
            self.trigger('close');
        });
        return $rendered;
    };

    return Utils.Decorate(
        Utils.Decorate(
            Dropdown,
            AttachBody,
        ),
        SelectAll
    );

});