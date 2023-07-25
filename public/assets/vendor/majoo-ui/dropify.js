(function ($) {
    $.fn.extend({
        majooDropify: function (options, arg) {
            if (options && typeof (options) == 'object') options = $.extend({}, $.majooDropify.defaults, options);

            this.each(function () {
                new $.majooDropify(this, options, arg);
            });

            return true;
        }
    });

    const elementTemplate = `<div class="col-md-3 col-xs-6 col-sm-6 row-attachment-document" style="margin-bottom: 15px"><input type="file" data-height="150" class="majoo-dropify" accept="image/x-png,image/jpeg,image/png,image/jpg,application/pdf"/></div>`;
    const element = `<div class="row row-attachment-container">${elementTemplate}</div>`;

    function setDropify(elem) {
        $(elem).find('.majoo-dropify').dropify({
            message: { default: 'Add File' }
        });
    }

    function resetElement(elem) {
        $(elem).html(element);
        setDropify(elem);
    }

    function uploadFile(file, elem, options, inputFile, totalImage) {
        options.onBeforeUpload(elem);
        $.ajax({
            url: options.uploads.uploadUrl,
            method: 'POST',
            data: file,
            contentType: false,
            processData: false,
            success: function (msg) {
                options.onSuccessUpload(elem, msg);
                // Save new file
                inputFile.attr('new-file-name', msg.data.filename);
                inputFile.attr('new-file-url', msg.data.fullpath);
                // add flagging if image is not empty
                inputFile.parent().parent().addClass('image-not-empty');
                inputFile.addClass('new-image-uploads');
                if (totalImage >= options.maxFile) return true;
                $(elem).find(`.row-attachment-container`).append(elementTemplate);
                setDropify(elem);
            }, error: function (XMLHttpRequest) {
                const errors = XMLHttpRequest?.responseJSON?.message ?? 'failed to upload file';
                $(elem).val(null);
                $(elem).find('.dropify-clear').trigger('click');
                options.onErrorUpload(elem, errors);
                console.error(errors);
            },
        });
    }

    $.majooDropify = function (elem, options, arg) {
        if (options && typeof (options) == 'string') {
            if(options === 'reset') {
                resetElement(elem);
            }

            return false;
        };

        const elementId = `${$(elem).attr('id')}`;
        resetElement(elem);

        $(elem).on('change', '.majoo-dropify', function (e) {
            const totalImage = $(`#${elementId} .row-attachment-document`).length;
            const inputFile = $(this);

            // File size validation
            const fileSize = inputFile[0].files[0]?.size / 1024 / 1024; // filesize in Mb
            if (fileSize >= options.uploads.maxFileSize) {
                console.error(`max file size is ${options.uploads.maxFileSize}Mb`);
                options.onErrorValidation(elem, `max file size is ${options.uploads.maxFileSize}Mb`);
                return $(this).val(null);
            }

            // File type validation
            if (typeof (options.uploads.allowedType) == 'object') {
                const isExists = options.uploads.allowedType.indexOf($(this)[0].files[0]?.type)
                if (isExists === -1) {
                    console.error(`File extension must in ${options.uploads.allowedType.join(", ")}, Your file is ${$(this)[0].files[0]?.type}`);
                    options.onErrorValidation(elem, `File extension must in ${options.uploads.allowedType.join(", ")}, Your file is ${$(this)[0].files[0]?.type}`);
                    return $(this).val(null);
                }
            }

            // Validation max file to uploads
            if (totalImage >= options.maxFile ?? 5) {
                options.onErrorValidation(elem, `Max upload file is ${options.maxFile}`);
                return false;
            }

            if(['image/png', 'image/webp', 'image/jpg'].includes($(this)[0].files[0]?.type)) {
                new Compressor($(this)[0].files[0], {
                    quality: options.uploads.compressQuality,
                    convertTypes: options.uploads.convertTypes,
                    convertSize: options.uploads.convertSize,
                    success(result) {
                        let data = new FormData();
                        data.append('image', result, result.name);
    
                        uploadFile(data, elem, options, inputFile, totalImage);
                    },
                    error(err) {
                        $(this).val(null);
                        options.onErrorUpload(elem, err)
                    },
                });
            }else {
                let data = new FormData();
                data.append('image', $(this)[0].files[0], $(this)[0].files[0].name);
                uploadFile(data, elem, options, inputFile, totalImage);
            }
            
        });

        $(elem).on('click', '.dropify-clear', function () {
            const totalImage = $('.row-attachment-document').length;
            const isNextExist = $(this).closest('.row-attachment-document').nextAll().html();

            if (totalImage == 1) return false;

            // Remove attachment file and save to deleted file array if deleted file is from BE
            $(this).closest('.row-attachment-document').remove();

            options.onRemoveItem(elem);

            // add browse file if no attachment after this element
            if (!isNextExist) {
                $(elem).find(`.row-attachment-container`).append(elementTemplate);
                setDropify(elem);
                return true;
            }
        });
    };

    function errorValidation() { };
    function successUpload() { };
    function errorUpload() { };
    function removeItem() { };
    function beforeUpload() { };

    $.majooDropify.defaults = {
        uploads: {
            maxFileSize: 5,
            allowedType: "*",
            convertTypes: ['image/png', 'image/webp', 'image/jpg', 'application/pdf'],
            uploadUrl: `${BASEAPIV1}files`,
            compressQuality: 0.6,
            convertSize: 1000000,
        },
        maxFile: 5,
        onBeforeUpload: beforeUpload,
        onSuccessUpload: successUpload,
        onErrorValidation: errorValidation,
        onErrorUpload: errorUpload,
        onRemoveItem: removeItem
    };
})(jQuery);