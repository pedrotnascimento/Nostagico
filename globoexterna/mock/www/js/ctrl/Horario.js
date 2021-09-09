(function(){
angular.module('starter')
.controller('Horario', function( $scope, ionicTimePicker){
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
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.apresentacaoIn.H = selectedTime.getUTCHours();
        $scope.apresentacaoIn.M = selectedTime.getUTCMinutes();
    
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
});
})();
