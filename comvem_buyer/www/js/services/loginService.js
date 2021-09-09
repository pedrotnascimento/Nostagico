(function () {
    angular.module('convem.login')

    .service('loginService', function ($http, APIconfig) {
        var service = this;

        //Função de login DUMMY local
        service.login = function () {
            return $http.get("data/userData/users.json").then(function (response) {
                return response.data;
            });
        }

        // Função que faz login dependente do servidor
        service.loginServer = function (uname,upass) {
            //Monta JSON
            var postJson = '{"username":"'+uname+'","password":"'+upass+'"}';
            return $http.post(APIconfig.getPathUserLogin(),postJson).then(function (response) {
                return response.data;
            });
        }

        var fbLoginSuccess = function(loginResult) {
            console.log('FB - LoginResult:', JSON.stringify(loginResult));
            facebookConnectPlugin.api("me", ["public_profile", "user_birthday", "email"], function(meResult){
                console.log("FB - API.ME Result: ", JSON.stringify(meResult));
            }, function(error){
                console.error("FB - LoginError:", JSON.stringify(error));
            });

            }

        service.loginFacebook = function () {
             facebookConnectPlugin.login(["public_profile", "user_birthday", "email"], fbLoginSuccess,
            function loginError (error) {
                console.error("FB - ERROR: ", JSON.stringify(error));
            }
            );
        }

        // Função que envia o DeviceToken para o Servidor
        service.deviceToken = function (deviceToken, platform) {
            //Monta JSON
            var postJson = '{"devicetoken":"'+deviceToken+'","platform":"'+platform+'"}';
           // alert(APIconfig.getPathDeviceToken());
            return $http.post(APIconfig.getPathDeviceToken(),postJson).then(function (response) {
                return response.data;
            });
        }
    });
})();
