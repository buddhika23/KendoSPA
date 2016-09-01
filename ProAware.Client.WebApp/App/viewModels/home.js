define(
    [
        'jquery',
        'kendo',
        'i18n!translate/nls/home'
    ],
    function ($, kendo, lan) {


        var baseUrl = window.location.protocol + '//' + window.location.host + '/api/';

        var viewModel = kendo.observable({

            title: lan.HomeTitle,
            subtitle: lan.Cards,

            timeFrameValues: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: baseUrl + 'home/timeframes',
                        dataType: 'json'
                    }
                }
            }),


            sliders: [],

            manageSlidersList: function (item) {
                if ($.inArray(item, this.sliders) === -1) {
                    this.sliders.push(item);
                }
            },

            destroy: function () {
                for (var i = 0; i < this.sliders.length; i++) {
                    $.publish('closePopup', this.sliders[i]);
                }
                this.sliders = [];
            },

            onViewShow: function () {
            }
        });

        return viewModel;
    });