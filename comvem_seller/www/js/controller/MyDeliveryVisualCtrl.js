(function () {
    angular.module('convem.myDelivery')

    .controller('MyDeliveryVisualCtrl', function ($scope, $stateParams, myDeliveryFactory,
                                                    utilFactory) {
        $scope.delivery = JSON.parse($stateParams.index);

        $scope.parseInt_ng = function (elem) {
            return parseInt(elem);
        }

        $scope.getPrice = function (products) {
            var sum = 0;
            for (var i in products) {
                if (products[i].price) {
                    sum += (parseFloat(products[i].price)*parseInt(products[i].qty));
                }
            }
            return sum;
        }

        $scope.getQty = function (products) {
            sum = 0;
            for (i in products) {
                sum += parseFloat(products[i].qty);
            }
            if (sum == 1)
                sum = sum + " item";
            else if (sum > 1)
                sum = sum + " itens";
            return sum;
        }

        $scope.finishDelivery = function (deliveryId, customerId) {
            myDeliveryFactory.finish(deliveryId, customerId);
        }
        

    });
})();