(function () {
    angular.module('convem.session')
        // Esse Serviço vai guardar Todos os dados da sessão do usuário
        // Serviço ainda em construção
    .factory('sessionFactory', function () {
        var factory = {}
        var user = [];
        var pedido = [];
        var futureDelivery;
        var date;

        factory.getToken = function () {
            return user.token;
        }

        factory.saveUserData = function (userData) {
            user = userData;
        }

        factory.getCartoesUsuario = function () {
            return user.cards;
        }

        factory.getId = function () {
            return user.id;
        }
        
        
        //User Position Functions
        factory.saveUserLat = function (latitude) {
            user.latitude = latitude;
        }
        
        factory.saveUserLng = function (longitude) {
            user.longitude = longitude;
        }
        
        factory.getUserLat = function () {
            return user.latitude;
        }
        
        factory.getUserLng = function () {
            return user.longitude;
        }
        
        factory.saveUserNumber = function (streetNumber) {
            user.streetNumber = streetNumber;
        }
        
        factory.getUserNumber = function () {
            return user.streetNumber;
        }
        
        factory.saveUserStreet = function (street) {
            user.street = street;
        }
        
        factory.getUserStreet = function () {
            return user.street;
        }
        
        factory.saveUserDistrict = function (district) {
            user.district = district;
        }
        
        factory.getUserDistrict = function () {
            return user.district;
        }
        
        factory.saveUserCity = function (city) {
            user.city = city;
        }
        
        factory.getUserCity = function () {
            return user.city;
        }
        
        factory.saveUserState = function (state) {
            user.state = state;
        }
        
        factory.getUserState = function () {
            return user.state;
        }
        
        factory.saveUserCountry = function (country) {
            user.country = country;
        }
        
        factory.getUserCountry = function () {
            return user.country;
        }
        
        factory.saveUserComplement = function (complement) {
            user.complement = complement;
        }
        
        factory.getUserComplement = function () {
            return user.complement;
        }
        
        factory.saveUserZipcode = function (pZipcode) {
            var code = pZipcode.split('-');
            user.zipcode = code[0]+code[1];
        }
        
        factory.getUserZipcode = function () {
            return user.zipcode;
        }
        
        //End User Position Functions

        //Funções que tratam do pedido
        factory.savePedido = function (pedido_list) {
            pedido = pedido_list;
        }

        factory.getPedido = function () {
            return pedido;
        }
        //Fim Funções do pedido

        factory.getDate = function () {
            return date;
        }
        // Tratamento de entrega
         factory.saveFutureDelivery = function (id){
             futureDelivery = id;
         }
         
         factory.checkDelivery = function (id) {
             return (futureDelivery == id)? true:false;
         }
         
         factory.clearDelivery = function () {
             futureDelivery = null;
         }
         
         factory.getFutureDeliveryId = function () {
             return futureDelivery;
         }
        ///Fim Tratamento de entrega
        return factory;
    })
})();