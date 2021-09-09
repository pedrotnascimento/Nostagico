(function () {
    angular.module('convem.myProducts')

    .factory('utilFactory', function ($http, $ionicPopup) {
        var factory = {};
        var ifor
        factory.getInx = function (array, id) {
            for (var inx = 0 ; inx < array.length; inx++) {
                if (array[inx].id === id) {
                    return inx;
                }
            }
            return -1;
        }

        factory.parseFloat_ng = function (str) {
            return parseFloat(str);
        }

        factory.parseInt_ng = function (str) {
            return parseInt(str);
        }

        factory.sumFields = function (array, field) {
            var sum = 0;
            for (ifor = 0 ; ifor < array.length ; ifor++)
                sum += parseFloat(array[ifor][field]);
            return sum;
        }

        factory.Popup = function (msg) {
            return function () {
                var alertPopup = $ionicPopup.alert({
                    title: msg
                });
            }
        };


        ///////////////////////////////////////////////////
        //mostra Meus {{substantivo}} ou minhas {{substantivo}}
        factory.genero = function (substantivo) {
            var length = substantivo.length;
            if (substantivo[length - 2] === 'a')
                return "Minhas " + substantivo;
            else
                if (substantivo[length - 2] === 'o')
                    return "Meus " + substantivo;
                else
                    return substantivo;
        }

        //isJsonNPM = require('is-json');
        /*
            console.log(isJSON({a:{"b":123, "c":123123}})); -> true, it's a object JSON
            console.log(isJSON(123));                       -> false,  it's a number
            console.log(isJSON('{a:{"b":123, "c":123123}}'));-> false, it's string
            console.log(canJSON("123"));                    -> false, string can't be a json object
            console.log(canJSON('{"a":"123"}'));            -> true, the string can be a Json object
         * 
         */
        factory.isJSON = function (obj) {
            try {
                strObj = JSON.stringify(obj);
                //return isJsonNPM(strObj);
            } catch (ex) {
                return false;
            }
        }

        factory.canJSON = function (str) {
            try {

                strObj = JSON.parse(str);
                //return isJsonNPM(strObj);
            } catch (ex) {
                return false;
            }
            //return isJsonNPM(str);
        }


        return factory;

    });
})();