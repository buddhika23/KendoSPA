
$(document).ready(function () {
    // by madhawee

    //---------------------new drawer---------------

    $(window).resize(function () {
        var doc_height = $(window).height();
        var drawer_content = doc_height - 200;
        $(".drawer-content").css("height", drawer_content);
        $(".drawer-tab-content").css("height", drawer_content - 250);

        //----------------- fixed grid height

        var gridElement = $(".k-grid ");
        gridElement.children(".k-grid-content").height(doc_height - 220);

        //----------------- card view scroll

        //var card_view_content = doc_height - 100;
        //$(".app-user-cards").css("height", card_view_content);

        //var gridElement = $("#grid");
        //var dataArea = gridElement.find(".k-grid-content");
        //var newHeight = gridElement.parent().innerHeight() - 2;
        //var diff = gridElement.innerHeight() - dataArea.innerHeight();
        //gridElement.height(newHeight);
        //dataArea.height(newHeight - diff);
        $('.k-grid-content tbody').height(0);
        window.setTimeout("$('.k-grid-content tbody').height(0);", 300);
    });

    var doc_height = $(window).height();
    var drawer_content = doc_height - 200;
    $(".drawer-content").css("height", drawer_content);
    $(".drawer-tab-content").css("height", drawer_content - 250);

    //----------------- fixed grid height

    var gridElement = $(".k-grid ");
    gridElement.children(".k-grid-content").height(doc_height - 220);

    //----------------- card view scroll

    //var card_view_content = doc_height - 100;
    //$(".app-user-cards").css("height", card_view_content);

    //-------------------- custom scroller ------------------

    // custom scroller (niceScroller) for html page
    //$("html").niceScroll({ styler: "fb", cursorcolor: "#03a9f4", cursorwidth: '6', cursorborderradius: '10px', background: '#666', spacebarenabled: false, cursorborder: '', zindex: '1000' });

    //$("html").niceScroll({ styler: "fb", cursorcolor: "#03a9f5", cursorwidth: '6', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });


    //----------------------------------------------------------



    //Set the current language

    //if (locale === null || typeof locale === "undefined") {
    //    localStorage.setItem('locale', 'nb-no');
    //}

    //var combo = $('#languageCombo').val(localStorage.getItem('locale'));
    ////combo.value = ;

    //TODO: Remove all the global variables with Window
    //TODO move to correct place. I guess layout view model is the right place
    window.docWidth = $(window).width();
    window.docHeight = $(window).height();



    window.tray1_1Width = docWidth / 2 - 310;
    window.tray1_2Width = docWidth - 310;

    // once tree view opend
    window.tray1_1Width_tree_open = window.tray1_1Width + 30;
    window.tree_view_content_dock_hight = docHeight - 192;


    //var right_panel_first_height = $(".tray-1-1").height();
    window.right_panel_height = docHeight - 240;


    //window.tray1_1Width;
    //window.tray1_2Width;

    function getDocWidth() {
        window.docWidth = $(window).width();
        //console.log('width',docWidth);
        //alert();
    }

    function getDocHeight() {
        window.docHeight = $(window).height();
        //console.log('height',docHeight);
    }
    function trySizeint() {
        window.tray1_1Width = docWidth / 2 - 310;
        window.tray1_2Width = docWidth - 310;

        // once tree view opend
        window.tray1_1Width_tree_open = window.tray1_1Width + 30;
        window.tree_view_content_dock_hight = docHeight - 192;


        //var right_panel_first_height = $(".tray-1-1").height();
        window.right_panel_height = docHeight - 234;
    }

    function onResize() {
        getDocWidth();
        getDocHeight();
        trySizeint();

        $(".tray-1-1").css("width", window.tray1_1Width);
        $(".tray-1-2").css("width", window.tray1_2Width);
        $(".tray-1-1-alert").css("width", window.tray1_1Width);

        $(".tray-1-1-tree").css("width", window.tray1_1Width);

        $(".tray-content").css("height", window.right_panel_height);

        $(".tray-1-1-tree .app-tree-body").css("height", window.tree_view_content_dock_hight);

        //console.log("aaa" + window.right_panel_height);

        $(".treeView1").click(function () {
            $(".panel-overlay-tree-1").removeClass("none fadeOut animated").addClass("fadeIn animated");
            $(".tray-1-1-tree").removeClass("none slideOutRight animated").addClass("slideInRight animated");
            $(".tray-1-1").css("width", window.tray1_1Width_tree_open);
        });
        $(".close-tray-1-1-tree").click(function () {
            $(".panel-overlay-tree-1").removeClass("fadeIn animated").addClass("fadeOut animated none");
            $(".tray-1-1-tree").removeClass("slideInRight animated").addClass("slideOutRight animated");
            $(".tray-1-1").css("width", window.tray1_1Width);
        });
    }

    var timer;
    $(window).bind('resize', function () {
        timer && clearTimeout(timer);
        timer = setTimeout(onResize, 100);
    });

    $(window).resize(function () {
        //event.preventDefault();
        getDocWidth();
        getDocHeight();
    });

    //alert(right_panel_first_height);
    //alert(right_panel_height);

    $(".tray-1-1").css("width", window.tray1_1Width);
    $(".tray-1-2").css("width", window.tray1_2Width);
    $(".tray-1-1-alert").css("width", window.tray1_1Width);

    $(".tray-1-1-tree").css("width", window.tray1_1Width);
    //$(".tray-1-1-tree").css("width", tray1_1Width);

    $(".tray-content").css("height", window.right_panel_height);
    $(".tray-1-1-tree .app-tree-body").css("height", window.tree_view_content_dock_hight);

    $(".treeView1").click(function () {
        $(".panel-overlay-tree-1").removeClass("none fadeOut animated").addClass("fadeIn animated");
        $(".tray-1-1-tree").removeClass("none slideOutRight animated").addClass("slideInRight animated");
        $(".tray-1-1").css("width", window.tray1_1Width_tree_open);
    });
    $(".close-tray-1-1-tree").click(function () {
        $(".panel-overlay-tree-1").removeClass("fadeIn animated").addClass("fadeOut animated none");
        $(".tray-1-1-tree").removeClass("slideInRight animated").addClass("slideOutRight animated");
        $(".tray-1-1").css("width", window.tray1_1Width);
    });

    //$(".tray-1-1-tree .app-tree-body").css("height", tree_view_content_dock_hight);

    //$(".tray-1-1-tree .app-tree-body").niceScroll({ styler: "fb", cursorcolor: "#212121", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000' });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $(".panel-overlay-tree-1").removeClass("fadeIn animated").addClass("fadeOut animated none");
            $(".tray-1-1-tree").removeClass("slideInRight animated").addClass("slideOutRight animated");
            $(".tray-1-1").css("width", window.tray1_1Width);
        }
    });



    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $(".panel-overlay-tree-1").removeClass("fadeIn animated").addClass("fadeOut animated none");
            $(".tray-1-1-tree").removeClass("slideInRight animated").addClass("slideOutRight animated");
            $(".tray-1-1").css("width", window.tray1_1Width);
        }
    });

    $('#pageLoader').height(window.innerHeight);
    $('#pageLoader').width(window.innerWidth);

});


