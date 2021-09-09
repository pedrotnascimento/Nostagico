(function () {
    angular.module('convem.pedidos')

    .controller('CardapioItemCtrl', function ($scope,$state, $stateParams, $ionicFilterBar, cardapioFactory, pedidosFactory) {
        $scope.subclass = cardapioFactory.getSubclassById($stateParams.classId,$stateParams.subclassId);

        //filtro
        var filterBarInstance;

        $scope.showFilterBar = function () {

            filterBarInstance = $ionicFilterBar.show({
                items: $scope.products,
                update: function (filteredItems) {
                    $scope.products = filteredItems;
                },
                filterProperties: ['nome']
            });
        };
        ////////////////////////////////////////////

        //adiciona quantidade em uma unidade
        $scope.upQt = function (product) {
            product.qty = parseInt(product.qty) + 1;
            if (product.qty == 1) {//se o produto foi adicionado (qt==1) adiciona na lista de pedidos(pushProducts)
                pedidosFactory.addProduct(product);
                console.log("Add product");
            }
            else if (product.qty > 1) {
                pedidosFactory.increaseProductQt(product); // Atualiza a quantidade no pedido
                console.log("INC product");
            }
        }

        //subtrai quantidade em uma unidade
        $scope.downQt = function (product) {
            if (product.qty == 0) {//se não há produto(qt===0) então faz nada(return)
                return;
            }
            else if (product.qty == 1) {
                pedidosFactory.removeProduct(product);
            }
            else if (product.qty > 1) {
                pedidosFactory.decreaseProductQt(product); // Atualiza a quantidade no pedido
                product.qty = parseInt(product.qty) - 1; //retira um item
            }
            
        }

        //mostra quantidade de produtos da estrutura de pedidos, se não tiver em pedidos retorna 0
        $scope.showQt = function (product) {
            if(product.qty == undefined){
                product.qty = 0;
            }
            return pedidosFactory.getProductQuantity(product);
        }
        
        $scope.goPedidos = function () {
            $state.go("app.pedidos");
        }
    })
})();