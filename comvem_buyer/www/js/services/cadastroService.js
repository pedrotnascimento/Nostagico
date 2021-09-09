( function () {
    angular.module('convem.cadastro')
    .service('cadastroService', function ($http, APIconfig) {
        var service = this;
        
        service.register = function (uname,upass) {
            var putJson = '{"username":"'+uname+'", "password":"'+upass+'", "name":"'+uname+'"}';
            return $http.post(APIconfig.getPathUser(),putJson).then(function (response) {
                return response.data;
            });
        }
    });
})();