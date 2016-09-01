define([
    'jquery',
    'viewModels/layout',
    'text!viewTemplates/layout.html',
    'Common/langSwitch',
    'i18n!translate/nls/layout'
], function ($, viewModel, layoutTemplate, langSwitch, lang) {

    var viewTranslated = langSwitch.switch(layoutTemplate, lang);

    var layout = new kendo.Layout(viewTranslated, {
        model: viewModel
    });
    layout.model.onViewInit();
    return layout;

});