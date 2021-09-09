(function () {
    angular.module('convem.myProducts')

    .factory('addProductsFactory', function ($http) {
        var factory = {};
        factory.classes = [];
        factory.initFlag = 0;
        
        factory.init = function () {
            factory.initFlag = 1;
            return $http.get('data/prodData/addProducts.json').then(function (response) {

                return response.data;
            });
        }

        factory.save = function (data) {
            factory.classes = data; 

        }

        factory.load = function () {
            return factory.classes;
        }
        

        return factory;

    });
})();