(function ($) {
    'use strict';

    if ($('.btn-detail-product').click()) {
        var id = $('.btn-detail-product').val()
        $('.product-detail-modal').attr('id', '"modal_detail_product' + id + '"')
    }

}).apply(this, [jQuery]);