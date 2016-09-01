define(['i18n!translate/nls/layout'], function (lan) {

    var viewModel = kendo.observable({
        languageList: [{ id: 'nb-NO', name: lan.Norwegian }, { id: 'en-US', name: lan.English }],
        selectedLanguage: localStorage.getItem('locale') === "" || localStorage.getItem('locale') === null ? "nb-NO" : localStorage.getItem('locale'),
        initialModule: 'ControlPoint',
        isAdmin: localStorage.getItem('isAdmin') === 'True',
        fullName: '',
        email: '',
        portalUrl: '',
        onLanguageChanged: function () {
            localStorage.setItem('locale', this.selectedLanguage);
            localStorage.setItem('languageInitialized', true);
            require.config({
                config: {
                    locale: this.selectedLanguage
                }
            });

            require(['app']);
            location.reload();

        },
        hasAdminPermissions: false,

        onHelpdesk: function () {
            $.publish('openPopup', {
                name: 'helpdeskAddEdit',
                returnCommand: 'IncidentHelpDeskAddEditCompleted',
                args: {
                    isInReadOnlyMode: false,
                    mode: "Add",
                    incident: {}
                }
            });
        },
        onAdminClick: function () {
        },
        onUserClick: function () {
            localStorage.setItem('CurrentView', 'User');
        },
        onViewShow: function () {
        },
        onViewInit: function () {
            viewModel.set('fullName', 'Sample User');
            viewModel.set('email', 'sample@email.com');
        },

        logoutUrl: "logout",
    });

    //viewModel.set('hasAdminPermissions', localStorage.getItem('isAdmin') === 'true');
    if (localStorage.getItem('languageInitialized') !== 'true') {
        viewModel.onLanguageChanged();
    }

    return viewModel;
});