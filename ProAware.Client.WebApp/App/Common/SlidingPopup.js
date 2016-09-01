define(["jquery"], function ($) {
    var pop = {};
    pop.showSlidingPopup = function (panelId, formId) {
        $(panelId).removeClass("none fadeOut animated").addClass("fadeIn animated");
        $(formId).removeClass("none slideOutRight animated").addClass("slideInRight animated");

        $(window).resize(function () {
            var doc_height = $(window).height();
            var drawer_content = doc_height - 200;
            $(".drawer-content").css("height", drawer_content);
            $(".drawer-tab-content").css("height", drawer_content - 50);
            $("#processSearchContent").css("height", drawer_content - 70);
            $("#templateSearchContent").css("height", drawer_content - 70);
            $("#departmentSearchContent").css("height", drawer_content - 70);

            var gridElement = $(".k-grid ");
            gridElement.children(".app-grid-admin-a .k-grid-content").height(doc_height - 220);

            gridElement.children(".app-grid-admin-b .k-grid-content").height(drawer_content - 160);


        });

        var doc_height = $(window).height();
        var drawer_content = doc_height - 200;
        $(".drawer-content").css("height", drawer_content);
        $(".drawer-tab-content").css("height", drawer_content - 50);
        $("#processSearchContent").css("height", drawer_content-70);
        $("#templateSearchContent").css("height",drawer_content-70);
        $("#departmentSearchContent").css("height", drawer_content - 70);
        // custom scroller (niceScroller) for all drawers
        $(".drawer-main .drawer-content").niceScroll({ styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });
        $(".drawer-sub .drawer-content").niceScroll({ styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });
        $(".drawer-special .drawer-content").niceScroll({ styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });
        $(".drawer-notification .drawer-content").niceScroll({ styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });
        $(".drawer-main .drawer-tab-content").niceScroll({ styler: "fb", cursorcolor: "#424242", cursorwidth: '10', cursorborderradius: '10px', background: '#e1e1e1', spacebarenabled: false, cursorborder: '', zindex: '1000', autohidemode: false, touchbehavior: false, horizrailenabled: false, cursoropacitymin: '1' });

    };
    pop.hideSlidingPopup = function (panelId, formId) {
        $(panelId).removeClass("fadeIn animated").addClass("fadeOut animated none");
        $(formId).removeClass("slideInRight animated").addClass("slideOutRight animated");
    };

    return pop;
});