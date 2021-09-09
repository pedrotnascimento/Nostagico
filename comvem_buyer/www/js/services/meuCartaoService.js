(function () {
    angular.module('convem.cartao')

    .service('meuCartaoService', function ($http) {
        this.init = function (uid) {
            return $http.get('data/cartaoData/meuCartao.json'/*'http://54.94.209.21/convem/api/v1/user/'+uid+'/cards/'*/).then(function (response) {
                return response.data;
            });
        }
    });
})();