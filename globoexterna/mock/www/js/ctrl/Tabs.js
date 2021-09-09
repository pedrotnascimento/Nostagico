(function(){
angular.module('starter')
.controller('Tabs', function($rootScope, $scope, $state, ionicTimePicker){
$rootScope.$on('$stateChangeStart',
function(event, toState, toParams, fromState, fromParams){
    $scope.tab_ = toState.name;
    
    // transitionTo() promise will be rejected with
    // a 'transition prevented' error
});
    $scope.apresentacaoIn = {};
    $scope.apresentacaoIn.H = 0;
    $scope.apresentacaoIn.M = 0;
    
    $scope.pickTime = function (){
     var timePickerObj = {
         callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getHours(), 'H :', selectedTime.getMinutes(), 'M');
        $scope.apresentacaoIn.H = selectedTime.getHours();
        $scope.apresentacaoIn.M = selectedTime.getMinutes();
    
      }
         },
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 24,
      step: 10,
      setLabel: 'OK',
      closeLabel: 'Fechar'
    };
    
      ionicTimePicker.openTimePicker(timePickerObj);
    }     
   $state.go('tabs.externaTab');

/*
datePicker.show({
  date: new Date(),
  mode: 'date'
}).then(
  date => console.log("Got date: ", date),
  err => console.log("Error occurred while getting date:", err)
);
*/
});
})();