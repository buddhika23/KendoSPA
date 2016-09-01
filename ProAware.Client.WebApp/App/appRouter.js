define(
    [
        'jquery',
        'kendo',
        'toastr',
        'bootstrap',
        'Common/layout',
        'Common/Views',
        'Common/popupManager'
    ],
    function ($, kendo, toastr, bootstrap, layout, viewsFactory, popupManager) {

        var sideMenuView;
        var contentView;
        var userMode;
        var currentRouteUrl;

        var router = new kendo.Router({
            init: initRouter,
            routeMissing: routeMissing,
            change: function (currentRoute) {
                currentRouteUrl = currentRoute.url;
                console.log('Current route', currentRoute.url);
            },
            back: function (e) {
            }
        });

        router.route('(/:mode/:page)', routeToPage);

        router.route('/', function () {
            router.navigate("/user/home");
        });

        popupManager.init();


        function routeToPage(mode, page) {
                switchUserProfile(mode);
                userMode = mode;
                viewsFactory.loadView(page, onViewLoaded);
        }

        function onViewLoaded(content) {

            if (contentView && typeof contentView.destroy == 'function') {
                if (contentView.model && typeof contentView.model.destroy === "function") {
                    contentView.model.destroy();
                }
                contentView.destroy();
            }
            contentView = content;
            layout.showIn('#content', contentView);
            refreshMenuIfModeChanged();
            $('#pageLoader').remove();
        }

        function routeMissing(e) {
            e.preventDefault();
            log("Router missing: ");
            log(e);
            toastr.options.positionClass = 'toast-bottom-left';
            toastr.error("Route not found!!");

        }

        function initRouter() {
            layout.render('#applicationContainer');
            viewsFactory.loadView('sideMenu', onSideMenuViewLoaded);
            $.subscribe('cardClicked', function (s, e) {
                console.log(s + e);
                if (e.Module === 'incident') {
                    router.navigate('/user/incidentUserView');
                    $.publish('openPopup', {
                        name: 'incidentUserViewSign',
                        returnCommand: 'onIncidentSignPanelClosed',
                        args: {
                            'incident': e
                        }
                    });
                }
                else if (e.Module === 'controlpoint') {
                    router.navigate('/user/controlPointViewUser');
                    $.publish('openPopup', {
                        name: 'controlPointUserEdit',
                        returnCommand: 'oncontrolPointUserEditClosed',
                        args: {
                            'selectedInstance': e
                        }
                    });
                }

            });

        }

        function onSideMenuViewLoaded(sideMenuContent) {
            sideMenuView = sideMenuContent;
            layout.showIn('#sideMenuContrainer', sideMenuView);
            refreshMenuIfModeChanged();
        }

        function log(message) {
            console.log('Debug >>', message);
        }

        function refreshMenuIfModeChanged() {

            if (sideMenuView && (sideMenuView.model.mode !== userMode)) {
                sideMenuView.model.setModeAndIsAdmin(userMode);
                sideMenuView.model.reload(currentRouteUrl);
            }
        }

        function switchUserProfile(mode) {
            if (mode.toUpperCase() === 'ADMIN') {
                localStorage.setItem('CurrentView', 'Admin');
                $('.adminonly').show();
                $('.useronly').hide();
                handleNiceScrollSwitch();
            } else {
                localStorage.setItem('CurrentView', 'User');
                $('.useronly').show();
                $('.adminonly').hide();
            }
        }

        function handleNiceScrollSwitch() {
            $("#card-list-view-assigned").getNiceScroll().hide();
            $("#card-list-view-department").getNiceScroll().hide();
        }

        return router;


    });