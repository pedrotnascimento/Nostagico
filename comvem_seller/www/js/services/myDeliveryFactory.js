(function () {
    angular.module('convem.myDelivery')
    .factory('myDeliveryFactory', function ($http, APIconfig, utilFactory, localStorageService) {
        var factory = {};
        var myDelivery = {};

        factory.init = function () {
            return $http.get(APIconfig.getPathDeliveries()).then(function (response) {
                if (response.data.data) {
                    treatData(response.data.data.deliveries);
                    resolveFinished(response.data.data.deliveries);
                    return response.data;
                } else {
                    console.log('data is null');
                }
            });
        }

        factory.save = function (data) {
            localStorageService.set('deliveries', data);
            myDelivery = data;
        }

        factory.load = function () {
            objTemp = localStorageService.get('deliveries');
            if (objTemp != null) {
                myDelivery = objTemp;
                return myDelivery;
            }

            myDelivery = {};
            return myDelivery;
            
        }

        var treatData = function (deliveries) {
            for (var i in deliveries) {
                //factory.myDeliveries iniciada e entrega já existe em myDeliveries-> faz nada
                if (i in myDelivery) {
                    deliveries[i] = myDelivery[i];
                    continue;
                }
                
                deliveries[i].BadgeColor = 'BADGE_VERDE';
                deliveries[i].visited = false;
                deliveries[i].new = true;
                factory.calcTime(deliveries[i]);
                
            }
        }//fim treatData

        //evaluates the time which rest to end
        factory.calcTime = function (delivery) {
            var timeForDelivery = 15 * 60;

            var Now = new Date();
            var time = new Date(delivery["deliver"].createdate);
            time.setSeconds(time.getSeconds() + timeForDelivery);
            Now.setHours(Now.getHours() + 3);
            var msTime = time.getTime() - Now.getTime();
            if (msTime > 0) {
                time = new Date(msTime);
                expiringTime = time.getMinutes() * 60 + time.getSeconds();
            }
            else {
                expiringTime = 0;
            }
                delivery.time = expiringTime;

        }

        var resolveFinished = function (deliveries ) {
            for( i in myDelivery){
                if(i in deliveries)
                    continue;
                delete myDelivery[i];
            }
        };

        var finish = function (deliverId, customerId) {
            var sendJSON = {};
            sendJSON.status = "CV";
            sendJSON.customerid = customerId;

            return $http.put(APIconfig.getPathDeliveries() + '/' + deliverId, sendJSON ).then(function(response){
                console.log(JSON.stringify(response));
                return response.data;
            });
        }

        return factory;

    });
})();
