(function () {
    angular.module('convem.pedidos')
    .controller('PedidosCtrl', function ($scope, $state, $ionicPopup, $timeout, $ionicLoading,
                                        pedidosFactory, cardapioFactory, sessionFactory) {

        $scope.pedido = pedidosFactory.load(); //Inicia vazio
        
        $scope.upQt = function (produto) {
            if(produto.qty == undefined){
                produto.qty = 0;
            }
            produto.qty = parseFloat(produto.qty) + 1;
            pedidosFactory.increaseProductQt(produto);
        }

        $scope.downQt = function (produto) {
            if(produto.qty == undefined){
                produto.qty = 0;
            }
            if (produto.qty > 0) {
                produto.qty = parseFloat(produto.qty) - 1;
                pedidosFactory.decreaseProductQt(produto);
            }
        }

        $scope.deleteProduct = function (product) {
            pedidosFactory.removeProduct(product);
        }

        $scope.concluirCompra = function () {

            $scope.pedido = pedidosFactory.load();
            if (pedidosFactory.getPedidoSize() == 0) {
                showAlertPopUp('Sua Lista está vazia <i class="ion-sad-outline"></i><br/>Clique em <i class="ion-bag"></i> para acessar nossos produtos!');
            }
            else if (pedidosFactory.pedidoHasEmptyProduct()) {
                $scope.showPopup = function () {
                    $scope.data = {};

                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        template: 'Verificamos que você tem produto(s) com quantidade 0, deseja continuar mesmo assim?',
                        title: 'Produto com quantidade 0',
                        scope: $scope,
                        buttons: [
                          {
                              text: 'Voltar',
                              onTap: function (e) {
                                  return 0;
                              }
                          },
                          {
                              text: '<b>Continuar</b>',
                              type: 'button-positive',
                              onTap: function (e) {
                                  return 1;
                              }
                          }
                        ]
                    });

                    myPopup.then(function (res) {
                        if (res == 1) {
                            //Continuar
                            pedidosFactory.selectProducts();
                            sendOrderToServer();
                        }
                        else if (res == 0) {
                            return;
                        }
                        else {
                            console.error("ERROR");
                        }
                    });
                }
                $scope.showPopup();
            }
            else {
                //AQUI EU VOU ENVIAR O PEDIDO PARA O SERVIDOR
                sendOrderToServer();
            }
        }
        
        function sendOrderToServer () {
            showCustomLoading('<div class="row"><ion-spinner icon="android"></ion-spinner><strong class="col-center">Enviando Pedido</strong></div>');
            var order = pedidosFactory.sendOrder();
                order.then(function success(data){
                    if(data.status == 0){
                        //Pedido Recebido pelo servidor

                   //     $state.go("app.oferta");
                        hideLoading();
                        // sessionFactory.saveFutureDelivery(data.data.order.id);
                        console.log("RESPOSTA: "+JSON.stringify(data));
                      //  showAlertPopUp("Pedido Recebido");
                        pedidosFactory.clear();
                        $scope.pedido = pedidosFactory.load();
                        $state.go("app.deliveryList");
                    }
                    else {
                        // Pedido não aceito
                        hideLoading();
                        console.log("Pedido não aceito");
                        console.log(data.message);
                        showAlertPopUp("Pedido não aceito");
                    }
                }, function error(data){
                    // Problema na comunicação com o servidor
                    hideLoading();
                    console.log("ORDER_POST_FAILED");
                    showAlertPopUp("ORDER_POST_FAILED");
                });
        }

        function showAlertPopUp(title) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                scope: $scope
            });
        }
        
        function showCustomLoading(template) {
            $ionicLoading.show({
                template: template
            });
        }
        
        function hideLoading() {
            $ionicLoading.hide();
        }
        
        $scope.goCardapio = function () {
            $state.go("app.cardapio");
        }
    });//fim module
})();