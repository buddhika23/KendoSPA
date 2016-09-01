/// <reference path="../../../Scripts/require.js" />



// load the entire module/library and pass to the test
define(['/App/Common/views.js'], function (views) {
    
    // use jasmine to run tests against the required code
    describe('View Factory', function () {
        
        it('Should able to load View with ViewModel', function (done) {
           views.loadView('moduleTestPage', function (kendoView) {
                expect(kendoView).not.toBeNull();
                expect(kendoView.model).not.toBeNull();
                done();
            });
            
            
        });

        describe('When view is SideMenu ', function() {
            it('It should have corrent title', function(done) {
                views.loadView('sideMenu', function(kendoView) {
                    expect(kendoView).not.toBeNull();
                    expect(kendoView.model.title).toBe('Side Menu');
                    done();
                });

            });
        });

    });

});
