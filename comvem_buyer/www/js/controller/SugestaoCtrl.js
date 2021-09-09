(function () {


    angular.module('convem.sugestao')

    .controller('SugestaoCtrl', function ($scope, $http) {

        $scope.sugestao = ""; //Inicia vazio

        $scope.enviar = function () {
            $scope.sugestao = "";
        };
        /*IAN PODERIA ME AJUDAR AQUI PRA ENVIAR DADOS(O TESTE ERA PRA ENVIAR PRA UM ARQUIVO NO HD)
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