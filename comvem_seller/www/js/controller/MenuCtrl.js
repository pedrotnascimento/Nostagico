(function () {
    angular.module('convem')
        .controller('MenuCtrl', function ($scope, $state, $cordovaSocialSharing, $rootScope) {
            $scope.goHistoryDelivery = function () {
                $state.go("app.history");
            }
            $rootScope.logOut = function () {
                $rootScope.logged = false;
                localStorage.clear();
                $state.go("app.login");
            }

            $scope.shareWhatsapp = function (message, img, site) {
                window.plugins.socialsharing.shareViaWhatsApp(message, img, site,
                                                            function () { console.log('share ok') },
                                                            function (errormsg) { alert(errormsg) });
            }

            $scope.shareFacebook = function (message, img, site) {
                window.plugins.socialsharing.shareViaFacebook(message,img,site,
                                                            function () { console.log('share ok') },
                                                            function (errormsg) { alert(errormsg) });
            }

            $scope.shareTwitter = function (message, img) {
                window.plugins.socialsharing.shareViaTwitter(message,
                                                            img,
                                                            'http://www.x-services.nl');
            }

        });

})();