(function () {
    angular.module('convem.avaliacao')
    .factory('avaliacaoFactory', function ($http) {
        var factory = {};
        var currIndex = 0;
        var vendedores = [];
        var entrega = [];

        factory.init = function () {
            return $http.get('data/listaEntregaData/listaEntregaData.json').then(function (response) {
                return response.data;
            })
        }

        factory.getVendedor = function () {
            return vendedores[currIndex];
        }

        // Nome da função sujeito a troca
        factory.getNextVendedor = function () {
            currIndex = currIndex + 1;
            return vendedores[currIndex];
        }

        factory.getPrevVendedor = function () {
            currIndex = currIndex - 1;
            return vendedores[currIndex];
        }

        factory.saveEntrega = function (listaEntrega) {
            entrega = listaEntrega;
            vendedores = listaEntrega.vendedor;
        }

        factory.loadEntrega = function () {
            return entrega;
        }

        return factory;
    })
})();