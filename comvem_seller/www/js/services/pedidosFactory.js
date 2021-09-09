(function () {
    angular.module('convem.pedidos')
            .factory('pedidosFactory', function ($http, APIconfig, userFactory, utilFactory, localStorageService) {
                var ifor = 0;
                var factory = {};
                var sendJSON = {};
                var orders = {};


                factory.init = function () {
                    pos = userFactory.getPosition();
                    radius = userFactory.getRadius();
                    return $http.get(APIconfig.getPathOrder(pos, radius)).then(function (response) {
                        response.data.data.orders = threatData(response.data.data.orders);
                        return response.data;
                    });
                }

                factory.accept = function (orderid) {
                    return $http.post(APIconfig.getPathAcceptOrder(orderid), sendJSON).then(function (response) {
                        //TODO: tentar mais uma vez a aceitação caso ocorra pproblema?
                        sendJSON = {};//reseta JSON de envio
                    });
                }

                factory.remove = function (order) {
                    delete orders[order];
                    localStorageService.set('orders', orders);
                };

                factory.save = function (data) {
                    localStorageService.set('orders', data);
                    orders = data;
                };
    
                factory.load = function () {
                    objTemp = localStorageService.get('orders');
                    if (objTemp != null) {
                        orders= objTemp;
                        return orders;
                    }
                    orders = {};
                    return orders;
                };

                factory.stageItem = function (customerid, item) {
                    var tempBid = {};
                    tempBid.id = item.id;
                    tempBid.qty   = item.qty;
                    tempBid.price = item.price;
                    if (typeof (sendJSON.customerid )=== 'undefined') {
                        sendJSON.customerid = customerid;
                        sendJSON.bids = {};
                        sendJSON.bids[tempBid.id]= tempBid;
                        }
                    else {
                        sendJSON.bids[tempBid.id] = tempBid;
                    }
                }

                //factory.clear = function () {
                //    orders = {};
                //    localStorageService.setItem('orders', orders);
                //}
                
                var threatData = function (ordersRaw) {
                    objLen = Object.keys(orders).length;
                    for (var i in ordersRaw) {
                        //if (objLen > 0 && orders1[i].id == ordersRaw[i].id) {
                        if (i in orders){
                            ordersRaw[i] = orders[i];
                            continue;
                        }

                        ordersRaw[i].visited = false;
                        ordersRaw[i].new = true;
                        factory.calcTime(ordersRaw[i]);

                    }
                    return ordersRaw;
                }

                factory.calcTime = function (order) {
                    var tempoDeBid = 120;
                    var Now = new Date();
                    var tempDate = new Date(order.createdate);
                    tempDate.setSeconds(tempDate.getSeconds() + 120);
                    Now.setHours(Now.getHours() + 3);
                    msTime = tempDate.getTime() - Now.getTime();
                    if (msTime > 0) {
                        var time = new Date(msTime);
                        var expiringTime = time.getMinutes() * 60 + time.getSeconds();
                    }
                    else {
                        expiringTime = 0;
                    }

                    order.time = expiringTime;
                }

            return factory;
            });
})();   