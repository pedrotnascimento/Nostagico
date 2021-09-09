( function () {
  angular.module('convem')
  //Serviço que lista todos os caminhos de API
  .service('APIconfig', function (){
    var service = this;
    
    // Lista de URLs
//    var convemUrl = 'https://api.convem.me/';
    var convemUrl = 'https://devel.convem.me/api/';
    
    //Versão da API
    var apiVersion = 'v1_beta';
    
    //Path para POST do deviceToken
    var deviceToken = '/customer/devicetoken';
    
    //Path para dados de usuário
    var user = '/customer';
    
    //Path para Logar usuário
    var userLogin = '/customer/login';
    
    //Path para criar pedido
    var order = '/customer/order';
    
    //Path para Entregas
    var delivery = '/customer/deliveries';
    
    //Path para Oferta
    var offer = '/customer/offerings';
    
    //Path para Obter a lista de produtos compráveis pelo cliente. Baseia-se em parâmetro de localização.
    //   /customer/products/:latitude/:longitude 
    var productsList = '/customer/products/'
    
    service.getPathAPI = function () {
        return convemUrl;
    }
    
    service.getAPIVersion = function () {
        return apiVersion;
    }
    
    service.getPathDeviceToken = function () {
        return convemUrl+apiVersion+deviceToken;
    }
    
    service.getPathProducts = function (latitude,longitude) {
        return convemUrl+apiVersion+productsList+latitude+'/'+longitude;
    }
    
    service.getPathUser = function () {
        return convemUrl+apiVersion+user;
    }
    
    service.getPathUserLogin = function () {
        return convemUrl+apiVersion+userLogin;
    }
    
    service.getPathOrder = function () {
        return convemUrl+apiVersion+order;
    }
    
    service.getPathDeliveries = function () {
        return convemUrl+apiVersion+delivery;
    }
    
    service.getPathOffering = function () {
        return convemUrl+apiVersion+offer;
    }
    
  });
})();
