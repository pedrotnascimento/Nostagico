(function () {
    angular.module('convem.confirmaLocal')
    .controller('ConfirmaLocalCtrl', function ($scope, $state, $ionicLoading, $compile, sessionFactory) {
        $scope.complement = "";
        initialize();
        $scope.xxx = function () {
            var mapOptions = {
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            navigator.geolocation.getCurrentPosition(function (pos) {

                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                map.setZoom(16);
                $scope.myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), //new google.maps.LatLng(-22.9049575, -43.1794446),
                    map: map,
                    icon: "http://i.stack.imgur.com/JWM0W.png" || " ",
                    title: "Sua Posição"
                });
                //mostra endereço descritivo (geocoder)
                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;
                var posX = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//                var posX = { lat: -3.841957, lng: -32.410616 };
                // var posX = { lat: -22.902619, lng: -43.178846 };
                //Save User Coords
                sessionFactory.saveUserLat(pos.coords.latitude);
                sessionFactory.saveUserLng(pos.coords.longitude);
                
                geocodeLatLng(posX, geocoder, map, infowindow);

            });
        }
        function geocodeLatLng(latlng, geocoder, map, infowindow) {

    	
            geocoder.geocode({ 'location': latlng }, function (results, status) {
               // alert(JSON.stringify(results));
                    if (status === google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                        //map.setZoom(11);
                       // var marker = new google.maps.Marker({
                      //    position: latlng,
                      //    map: map
                      //  });
            
                        for(var i=0;results[0].address_components[i];i++){  
                            console.log("type"+i+": "+results[0].address_components[i].types[0]);
                            console.log("long"+i+": "+results[0].address_components[i].long_name);
                            
                           switch(results[0].address_components[i].types[0]){
                               case "premise":
                                    // Nome do lugar
                                    break;
                               case "street_number":
                                    // Número da casa
                                    sessionFactory.saveUserNumber(results[0].address_components[i].long_name);
                                    break;
                               case "route":
                                    // Rua
                                    sessionFactory.saveUserStreet(results[0].address_components[i].long_name);
                                    break;
                               case "sublocality_level_1":
                                    // Bairro
                                    sessionFactory.saveUserDistrict(results[0].address_components[i].long_name);
                                    break;
                               case "administrative_area_level_2":
                                    // Cidade
                                    sessionFactory.saveUserCity(results[0].address_components[i].long_name);
                                    break;
                               case "administrative_area_level_1":
                                    // Estado
                                    sessionFactory.saveUserState(results[0].address_components[i].long_name);
                                    break;
                               case "country":
                                    // País
                                    sessionFactory.saveUserCountry(results[0].address_components[i].long_name);
                                    break;
                               case "postal_code_prefix":
                                    // Zipcode prefix  (NÂO ESTÁ FUNCIONANDO COM O SERVIDOR)
                                    // sessionFactory.saveUserZipcode(results[0].address_components[i].long_name);
                                    break;
                               case "postal_code":
                                    // Zipcode
                                    sessionFactory.saveUserZipcode(results[0].address_components[i].long_name);
                                    break;
                           }
                            
                        }
                            
               //         console.log("xxx: "+results[0].address_components[0].postcode_localities[0]);

		                var string = results[0].formatted_address;
		                var rua  = string.split(',', 2);
                        var output = string.split('-',1);
                        console.log("s0: "+string);
		                string = results[1].formatted_address;
                      //  alert(string);
		                cidade = string.split('-',2);
                        console.log("s1: "+string);
                        console.log("rua: "+rua);
                        console.log("cidade: "+cidade);

                     //   infowindow.setContent(output);

                        document.getElementById("address").value = output;

                        //infowindow.open(map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        function initialize() {
            console.log("INIT_MAP");
            var myLatlng = new google.maps.LatLng(0, 0);

            var mapOptions = {
                center: myLatlng,
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            navigator.geolocation.getCurrentPosition(function (pos) {

                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                map.setZoom(16);
                $scope.myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), //new google.maps.LatLng(-22.9049575, -43.1794446),
                    map: map,
                    icon: "http://i.stack.imgur.com/JWM0W.png" || " ",
                    title: "Sua Posição"
                });
                //mostra endereço descritivo (geocoder)
                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;
                var posX = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//                var posX = { lat: -3.841957, lng: -32.410616 };
                // var posX = { lat: -22.902619, lng: -43.178846 };
                //Save User Coords
                sessionFactory.saveUserLat(pos.coords.latitude);
                sessionFactory.saveUserLng(pos.coords.longitude);
                
                geocodeLatLng(posX, geocoder, map, infowindow);

            });

            $scope.map = map;
        }
        
        $scope.executarPedido = function () {
            sessionFactory.saveUserComplement($scope.complement);
            $state.go("app.cardapio");
        }

        
       
    });
})();