(function () {
    angular.module('convem.cartao')

    .controller('MeuCartaoCtrl', function ($scope, meuCartaoService, sessionFactory) {

        var meuCartaoPromise = meuCartaoService.init(/*sessionFactory.getId()*/);
        meuCartaoPromise.then(function success(data) {
            separaCartao(data.cartoes);
        }, function error(data) {
            alert("Erro na comunicação com o servidor");
        });

        /* Função que separa o cartão favorito do resto da lista */
        function separaCartao(cartaoList) {
            var list = [];
            for (var i = 0; cartaoList[i]; i++) {
                if (cartaoList[i].favorito) {
                    $scope.favorito = cartaoList[i]; //Cartão Favorito
                }
                else {
                    list.push(cartaoList[i]);
                }
            }
            $scope.cartoes = list; //Lista com os demais cartões
        };

        $scope.trocaFavorito = function (id) {
            var cartaoList = [];
            if ($scope.favorito) {
                $scope.favorito.favorito = 0;
                cartaoList.push($scope.favorito);
                $scope.favorito = null;
            }

            for (var i = 0; $scope.cartoes[i]; i++) {
                if ($scope.cartoes[i].id == id) {
                    $scope.cartoes[i].favorito = 1;
                }
                cartaoList.push($scope.cartoes[i]);
            }
            separaCartao(cartaoList);
        }

        $scope.deletaCartao = function (id) {
            if ($scope.favorito.id == id) {
                // Escolhe outro como favorito e apaga
                if ($scope.cartoes.length == 0 && $scope.favorito) {
                    $scope.favorito = null;
                }
                for (var i = 0; $scope.cartoes[i]; i++) {
                    if ($scope.cartoes[i].id != id) {
                        $scope.favorito = $scope.cartoes[i];
                        $scope.cartoes.splice(i, 1);
                    }
                    else {
                        $scope.cartoes.splice(i, 1);
                    }
                }
            }
            else {
                //Apenas apaga
                for (var i = 0; $scope.cartoes[i]; i++) {
                    if ($scope.cartoes[i].id == id) {
                        $scope.cartoes.splice(i, 1);
                    }
                }
            }
        }
    });
})();