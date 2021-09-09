(function () {
    angular.module('convem.login')

    .factory('userFactory', function ($http) {
        var factory = {};

        var user = {};
        user.pos = { lng: 0, lat: 0 };
        user.radius = 1000000 

        factory.logged = false;

        factory.setLogged = function (flag) {
            factory.logged = flag;
        };

        factory.getPosition = function () {
            return user.pos;
        }

        factory.getRadius = function () {
            return user.radius;
        }

        return factory;

    });
})();