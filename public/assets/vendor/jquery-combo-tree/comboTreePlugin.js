/*!
 * jQuery ComboTree Plugin
 * Author:  Erhan FIRAT
 * Mail:    erhanfirat@gmail.com
 * Licensed under the MIT license
 * Version: 1.2.1
 * Edited By: Wahyu (Menyesuaikan kebutuhan PRD Ticketing Management Phase Workspace)
*/
!(function ($, c, d, e) {
    var b = "comboTree",
        f = { source: [], isMultiple: !1, cascadeSelect: !1, selected: [], collapse: !1, selectableLastNode: !1, selectParent: !1 };
    function a(c, a) {
        (this.options = $.extend({}, f, a)), (this._defaults = f), (this._name = b), this.constructorFunc(c, a);
    }
    (a.prototype.constructorFunc = function (a, b) {
        (this.elemInput = a), (this._elemInput = $(a)), this.init();
    }),
        (a.prototype.init = function () {
            this._elemInput.attr("readonly", !0),
                (this.comboTreeId = "comboTree" + (this._elemInput.attr("id") ?? Math.floor(999999 * Math.random()))),
                this._elemInput.addClass("comboTreeInputBox"),
                e === this._elemInput.attr("id") && this._elemInput.attr("id", this.comboTreeId + "Input"),
                (this.elemInputId = this._elemInput.attr("id")),
                this._elemInput.wrap('<div id="' + this.comboTreeId + 'Wrapper" class="comboTreeWrapper"></div>'),
                this._elemInput.wrap('<div id="' + this.comboTreeId + 'InputWrapper" class="comboTreeInputWrapper"></div>'),
                (this._elemWrapper = $("#" + this.comboTreeId + "Wrapper")),
                (this._elemArrowBtn = $('<div id="' + this.comboTreeId + 'ArrowBtn" class="comboTreeArrowBtn" type="button"><span class="fa fa-caret-down comboTreeArrowBtnImg"></span></div>')),
                this._elemInput.after(this._elemArrowBtn),
                this._elemWrapper.append('<div id="' + this.comboTreeId + 'DropDownContainer" class="comboTreeDropDownContainer"><div class="comboTreeDropDownContent"></div>'),
                (this._elemDropDownContainer = $("#" + this.comboTreeId + "DropDownContainer")),
                this._elemDropDownContainer.html(this.createSourceHTML()),
                (this._elemFilterInput = this.options.isMultiple ? $("#" + this.comboTreeId + "MultiFilter") : null),
                (this._elemSourceUl = $("#" + this.comboTreeId + "ComboTreeSourceUl")),
                (this._elemItems = this._elemDropDownContainer.find("li")),
                (this._elemItemsTitle = this._elemDropDownContainer.find("span.comboTreeItemTitle")),
                (this._selectedItem = {}),
                (this._selectedItems = []),
                this.processSelected(),
                this.bindings();
        }),
        (a.prototype.unbind = function () {
            this._elemArrowBtn.off("click"),
                this._elemInput.off("click"),
                this._elemItems.off("click"),
                this._elemItemsTitle.off("click"),
                this._elemItemsTitle.off("mousemove"),
                this._elemInput.off("keyup"),
                this._elemInput.off("keydown"),
                this._elemInput.off("mouseup." + this.comboTreeId),
                $(d).off("mouseup." + this.comboTreeId);
        }),
        (a.prototype.destroy = function () {
            this.unbind(), this._elemWrapper.before(this._elemInput), this._elemWrapper.remove();
        }),
        (a.prototype.removeSourceHTML = function () {
            this._elemDropDownContainer.html("");
        }),
        (a.prototype.createSourceHTML = function () {
            var a = "";
            return this.options.isMultiple && (a = this.createFilterHTMLForMultiSelect()), (a += this.createSourceSubItemsHTML(this.options.source));
        }),
        (a.prototype.createFilterHTMLForMultiSelect = function () {
            return '<input id="' + this.comboTreeId + 'MultiFilter" type="text" class="multiplesFilter" placeholder="Type to filter"/>';
        }),
        (a.prototype.createSourceSubItemsHTML = function (c, a, e = !1, f = "") {
            for (var d = '<UL field-id="' + this.elemInputId + '" id="' + this.comboTreeId + "ComboTreeSourceUl" + (a ?? "main") + '" style="' + ((this.options.collapse || e) && a ? "display:none;" : "") + '">', b = 0; b < c.length; b++)
                d += this.createSourceItemHTML(c[b], a ?? "main");
            return d + "</UL>";
        }),
        (a.prototype.createSourceItemHTML = function (a, g) {
            if (a.hasOwnProperty("status") && !a.status) return "";
            var b = "",
                c = a.hasOwnProperty("values"),
                h = !!a.hasOwnProperty("collapse") && a.hasOwnProperty("collapse");
            let d = e === a.isSelectable || a.isSelectable,
                i = d || c ? "selectable" : "not-selectable",
                j = c ? "open-childs=true" : "",
                k = e !== this.options.selectableLastNode && !!c && this.options.selectableLastNode,
                f = "main" === g ? a.name : g;
            return (
                (b += '<LI field-id="" id="' + this.comboTreeId + "Li" + a.id + '" class="ComboTreeItem' + (c ? "Parent" : "Chlid") + '"> '),
                c && (b += '<span class="comboTreeParentPlus">' + (this.options.collapse || h ? '<span class="fa fa-chevron-right"></span>' : '<span class="fa fa-chevron-down"></span>') + "</span>"),
                this.options.isMultiple
                    ? (b +=
                        '<span root-value="' +
                        f +
                        '" field-id="' +
                        this.elemInputId +
                        '" data-id="' +
                        a.id +
                        '" data-selectable="' +
                        d +
                        '" class="comboTreeItemTitle ' +
                        i +
                        '" ' +
                        j +
                        ">" +
                        (!k && d ? '<input type="checkbox" />' : "") +
                        a.name +
                        "</span>")
                    : (b += '<span root-value="' + f + '" field-id="' + this.elemInputId + '" data-id="' + a.id + '" data-selectable="' + d + '" class="comboTreeItemTitle ' + i + '" ' + j + ">" + a.name + "</span>"),
                c && (b += this.createSourceSubItemsHTML(a.values, f, h, a.id)),
                (b += "</LI>"),
                b
            );
        }),
        (a.prototype.bindings = function () {
            var a = this;
            $(this._elemInput).focus(function (b) {
                a._elemDropDownContainer.is(":visible") || $(a._elemDropDownContainer).slideToggle(100);
            }),
                this._elemArrowBtn.on("click", function (b) {
                    const isDisabled = $(this).parent().find('input').attr('disabled')
                    if(isDisabled === 'disabled') return false;
                    b.stopPropagation(), a.toggleDropDown();
                }),
                this._elemInput.on("click", function (b) {
                    b.stopPropagation(), a._elemDropDownContainer.is(":visible") || a.toggleDropDown();
                }),
                this._elemItems.on("click", function (b) {
                    $(this).hasClass("ComboTreeItemParent") && a.toggleSelectionTree(this);
                }),
                this._elemItemsTitle.on("click", function (b) {
                    if ($(this).attr("open-childs")) return $(this).parent().find(".comboTreeParentPlus").trigger("click"), !1;
                    a.options.isMultiple ? a.multiItemClick(this) : a.singleItemClick(this);
                }),
                this._elemItemsTitle.on("mousemove", function (b) {
                    b.stopPropagation(), a.dropDownMenuHover(this);
                }),
                this._elemInput.on("keyup", function (b) {
                    switch ((b.stopPropagation(), b.keyCode)) {
                        case 27:
                            a.closeDropDownMenu();
                            break;
                        case 13:
                        case 39:
                        case 37:
                        case 40:
                        case 38:
                            b.preventDefault();
                            break;
                        default:
                            a.options.isMultiple;
                    }
                }),
                this._elemFilterInput &&
                this._elemFilterInput.on("keyup", function (b) {
                    switch ((b.stopPropagation(), b.keyCode)) {
                        case 27:
                            $(this).val() ? $(this).val("") : a.closeDropDownMenu();
                            break;
                        case 40:
                        case 38:
                            b.preventDefault(), a.dropDownInputKeyControl(b.keyCode - 39);
                            break;
                        case 37:
                        case 39:
                            b.preventDefault(), a.dropDownInputKeyToggleTreeControl(b.keyCode - 38);
                            break;
                        case 13:
                            a.multiItemClick(a._elemHoveredItem), b.preventDefault();
                    }
                }),
                this._elemInput.on("keydown", function (b) {
                    switch ((b.stopPropagation(), b.keyCode)) {
                        case 9:
                            a.closeDropDownMenu();
                            break;
                        case 40:
                        case 38:
                            b.preventDefault(), a.dropDownInputKeyControl(b.keyCode - 39);
                            break;
                        case 37:
                        case 39:
                            b.preventDefault(), a.dropDownInputKeyToggleTreeControl(b.keyCode - 38);
                            break;
                        case 13:
                            a.options.isMultiple ? a.multiItemClick(a._elemHoveredItem) : a.singleItemClick(a._elemHoveredItem), b.preventDefault();
                            break;
                        default:
                            a.options.isMultiple && b.preventDefault();
                    }
                }),
                $(d).on("mouseup." + a.comboTreeId, function (b) {
                    !a._elemWrapper.is(b.target) && 0 === a._elemWrapper.has(b.target).length && a._elemDropDownContainer.is(":visible") && a.closeDropDownMenu();
                });
        }),
        (a.prototype.toggleDropDown = function () {
            let a = this;
            $(this._elemDropDownContainer).slideToggle(100, function () {
                a._elemDropDownContainer.is(":visible") && $(a._elemInput).focus();
            });
        }),
        (a.prototype.closeDropDownMenu = function () {
            $(this._elemDropDownContainer).slideUp(100);
        }),
        (a.prototype.toggleSelectionTree = function (a, c) {
            var b = $(a).children("ul")[0];
            c === e
                ? ($(b).is(":visible") ? $(a).children("span.comboTreeParentPlus").html('<span class="fa fa-chevron-right"></span>') : $(a).children("span.comboTreeParentPlus").html('<span class="fa fa-chevron-down"></span>'),
                    $(b).slideToggle(50))
                : 1 != c || $(b).is(":visible")
                    ? -1 == c && ($(b).is(":visible") ? ($(a).children("span.comboTreeParentPlus").html('<span class="fa fa-chevron-right"></span>'), $(b).slideUp(50)) : this.dropDownMenuHoverToParentItem(a))
                    : ($(a).children("span.comboTreeParentPlus").html('<span class="fa fa-chevron-down"></span>'), $(b).slideDown(50));
        }),
        (a.prototype.selectMultipleItem = function (a) {
            if (this.options.selectableLastNode && $(a).parent("li").hasClass("ComboTreeItemParent")) return this.toggleSelectionTree($(a).parent("li")), !1;
            if (!0 == $(a).data("selectable") && ((this._selectedItem = { id: $(a).attr("data-id"), name: $(a).text() }), this.isItemInArray(this._selectedItem, this.options.source))) {
                var b = this.isItemInArray(this._selectedItem, this._selectedItems);
                b ? (this._selectedItems.splice(parseInt(b), 1), $(a).find("input").prop("checked", !1)) : (this._selectedItems.push(this._selectedItem), $(a).find("input").prop("checked", !0));
            }
        }),
        (a.prototype.setSelectedValue = function (a) {
            let b = $(a).attr("field-id");
            $(`#${b}`).attr("data-id", $(a).attr("data-id")), $(`#${b}`).attr("data-value", $(a).text());
        }),
        (a.prototype.singleItemClick = function (b) {
            let c = $(b).parent().parent().parent().children("span.selectable").text(),
                d = this.options.selectParent && c.length > 0 ? `${c} | ${$(b).text()}` : `${$(b).text()}`;
            !0 == $(b).data("selectable") && (a.prototype.unselectedAll(this._elemItems), a.prototype.selected(b), (this._selectedItem = { id: $(b).attr("data-id"), name: d })), this.refreshInputVal(), this.closeDropDownMenu();
        }),
        (a.prototype.multiItemClick = function (a) {
            this.selectMultipleItem(a),
                this.options.cascadeSelect &&
                $(a).parent("li").hasClass("ComboTreeItemParent") &&
                $(a)
                    .parent("li")
                    .children("ul")
                    .first()
                    .find('input[type="checkbox"]')
                    .each(function () {
                        var b = $(this);
                        $(a).children('input[type="checkbox"]').first().prop("checked") !== b.prop("checked") && (b.prop("checked", !$(a).children('input[type="checkbox"]').first().prop("checked")), b.trigger("click"));
                    }),
                this.refreshInputVal();
        }),
        (a.prototype.isItemInArray = function (c, b) {
            for (var a = 0; a < b.length; a++) {
                if (c.id == b[a].id && c.name == b[a].name) return a + "";
                if (b[a].hasOwnProperty("values")) {
                    let d = this.isItemInArray(c, b[a].values);
                    if (d) return d;
                }
            }
            return !1;
        }),
        (a.prototype.refreshInputVal = function () {
            var a = "",
                c = this.getSelectedIds();
            if (this.options.isMultiple) for (var b = 0; b < this._selectedItems.length; b++) (a += this._selectedItems[b].name), b < this._selectedItems.length - 1 && (a += ", ");
            else a = this._selectedItem.name;
            this._elemInput.attr("data-id", c), this._elemInput.val(a), this._elemInput.trigger("change"), this.changeHandler && this.changeHandler();
        }),
        (a.prototype.dropDownMenuHover = function (a, b) {
            this._elemItems.find("span.comboTreeItemHover").removeClass("comboTreeItemHover"), $(a).addClass("comboTreeItemHover"), (this._elemHoveredItem = $(a)), b && this.dropDownScrollToHoveredItem(this._elemHoveredItem);
        }),
        (a.prototype.dropDownScrollToHoveredItem = function (a) {
            var b = this._elemSourceUl.scrollTop();
            this._elemSourceUl.scrollTop(b + $(a).parent().position().top - 80);
        }),
        (a.prototype.dropDownMenuHoverToParentItem = function (b) {
            var a = $($(b).parents("li.ComboTreeItemParent")[0]).children("span.comboTreeItemTitle");
            a.length ? this.dropDownMenuHover(a, !0) : this.dropDownMenuHover(this._elemItemsTitle[0], !0);
        }),
        (a.prototype.dropDownInputKeyToggleTreeControl = function (b) {
            var a = this._elemHoveredItem;
            $(a).parent("li").hasClass("ComboTreeItemParent") ? this.toggleSelectionTree($(a).parent("li"), b) : -1 == b && this.dropDownMenuHoverToParentItem(a);
        }),
        (a.prototype.dropDownInputKeyControl = function (b) {
            this._elemDropDownContainer.is(":visible") || this.toggleDropDown();
            var a = this._elemItems.find("span.comboTreeItemTitle:visible");
            (i = this._elemHoveredItem ? a.index(this._elemHoveredItem) + b : 0), (i = (a.length + i) % a.length), this.dropDownMenuHover(a[i], !0);
        }),
        (a.prototype.filterDropDownMenu = function () {
            var a = "";
            "" != (a = this.options.isMultiple ? $("#" + this.comboTreeId + "MultiFilter").val() : this._elemInput.val())
                ? (this._elemItemsTitle.hide(),
                    this._elemItemsTitle.siblings("span.comboTreeParentPlus").hide(),
                    (list = this._elemItems
                        .filter(function (c, b) {
                            return -1 != b.innerHTML.toLowerCase().indexOf(a.toLowerCase());
                        })
                        .each(function (a, b) {
                            $(this.children).show(), $(this).siblings("span.comboTreeParentPlus").show();
                        })))
                : (this._elemItemsTitle.show(), this._elemItemsTitle.siblings("span.comboTreeParentPlus").show());
        }),
        (a.prototype.selected = function (a) {
            $(a).attr("is-selected", !0).addClass("selected-item");
        }),
        (a.prototype.unselected = function (a) {
            $(a).attr("is-selected", !1).removeClass("selected-item");
        }),
        (a.prototype.unselectedAll = function (b) {
            a.prototype.unselected(b.find("span.selected-item"));
        }),
        (a.prototype.processSelected = function () {
            let c = this._elemItemsTitle,
                b = this._selectedItem,
                d = this._selectedItems,
                e = this.options;
            this.options.selected.forEach(function (i) {
                let f = $(c).filter(function () {
                    return $(this).data("id") == i;
                }),
                    g = f.parent().parent().parent().children("span.selectable").text(),
                    h = e.selectParent && g.length > 0 && g.length > 0 ? `${g} | ${f.text()}` : `${f.text()}`;
                f.parent().parent().parent().find("ul").show(), f.length > 0 && ($(f).find("input").attr("checked", !0), a.prototype.selected(f), (b = { id: f.data("id"), name: h }), d.push(b));
            }),
                (this._selectedItem = b),
                this.refreshInputVal();
        }),
        (a.prototype.findItembyId = function (c, a) {
            if (c && a)
                for (let b = 0; b < a.length; b++) {
                    if (a[b].id == c) return { id: a[b].id, name: a[b].name };
                    if (a[b].hasOwnProperty("values")) {
                        let d = this.findItembyId(c, a[b].values);
                        if (d) return d;
                    }
                }
            return null;
        }),
        (a.prototype.getSelectedIds = function () {
            if (this.options.isMultiple && this._selectedItems.length > 0) {
                var a = [];
                for (i = 0; i < this._selectedItems.length; i++) a.push(this._selectedItems[i].id);
                return a;
            }
            return !this.options.isMultiple && this._selectedItem.hasOwnProperty("id") ? [this._selectedItem.id] : null;
        }),
        (a.prototype.getSelectedNames = function () {
            if (this.options.isMultiple && this._selectedItems.length > 0) {
                var a = [];
                for (i = 0; i < this._selectedItems.length; i++) a.push(this._selectedItems[i].name);
                return a;
            }
            return !this.options.isMultiple && this._selectedItem.hasOwnProperty("id") ? this._selectedItem.name : null;
        }),
        (a.prototype.setSource = function (a) {
            (this._selectedItems = []), this.destroy(), (this.options.source = a), this.constructorFunc(this.elemInput, this.options);
        }),
        (a.prototype.clearSelection = function () {
            for (i = 0; i < this._selectedItems.length; i++) {
                let a = $("#" + this.comboTreeId + "Li" + this._selectedItems[i].id);
                $(a).find("input").prop("checked", !1);
            }
            (this._selectedItems = []), this.refreshInputVal();
        }),
        (a.prototype.setSelection = function (a) {
            if (a && a.length && a.length > 0)
                for (let c = 0; c < a.length; c++) {
                    let b = this.findItembyId(a[c], this.options.source);
                    if (b && this.isItemInArray(b, this.options.source) && !this.isItemInArray(b, this._selectedItems)) {
                        let d = $("#" + this.comboTreeId + "Li" + a[c]).find('span').addClass('selected-item');
                        this._selectedItems.push(b), (this._selectedItem = b), this.options.cascadeSelect ? $(d).find("input").prop("checked", !0) : $(d).find("input:first").prop("checked", !0);
                    }
                }
            this.refreshInputVal();
        }),
        (a.prototype.onChange = function (a) {
            a && "function" == typeof a && (this.changeHandler = a);
        }),
        ($.fn[b] = function (d) {
            var c = [];
            return (this.each(function () {
                $.data(this, "plugin_" + b) || ($.data(this, "plugin_" + b, new a(this, d)), c.push($(this).data()["plugin_" + b]));
            }),
                1 == this.length)
                ? c[0]
                : c;
        });
})(jQuery, window, document);