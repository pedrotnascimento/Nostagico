(function () {
    angular.module('convem.entrega')

    .factory('entregaFactory', function ($http, APIconfig) {
        var factory = {};
        var i = 0, j = 0;
        var entregas = [];

        factory.initLocal = function () {
            return $http.get("data/listaEntregaData/listaEntregaData.json").then(function (response) {//get do server
                return response.data;
            });
        }
        
        factory.init = function () {
            return $http.get(APIconfig.getPathDeliveries()).then(function (response) {//get do server
                return response.data;
            });
        }
        
        
        factory.sendDelivery = function (entregaId,vendorId) {
            var jsonPUT = {};
            jsonPUT.status = 'CC';
            jsonPUT.vendorid = vendorId;
            console.log("SEND_CONF_ENTREGA "+JSON.stringify(jsonPUT)+"   URL: "+APIconfig.getPathDeliveries()+"/"+entregaId);
            return $http.put(APIconfig.getPathDeliveries()+"/"+entregaId,jsonPUT).then(function (response) {//get do server
                return response.data;
            });
        }
        
        // factory.setMiss = function () {
        //     for (i = 0 ; i < vendedores.length; i++)
        //         for (j = 0; j < vendedores[i].products.length; j++)
        //             vendedores[i].products[j].isMiss = false;
        // };

        factory.save = function (pEntregas){
            entregas = pEntregas;
        };


        return factory;

    });
})();