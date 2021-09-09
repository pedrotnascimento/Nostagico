(function(){
angular.module('starter')
.controller('Index', function($scope, $state, $ionicPopup, $timeout){
    $scope.login = false;  
   $scope.goTabMain = function(){
       $scope.login = true;
       $state.go('tabs');
   }
  
  $scope.panicText = "";
  $scope.flame = function ()  {
      $scope.panicText =   $scope.panicText  + " " +  "Incêndio";
  }
  
  $scope.reinforcement = function () {
      $scope.panicText =   $scope.panicText  + " " +  "Reforcos";
  }
  
  $scope.medic =  function () {
      $scope.panicText =  $scope.panicText  + " " + "Médicos";
  } 
  
  $scope.panicBtn = function () {
      console.log("hey");
         var confirmPopup = $ionicPopup.confirm({
     title: '<h1 class="assertive">PÂNICO</h1>',
     template: '<div class="button button-large icon ion-flame" ng-click="flame()"></button></div>' +
                '<div class="button button-large icon ion-medkit" ng-click="medic()"></button></div>' +
                '<div class="button button-large icon ion-ios-people" ng-click="reinforcement()"></button></div>' +
                '<textarea ng-bind="panicText" placeholder="Detalhe o pânico"></textarea>',
    scope: $scope
                
   });
   
   confirmPopup.then(function(res){
       if(res){
            var panicCBack = $ionicPopup.show({
                    title: "Pânico enviado"
                });
            $timeout(function() {
                panicCBack.close(); //close the popup after 3 seconds for some reason
                }, 2000); 
       }     
        });
   }
});
})();    