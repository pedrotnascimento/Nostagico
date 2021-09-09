(function () {
    angular.module('convem.login')
    .controller('LogoutCtrl', function ($scope, $ionicActionSheet, $state, $ionicLoading) {
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Facebook  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
  //      $scope.user = UserService.getUser();
		
		
		$scope.userLogout = function () {
			if(localStorage.getItem('facebookLogin')) {
				//Logout with Facebook Plugin
				$ionicLoading.show({
					template: 'Saindo...'
				});

				// Facebook logout
				facebookConnectPlugin.logout(function(){
					$ionicLoading.hide();
					
					$state.go('app.login');//SUBSTITUIR WELCOME PELO STATE DESEJADO DEPOIS DE SE DESLOGAR
				},
				function(fail){
					$ionicLoading.hide();//AQUI PODE COLOCAR UM STATE CASO FALHE
				});
			}
			else {
				//Logout Simple session
				$ionicLoading.show({
					template: 'Saindo...'
				});
				
				localStorage.clear();
				
				$ionicLoading.hide();
				$state.go('app.login');
			}
		}
		
		
		$scope.showLogOutMenu = function() {
			var hideSheet = $ionicActionSheet.show({
				destructiveText: 'Logout',
				titleText: 'Já está saciado? Tem certeza que deseja se desconectar?',//FRASE DE PERGUNTA NO LOGOUT
				cancelText: 'Cancel',
				cancel: function() {},
				buttonClicked: function(index) {
					return true;
				},
				destructiveButtonClicked: function(){
					$ionicLoading.show({
					  template: 'Saindo...'
					});

			// Facebook logout
			facebookConnectPlugin.logout(function(){
			  $ionicLoading.hide();
			  
			  $state.go('app.login');//SUBSTITUIR WELCOME PELO STATE DESEJADO DEPOIS DE SE DESLOGAR
			},
			function(fail){
			  $ionicLoading.hide();//AQUI PODE COLOCAR UM STATE CASO FALHE
			});
				}
			});
		};
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  End Facebook  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    });
})();