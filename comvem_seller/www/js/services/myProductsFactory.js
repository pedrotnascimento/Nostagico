(function () {
    angular.module('convem.myProducts')

    .factory('myProductsFactory', function ($http, APIconfig) {
        var factory = {};
        factory.myProducts = [];
        factory.initFlag = 0;
        
        factory.init = function () {
            factory.initFlag = 1;
            return $http.get(APIconfig.getPathProducts()).then(function (response) {
                if (response.data.status == 0) {
                    response.data.data.products = treatProducts(response.data.data.products);
                }
                return response.data;
            });
        }

        factory.save = function (data) {
            factory.myProducts = data; 
        }

        factory.load = function () {
            return factory.myProducts;
        }


        factory.insert = function (prod) {
            var sendJSON = {
                products: [{
                    id: prod.id,
                    ref: prod.vendorref,
                    value: prod.price
                }]
            };
            return $http.post(APIconfig.getPathOperation(), sendJSON).then(function (response) {
                return response.data;
            });
        }

        factory.update = function (prod) {
            var sendJSON = {
                products: [{
                    id: prod.id,
                    ref: prod.vendorref,
                    value: prod.price
                }]
            };
            return $http.put(APIconfig.getPathOperation(), sendJSON).then(function (response) {
                return response.data;
            });
        }

        factory.delete = function (prod) {
            return $http.delete(APIconfig.getPathDeleteOp() + "/" + prod.id).then(function (response) {
                return response.data;
            });
        }
        
        var treatProducts = function (products) {
            tempProds = [];
            retrnProds = [];
            tempProds.categorynames = takeOffRepeated( fieldToList(products, "categoryname"));
            tempProds.categoryid = takeOffRepeated( fieldToList(products, "categoryid"));
            tempProds.products = [];
            for (var i = 0; i < tempProds.categorynames.length; i++) {
                tempProds.products[tempProds.products.length] = takesFieldValue(products,
                                                                                'categoryname',
                                                                                tempProds.categorynames[i]);
                retrnProds[retrnProds.length] = {categorynames: tempProds.categorynames[i], products:tempProds.products[tempProds.products.length-1]};

            }

            return retrnProds;    
        }

        //recebe um campo(field) de um array e um array e 
        //retorna uma lista com aqueles campos
        //[{a:1,b:2},{a:11,b:22}] ,  b ->  [2,22]
        var fieldToList = function (array, field) {
            var i = 0;
            var list = [];

            for (i = 0 ; i < array.length; i++) {
                list[list.length] = array[i][field];
            }
            return list;
        }

        //recebe um array com um campo e valor do campo
        //retorna os objetos que possuem o valor naquele campo
        // para um vetor que tem o campo b com valores 22, com array
        //array = [{a:1,b:2,c:33},{a:11,b:22, c:33}, {a:111,b:22, c:33}]
        //field = 'b'
        //value = 22 -->  
        //takesFieldValue (array,field,value) ->[{a:11,b:22, c:33}, {a:111,b:22, c:33}]
        var takesFieldValue = function (array, field, fieldValue) {
            var i = 0;
            var list = [];
            for (i = 0 ; i < array.length; i++) {
                if (array[i][field] == fieldValue) {
                    list[list.length] = angular.copy(array[i]);
                    array[i][field] = -1;
                }
            }
                return list;
        }


        var takeOffRepeated = function (array) {
            var i = 0, j=0;
            var retrn = [];
            var current;
            for (i = 0 ; i < array.length ; i++) {
                current = "";
                if (array[i] != -1) {
                    retrn.push(array[i]);
                    current = array[i];
                }
                for (j = i+1 ; j -1 < array.length; j++) {
                    if (array[j] == current) {
                        array[j] = -1;
                    }
                }
            }
            return retrn;
        }


        return factory;

    });
})();