(function () {
    angular.module('convem.myDelivery')

    .factory('historyFactory', function ($http, APIconfig) {
        var factory = {};

        factory.init = function () {

            return $http.get(APIconfig.getDeliveryHistory()).then(function (response) {
                if (response.data.data) {
                    return response.data;
                } else {
                    console.log('data is null');
                }
            });

        }


        return factory;

    });
})();