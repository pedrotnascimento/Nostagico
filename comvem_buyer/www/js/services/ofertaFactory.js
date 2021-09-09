(function () {
    angular.module('convem.oferta')

    .service('ofertaFactory', function ($http, APIconfig) {
        var factory = {};

        factory.init = function () {
            return $http.get(APIconfig.getPathOffering()).then(function (response) {
                return response.data;
            });
        }
        
        factory.update = function () {
            return $http.get(APIconfig.getPathOffering()).then(function (response) {
                return response.data;
            });
        }

        return factory;
    });
})();