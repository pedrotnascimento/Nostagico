( function () {
    angular.module('convem')
    .service('APIInterceptor', function ($rootScope, APIconfig){
        var service = this;
        var JWT = 'JWT';

        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.substr(position, searchString.length) === searchString;
            };
            }

        service.request = function (config) {
            if (config.url.startsWith(APIconfig.getPathAPI())) {
                console.log("CONFIG URL: " + config.url);

                var localJWT = localStorage.getItem(JWT);
                if (localJWT) {
                    console.log("Send: " + localJWT);
                    config.headers[JWT] = localJWT;
                }
                // console.log(JSON.stringify(config));
            }
            return config;
        }

        service.response = function (response) {
            if (response.config.url.startsWith(APIconfig.getPathAPI())) {
                if (response.data[JWT]) {
                    console.log("Recv: " + response.data[JWT]);
                    localStorage.setItem(JWT, response.data[JWT]);
                }
            }
            return response;
        }
        service.responseError = function (rejection) {
            console.log("responseError" + JSON.stringify(rejection));
            if (rejection.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return rejection;
        }
    });
})();
