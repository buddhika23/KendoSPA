define(['jquery'], function ($) {
    var sp2 = {};
    sp2.busyDiv = $('<div id=busyDiv><div class=\'dots\' ><div class=\'dot\' ></div><div class=\'dot\' ></div><div class=\'dot\' ></div><div class=\'dot\' ></div><div class=\'dot\' ></div></div><svg version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' ><defs><filter id=\'goo\' ><feGaussianBlur in=\'SourceGraphic\' result=\'blur\' stdDeviation=\'12\' /><feColorMatrix in=\'blur\' mode=\'matrix\' values=\'1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7\' result=\'goo\' /></filter></defs></svg></div>'),
    sp2.start = function (element) {
        $('#' + element).append(sp2.busyDiv);
        //sp2.busyDiv.insertBefore('#' + element);
    };
    sp2.stop = function () {
        $('#busyDiv').remove();
        sp2.busyDiv.remove();

    };

    return sp2;
});