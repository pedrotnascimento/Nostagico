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
        var deviceToken = '/vendor/devicetoken';
    
        //Path para dados de usuário(USAR PUT)
        var user = '/vendor';
    
        //Path para Logar usuário(USAR POST)
        var userLogin = '/vendor/login';
            
        var order = "/vendor/orders";
        //Path para Obter a lista de produtos ativos no sistema. Baseia-se em parâmetro de localização.
        //   /customer/products/:latitude/:longitude 
        var productsList = '/vendor/products/';

        var deliveries = '/vendor/deliveries';

        var operation = '/vendor/products';

        var deleteOp = '/vendor/product';


        var acceptOrder = '/vendor/order';




        service.getPathAPI = function () {
            return convemUrl;
        }
    
        service.getAPIVersion = function () {
            return apiVersion;
        }
    
        service.getPathDeviceToken = function () {
            return convemUrl+apiVersion+deviceToken;
        }
    
        service.getPathProducts = function () {
            return convemUrl+apiVersion+productsList; 
            //return 'data/prodData/myProductsBEnd.json'; //DEBUG OFF LINE
        }
    
        service.getPathUser = function () {
            return convemUrl+apiVersion+user;
        }
    
        service.getPathUserLogin = function () {
            return convemUrl+apiVersion+userLogin;
        }
    
        service.getPathOrder = function (pos, radius) {
            var lat = '/'+pos.lat;
            var lng = '/'+pos.lng;
            radius = '/' + radius;
            return convemUrl+apiVersion+order+lat+lng+radius;
            //return "data/pedidosData/pedidosBEnd.json";
        }

        service.getPathDeliveries = function () {
            return convemUrl + apiVersion + deliveries;
            //return 'data/myDeliveryBEnd.json';//DEBUG OFFLINE
        }

        service.getPathOperation = function () {
            return convemUrl + apiVersion + operation;
        }

        service.getPathDeleteOp = function () {
            return convemUrl + apiVersion + deleteOp;
        }

    
        service.getPathAcceptOrder = function (orderid) {
            return convemUrl + apiVersion +  acceptOrder + "/" + orderid + "/bid";
        }

        service.getDeliveryHistory = function () {
            return convemUrl + apiVersion + deliveries + "/finished";
            }
    
    });
})();
