(function () {
    angular.module('convem.cadastro')
    .controller('CadastroCtrl', function ($scope, $state, cadastroService) {
        $scope.user = [];
        
        $scope.register = function () {
            if($scope.user.name && $scope.user.password1 && $scope.user.password2){
                // Campos obrigatórios preenchidos
                if ($scope.user.password1 === $scope.user.password2) {
                    //Senhas iguais
                    var registration = cadastroService.register($scope.user.name,$scope.user.password1);
                    registration.then(function success(data){
                       //PUT OK 
                       console.log(JSON.stringify(data));
                       if (data.status == 0){
                           // Registro feito com sucesso
                           console.log("Registro feito com sucesso");
                           $state.go("app.login");
                           
                       }
                       else {
                           // Registro falhou
                           console.warn("Registro Falhou ",data.message);
                           alert("Falha ao cadastrar");
                       }
                    }, function error(data){
                        //PUT Falhou
                        console.warn("CADASTRO_PUT_FAILED");
                        console.warn(data.message);
                        alert("Falha na comunicação com o servidor");
                    });
                }
                else {
                    //Senhas Diferentes
                    console.warn("Senhas Diferentes");
                    alert("Senhas diferentes");
                }
            }
            else {
                console.error("Há campo(s) obrigatório(s) vazio(s)");
                alert("Preencha todos os campos obrigatórios");
                return;
            }
        }
    });
})();