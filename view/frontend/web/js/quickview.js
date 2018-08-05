
define(['jquery', 'mage/translate', 'magnificPopup'], function ($, $t) {
    "use strict";

    $.widget('dimasch.QuickView', {
        options: {
            baseUrl: '/',
            popupTitle: $t('Quick View'),
            itemClass: '.products.grid .item.product-item, .products.list .item.product-item',
            btnLabel: $t('Quick View'),
            btnContainer: '.product-item-info',
            handlerClassName: 'quick-view-button'
        },
        _create: function () {
            if (!$('body').hasClass('catalog-product-view')) {
                this._initialButtons(this.options);
                this._bindPopup(this.options);
            }
        },
        _initialButtons: function (config) {
            $(config.itemClass).not(".product-item-widget").each(function () {
                if (!$(this).find('.' + config.handlerClassName).length) {
                    var groupName = $(this).parent().attr('class').replace(' ', '-');
                    var productId = $(this).find('.price-final_price').data('product-id');
                    if (typeof productId !== 'undefined' && productId !== undefined && productId !== null) {
                        var url = config.baseUrl + 'quickview/catalog_product/view/id/' + productId;
                        var btnQuickView = '<div class="quick-view-btn-container">';
                        btnQuickView += '<a rel="' + groupName + '" class="' + config.handlerClassName + '" href="' + url + '"';
                        btnQuickView += ' title="' + config.popupTitle + '"';
                        btnQuickView += ' >';
                        btnQuickView += '<span>' + config.btnLabel + '</span></a>';
                        btnQuickView += '</div>';
                        $(this).find(config.btnContainer).prepend(btnQuickView);
                    }
                }
            });
        },
        _bindPopup: function (config) {
            var self = this;
            $('.' + config.handlerClassName).each(function () {
                $(this).magnificPopup({
                    type: 'ajax',
                    closeOnContentClick: false,
                    closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"></button>',
                    callbacks: {
                        parseAjax: function(mfpResponse) {
                            // mfpResponse.data is a "data" object from ajax "success" callback
                            // for simple HTML file, it will be just String
                            // You may modify it to change contents of the popup
                            // For example, to show just #some-element:
                            // mfpResponse.data = $(mfpResponse.data).find('#some-element');

                            // mfpResponse.data must be a String or a DOM (jQuery) element

                            console.log('Ajax content loaded:', mfpResponse);
                        },
                        ajaxContentAdded: function() {
                            // Ajax content is loaded and appended to DOM
                            //$('.mfp-content .mfp-close').remove();
                            $('.mfp-content').trigger('contentUpdated');

                        }
                    }
                });
            });
        }
    });

    return $.dimasch.QuickView;
});
