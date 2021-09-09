( function(){
    angular.module('convem')
    .factory('PUSHservice', function ($cordovaPush, $rootScope, $cordovaDevice, $ionicPlatform) {
      function register(accountId) {
            var device = {};
            var androidConfig = {
                "senderID": "458423735865",
            };
            var iOSConfig = {
                "badge": true,
                "sound": true,
                "alert": true
            };
            var config = androidConfig;

            $ionicPlatform.ready(function() {
                if (window.cordova) {
                    device = angular.extend(device, $cordovaDevice.getDevice());
                    if (!ionic.Platform.isAndroid()) {
                        config = iOSConfig;
                    }
                    $cordovaPush.register(config).then(function(result) {
                        if (!ionic.Platform.isAndroid()) {
                            device.token = result;
                            //FUNCAO PARA REGISTRAR DEVICE IOS NO BACKEND (device.token, device.platform);
                            console.log(device);
                        }
                    }, function(err) {
                        console.log('register-error', err);
                    });
                    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                        console.log('service', notification);
                        switch (notification.event) {
                            case 'registered':
                                if (notification.regid.length > 0 && ionic.Platform.isAndroid()) {
                                    device.token = notification.regid;
                                    //FUNCAO PARA REGISTRAR DEVICE ANDROID NO BACKEND (device.token, device.platform);
                                    console.log(device);
                                }
                                break;
                            case 'message':
                                $rootScope.$broadcast('push received', notification);
                                break;
                            case 'error':
                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        }

        return {
            register: register
        };
    })
})();