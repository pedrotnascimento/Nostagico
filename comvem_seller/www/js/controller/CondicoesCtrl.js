(function () {
    angular.module('convem.condicoes')

    .controller('CondicoesCtrl', function ($scope, historyFactory) {
        //$scope.deliveried = myDeliveryFactory.load();
        initHistory = function () {
            historyFactory.init().then(function (data) {
                console.log(JSON.stringify(data));
            });
        };
        initHistory();

        $scope.toggleShowGroup = function (group) {
            if ($scope.isShownGroup(group)) {
                $scope.currentShown = null;
            }
            else {
                $scope.currentShown = group;
            }
        };

        $scope.isShownGroup = function (group) {
            return $scope.currentShown === group;
        };
    });
})();