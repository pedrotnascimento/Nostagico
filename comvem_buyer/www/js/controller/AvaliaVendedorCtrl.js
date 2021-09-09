(function () {
    angular.module('convem.avaliacao')
    .controller('AvaliaVendedorCtrl', function ($scope, $state, $ionicPopup, $timeout, avaliacaoFactory, sessionFactory, pedidosFactory, cardapioFactory) {
        $scope.vendedor = {};
        $scope.radioClassSim = "button-outline";
        $scope.radioClassNao = "button-outline";
        $scope.avaliacao = [];
        $scope.avaliacao.rating = 5;

        /*
        var avaliacao = avaliacaoFactory.init();
        avaliacao.then(function success(data) {
            avaliacaoFactory.saveEntrega(data);
            $scope.vendedor = avaliacaoFactory.getVendedor();
            // $scope.vendedor = avaliacaoFactory.getNextVendedor();
        }, function error(data) {
            alert("Falha na comunicação com o servidor");
        });
        */
        avaliacaoFactory.saveEntrega(sessionFactory.getEntrega());
        var xxx = avaliacaoFactory.loadEntrega();
        $scope.vendedor = xxx.vendedor;
       // alert(avaliacaoFactory.getVendedor());
        //$scope.vendedor = avaliacaoFactory.getVendedor();

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(0, 0, 0)',
            rating: 5,
            minRating: 1,
            readOnly: false,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };

        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
            $scope.avaliacao.rating = rating;
        };

        $scope.enviar = function () {
            if ($scope.avaliacao.rating && $scope.avaliacao.prazo) {
                finalizar();
        //        $scope.vendedor = avaliacaoFactory.getNextVendedor();
        /*        if ($scope.vendedor) {
                    // Envia a avaliação e acabou
                    $scope.radioClassSim = "button-outline";
                    $scope.radioClassNao = "button-outline";
                    $scope.avaliacao.prazo = null;
                    $scope.ratingsObject.rating = "5";
                }
                else {
                    finalizar();
                }
        */
            }
            else {
                $scope.showPopup2 = function () {

                    var alertPopup = $ionicPopup.show({
                        title: 'Preencha os campos',
                        scope: $scope
                    });

                    $timeout(function () {
                        alertPopup.close();
                    }, 1500);

                    return;
                }

                $scope.showPopup2();
            }

        }

        //Funções do Radio Button
        $scope.sim = function () {
            $scope.radioClassSim = "";
            $scope.radioClassNao = "button-outline";
            $scope.avaliacao.prazo = "sim";
        }

        $scope.nao = function () {
            $scope.radioClassNao = "";
            $scope.radioClassSim = "button-outline";
            $scope.avaliacao.prazo = "nao";
        }

        function finalizar() {
            $scope.showPopup = function () {

                var obrigadoPopup = $ionicPopup.show({
                    title: 'Obrigado por sua avaliação!',//ou obrigado por nos ajudar
                    scope: $scope
                });

                $timeout(function () {
                    obrigadoPopup.close();
                    $state.go("app.confirmaLocal");
                }, 1000);

                return;
            }
            
            pedidosFactory.clear();
            cardapioFactory.clear();
            $scope.showPopup();
        }

        $scope.printJson = function () {
            alert(JSON.stringify($scope.vendedor));
        }

    });
})();