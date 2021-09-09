(function () {
    angular.module('convem.oferta')

    .controller('OfertaCtrl', function ($scope, $state, ofertaFactory, sessionFactory, $ionicPopup) {
        var aceitaTodos = true;
        $scope.hasOffer = false;
        $scope.numOffers = 0;
        var offers;
        var offerIndex = 0;
        var ofertaPromise = ofertaFactory.init();
        ofertaPromise.then(function success(data) {
            if (data.status == 0){
                $scope.ofertas = data.data.offerings;
                $scope.numOffers = data.data.offerings.qty;
                if($scope.ofertas){
                    $scope.hasOffer = true;
                    offers = Object.keys($scope.ofertas);
                    displayNextOffer(offers[offerIndex]);
                }
                console.log(JSON.stringify(data.data));
            }
            
        }, function error(data) {
            alert("Erro na comunicação com o servidor");
            $scope.hasOffer = false;
        });
        
        function displayNextOffer(offerInx) {
                // esse IF será removido futuramente (qty deve sair de data.offerings)
            if (offerInx !== "qty"){
                $scope.oferta = $scope.ofertas[offerInx];
                $scope.amount = parseFloat($scope.ofertas[offerInx].amount).toFixed(2);
            }
        }
        
        $scope.updatePreco = function () {
            $scope.amount = 0;
            aceitaTodos = true;
            
            for (var index in $scope.oferta.items){
                if($scope.oferta.items[index].checked){
                    $scope.amount = $scope.amount + parseFloat($scope.oferta.items[index].price * parseInt($scope.oferta.items[index].qt)).toFixed(2);
                    document.getElementById('acceptBtn').disabled = false;
                }
            }
            
            if ($scope.amount == 0) {
                document.getElementById('acceptBtn').disabled = true;
            }
            else if ($scope.amount != parseFloat($scope.oferta.preco_total).toFixed(2)) {
                aceitaTodos = false;
            }
        }

        $scope.cancelar = function () {
            $scope.oferta = {};
            $state.go("app.pedidos");
        }

        function aceitarSelecionados() {
            // Essa função está desativada para a FASE 1
            var quantidade_total = 0;
            var products = [];
            for (var index in $scope.oferta.itens){
                if($scope.oferta.itens[index].checked){
                    products.push($scope.oferta.itens[index]);
                }
            }
            
            // Antes de ir para as entregas devo dizer ao servidor quias produtos da Oferta foi aceita
            goToDeliveries();
        }

        function aceitarTodos() {
            // Antes de ir para as entregas devo dizer ao servidor se a Oferta foi aceita
            goToDeliveries();
        }

        $scope.finalizar = function () {
            if (aceitaTodos) {
                //Call Aceita Todos
                aceitarTodos();
                return;
            }
            else {
                $scope.showPopup = function () {
                    var myPopup = $ionicPopup.show({
                        title: 'Você tem certeza que não quer todos os items?',
                        buttons: [
                            {
                                text: '<small><b>Cancelar</b></small>',
                                type: 'button-assertive button-small',
                                onTap: function (e) {
                                    return 0; // Cancela
                                }
                            },
                            {
                                text: '<small>Apenas Selecionados</small>',
                                type: 'button-positive button-small',
                                onTap: function (e) {
                                    return 1; // Aceita os selecionados
                                }
                            },
                            {
                                text: '<small><b>Aceitar Todos</b></small>',
                                type: 'button-balanced button-small',
                                onTap: function (e) {
                                    return 2;// aceita todos
                                }
                            }
                        ]
                    });

                    myPopup.then(function (res) {
                        if (res == 0) {
                            //Cancela
                            return;
                        }
                        else if (res == 1) {
                            aceitarSelecionados(); //Call Aceita selecionados
                            return;
                        }
                        else if (res == 2) {
                            aceitarTodos();//call AceitaTodos
                            return;
                        }
                        else {
                            alert("ERROR");
                            return;
                        }
                    });
                };
                $scope.showPopup();
            }
        }
        
        function goToDeliveries(){
            if($scope.hasOffer){
                offerIndex = offerIndex + 1;
                if(offers[offerIndex]){
                    displayNextOffer(offers[offerIndex]);
                    $scope.numOffers = $scope.numOffers - 1;
                }
                else {
                    $state.go("app.deliveryList");
                }
            }
        }
    });
})();