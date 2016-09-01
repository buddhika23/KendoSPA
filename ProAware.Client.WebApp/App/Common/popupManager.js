define([
    'jquery',
    'pubsub',
    'Common/SlidingPopup',
    'Common/langSwitch',
    'reset'
], function ($,  pubsub, pop, langSwitch, reset) {

    var popupView = [];
    var view;
    var uploaderType;

    function initialize() {
        $.subscribe('/router/change', function () {
        });

        $.subscribe('openPopup', onOpenPopup);
        
        $.subscribe('closePopup', onClosePopup);
    }

    return {
        init: initialize
    };


    function showSlidingPoupup(name, text, popupVm) {
        if (typeof popupVm === "undefined")
            return;
            popupView[name] = new kendo.View(text, {
                model: popupVm,
                show: function() {
                    if (typeof popupVm.reset == 'function') {
                        popupVm.reset();
                    }

                    reset.reset();
                },
                init: function() {
                    if (typeof popupVm.hasValidation !== "undefined" && popupVm.hasValidation) {
                        popupVm.validator = $('#' + name + 'Form').kendoValidator(
                        {
                            rules: {
                                ComboMatch: function(input) {
                                    if (input.is("[role=combobox]") && input.is("[required]")) {
                                        return input[0].value !== '' || input[0].value !== -1;
                                    }
                                    return true;
                                },
                                maxTextLength: function(input) {
                                    if (input.is("[data-maxtextlength-msg]") && input.val() !== '') {
                                        var maxlength = parseInt(input.attr("data-maxtextlength"));
                                        return maxlength === 0 ? true : input.val().length <= maxlength;
                                    }

                                    return true;
                                },
                                minTextLength: function(input) {
                                    if (input.is("[data-mintextlength-msg]")) {
                                        var minlength = parseInt(input.attr("data-mintextlength"));
                                        return minlength === 0 ? true : input.val().length >= minlength;
                                    }

                                    return true;
                                }
                            },
                            messages: {
                                ComboMatch: " ",
                                matches: function(input) {
                                    return input.data("matchesMsg");
                                }
                            }
                        }).data("kendoValidator");
                    }
                    if (popupVm.setupUI && typeof popupVm.setupUI == 'function') {
                        popupVm.setupUI();
                    }
                    if (popupVm.setupValidators && typeof popupVm.setupValidators == 'function') {
                        popupVm.setupValidators();
                    }
                }
            });

        var popupContainer = $("#popup");

        var popupViewContainerName = name + 'Contrainer';
        var popupViewContainer = popupContainer.find('#' + popupViewContainerName);
        if (popupViewContainer.length == 0) {
            popupContainer.append('<div id="' + popupViewContainerName + '"></div>');
        }

        $('#' + popupViewContainerName).html('');

        popupView[name].render('#' + popupViewContainerName);
        pop.showSlidingPopup('#' + name + 'Panel', '#' + name + 'Form');
    };

    
    function onOpenPopup (sender, commandArgs) {
        require(['text!pops/templates/' + commandArgs.name + '.html', 'i18n!translate/nls/' + commandArgs.name],
            function (popup, locale) {
                var text = langSwitch.switch(popup, locale);
                if (popupView[commandArgs.name] !== null && typeof popupView[commandArgs.name] !== "undefined") {
                    popupView[commandArgs.name].destroy();
                }
                if (commandArgs.model) {
                    showSlidingPoupup(commandArgs.name, text, commandArgs.model);
                } else {
                    //Try to load specific viewModel first in failing used the passed ViewModel to the function
                    require(['pops/viewModels/' + commandArgs.name],
                        function (model) { //was able to find dedicated viewModel for the SlidingView


                            model.returnCommand = commandArgs.returnCommand;
                            model.sliderName = commandArgs.name;
                            model.externalArgs = commandArgs.args;

                            showSlidingPoupup(commandArgs.name, text, model);

                        },
                        function (err) { //failed to find dedicated viewModel for the SlidingView so model in the Obj model is used
                            console.error('failed loading viewModel for sliding view', err);
                            showSlidingPoupup(commandArgs.name, text, commandArgs.model);
                        });
                }

            });
    }

    function onClosePopup(sender, name) {
        pop.hideSlidingPopup('#' + name + 'Panel', '#' + name + 'Form');

    }

});