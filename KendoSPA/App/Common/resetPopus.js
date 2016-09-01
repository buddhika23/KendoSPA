define([], function () {
    var sp = {};
    sp.reset = function () {

        //----------------- card view scroll
        var docHeight = $(window).height();

        var cardViewContent = docHeight - 100;
        $(".app-user-cards").css("height", cardViewContent);


        var drawerContent = docHeight - 200;
        $(".drawer-content").css("height", drawerContent);

        var gridElement = $(".k-grid ");
        gridElement.children(".app-grid-admin-a .k-grid-content").height(docHeight - 220);

        gridElement.children(".app-grid-admin-b .k-grid-content").height(drawerContent - 160);

        //$(function () {
        //    $('[data-toggle="tooltip"]').tooltip();
        //});

        //Hasika
        $(".tray-1-1").css("width", window.tray1_1Width);
        $(".tray-1-2").css("width", window.tray1_2Width);
        $(".tray-1-1-alert").css("width", window.tray1_1Width);

        $(".tray-1-1-tree").css("width", window.tray1_1Width);

        $(".tray-content").css("height", window.right_panel_height);
        $(".tray-1-1-tree .app-tree-body").css("height", window.tree_view_content_dock_hight);

        $(".tray-1-1-tree .app-tree-body").niceScroll(
            {
                styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1',
                spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false
            });

    };

    return sp;
});