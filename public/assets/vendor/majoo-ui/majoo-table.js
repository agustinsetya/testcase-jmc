/**
 * This plugin is based on payload contract : https://docs.google.com/document/d/1pa0Xdfv3xR6Vl0WG0EQkTAV21QxIhKsnPRgwcN6gZNU/edit#heading=h.v8syzpnwajhy
 */
(function ($) {
    var sourceData;
    var metaData;
    var queryParam;
    var $tableElement;

    $.fn.extend({
        majooTable: function (options, arg) {
            if (options && typeof (options) == 'object') options = $.extend({}, $.majooTable.defaults, options);

            this.each(function () {
                new $.majooTable(this, options, arg);
            });

            return true;
        }
    });

    $.majooTable = function (elem, options, arg) {
        $tableElement = $(elem);
        getBodyTemplate();

        if (options && typeof (options) == 'string') {
            renderSortingHeader();

            let tableConfig = getConfig();
            let config = getSortingBy(tableConfig);

            if (!config?.params?.per_page) {
                config.params.per_page = tableConfig.defaultPerPage;
            }

            if (!config?.params?.current_page) {
                config.params.current_page = $.majooTable.defaults.params.current_page;
            }

            if (options === 'fetch') fetchListData(config);
            if (options === 'renderBody') renderCustomBody(arg?.body ?? null, arg?.meta ?? null);

        } else {
            setConfig(options);
        }

    };

    function setConfig(options) {
        if (!$tableElement.data('table-config')) return $tableElement.data('table-config', options);

        let newOptions = {
            ...
            options,
        };

        $tableElement.data('table-config', newOptions);
    }

    function getConfig() {
        return $tableElement.data('table-config');
    }

    function getSortingBy(config) {
        const sortType = $tableElement.data('sort_type');
        const sortBy = $tableElement.data('sort_by');
        if (sortBy && sortBy.length > 0) {
            config.params.sort_by = (sortType === 'desc' ? '-' : '') + sortBy;
        }

        return config;
    }

    function getBodyTemplate() {
        if ($tableElement.find('tbody').length == 0) return false;
        if ($tableElement.data('template-body')) return $($tableElement.data('template-body'));

        let htmlTemplate = $tableElement.find('tbody')[0];
        $tableElement.data('template-body', $(htmlTemplate).html());
        return $(htmlTemplate);
    }

    function fetchListData(options) {
        setConfig(options);
        $.ajax({
            url: options.url,
            method: options.method,
            data: options.params,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            timeout: 20000,
            success: function (msg) {
                if (msg.data) {
                    sourceData = msg.data;
                    metaData = msg.meta;
                    queryParam = options.params;

                    options.onSuccess($tableElement, {
                        data: sourceData,
                        meta: metaData
                    });
                    return true;
                }

                sourceData = [];
                metaData = {
                    current_page: 0,
                    per_page: options.params.per_page,
                    total: 0,
                };
            },
            error: function (_jqXHR, _textStatus, errorThrown) {
                options.onError($tableElement, errorThrown);
            }
        });
    }

    function showNoData() {
        const template = getBodyTemplate();
        const templateHtml = template.removeClass('hide').prop('outerHTML');
        const columnLength = $(templateHtml).find('td').length;
        const row = `<tr><td colspan="${columnLength}" class="text-center">No data found</td></tr>`
        const elementPagination = $tableElement.parent().parent();

        $tableElement.find('tbody').html(row);
        elementPagination.find('.table-information').remove();
    }

    function renderSortingHeader() {
        $tableElement.find('thead > tr > th').each(function () {
            if (typeof $(this).attr('data-sort_by') !== 'undefined') {
                $(this).addClass('enable-sorting');
            }
        });
    }

    function renderPagination() {
        const rawPagination = generatePaginationComponent();
        const element = $tableElement.parent().parent();

        if (element.find('.table-information').length > 0) {
            element.find('.table-information').replaceWith(rawPagination);
        } else {
            element.append(rawPagination);
        }

        options = getConfig();
        options.afterSuccessRender($tableElement, {
            data: sourceData,
            meta: metaData
        });

        setPaginationEvent();
    }

    function renderCustomBody(rawBody, metadata) {
        if (!rawBody && !metadata) return false;

        sourceData = rawBody;
        metaData = metadata;

        $tableElement.find('tbody').html(rawBody);
        renderPagination();
        setSortingEvent();
    }

    function renderStandardBody(_element, response) {
        if (!response?.data || response.data.length === 0) {
            showNoData();

            let options = getConfig();
            options.afterSuccessRender($tableElement, {
                data: [],
                meta: metaData
            });
            return false;
        }

        const data = getConfig().reFormatResource(response.data);
        const template = getBodyTemplate();
        const templateHtml = template.removeClass('hide').prop('outerHTML');
        const tableRow = generateTableRow(templateHtml, data ?? []);

        $tableElement.find('tbody').html(tableRow);
        renderPagination();
        setSortingEvent();
    }

    function generateTableRow(templateHtml, data,) {
        let newRow = '';
        data.forEach((val, index) => newRow += setRowValue(templateHtml, val, index));
        return newRow;
    }

    function generatePaginationComponent() {
        if (metaData?.total === 0) return false;
        const options = getConfig();

        metaData.total_pages = Math.ceil(metaData.total / metaData.per_page);
        let content = `<div class="table-information">
                        <div class="row">
                            <div class="col-md-6" style="padding: 20px">
                                ${generateShowPerPage(options?.params?.per_page ?? 25)}
                            </div>
                            <div class="col-md-6">
                                ${generateListPagination()}
                            </div>
                        </div>
                    </div>`;

        return content;
    }

    function generateShowPerPage(currentShowPerPage = 25) {
        const listPage = [25, 50, 75, 100];
        const meta = metaData;
        const data = sourceData;

        let perPage = '';
        perPage += `<p class="inline-block">Show :</p>`;
        perPage += `<select class="select-option-custom-table">`;

        listPage.forEach(val => {
            perPage += `<option value="${val}" ${val === currentShowPerPage ? "selected" : ""}>${val}</option>`;
        });

        const startItem = 1 + (meta.current_page == 1 ? 0 : (parseInt(meta.current_page - 1) * parseInt(meta.per_page)));
        const endItem = parseInt(startItem) + parseInt(data.length - 1);

        perPage += `</select>`;
        perPage += `<p class="inline-block show_result_detail_table">
                        Showing 
                            <span class="page_start_item">${new Intl.NumberFormat().format(startItem)}</span> to 
                            <span class="page_end_item">${new Intl.NumberFormat().format(endItem)}</span> of 
                            <span class="total_item">${new Intl.NumberFormat().format(meta.total)}</span> 
                        Queries
                    </p>`;

        return perPage;
    }

    function generateListPagination() {
        const meta = metaData;
        let listPage = '';

        listPage += `<ul class="pagination justify-content-right">`;
        listPage += setListPagination(meta?.total_pages);
        listPage += `</ul>`;
        return listPage;
    }

    function setListPagination(totalPage) {
        const currentPage = queryParam.current_page ?? 1;
        let contBefore = false;
        let contAfter = false;
        let page = `<li class="page-item">
                        <span class="page-link  ${(currentPage == 1) ? "disabled" : ""}" data-page="${currentPage - 1}">
                            <
                        </span>
                    </li>`;

        for (let i = 1; i <= totalPage; i++) {
            if (i == 1 || i == currentPage || i == (currentPage - 2) || i == (currentPage - 1) || i == (currentPage + 1) || i == totalPage) {
                page += `<li class="page-item ${currentPage == i ? 'active' : ''}">
                            <span class="page-link" data-page="${i}">
                                ${i}
                            </span>
                        </i>`;
            } else {
                if (i < (currentPage - 2) && contBefore == false) {
                    page += '<li class="page-item"><span class="page-link">....</span></i>';
                    contBefore = true;
                } else if (i > (currentPage + 1) && contAfter == false) {
                    page += '<li class="page-item"><span class="page-link">....</span></i>';
                    contAfter = true;
                }
                continue;
            }
        }

        page += `<li class="page-item">
                    <span class="page-link ${(currentPage == totalPage) ? "disabled" : ""}" data-page="${currentPage + 1}">
                        >
                    </span>
                </i>`;

        return page;
    }

    function setPaginationEvent() {
        const $paginationLink = $tableElement.parent().parent().find('.table-information');
        let options = getConfig();

        const isEventRegistered = $._data($paginationLink, "events");
        if (isEventRegistered) return false;

        $paginationLink.on('click', '.page-link', function () {
            const page = $(this).data('page');
            if (!page) return false;

            options.params.current_page = page;
            fetchListData(options);
        });

        $paginationLink.on('change', '.select-option-custom-table', function () {
            options.params.per_page = parseInt($(this).val());
            options.params.current_page = 1;
            fetchListData(options);
        });
    }

    function setSortingEvent() {
        const element = $tableElement.find('thead');
        const isEventRegistered = element.data('registered-event');
        if (isEventRegistered) return false;

        element.data('registered-event', true);
        element.on('click', '.enable-sorting', function () {

            if (typeof $(this).attr('data-sort_by') === 'undefined') return false;

            let data = $(this).data();
            let options = getConfig();

            $tableElement.find('[class*="fa-sort-"]').remove();

            let sortType = '';
            switch (data.sort_type) {
                case "asc":
                    sortType = "desc";
                    break;
                case "desc":
                    sortType = "asc";
                    break;
                default:
                    sortType = "asc";
            }

            data.sort_type = sortType;

            let html = $(this).html();
            $(this).html(html + ' <i class="fa fa-sort-' + sortType + '">');

            options.params.sort = ((sortType === 'desc') ? '-' : '') + data.sort_by;

            $tableElement.attr('data-sort_type', options.params.sort_type);
            $tableElement.attr('data-sort_by', options.params.sort_by);

            fetchListData(options);
        });
    }

    function setRowValue(template, value, index) {
        if (!template.match(/{(.*)}/g)) return template;

        template = template.replaceAll(`{index}`, index);
        for (const key in value) {
            template = template.replaceAll(`{${key}}`, value[key] ?? '');
        }

        return template;
    }

    function errorFetchData() {
        showNoData();
    };

    function successRender() { };
    function formatResponse(apiResponse) {
        return apiResponse;
    };

    $.majooTable.defaults = {
        url: '',
        method: 'GET',
        defaultPerPage: 25,
        params: {
            current_page: 1,
            per_page: 25,
            sort: '',
        },
        onSuccess: renderStandardBody,
        onError: errorFetchData,
        afterSuccessRender: successRender,
        reFormatResource: formatResponse
    };
})(jQuery);