var Script = function () {

    //    sidebar dropdown menu auto scrolling

    jQuery('#sidebar .sub-menu > a').click(function () {
        var o = ($(this).offset());
        diff = 250 - o.top;
        if (diff > 0)
            $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
        else
            $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
    });

    //    sidebar toggle

    //$(function () {
    //    function responsiveView() {
    //        var wSize = $(window).width();
    //        if (wSize <= 768) {
    //            $('#container').addClass('sidebar-close');
    //             $('#sidebar > ul').hide();
    //        }

    //        if (wSize > 768) {
    //            $('#container').removeClass('sidebar-close');
    //             $('#sidebar > ul').show();
    //        }
    //    }
    //    $(window).on('load', responsiveView);
    //    $(window).on('resize', responsiveView);

    //});

    //$('.fa-bars').click(function () {
    //    if ($('#sidebar > ul').is(":visible") === true) {
    //        $('#main-content').css({
    //            'margin-left': '0px'
    //        });
    //        $('#sidebar').css({
    //            'margin-left': '-210px'
    //        });
    //        $('#sidebar > ul').hide();
    //        $("#container").addClass("sidebar-closed");
    //    } else {
    //        $('#main-content').css({
    //            'margin-left': '210px'
    //        });
    //        $('#sidebar > ul').show();
    //        $('#sidebar').css({
    //            'margin-left': '0'
    //        });
    //        $("#container").removeClass("sidebar-closed");
    //    }
    //});


    //---------------------------for new mini side bar menu---------------------

    //$(function () {
    //    function responsiveView() {
    //        var wSize = $(window).width();
    //        if ((wSize <= 768) && ($('#sidebar > #mainLeftMenu').is(":visible") === true))  {
    //            $('#container').addClass('sidebar-close');
    //            $('#main-content, .app-header-secondary').css({
    //                'margin-left': '50px'
    //            });
    //            $('#sidebar').css({
    //                'margin-left': '-160px'
    //            });
    //            $('#sidebar > #mainLeftMenu').hide();
    //            $('#sidebar > #mini-sidebar-menu').show();
    //        } else if ((wSize > 768) && ($('#sidebar >  #mini-sidebar-menu').is(":visible") === true)) {

    //            e.preventDefault()
    //        }else{
    //            $('#container').removeClass('sidebar-close');
    //            $('#main-content').css({
    //                'margin-left': '210px'
    //            });
    //            $('#sidebar > #mainLeftMenu').show();
    //            $('#sidebar > #mini-sidebar-menu').hide();

    //            $('#sidebar').css({
    //                'margin-left': '0'
    //            });
    //        }
    //    }
    //    $(window).on('load', responsiveView);
    //    $(window).on('resize', responsiveView);

    //});
    //$(function () {
    //    function responsiveView() {
    //      //  var wSize = $(window).width();
    //        if ($('#mini-sidebar-menu').is(":visible") === true) {
    //            $('#main-content').css({ 'margin-left': '50px' });
    //            $('.app-header-secondary').css({ 'margin-left': '50px' });
    //        } 
    //    }
    //    $(window).on('load', responsiveView);
    //    $(window).on('resize', responsiveView);

    //});
    $('.fa-bars').click(function () {
        if ($('#sidebar > #mainLeftMenu').is(":visible") === true) {

            $('#main-content').css({ 'margin-left': '50px' });
            $('.app-header-secondary').css({ 'padding-left': '50px' });
            $('#sidebar').css({
                'margin-left': '-160px'
            });
            $('#sidebar > #mainLeftMenu').hide();
            $('#sidebar > #mini-sidebar-menu').show();

            $("#container").addClass("sidebar-closed");
        }
            //else if (wSize <= 768) {
            //    $('#main-content').css({ 'margin-left': '50px' });
            //    //$('.app-header-secondary').css({ 'padding-left': '50px' });
            //    $('#sidebar').css({
            //        'margin-left': '-160px'
            //    });
            //    $('#sidebar > #mainLeftMenu').hide();
            //    $('#sidebar > #mini-sidebar-menu').show();

            //    $("#container").addClass("sidebar-closed");
            //}
        else {
            $('#main-content').css({ 'margin-left': '210px' });
            // $('.app-header-secondary').css({ 'padding-left': '210px' });
            $('.app-header-secondary').css({ 'padding-left': '0px' });

            $('#sidebar > #mainLeftMenu').show();
            $('#sidebar > #mini-sidebar-menu').hide();

            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

    $('#mini-sidebar-menu > li').click(function () {
        //('#main-content').css({ 'margin-left': '50px' });
        //('.app-header-secondary').css({ 'padding-left': '50px' });

    });


    // custom scrollbar

    if ($("#sidebar").length > 0) {
        if ($.fn.niceScroll) { //Check nice scroll is loaded till this is fixed
            $("#sidebar").niceScroll({ styler: "fb", cursorcolor: "#03a9f4", cursorwidth: '3', cursorborderradius: '10px', background: '#666', spacebarenabled: false, cursorborder: '', horizrailenabled: false });
            // $("html").niceScroll({ styler: "fb", cursorcolor: "#03a9f4", cursorwidth: '6', cursorborderradius: '10px', background: '#666', spacebarenabled: false, cursorborder: '', zindex: '1000', horizrailenabled: false });
        } else {
            console.error('niceScroll is not loaded');
        }
    }

    //$("html").niceScroll({ styler: "fb", cursorcolor: "#03a9f4", cursorwidth: '6', cursorborderradius: '10px', background: '#666', spacebarenabled: false, cursorborder: '', zindex: '1000' });

    // widget tools

    jQuery('.panel .tools .fa-chevron-down').click(function () {
        var el = jQuery(this).parents(".panel").children(".panel-body");
        if (jQuery(this).hasClass("fa-chevron-down")) {
            jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });

    jQuery('.panel .tools .fa-times').click(function () {
        jQuery(this).parents(".panel").parent().remove();
    });


    //    tool tips

    //$('.tooltips').tooltip();

    //    popovers

    //$('.popovers').popover();



    // custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000);
        });
    }


}();