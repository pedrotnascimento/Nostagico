(function(){
    angular.module('convem.history').
    controller('HistoryCtrl', function ($scope, historyFactory) {
        //$scope.deliveried = myDeliveryFactory.load();

        initHistory = function () {
            historyFactory.init().then(function (data) {
                if (data.status == 0) {
                    $scope.deliveries = data.data.deliveries;
                }
                else {
                    alert.error("Erro no histórico de entrega(" + data.status + ")");
                }
            }, function (err) {
                alert.error("Histórico de entrega falhou(" + err.status + ")");
            });
        }
        initHistory();

        $scope.toggleShowGroup = function (group) {
            if ($scope.isShownGroup(group)) {
                $scope.currentShown = null;
            }
            else {
                $scope.currentShown = group;
            }
        };

        $scope.getTotal = function (products, field) {
            var sum = 0 ;
            for (var i in products)
                sum += products[i][field];
            return sum;
        }

        
        $scope.isShownGroup = function (group) {
            return $scope.currentShown === group;
        };

    });
})();