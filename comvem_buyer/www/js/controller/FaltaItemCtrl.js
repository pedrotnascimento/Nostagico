(function () {
    angular.module('convem.entrega')

    .controller('FaltaItemCtrl', function ($scope, $state, $http, $ionicPopup, $timeout, entregaFactory, sessionFactory, utilSrvc) {
            /* Gambiarra
            */
            $scope.flagGambiarra = false;
            // End Gambiarra
        var getInx = utilSrvc.getInx;

        $scope.vendedores = sessionFactory.getEntrega();
      //  alert(JSON.stringify($scope.vendedores));
        
        $scope.goAvaliacao = function () {
            

            if ($scope.qtMissTot()) {
                $scope.warnPopup();
                return;
            }

            $state.go("app.avaliaVendedor");
        };
        
        $scope.warnPopup = function () {

            var warnPopup = $ionicPopup.show({
                title: 'Toque no item que faltou',
                scope: $scope
            });

            $timeout(function () {
                warnPopup.close();
            }, 1000);
        };

        /////////////////////POP UP 
        $scope.faltaProdutoPopUp = function (vendedor, index) {

            var indexVendedor =getInx($scope.vendedores, vendedor.id);

            var oldQtMiss = vendedor.products[index].qtMiss;
            //var oldpreco = prod.preco;
            //$scope.data = prod;
           
            var templateTemp = 'Faltou <input type="number" style="display: inline !important "  class= "inline" size="3" col="4" ng-model="vendedores[' + indexVendedor + '].products[' + index + '].qtMiss" placeholder="Digita quanto faltou"> de ' + vendedor.products[index].qt + ' itens<br> ';

            // An elaborate, custom popup
            var faltaProdPopup = $ionicPopup.show({
                template: templateTemp,
                title: 'Quantas(os) ' + vendedor.products[index].nome + ' do ' + vendedor.nome + ' não vieram',
                /*subTitle: 'here is a subtitle',*/
                scope: $scope,
                buttons: [
                    {
                        //text: 'Cancelar',
                        type: 'ion-android-cancel button-large',
                        onTap: function () { vendedor.products[index].qtMiss = oldQtMiss; },
                        template: '<style> . button { font-size: 40px;} </style>'
                        //font-size: 20px
                    },
                  {
                      //text: '<b>Salvar</b>',
                      type: 'button-positive ion-ios-checkmark button-large',
                      onTap: function (e) {
                          if ($scope.vendedores[indexVendedor].products[index].qtMiss<0 ||
                              $scope.vendedores[indexVendedor].products[index].qtMiss > $scope.vendedores[indexVendedor].products[index].qt
                              ) {
                              //don't allow the user to close unless he enters the price
                              e.preventDefault();
                          } else {
                              $scope.isMiss(vendedor.products[index]);
                               /* Gambiarra
                              */
                              $scope.flagGambiarra = true;
                              // End Gambiarra
             
                          }
                      }
                  },
                  {
                      text: 'TODOS',
                      type: 'font-small',
                      onTap: function (e) { //AQUI ENVIAREI UM SINAL PARA O SERVIDOR APAGAR O PRODUTO

                          /* Gambiarra
                          */
                          $scope.flagGambiarra = true;
                          // End Gambiarra
                          vendedor.products[index].qtMiss = vendedor.products[index].qt;
                          $scope.isMiss(vendedor.products[index]);


                      }
                  }
                ]
            });
        };  //////////////fim pop up


        $scope.isMiss = function (product) {
           
            if (product.qtMiss*1 > 0)
                product.isMiss= true;
            else
                product.isMiss = false;
        }

        $scope.qtMissVend = function (vendedor) {
            var i = 0 ;
            var sum = 0;

            for (i = 0; i < vendedor.products.length; i++) {
            sum +=    vendedor.products[i].qtMiss*1;
            }

            vendedor.qtMiss = sum;

            return sum;

            
        };

        $scope.qtMissTot = function () {
            var i = 0;
            var sum = 0;
            /*
            for (i = 0; i < $scope.vendedores.length; i++) {
                sum += $scope.vendedores[i].qtMiss * 1;
            }

            return sum;
            */
            return ($scope.flagGambiarra? true:false);

            
        };

        

    })
    .service('utilSrvc', utilSrvc);


    function utilSrvc() {
        this.getInx = function (arrayX, id) {
            for (inx = 0 ; inx < arrayX.length; inx++) {
                if (arrayX[inx].id === id) {
                    return inx;
                }
            }
            return -1;
        }
    }

    ;//fim controllers
})();