(function () {
    angular.module('convem.login')

    .controller('LoginCtrl', function ($scope, $rootScope, $state, loginService ) {
        $scope.user = [];
        $scope.user.name = "";
        $scope.user.password = "";
        $scope.passwordForgotten = false;
        
        checkSession();
        function checkSession () {
            if(localStorage.getItem('loggedIn') && localStorage.getItem('JWT')){
                //User already logged In
                $rootScope.logged = true;
                $state.go("app.myDelivery");
            }
            else {
                var deviceToken = localStorage.getItem('deviceToken') ? localStorage.getItem('deviceToken') : "xxx";
                sendDeviceToken(deviceToken);
            }
        }


        function sendDeviceToken(deviceToken) {
            var tokenResponse = loginService.deviceToken(deviceToken, ionic.Platform.platform());
            tokenResponse.then(function success(data) {
                // POST realizado com sucesso
                    if (data.status == 0) {
                        // Token registrada com sucesso
                        console.log(data.message);
                    }
                    else {
                        console.log("Token error");
                    }
            }, function error(data) {
                // Falha ao tentar registrar o token
                alert("Falha na comunicação com o servidor");
                console.log(data.message);
            });
        }
        // POST to server deviceToken and user platform


        $scope.loginButton = function () {
            //debug offline -> pass over login
            //$rootScope.logged = true
            //$state.go("app.myDelivery");
            if ($scope.user.name && $scope.user.password) {
                var login = loginService.loginServer($scope.user.name, $scope.user.password);
                login.then(function success(data) {
                    if (data.status == 0) {
                        $rootScope.logged = true;
                        localStorage.setItem('loggedIn', true);
                        $state.go("app.myDelivery");
                    }
                    else {
                        //TODO: mudar para 

                        alert("Usuário e/ou senha inválido");
                        console.log("Error:" + data.status + "\n" +
                                "Message:" + data.message);
                    }

                }, function error(data) {
                    console.log("LOGIN_POST_FAILED");
                })
            }

        };

        $scope.showPasswordForm = function () {
            $scope.passwordForgotten = true
        }

        $scope.requestPassword = function () {
            //TODO: fazer função de regaste de senha: integrar API + criar popup(email valido e invalido)
            if ($scope.user.email) {
                console.log("Password requested for " + $scope.user.email);
            }
        }

        //TODO: DEPOIS CRIAR CONTROLLER PARA MENU E COLOCAR  ESTE CARA LA DENTRO
        //$rootScope.logOut: Controla aparecimento opções do menu dependendo se está logado.
        $scope.logOut = function () {
            $rootScope.logged = false;
            localStorage.clear();
            $state.go("app.login");
        }


    });
})();
