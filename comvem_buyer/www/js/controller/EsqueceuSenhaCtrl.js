(function () {
    angular.module('convem.login')
    .controller('EsqueceuSenhaCtrl', function ($scope, $state, $timeout, $ionicPopup) {

        
        $scope.email = "";

        $scope.enviar = function (email) {

            //alert( email);
            if (email=== "") {
                $scope.emptyPopup();
                
            }
            else if (email=== undefined) {
                $scope.invalidPopup();
            }
            else  {

                $scope.enviarPopup();
            }



        }

        $scope.emptyPopup = function () {

            var Popup = $ionicPopup.show({
                title: 'Email vazio',
                scope: $scope
            });
            
            $timeout(function () {
                Popup.close();
            }, 1000);

        };
            

        $scope.invalidPopup = function () {

            var invalidPopup = $ionicPopup.show({
                title: 'Email invalido',
                scope: $scope
            });

            $timeout(function () {
                invalidPopup.close();
            }, 1000);
        };

        $scope.enviarPopup = function () {

            var enviarPopup = $ionicPopup.show({
                title: 'Sua senha será enviada para este email',
                scope: $scope
            });

            $timeout(function () {
                enviarPopup.close();

            }, 1500);
        };
    
    
    });
})();