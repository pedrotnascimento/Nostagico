(function () {

    angular.module('convem.myProducts')

    .controller('MyProductsCtrl', function ($scope, $ionicFilterBar, $ionicPopup,
                                            $http, $stateParams, myProductsFactory,
                                            utilFactory) {

        var getInx = utilFactory.getInx;
        var productsData = myProductsFactory.init();  //Esse esquema de promise é parte do novo padrão.
        //trata a promise ( carrega os produtos do server)
        productsData.then(function success(data) {
            if (data.status == 0) {
                $scope.myProducts = data.data.products;
                myProductsFactory.save($scope.myProducts); //Salva o cardapio em um array do serviço
            }
            else {
                //FALHOU ENVIO
            }

        }, function error(response) {
            alert("Falha ao carregar os produtos" + response.status);
        });

        //POP UP CODE
        $scope.editProdPopup = function (prod, classId) {
            prod.price = parseFloat(prod.price)
            var oldprice =  isNaN(prod.price)? 0 : prod.price ;
            $scope.actualProd = prod;
            $scope.hideSugestion = true;
            //cordova.plugins.Keyboard
            //PEDRO IRA DELETAR <script>$(function() { $("#price").priceFormat({prefix: "R$ ",centsSeparator: ",",thousandsSeparator: "."});});</script>' +
            //var template = '<input type="text" pattern="\d*"  ng-model="actualProd.price" placeholder="Preço atual: R{{' + oldprice + '| currency}}" ui-money-mask autofocus novalidate/>';
            var template = '<input type="number" ng-model="actualProd.price" placeholder="Preço atual: R{{' + oldprice + '| currency}}"><br>';

            // An elaborate, custom popup
            var addProdPopup = $ionicPopup.show({
                template: template,
                title: 'Diga seu preço para ' + $scope.actualProd.name,
                /*subTitle: 'here is a subtitle',*/
                scope: $scope,
                buttons: [
                {
                    //text: 'Cancelar',
                    type: 'ion-android-cancel button-large',
                    onTap: function () {
                        prod.price = oldprice;
                    },//IDEIA: SE NÃO CONSEGUIR UMA FORMA MELHOR DE SE ALTERAR price, COLOCAR DOIS INPUTS, UM PRA REAL E OUTRO PRA CENTAVO =p(ideia merda)
                    template: '<style> .button { font-size: 40px;} </style>'
                    //font-size: 20px
                },
                {
                    //text: '<b>Salvar</b>',
                    type: 'button-positive ion-ios-checkmark button-large',
                    onTap: function () {
                        if (prod.price != oldprice && prod.price > 0) {// preco diferente do antigo e maior que 0, altera produto
                            if (oldprice != 0) {//oldprice!=0 , produto ja existe, entao atualiza produto
                                myProductsFactory.update(prod).then(function (data) {
                                    if (data.status == 0) {
                                        myProductsFactory.save($scope.myProducts);
                                    }
                                    else {
                                        alert("Aconteceu um erro: atualização de produto foi cancelada (" + data.status + ")");
                                        prod.price = oldprice;
                                    }
                                }, function error(data) {
                                    alert("error: atualização de produto foi cancelada(" + data.status + ")");
                                    prod.price = oldprice;
                                });

                            }//fim if oldprice!=0
                            else {//oldprice==0, produto não existia, então insere produto
                                myProductsFactory.insert(prod).then(function (data) {
                                    //trata promisse
                                    if (data.status == 0) {
                                        myProductsFactory.save($scope.myProducts);
                                    }
                                    else {
                                        alert("Aconteceu um erro: atualização de produto foi cancelada(" + data.status +")");
                                        prod.price = oldprice;
                                    }
                                }, function error(data) {
                                    alert("Aconteceu um erro: atualização de produto foi cancelada(" + data.status +")");
                                    prod.price = oldprice;
                                });
                                 //fim trata promisse
                            }//fim else


                        }//fim if prod.price != oldprice && prod.price != 0
                        else if (prod.price == 0 || prod.price == null) {//preco ==0, então deleta produto
                            myProductsFactory.delete(prod).then(function (data) {
                                //trata promisse
                                if (data.status == 0) {
                                    myProductsFactory.save($scope.myProducts);
                                }
                                else {
                                    alert("Aconteceu um erro: atualização de produto foi cancelada(" + data.status + ")");
                                    prod.price = oldprice;
                                }
                            }, function error(data) {
                                alert("Aconteceu um erro: atualização de produto foi cancelada(" + data.status + ")");
                                prod.price = oldprice;
                            });
                            //fim trata promisse
                        }//fim else if
                    }

                },
                {
                    type: 'ion-trash-a button-large button-assertive',
                    onTap: function (e) { //AQUI ENVIAREI UM SINAL PARA O SERVIDOR APAGAR O PRODUTO
                        if (confirm("Realmente deseja excluir?")) {//exclusão
                            prod.price = 0;
                            //trata promisse
                            myProductsFactory.delete(prod).then(function success (data) {
                                if (data.status == 0) {
                                    myProductsFactory.save($scope.myProducts);
                                }
                                else {
                                    alert("error: atualização de produto foi cancelada");
                                    prod.price = oldprice;
                                }

                            }, function error(data) {
                                alert("Aconteceu um erro: atualização de produto foi cancelada(" + data.status + ")");
                                prod.price = oldprice;
                            });
                            //fim trata promisse
                            
                        }//fim if
                        else {//exclusão cancelada
                            var temp = $scope.actualProd.price;
                            $scope.actualProd.price = 0;
                            e.preventDefault();
                            $scope.actualProd.price = temp;
                        }
                    }
                }
                ]
            }

            );

            addProdPopup.then(function (res) {
                $scope.hideSugestion = false;
            });
             
        };///
        //////////////fim pop up

        ///////////////////////////////////////////
        //filtro
        var filterBarInstance;
        $scope.showFilter = false;

        $scope.showFilterBar = function () {
            $scope.hideSugestion = true;
            var items = $scope.myProducts;//array que o filtro atualiza, por isso é preciso criar o item
            //joining products of the other classes
            var k = 0;
            $scope.products = [];//produtos que serão mostrados e filtrados, 
            //(os elementos são ponteiro dos produtos individuais de myProducts)
            for (var i = 0 ; i < items.length ; i++)
                for (var j = 0 ; j < items[i].products.length ; j++) {
                    $scope.products[$scope.products.length] = items[i].products[j];
                }
            //qtTodosProds recebe o tamanho NÃO FILTRADO de products para controlar a exibição das classes
            var qtTodosProds = $scope.products.length;

            $scope.filterBarInstance = $ionicFilterBar.show({
                items: $scope.products,
                update: function (filteredItems) {
                    $scope.products = filteredItems;
                    $scope.showFilter = qtTodosProds !== $scope.products.length;
                    //quando length dos produtos for igual ao qtTodosProds então irá mostra as classes
                },
                filterProperties: ['name'],
                cancel: function () {
                    $scope.hideSugestion = false;
                    $scope.showFilter = false;
                },
                favoritesAddPlaceholder: "Escreva sua busca"
            })
            };///////fim filtro

      
        //ACCORDION LIST
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

        $scope.hasPrice = function (price) {
            //alert(product.price != 0);
            return !(parseFloat(price) && true);

        }

    })
    ;//FIM CONTROLLERS 


})();