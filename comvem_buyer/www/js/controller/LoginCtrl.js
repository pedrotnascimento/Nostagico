(function () {
    angular.module('convem.login')
    .controller('LoginCtrl', function ($scope, $state, UserService, sessionFactory, $ionicLoading, $q, loginService) {
        $scope.user = [];
        $scope.user.name = "";
        $scope.user.password = "";
        
        checkSession();
        function checkSession () {
            if(localStorage.getItem('loggedIn') && localStorage.getItem('JWT')){
                //User already logged In
                $state.go("app.confirmaLocal");
            }
            else {
                var deviceToken = localStorage.getItem('deviceToken');
                console.log("TOKEN "+deviceToken);
                sendDeviceToken(deviceToken);
            }
        }
        
         function sendDeviceToken (deviceToken){
            var tokenResponse = loginService.deviceToken(deviceToken,ionic.Platform.platform());
            tokenResponse.then(function success(data) {
               // POST realizado com sucesso

                    if (data.status == 0){
                    // Token registrada com sucesso
                    //   console.log("Token registrada com sucesso  "+PUSHservice.getToken());
                       
                    }
                    else {
                        alert("Usuário e/ou senha incorretos");
                    }
  
             
           //    alert(JSON.stringify(data));
            }, function error(data) {
               // Falha ao tentar registrar o token
               alert("POST Error");
               console.log(data.message);
            });
        }
        // POST to server deviceToken and user platform

        $scope.entrar = function () {
            if ($scope.user.name && $scope.user.password) {
                var login = loginService.loginServer($scope.user.name, $scope.user.password);
                login.then(function success(data){
                    //POST funcionou
                    if (data.status == 0){
                        //Login ACEITO                        
                        localStorage.setItem('loggedIn',true);
                        console.log(data.message);
                        $state.go("app.confirmaLocal");
                    }
                    else {
                        //Login FALHOU
                        console.log("ENTRAR: " + data.message);
                    }
                },function error(data){
                    //POST falhou
                    console.log("LOGIN_POST_FAILED");
                })
            }
        }

        $scope.facebookSignIn2 = function (){
            loginService.loginFacebook();
        }

        $scope.routeCadastro = function () {
            $state.go("app.cadastro");
        }

        // Pedro Code
        $scope.esqueceuSenha = function () {
            $state.go("app.esqueceuSenha");

        }
        /* %%%%%%%%%%%%%%%%%%%%%%%%      Facebook  %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
        $scope.stringifyed = "something!!!"
		$scope.profileInfo = "NOTHING AT ALL"
        // This is the success callback from the login method
        var fbLoginSuccess = function (response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
            .then(function (profileInfo) {
                // For the purpose of this example I will store user data on local storage
                UserService.setUser({
                    authResponse: authResponse,
                    userID: profileInfo.id,
                    name: profileInfo.name,
                    email: profileInfo.email,
                    picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                });

				//xxxUMA VEZ SETADO O USUARIO ACIMA
				//VOCE PODE PEGAR OS DADOS COMO ABAIXO
				//$scope.profileInfo = UserService.getUser();
				//$scope.stringifyed = JSON.stringify($scope.profileInfo);


                $ionicLoading.hide();
                $state.go('app.confirmaLocal');
            }, function (fail) {
                // Fail get profile info
                console.log('profile info fail', fail);
            });
        };

        // This is the fail callback from the login method
        var fbLoginError = function (error) {
            console.log('fbLoginError', error);
            $ionicLoading.hide();
        };

        // This method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function (authResponse) {
            var info = $q.defer();

            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
              function (response) {
                  console.log(response);
                  info.resolve(response);
              },
              function (response) {
                  console.log(response);
                  info.reject(response);
              }
            );
            return info.promise;
        };

        //This method is executed when the user press the "Login with facebook" button
        $scope.facebookSignIn = function () {


            facebookConnectPlugin.getLoginStatus(function (success) {
                if (success.status === 'connected') {
                    // The user is logged in and has authenticated your app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed request, and the time the access token
                    // and signed request each expire
                    console.log('getLoginStatus', success.status);

                    // Check if we have our user saved
      //              var user = UserService.getUser('facebook');

                    if (!user.userID) {
                        getFacebookProfileInfo(success.authResponse)
                        .then(function (profileInfo) {
                            // For the purpose of this example I will store user data on local storage
                            UserService.setUser({
                                authResponse: success.authResponse,
                                userID: profileInfo.id,
                                name: profileInfo.name,
                                email: profileInfo.email,
                                picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
								//xxxAQUI É A IMAGEM DO PERFIL
                            });

							//xxxABAIXO SAO WORKAROUND QUE USEI PARA CONSEGUIR OS DADOS DO USUÁRIO
							//$scope.success = success.authResponse;
							//$scope.profileInfo = profileInfo;
							//$scope.picture = "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large";

                            $state.go('app.confirmaLocal');

                        }, function (fail) {
                            // Fail get profile info
                            console.log('profile info fail', fail);
                        });
                    } else {
                        $state.go('app.confirmaLocal');
                    }
                } else {
                    // If (success.status === 'not_authorized') the user is logged in to Facebook,
                    // but has not authenticated your app
                    // Else the person is not logged into Facebook,
                    // so we're not sure if they are logged into this app or not.

                    console.log('getLoginStatus', success.status);
					//alert("22222");

					//xxxABAIXO SAO WORKAROUND QUE USEI PARA CONSEGUIR OS DADOS DO USUÁRIO
					$scope.profileInfo = UserService.getUser();
					$scope.stringifyed = JSON.stringify($scope.profileInfo);

                    $ionicLoading.show({
                        template: 'Logging in...'
                    });

                    // Ask the permissions you need. You can learn more about
                    // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
                }
            });
		 };
         /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  End Facebook  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    })
    .service('UserService', function () {
        // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
        var setUser = function (user_data) {
            localStorage.setItem('facebookLogin',true);
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };

        var getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        return {
            getUser: getUser,
            setUser: setUser
        };
    });


	;
})();
