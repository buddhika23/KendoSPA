require.config({
    baseUrl: '/App',
    waitSeconds: 60,
    //urlArgs: "version=" + (localStorage.getItem('version') === "" || localStorage.getItem('version') === null ? "1.0.0.0" : localStorage.getItem('version')),
    paths: {
        'jquery': '../Scripts/jquery-2.2.4.min',
        'dragable': '../Scripts/draggable',
        'mouse': [
            '../Scripts/mouse'
        ],
        'resizable': '../Scripts/resizable',
        'widget': '../Scripts/widget',
        'core': '../Scripts/core',
        'pubsub': '../Scripts/pub.sub',
        'bootstrap': [
            '../Content/custom/js/bootstrap.min'
        ],
        'text': [
            '../Scripts/text'
        ],
        '../kendo.core': [
            "../Scripts/kendo/2016.2.504/kendo.core.min"
        ],
        'kendo.all.min': [
            '../Scripts/kendo/2016.2.504/kendo.all.min'
        ],
        'kendoCulture': [
            '../' + 'Scripts/kendo/2016.2.504/cultures/kendo.culture.' + (localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale')) + '.min'
        ],
        'kendoMessages': [
            '../' + 'Scripts/kendo/2016.2.504/messages/kendo.messages.' + (localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale')) + '.min'
        ],
        'i18n': [
            '../Scripts/proi18n'
        ],
        'toastr': [
            '../Scripts/toastr.min'
        ],
        'jszip': [
            '../Scripts/jszip.min'
        ],
        'logger': 'Common/loggerJS',
        'nicescroll': [
            '../Content/custom/js/jquery.nicescroll'
        ],
        'common-scripts': [
            '../Content/custom/js/common-scripts'
        ],
        'reset': 'Common/resetPopus',
        'L': 'translate/nls/',
        'V': 'viewTemplates/',
        'VM': 'viewModels/',
        'app': 'appRouter',
        'gridstack': [
            '../Scripts/gridstack'
        ],
        'jquery-easing': [
            '../Scripts/jquery.easing.min'
        ],
        'underscore': [
            '../Scripts/underscore-min'
        ],
        'lodash': [
            '../Scripts/lodash.min'
        ]

    },
    map: {
        "*": {
            "kendo": "kendo.all.min"
        }
    },
    shim: {
        'bootstrap': ['jquery'],
        'jszip': ['jquery'],
        'pubsub': ['jquery'],
        'toastr': { deps: ['jquery'] },
        'kendo': ['jquery'],
        'kendoCulture': { deps: ['kendo'] },
        'kendoMessages': { deps: ['kendo'] },
        'nicescroll': ['jquery'],
        'common-scripts': { deps: ['nicescroll'] },
        'core': ['jquery'],
        'dragable': ['jquery'],
        'mouse': ['jquery'],
        'resizable': ['jquery'],
        'widget': ['jquery'],
        'jquery-easing': ['jquery'],
        'underscore': ['jquery'],
        'lodash': ['jquery'],
        'gridstack': { deps: ['jquery', 'core', 'dragable', 'mouse', 'resizable', 'widget', 'jquery-easing', 'underscore', 'lodash'] },
        'app': {
            deps: ['kendo', 'kendoCulture', 'kendoMessages', 'gridstack']
        }
    },

    locale: localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale')
});