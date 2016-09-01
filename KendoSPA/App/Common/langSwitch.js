define([], function () {
    var langSwitch = {};

    langSwitch.switch = function (source, locale) {
        var text = source;
        var language = locale;
        for (var key in language) {
            if (language.hasOwnProperty(key)) {
                var re = new RegExp('t-' + key + '#', 'g');

                text = text.replace(re, language[key]);
            }
        }
        return text;
    };

    return langSwitch;
});