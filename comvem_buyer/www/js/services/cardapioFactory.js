(function () {
    angular.module('convem.pedidos')

    .factory('cardapioFactory', function ($http, APIconfig) {
        var factory = {};
        var cardapio = [];
        var initFlag = 0;

        factory.GetInitFlag = function () {
            return initFlag;
        }

        factory.initLocal = function () {

            initFlag = 1;

                return $http.get('data/CardapioData/cardapio2.json').then(function (response) { //get do hd
          //  return $http.get("http://54.94.209.21/convem/api/v1/products/categorized").then(function (response) {//get do server
                //alert(JSON.stringify(response.data));
                        return response.data;
                });

        }
        
        factory.init = function (latitude, longitude) {
            initFlag = 1;
          //  alert("Lat: "+latitude+" Lng: "+longitude);
            console.log(latitude,longitude);
            return $http.get(APIconfig.getPathProducts(latitude,longitude)).then(function (response) {
                        return response.data;
                    });
        }
        
        factory.getSubclassById = function (classId, subclassId) {
            return cardapio[classId].subcategories[subclassId] ? cardapio[classId].subcategories[subclassId] : null; 
        }

        factory.save = function (pCardapio) {
            cardapio = pCardapio;
        }

        factory.load = function () {
            return cardapio;
        }

        factory.clear = function () {
            cardapio = [];
        }
        
        factory.printCardapio = function () {
            console.log(JSON.stringify(cardapio));
        }

        return factory;
    });
})();