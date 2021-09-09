(function () {
    angular.module('convem.route', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: 'templates/menu.html'
          })

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

        .state('app.myProducts', {
            url: '/myProducts',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myProducts.html',
                    controller: 'MyProductsCtrl',
                    controllerAs: 'MyProdCtrl'
                }
            }
        })

        .state('app.myDeliveryVisual', {
            url: '/myDeliveryVisual/:index',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myDeliveryVisual.html',
                    controller: 'MyDeliveryVisualCtrl',
                    controllerAs: 'MDVCCtrl'
                }
            }
        })
                    
        .state('app.myDelivery', {
            url: '/myDelivery',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myDelivery.html',
                    controller: 'MyDeliveryCtrl',
                    controllerAs: 'MyDelCtrl'
                }
            }
        })

        .state('app.sugestao', {
            url: '/sugestao',
            views: {
                'menuContent': {
                    templateUrl: 'templates/sugestao.html',
                    controller: 'SugestaoCtrl'
                }
            }
        })

        .state('app.contato', {
            url: '/contato',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contato.html',
                    controller: 'ContatoCtrl'
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

         .state('app.history', {
             url: '/history',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/history.html',
                     controller: 'HistoryCtrl'
                 }
             }
         })
        
        .state('app.pedidoDetalhe', {
            url: '/orderDetalhe/:index',
            views: {
                'menuContent': {
                    templateUrl: 'templates/pedidoDetalhe.html',
                    controller: 'PedidoDetalheCtrl'
                }
            }
        })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });
})();