(function () {
    angular.module('convem.entrega')
    .controller('EntregaCtrl', function ($scope, $state, $http, $timeout,
                                         $ionicPopup, $interval, $ionicLoading,
                                         entregaFactory, sessionFactory) {

        $scope.qtMiss = 0;
        $scope.tempoEntrega = {};

        function waitingDelivery() {
            showCustomLoading('<div class="row"><ion-spinner icon="android"></ion-spinner><strong class="col-center">Buscando Ofertas...</strong></div>');
        }
        
        if(sessionFactory.getFutureDeliveryId()){
            console.log("Aguardando Ofertas");
            waitingDelivery();
            setRefreshTimeout(10000);
        }
        
        function setRefreshTimeout (delay){
            $timeout(function(){
                $scope.updateList();
                if(sessionFactory.getFutureDeliveryId()){
                    console.log("New timeout started");
                    setRefreshTimeout(delay);
                }
            },delay);
        }
        
        var EntregaData = entregaFactory.init();
        EntregaData.then(function success(data) {
        
        console.log(JSON.stringify(data));
        if (data.status == 0){
            // OK
            $scope.entregas = data.data.deliveries;
            $scope.numEntregas = Object.keys($scope.entregas).length;
            for (var index in $scope.entregas){
                if(sessionFactory.checkDelivery($scope.entregas[index].orderid)){
                    hideLoading();
                    sessionFactory.clearDelivery();
                }
                $scope.tempoEntrega[index] = {};
                $scope.tempoEntrega[index].deadline = Date.parse($scope.entregas[index].createdate) + 900000;
                var timeLeft = (($scope.tempoEntrega[index].deadline - Date.parse(new Date()))/60000).toFixed(0);
                $scope.entregas[index].time = timeLeft;
                $scope.entregas[index].timeLeft = timeLeft;
            }
        }
        else {
            // Erro
            console.error("Status Entrega: "+data.status+" Msg: "+data.message);
            alert("Status Entrega: "+data.status+" Msg: "+data.message);
        }
        }, function error(data) {
            alert("Falha ao carregar suas Entregas");
        });
        
        function showCustomLoading(template) {
            $ionicLoading.show({
                template: template
            });
        }
        
        function hideLoading() {
            $ionicLoading.hide();
        }
        
       
        
     //   $scope.entregas = sessionFactory.getEntrega();
        $scope.dateEntrega = new Date().getTime();

        var timeNow;
        // $scope.expiringTime = $scope.tempoEntrega/60000;
            $interval(
               function () {
                   timeNow = new Date();
                    for (var index in $scope.entregas){
                        var timeLeft = (($scope.tempoEntrega[index].deadline - Date.parse(new Date()))/60000).toFixed(0);
                        $scope.entregas[index].time = timeLeft;
                        $scope.entregas[index].timeLeft = timeLeft;
                        console.log("<< TESTE "+index+" >>> "+$scope.entregas[index].time);
                        // Se o tempo for negativo devemos alertar a OPERAÇÃO
                    }
               }, 10000);
        $scope.abreEntrega = function (entregaId,vendorName,vendorId) {
            showCustomPopup(entregaId,vendorName, vendorId);
        }

        $scope.TudoEntregue = function (){
            $state.go("app.avaliaVendedor");
        };
        
         $scope.updateList = function () {
            console.log("UPDATE");
            var EntregaData = entregaFactory.init();
            EntregaData.then(function success(data) {
                
                console.log(JSON.stringify(data));
                if (data.status == 0){
                    // OK
                    $scope.entregas = data.data.deliveries;
                    $scope.numEntregas = Object.keys($scope.entregas).length;
                    for (var index in $scope.entregas){
                        if(sessionFactory.checkDelivery($scope.entregas[index].orderid)){
                            hideLoading();
                            sessionFactory.clearDelivery();
                        }
                         $scope.tempoEntrega[index] = {};
                        $scope.tempoEntrega[index].deadline = Date.parse($scope.entregas[index].createdate) + 900000;
                        var timeLeft = (($scope.tempoEntrega[index].deadline - Date.parse(new Date()))/60000).toFixed(0);
                        $scope.entregas[index].time = timeLeft;
                        $scope.entregas[index].timeLeft = timeLeft;
                    }
                }
                else {
                    // Erro
                    console.error("Status Entrega: "+data.status+" Msg: "+data.message);
                    alert("Status Entrega: "+data.status+" Msg: "+data.message);
                }
            }, function error(data) {
                alert("Falha ao carregar suas Entregas");
            })
        }
        
        function deletaEntrega (entregaId) {
            delete $scope.entregas[entregaId];
            $scope.numEntregas = Object.keys($scope.entregas).length;
            console.log("DELETE >>>"+entregaId);
        }
        
        function showCustomPopup(entregaId,vendorName, vendorId) {
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        
                        title: '<b>'+vendorName+'</b>',
                        template: 'Tudo foi entregue?',
                        scope: $scope,
                        buttons: [
                          {
                              type: 'button-icon ion-close button-small',
                              onTap: function (e) {
                                  return;
                              }
                          },
                          {
                              text: 'Falta Item',
                              type: 'button-assertive button-small disabled',
                              onTap: function (e) {
                                  return 0;
                              }
                          },
                          {
                              text: 'Tudo Entregue',
                              type: 'button-positive button-small',
                              onTap: function (e) {
                                  return 1;
                              }
                          }
                        ]
                    });

                    myPopup.then(function (res) {
                        if (res == 1) {
                            // Apaga a entrega e, futuramente, chama a tela de avaliação
                            var sendDelivery = entregaFactory.sendDelivery(entregaId,vendorId);
                            sendDelivery.then(function success(data){
                                if(data.status ==0){
                                     deletaEntrega(entregaId);
                                }
                                else {
                                    console.log("ENTREGA NOT OK "+JSON.stringify(data));
                                }
                            }, function error(data){
                                console.log("CONFIRMA_ENTREGA_POST_FAILED");
                            })
                           
                            console.log("Confirmou");
                        }
                        else if (res == 0) {
                            console.log("Faltou");
                        }
                    });
                }
		
		$scope.faltaItem = function(){
			$state.go('app.faltaItem');
		};
    })    //fim controllers
})();