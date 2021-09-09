(function () {
    angular.module('convem.login')

    .service('loginService', function ($http, APIconfig) {
        var service = this;
        
        // Função que faz login dependente do servidor
        service.loginServer = function (uname,upass) {
            var postJson = {};
            postJson.username = uname; 
            postJson.password = upass;
            return $http.post(APIconfig.getPathUserLogin(), postJson).then(function (response) {
                //console.log(response.data.message); //debug
                return response.data;
            });
        }
        
        // Função que envia o DeviceToken para o Servidor  
        service.deviceToken = function (deviceToken, platform) {
            var postJson = {}; 
            postJson.devicetoken = deviceToken;
            postJson.platform = platform;
            console.log(JSON.stringify(postJson));
            console.log(APIconfig.getPathDeviceToken());
            return $http.post(APIconfig.getPathDeviceToken(),postJson).then(function (response) {
                return response.data;
            });
        }
    });
})();
