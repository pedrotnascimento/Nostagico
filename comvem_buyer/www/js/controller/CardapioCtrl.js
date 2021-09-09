(function () {
    angular.module('convem.pedidos')

    .controller('CardapioCtrl', function ($scope, $state, $ionicFilterBar, cardapioFactory, pedidosFactory, sessionFactory) {

        if (cardapioFactory.GetInitFlag() === 0) {//se o cardapio NÃO foi carregado/iniciado, então carrega

            //Carrega o cardápio da base de dados e retorna uma promise.
            var cardapioData = cardapioFactory.init(0,0/*sessionFactory.getUserLat(),sessionFactory.getUserLng()*/);  //Esse esquema de promise é parte do novo padrão.
            //Veja o GET em js/services/cardapioFactory
            //trata a promise
            cardapioData.then(function success(data) {
            //    cardapioFactory.save(data.products); //Salva o cardapio em um array do serviço
                if (data.status == 0) {
                    //Catálogo Carregado com sucesso
                    console.log(data.message);
     //               console.log(JSON.stringify(data.data.catalog));
                    cardapioFactory.save(data.data.catalog);

                    $scope.classes = data.data.catalog;
                }
                else {
                    // Falha ao carregar Catálogo
                    console.log(data.message);
                    alert("Falha ao carregar Catálogo");
                }
            }, function error(data) {
                console.log("CARDAPIO_GET_FAILED");
                console.log(data.message);
                alert("Falha na comunicação com o servidor");
            });
        }
        else {//Cardapio Foi carregado, então carrega da função
            $scope.classes = cardapioFactory.load();
        }
        $scope.showClass = true;//flag para mostrar as classes dependendo se o filtro está sendo usado

        $scope.showFilterBar = function () {

            var items = cardapioFactory.load();

            //joining products of the entire cardapio
            $scope.products = [];
//            for (var i = 0 ; i < items.length ; i++) {
//               for (var j = 0 ; j < items[i].products.length ; j++) {
//                    $scope.products[$scope.products.length] = items[i].products[j];

//                }
//           }

            //marcacao recebe o tamanho NÃO FILTRADO de products para controlar a exibição das classes
            var marcacao = $scope.products.length;

            $scope.filterBarInstance = $ionicFilterBar.show({
                items: $scope.products,
                update: function (filteredItems) {
                    $scope.products = filteredItems;

                    $scope.showClass = marcacao === $scope.products.length;
                    //quando length dos produtos for igual ao marcacao então irá mostra as classes

                },
                filterProperties: ['nome']
            });


        };
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        //FUNÇÕES DE MANIPULAÇÃO DOS PEDIDOS.

        //adiciona quantidade em uma unidade
        $scope.upQt = function (product) {
            if(product.qt == undefined){
                product.qt = 0;
            }
            product.qt = parseInt(product.qt) + 1;
            if (product.qt == 1) {//se o produto foi adicionado (qt==1) adiciona na lista de pedidos(pushProducts)
                pedidosFactory.addProduct(product);
            }
            else if (product.qt > 1) {
                pedidosFactory.increaseProductQt(product); // Atualiza a quantidade no pedido
            }
        }

        //subtrai quantidade em uma unidade
        $scope.downQt = function (product) {
            if(product.qt == undefined){
                product.qt = 0;
            }
            if (product.qt == 0) {//se não há produto(qt===0) então faz nada(return)
                return;
            }
            else if (product.qt == 1) {
                pedidosFactory.removeProduct(product);
            }
            else if (product.qt > 0) {
                pedidosFactory.decreaseProductQt(product); // Atualiza a quantidade no pedido
            }
            product.qt = parseInt(product.qt) - 1; //retira um item
        }

        //mostra quantidade de produtos da estrutura de pedidos, se não tiver em pedidos retorna 0
        $scope.showQt = function (product) {
            if(product.qt == undefined){
                product.qt = 0;
            }
            return pedidosFactory.getProductQuantity(product);
        }

        $scope.goPedidos = function () {
            $state.go("app.pedidos");
        }


        //Codigo para implementacao o accordeon list.

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };



    })//fim do controller
})();