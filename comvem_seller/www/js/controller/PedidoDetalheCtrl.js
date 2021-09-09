(function () {
    angular.module('convem.pedidos')

    .controller('PedidoDetalheCtrl', function ($scope, $stateParams, $state, pedidosFactory,
                                                $ionicPopup, utilFactory, $interval, $rootScope) {
        $scope.parseInt_ng = utilFactory.parseInt_ng;
        $scope.parseFloat_ng = utilFactory.parseFloat_ng;
        var i = 0;

        $scope.orders = pedidosFactory.load();

        $scope.order = JSON.parse($stateParams.index); //recupera o JSON passado em myDeliveries

        for (i in $scope.order.products) {
            $scope.order.products[i].checked = true;
        }

        $scope.cancel = function () {
            $state.go("app.myDelivery");
        }

        $scope.accept = function () {
            for (var i in $scope.order.products) {
                if ($scope.order.products[i].checked) {
                    pedidosFactory.stageItem($scope.order.customerid, $scope.order.products[i]);
                }
            }
            pedidosFactory.accept($scope.order.id);
            pedidosFactory.remove($stateParams.index);
            delete $scope.orders[$stateParams.index];
            $scope.acceptPopup();
            $state.go("app.myDelivery");
            };

        $scope.acceptPopup = utilFactory.Popup("Cotação enviada, aguarde resultado!");

        $scope.showCount = function (time) {
            if (time <= 0)
                return "Tempo esgotado: Aceite o pedido ou retorne";
            var minutes = parseInt(time / 60);
            var seconds = time - minutes * 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            var ret = minutes + ":" + seconds;
            return ret;
        }

        $scope.updatePrice = function () {
            $scope.payingPrice = 0;
            var countOrder= 0;
            var i;
            for (i in $scope.order.products) {
                if ($scope.order.products[i].checked && $scope.order.products[i].price) {
                    $scope.payingPrice += parseFloat($scope.order.products[i].price.replace(",", ".")) * parseFloat($scope.order.products[i].qty);
                    countOrder++;
                }
            }
        };
        $scope.updatePrice();

        $scope.countDown = function () {
                $scope.order.time = $scope.order.time <= 1 ? $state.go("app.myDelivery") : $scope.order.time - 1;
        }

        //$scope.removeOrder = function (order) {
        //    if (!order.visit)
        //        $rootScope.ordersNotVisited-= 1;
        //    pedidosFactory.remove(order);
        //    delete $scope.orders[order];
        //}

        $interval(function () {
                $scope.countDown();
        }, 1000);
    });

})();
