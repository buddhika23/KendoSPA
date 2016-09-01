define(
    [
        'jquery',
        'kendo',
        'i18n!translate/nls/sideMenu'],
    function ($, kendo, lan ) {


        var userMenuDatasource = [

            {
                text: '<span class="icon icon-pro-aware_pro-aware-home"></span>'  + lan.User_Landing,
                encoded: false,
                url: "#"

            },
            {
                text: '<span class="icon icon-pro-aware_pro-aware-checkpoints"></span>' + ' <span id="cpi-count"> </span> ' + lan.User_Link1,
                encoded: false,
                url: "#"

            },
            {
                text: '<span class="icon icon-pro-aware_pro-aware-events"></span> ' + ' <span id="incident-count"> </span>' + lan.User_Link2,
                encoded: false,
                url: "#"

            },
            {
                text: '<span class="icon icon-pro-aware_pro-aware-projects"></span> ' + ' <span id="project-count"> </span>' + lan.User_Link3,
                encoded: false,
                url: "#"

            },
            {
                text: '<span class="icon icon-pro-aware_pro-aware-measures"></span>' + '<span id="tasks-count"> </span>' + lan.User_Link4,
                encoded: false,
                url: "#"
            }
            //{
            //    text: '<span class="fa fa-file-text-o main-sidebar-icon"></span>' + '<span id="survey-count"> </span>' + lan.User_Survey_Menu,
            //    encoded: false,
            //    url: "#/user/surveyUserView"
            //}
        ];

        var viewModel = kendo.observable({
            title: 'Side Menu',
            mode: '',
            isAdmin: -1,
            setModeAndIsAdmin: setModeAndIsAdmin,
            reload: reload,

            onViewShow: onViewShow,
            onViewInit: onViewInit
        });
        return viewModel;

        function onViewInit() {
        }

        function onViewShow() {

        }

        function selectMenu(route) {
            var panelBar = $("#mainLeftMenu").data("kendoPanelBar");
            var menuItem = $('#mainLeftMenu a[href$="' + route + '"]').parent();

            panelBar.expand(menuItem.parent().parent());
            panelBar.select(menuItem);
        }

        function setModeAndIsAdmin(mode) {

            viewModel.mode = mode;

            if (mode.toUpperCase() === "ADMIN") {
                viewModel.isAdmin = true;
            } else if (mode.toUpperCase() === "USER") {
                viewModel.isAdmin = false;
            } else {
                viewModel.isAdmin = -1;
            }
        }

        function reload(route) {

            showBindedMenu();

            $('#sidebar').show();
            $('#mainLeftMenu').show();
            selectMenu(route);

            if (viewModel.mode.toUpperCase() === 'ADMIN') {
                $(".app-user-cards").getNiceScroll().hide();

            } else if (viewModel.mode.toUpperCase() === 'USER') {
                $(".app-user-cards").getNiceScroll().show();
            }
        }

        function showBindedMenu() {

            $("#mainLeftMenu").kendoPanelBar({
                expandMode: "single",
                // TODO :: 
                dataSource: userMenuDatasource,
                select: onMenuSelect
            });

            $.unsubscribe('cardsGetRefresh');
            $.subscribe('cardsGetRefresh', function () {
                showBindedMenu();
            });

        }

        function onMenuSelect(e) {
            console.log(e);
        }

    });