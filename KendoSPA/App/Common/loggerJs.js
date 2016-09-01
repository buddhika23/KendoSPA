define([], (function () {
    
    var logger = {};

    var windowConsoleLog = console.log;

    logger.applyDefaults = function () {
        var environment = logger.getEnviornment();

        if (environment !== 'DEBUG') {
            if (localStorage.debughack && localStorage.debughack === 'enable') {
                return;
            }
            else {
                console.log = function () { };
            }
        }
    };

    logger.disableConsoleLog = function () {
        console.log = function () { };
    };

    logger.enableConsoleLog = function () {
        console.log = windowConsoleLog;
    };

    logger.supressAllConsoleActivity = function () {
        // disable all console messaging
    };

    logger.getEnviornment = function () {
        var url = window.location.host.toString().toLowerCase();

        if (url.indexOf('localhost') >= 0) {
            return 'DEBUG';
        }
        else if (url.indexOf('dev') >= 0) {
            return 'DEBUG';
        }
        else {
            return 'UNKNOWN';
        }
    };

    return logger;
})());