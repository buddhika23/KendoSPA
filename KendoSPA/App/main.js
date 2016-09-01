
require(['require-config'], function() {

    require(['jquery', 'nicescroll', 'jszip', 'kendo', 'toastr', 'logger', 'app', 'bootstrap', 'common-scripts'],
        function ($, nice, jszip, kendo, toastr, logger, app) {

            toastr.options.positionClass = 'toast-bottom-left';
            document.body.style.overflowY = 'hidden';

            logger.applyDefaults();

            window.JSZip = jszip;
            console.log("Plugin: common-scripts " + (typeof resetPopups === "function") ? "Loaded" : "NOT Loaded");
            console.log("Plugin: NiceScroll " + (($.fn.niceScroll) ? "Loaded" : "NOT Loaded"));
            console.log("Plugin: ToolTip " + (($.fn.tooltip) ? "Loaded" : "NOT Loaded"));

            kendo.culture(localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale'));
        
        app.start();
    });
});
