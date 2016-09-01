define(
    [
        'jquery',
        'kendo',
        'reset',
        'Common/langSwitch'
    ],
    function ($, kendo, uiFix, langSwitch) {

        $.ajaxPrefilter(function (options, originalOptions) {
            if (originalOptions.url && originalOptions.url.indexOf('.js') < 1) {
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Accept-Language', localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale'));
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
            }
        });

        //$.ajaxError(function (event, jqxhr, settings, thrownError) {
        //    console.log("Error captured from $ - " + thrownError);
        //    // redirect to the error html.
        //});

        var views = {
            loadView: getViewByViewName
        };

        function getViewByViewName(viewName, callback) {

            require(['text!V/' + viewName + '.html', 'i18n!translate/nls/' + viewName], function (view, lang) {
                require(['VM/' + viewName], function (viewModel) {

                    var viewTranslated = langSwitch.switch(view, lang);
                    var kendoView = new kendo.View(viewTranslated, {
                        model: viewModel,
                        show: function () {
                            kendo.fx(this.element).fade('in').duration(500).play();

                            if (typeof viewModel.onViewShow == 'function') {
                                viewModel.onViewShow();
                            }

                            uiFix.reset();


                        },
                        init: function () {


                            if (typeof viewModel.onViewInit == 'function') {
                                viewModel.onViewInit();
                            }

                        }

                    });
                    callback(kendoView);

                });
            });

        }
        //a temp method to test

        return views;

    });
