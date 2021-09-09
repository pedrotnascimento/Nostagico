(function () {
    angular.module('convem.myDelivery')

    .controller('MyDeliveryCtrl', function ($scope, $http, $interval, $state, $rootScope, $stateParams, $timeout,
                                            $ionicPopup, myDeliveryFactory, pedidosFactory, utilFactory,
                                            $ionicPlatform, $cordovaNativeAudio, $cordovaVibration, localStorageService) {
        $scope.showDeliveryTab = true;
        $rootScope.deliveriesNotVisited = 0;
        $rootScope.ordersNotVisited = 0;

        //trata a promise

        //DECLARING STARTING FUNCTIONS
        $scope.appActive = false;
        var onDeviceReady = function () {
            $scope.appActive = true;
        }
        document.addEventListener("deviceready", onDeviceReady, false);

        var onPause = function () {
            $scope.appActive = false;
        }
        document.addEventListener("pause", onPause, false);
        
        var promisseOrderSound;
        var promisseDeliverySound;
        var onResume = function () {
            $scope.appActive = true;
            if (angular.isDefined(promisseOrderSound)) {
                $interval.cancel(promisseOrderSound);
                promisseOrderSound = undefined;
                var popUpNew = utilFactory.Popup("Um novo pedido chegou!");
                popUpNew();
                $scope.showDeliveryTab = false;
            }
            else if (angular.isDefined(promisseDeliverySound)) {
                $interval.cancel(promisseDeliverySound);
                promisseDeliverySound = undefined;
                var popUpNew = utilFactory.Popup("Você tem uma nova entrega!");
                popUpNew();
                $scope.showDeliveryTab = true;
            }
        }
        document.addEventListener("resume", onResume, false);

        var countNotVisitedDelivery = function () {
            var count = 0;
            for (var i in $scope.myDeliveries) {
                if ($scope.myDeliveries[i].visited == false)
                    count+= 1;
            }
            $rootScope.deliveriesNotVisited = count;

        }
        
        var calcTimes = function (deliveries) {
            for (var i in deliveries) {
                myDeliveryFactory.calcTime(deliveries[i]);
            }
        }

        var initDelivery = function () {
            myDeliveryFactory.init().then(function success(data) {
                $scope.myDeliveries = data.data.deliveries;
                $scope.newDelivery();
                countNotVisitedDelivery();
                myDeliveryFactory.save($scope.myDeliveries);
            }
              , function error(data) {
                  //TODO: mudar para um PopUp mais apresentável
                  alert("Falha ao carregar as entregas, verifique se você está conectado!");
              });
        }


        var autoUpdateDeliveries = function () {
            $interval(function () {
                if ($rootScope.logged) {
                    myDeliveryFactory.save($scope.myDeliveries);
                    initDelivery();
                }
            }, 10000);
        }



        var countDownDeliveryTime = function () {
            $interval(function () {
                var i = 0;
                for (i in $scope.myDeliveries) {
                    $scope.myDeliveries[i].time = $scope.myDeliveries[i].time - 1;
                    $scope.trocaCorTemp(i);
                    i++;
                }
            }, 1000);
        }

        //END DECLARING STARTING FUNCTIONS

        //INIT SCRIPT
        $scope.myDeliveries = myDeliveryFactory.load();
        countNotVisitedDelivery();
        calcTimes($scope.myDeliveries);
        initDelivery();
        autoUpdateDeliveries();
        countDownDeliveryTime();
        //END INIT SCRIPT



        $scope.goOrder = function () {
            $scope.showDeliveryTab = false;
        }

        $scope.goDelivery = function () {
            $scope.showDeliveryTab = true;
        }

        $scope.trocaCorTemp = function (delivery) {
            var oldColor = $scope.myDeliveries[delivery].BadgeColor;
            if ($scope.myDeliveries[delivery].time / 60 < 10) {
                $scope.myDeliveries[delivery].BadgeColor = 'BADGE_VERMELHO';

            }
            else if ($scope.myDeliveries[delivery].time / 60 <= 15) {
                $scope.myDeliveries[delivery].BadgeColor = 'BADGE_AMARELO';

            }
            if (oldColor != $scope.myDeliveries[delivery].BadgeColor) {//só salva se mudou
                myDeliveryFactory.save($scope.myDeliveries);
            }

        }

        $scope.parseInt_ng = function (elem) {
            return parseInt(elem);
        }

        $scope.updateBadgeColor = function (delivery) {
            return delivery.BadgeColor;
        };

        $scope.markVisitedDelivery = function (delivery) {
            if (!delivery.visited) {
                delivery.visited = true;
                $rootScope.deliveriesNotVisited -= 1;
                myDeliveryFactory.save($scope.myDeliveries);
            }
            
            $state.go("app.myDeliveryVisual", { index: JSON.stringify(delivery) });
        }

        
        $scope.newDelivery = function () {
            hasNew = false;
            for (var i in $scope.myDeliveries) {
                if ($scope.myDeliveries[i].visited === false &&
                    $scope.myDeliveries[i].new) {

                    hasNew = $scope.myDeliveries[i].new ? true : hasNew;
                    $scope.myDeliveries[i].new = false;
                }
            }
            if (hasNew) {
                try {
                    promisseDeliverySound = $scope.sound('delivery');
                    $cordovaVibration.vibrate(100);
                }
                catch (e) {
                    console.log("NEW DELIVERY");
                }

            }
        }

        $scope.getTotalPrice = function (products) {
            var sum = 0;
            for (var i in products) {
                if (products[i].price) {
                    sum += (parseFloat(products[i].price) * parseInt(products[i].qty));
                }
            }
            return sum;
        }

        $scope.getTotalQty = function (products) {
            var sum = 0;
            for (var i in products) {
                sum += parseFloat(products[i].qty);
            }
            if (sum == 1)
                sum = sum + " item";
            else if (sum > 1)
                sum = sum + " itens";
            return sum;
        }
        /*******FIM TAB DELIVERY***************/
        /*
         *
         */
        /*******COMEÇO TAB ORDER*/

        //DECLARATION OF STARTING FUNCTIONS

        var calcTimesOrders = function (orders) {
            for (var i in orders) {
                pedidosFactory.calcTime(orders[i]);
            }
        }

        var countNotVisitedOrders = function () {
            for (var i in $scope.orders) {
                if ($scope.orders[i].visited == false)
                    $rootScope.ordersNotVisited += 1;
            }
        }

        function getPedidos() {
            pedidosFactory.init().then(function sucess(data) {
                if (data.status == 0) {
                    activCountDown = true;
                    $scope.orders = data.data.orders;
                    $scope.newOrders();
                    pedidosFactory.save($scope.orders);
                }
            }, function error(data) {
                console.log(JSON.stringify(data.message));
            });
        }//fim func getPedidos

        var autoUpdateOrders = function () {
            $interval(function () {
                if ($rootScope.logged) {
                    pedidosFactory.save($scope.orders);
                    getPedidos();
                }
            }, 10000);
        }
        //END OF DECLARING STARTING FUNCTION

        //INIT SCRIPT
        $scope.orders = pedidosFactory.load();
        calcTimesOrders($scope.orders);
        countNotVisitedOrders();
        getPedidos();
        autoUpdateOrders();
        //END INIT SCRIPT

        
        $scope.newOrders = function () {
            hasNew = false;
            for (var i in $scope.orders) {
                if ($scope.orders[i].visited === false &&
                    $scope.orders[i].new) {
                    $rootScope.ordersNotVisited += 1;
                    hasNew = $scope.orders[i].new ? true : hasNew;
                    $scope.orders[i].new = false;
                }
            }
            if (hasNew) {
                try {
                    promisseOrderSound = $scope.sound('order');
                    $cordovaVibration.vibrate(100);
                }
                catch (e) {
                    console.log("NEW ORDER");
                }

            }
        }

        $scope.updateOrders = function () {
            getPedidos();
        }

        
        $scope.showCount = function (time) {
            if (time % 2 && time <= 30) {
                $scope.hideCount = true;
                return;
            }
            var minutes = parseInt(time / 60);
            var seconds = time - minutes * 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            var ret = minutes + ":" + seconds;
            return ret;
        }

        $interval(function () {
            $scope.countDown();
        }, 1000);


        $scope.countDown = function () {
            for (var i in $scope.orders) {
                if ($scope.orders[i].time >= 0) {
                    $scope.orders[i].time -= 1;
                }
                else if ($scope.orders[i].time == -1) {
                    $scope.removeOrder(i);
                }
            }
        }

        $scope.removeOrder = function (order) {
            if (!$scope.orders[order].visited) {
                $rootScope.ordersNotVisited -= 1;
                $scope.orders[order].visited = true;
            }
            $scope.orders[order].time = -777; ////estado impossível, i.e, oculto no front-edn

            //delete $scope.orders[order];// LINHA FUTURA PARA QUANDO O BACK END DELETAR PEDIDO QUE ACABOU O TEMPO
            pedidosFactory.save($scope.orders);
        }

        $scope.markVisitedOrder = function (order) {
            if (!order.visited) {
                order.visited = true;
                $rootScope.ordersNotVisited -= 1;
                pedidosFactory.save($scope.orders);
            }
            $state.go("app.pedidoDetalhe", { index: JSON.stringify(order) });
        }

        $scope.hasPrice = function (preco) {
            return !(parseFloat(preco) && true);
        }

        $scope.sound = function (sample) {
            // retorna promisse para poder ser cancelado
            var ticks = $scope.appActive ? 1 : 6;//1 para quando celular está ativo, 6 para se estiver em background
             return $interval(function () {
                $cordovaNativeAudio.play(sample)
                .then(function (msg) { console.log(msg); })
                          .catch(function (error) { console.log(error) });
            }, 5000, ticks);

        };

        
       
        //var onBackPause = function () {
        //    if ($state.current.name == "app.myDelivery")
        //        navigator.app.exitApp();
        //}
        //document.addEventListener("backbutton", onBackQuit, false);

    });
})();
