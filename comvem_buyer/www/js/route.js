/*  ####
    Crie um novo state para a sua tela abaixo.
    Copie um state qualquer (MENOS O PRIMEIRO!!) *não pode ser "abstract"

    app.STATE_NAME  <- Esse vai ser o nome do state
    url <- na url coloque /STATE_NAME

    Dentro de "views", mantenha 'menuContent'. Apenas mude o templateUrl para o template que você colocou na pasta "templates"
    Se tiver um controller, adicione igual no state "app.home"
    ####
*/
(function () {
    angular.module('convem.route', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: 'templates/menu.html'
          })

        /************************ States Pedro *********************/
        .state('app.pedidos', {
            url: '/pedidos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/pedidos.html',
                    controller: 'PedidosCtrl',
                    controllerAs: 'PedCtrl'

                }
            }
        })
        .state('app.cardapio', {
            url: '/cardapio',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cardapio.html',
                    controller: 'CardapioCtrl',
                    controllerAs: 'CrdpCtrl'
                }
            }
        })
        .state('app.item', {
            url: '/item/:classId/:subclassId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/item.html',
                    controller: 'CardapioItemCtrl',
                    controllerAs: 'CrdpCtrl'
                }
            }

        })
        .state('app.deliveryList', {
            cache: false,
            url: '/deliveryList',
            views: {
                'menuContent': {
                    templateUrl: 'templates/deliveryList.html',
                    controller: 'EntregaCtrl',
                    controllerAs: 'EntrgCtrl'
                }
            }
        })
        .state('app.faltaItem', {
            url: '/faltaItem',
            views: {
                'menuContent': {
                    templateUrl: 'templates/faltaItem.html',
                    controller: 'FaltaItemCtrl'
                    
                }
            }
        })

        
            .state('app.esqueceuSenha', {
                url: '/esqueceuSenha',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/esqueceuSenha.html',
                        controller: 'EsqueceuSenhaCtrl',
                        controllerAs: 'ESCtrl'

                    }
                }
            })
            .state('app.sugestao', {
                url: '/sugestao',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/sugestao.html',
                        controller: 'SugestaoCtrl',
                        controllerAs: 'SugCtrl'

                    }
                }
            })
            .state('app.contato', {
                url: '/contato',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contato.html',
                        controller: 'ContatoCtrl',
                        controllerAs: 'SugCtrl'

                    }
                }
            })
        /****************Fim States Pedro***************************/

        /*Inicio States Mateus */
         .state('app.confirmaLocal', {
             url: '/confirmaLocal',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/ConfirmaLocal.html',
                     controller: 'ConfirmaLocalCtrl'
                 }
             }
         })

         .state('app.cadastro', {
             url: '/cadastro',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/cadastro.html',
                     controller: 'CadastroCtrl'
                 }
             }
         })

        .state('app.condicoes', {
            url: '/condicoes',
            views: {
                'menuContent': {
                    templateUrl: 'templates/condicoes.html',
                    controller: 'CondicoesCtrl'
                }
            }
        })
        /*Fim States Mateus */
        /* State do Ian */
         .state('app.login', {
             cache: false,
             url: '/login',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/login.html',
                     controller: 'LoginCtrl'
                 }
             }
         })
         
         .state('app.logout', {
             url: '/logout',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/logout.html',
                     controller: 'LogoutCtrl'
                 }
             }
         })

        .state('app.oferta', {
            url: '/oferta',
            views: {
                'menuContent': {
                    templateUrl: 'templates/oferta.html',
                    controller: 'OfertaCtrl'
                }
            }
        })

        .state('app.avaliaVendedor', {
            url: '/avaliaVendedor',
            views: {
                'menuContent': {
                    templateUrl: 'templates/avaliaVendedor.html',
                    controller: 'AvaliaVendedorCtrl'
                }
            }
        })

        .state('app.meuCartao', {
            url: '/meuCartao',
            views: {
                'menuContent': {
                    templateUrl: 'templates/meuCartao.html',
                    controller: 'MeuCartaoCtrl'
                }
            }
        })

        .state('app.addCartao', {
            url: '/addCartao',
            views: {
                'menuContent': {
                    templateUrl: 'templates/addCartao.html',
                    controller: 'AddCartaoCtrl'
                }
            }
        })

        /* FIM State do Ian */

        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });
})();
