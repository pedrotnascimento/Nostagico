(function () {


    angular.module('convem.contato')

    .controller('ContatoCtrl', function ($scope, $http) {

        $scope.mensagem= ""; //Inicia vazio

        $scope.enviar = function () {
            $scope.mensagem= "";
        };
        /*
        var oi = 'oi' ;
        
        $http.post('data/receive.json', oi)
        .success(
            function (oi, status) {
                $scope.PostDataResponse = oi;
            })
        .error(
            function (oi, status) {
                alert("ERROR");
                $scope.ResponseDetails = 'error';
                
            });
            */

    });//fim module
})();