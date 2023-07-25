$.getScript(`${BASEURL}assets/vendor/compressorjs/compressor.min.js`, (function ($) {

    $.fn.extend({
        majooUploads: function (options, arg) {
            if (options && typeof (options) == 'object') {
                options = $.extend({}, $.majooUploads.defaults, options);
            }

            this.each(function () {
                new $.majooUploads(this, options, arg);
            });
            return true;
        }
    });

    $.majooUploads = function (elem, options, arg) {
        if (options && typeof (options) == 'string') {
            return;
        }

        $(elem).change(function () {
            if (!$(this)[0].files[0]) return false;

            const fileSize = $(this)[0].files[0]?.size / 1024 / 1024; // filesize in Mb
            let fileExtension = ($(this)[0].files[0]?.name)?.split('.').pop();

            if (fileSize >= options.maxFileSize) {
                options.onErrorCompress(elem, `max file size is ${options.maxFileSize}Mb`);
                return $(this).val(null);
            }

            if (typeof (options.allowedType) == 'object') {
                const isExists = options.allowedType.indexOf($(this)[0].files[0]?.type)
                if (isExists === -1) {
                    options.onErrorCompress(elem, `File extension must in ${options.allowedType.join(", ")}, Your file is ${$(this)[0].files[0]?.type}`);
                    return $(this).val(null);
                }
            }

            if (fileExtension == 'doc' || fileExtension == 'docx' || fileExtension == 'pdf') {
                let data = new FormData();
                data.append('image', $(this)[0].files[0]);
                options.onBeforeUpload(elem);
                $.ajax({
                    url: options.uploadUrl,
                    method: 'POST',
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (msg) {
                        options.onSuccess(elem, msg)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        options.onError(elem, errorThrown)
                    }
                });
            } else {
                new Compressor($(this)[0].files[0], {
                    quality: options.compressQuality,
                    convertTypes: options.convertTypes,
                    convertSize: options.convertSize,
                    maxWidth: options.maxWidth,
                    maxHeight: options.maxHeight,
                    success(result) {
                        let data = new FormData();
                        data.append('image', result, result.name);
    
                        options.onBeforeUpload(elem);
                        $.ajax({
                            url: options.uploadUrl,
                            method: 'POST',
                            data: data,
                            contentType: false,
                            processData: false,
                            success: function (msg) {
                                options.onSuccess(elem, msg)
                            },
                        })
                    },
                    error(err) {
                        options.onError(elem, err)
                    },
                });
            }
        });
    };

    function error() { };
    function success() { };
    function beforeUpload() { };
    function errorCompress() { };

    $.majooUploads.defaults = {
        maxFileSize: 5,
        allowedType: "*",
        convertTypes: ['image/png', 'image/webp', 'image/jpg'],
        uploadUrl: `${BASEAPIV1}files`,
        compressQuality: 0.6,
        convertSize: 1000000,
        maxWidth: Infinity,
        maxHeight: Infinity,
        onSuccess: error,
        onError: success,
        onBeforeUpload: beforeUpload,
        onErrorCompress: errorCompress
    };

})(jQuery));