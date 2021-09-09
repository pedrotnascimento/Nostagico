//@author Dirlei
//@modifications Rafael Bellotti


var cercas = [
    //EG
    {latitude: -22.957675, longitude: -43.404717, radius: 0.8046423539},
    {latitude: -22.960710, longitude: -43.408750, radius: 0.253523741},
    {latitude: -22.961744, longitude: -43.406338, radius: 0.18972047778095537}, //teste com raio maior que deveria
    {latitude: -22.962828, longitude: -43.404976, radius: 0.1437926185 },
    {latitude: -22.960978, longitude: -43.400414, radius: 0.3293714166 },
    {latitude: -22.959659, longitude: -43.397740, radius: 0.2264846454 },
    {latitude: -22.956871, longitude: -43.398072, radius: 0.24426106149},
    {latitude: -22.963060, longitude: -43.404115, radius: 0.06565024459 },
    
    //SP
    {latitude: -23.615084 , longitude: -46.697774, radius: 0.1414071921 },
    {latitude: -23.5652325 , longitude: -46.6514513, radius: 0.087993044123 },
    {latitude: -23.567949 , longitude: -46.650343, radius: 0.02658809244 },
    
    //JB
    {latitude: -22.964700 , longitude: -43.222060, radius: 0.08297506668 },
    {latitude: -22.965130 , longitude: -43.221825, radius: 0.0828729160929},
    {latitude: -22.964593, longitude: -43.221445, radius: 0.04839599221908},
    {latitude: -22.964329, longitude: -43.223048, radius: 0.043519199404},
    {latitude: -22.964135, longitude: -43.221237, radius: 0.0308319818},
    {latitude: -22.964740, longitude: -43.220432, radius: 0.02062893664},
    {latitude: -22.965310, longitude: -43.221534, radius: 0.04850352541},
    {latitude: -22.965506, longitude: -43.221224, radius: 0.04316167968},
    {latitude: -22.963510, longitude: -43.222092, radius: 0.03569206772},
    {latitude: -22.966089, longitude: -43.219968, radius: 0.04534025345},
    {latitude: -22.965501 , longitude: -43.229635, radius: 0.04574565815},/////////////////////////////
    {latitude: -22.965621, longitude: -43.229585 , radius: 0.04084730417},//Barão de Oliveira Castro 16
    {latitude: -22.965794, longitude: -43.229407 , radius: 0.06043290602},/////////////////////////////
    {latitude: -22.960545, longitude: -43.209374 , radius: 0.0843752594}, //Rua JB 266
    {latitude: -22.961751, longitude: -43.215403 , radius: 0.04143382751}, //Rua JB 518
    {latitude: -22.966039, longitude: -43.219356 , radius: 0.0304919}, //Rua JB 746
    {latitude: -22.980120, longitude: -43.223596 , radius: 0.082210352}, //Rua Bartolomeu Mitre 770
    {latitude: -22.980025, longitude: -43.223371 , radius: 0.0618195699}, //Rua Bartolomeu Mitre 770
    {latitude: -22.960710, longitude: -43.205646, radius: 0.03626420129058552}, //Rua JB 97
    {latitude: -22.975299, longitude: -43.227922, radius: 0.032686737000526152}, //R Marquês de São Vicente 30
    {latitude: -22.975239, longitude: -43.227834, radius: 0.018056372872980917}, //R Marquês de São Vicente 30
    {latitude: -22.950582, longitude:  -43.231037 , radius: 0.06383592945483159}, //estrada roquete pinto
    {latitude: -23.002211, longitude:-43.319895, radius: 0.04649124578419762}, //Av. das Americas 700
    {latitude: -23.003027, longitude:-43.316497 , radius: 0.08792545057335443}, //Av. das Americas 500
    {latitude: -22.982926, longitude:-43.218320 , radius: 0.022789793604909202}, //Av. Afrânio de Melo Franco 135
    {latitude: -22.982865, longitude:-43.218237 , radius:  0.016297723469605655}, //Av. Afrânio de Melo Franco 135
    {latitude: -22.982801, longitude:-43.218121, radius:  0.02465488159852857}, //Av. Afrânio de Melo Franco 135
    
    //Recife
    {latitude: -8.117596, longitude:-34.902824, radius:  0.029669300420325277},//antonio lumack do monte 96
    {latitude: -7.995098, longitude:-34.859402, radius:  0.055346248674574904},//rede globo nordeste
    {latitude: -7.994105, longitude:-34.859053, radius:  0.020043705766048203},//rede globo nordeste
    {latitude: -8.054980, longitude:-34.878156, radius:  0.07292857411280534},//rua da aurora 1027
    {latitude: -8.054534, longitude:-34.878105, radius:  0.04725797207318938},//rua da aurora 1027
    {latitude: -8.054613, longitude:-34.877734, radius:  0.037700300360604504},//rua da aurora 1027
    {latitude: -8.054746, longitude:-34.877338, radius:  0.034514887229043736},//rua da aurora 1027
    
    //BH
    {latitude: -19.901281, longitude:-43.963571, radius: 0.032497355618822936},//av. américio vespucio 2045
    {latitude: -19.901534, longitude:-43.963603, radius: 0.03191311521831157},//av. américio vespucio 2045
    {latitude: -19.901876, longitude:-43.963603, radius: 0.03401503049415314},//av. américio vespucio 2045
    {latitude: -19.902193, longitude:-43.963546, radius: 0.039063033285319654},//av. américio vespucio 2045
    {latitude: -19.902631, longitude:-43.963563, radius: 0.04432654414168979},//av. américio vespucio 2045
    {latitude: -19.902954, longitude:-43.963591, radius: 0.04359680411219165},//av. américio vespucio 2045
    {latitude: -19.903383, longitude:-43.963524, radius: 0.03702293558325638},//av. américio vespucio 2045
    {latitude: -19.970876, longitude:-43.929356, radius: 0.03375749872083858},//torre globo minas
    
    //DF
    {latitude: -15.7850481, longitude:-47.8887973, radius: 0.07781210327460544},//rede globo brasilia
    {latitude: -15.786286, longitude:-47.887333, radius: 0.02345392545914776},//predio varig 501
    {latitude: -15.786650, longitude: -47.887426, radius: 0.02126206994795902},//predio varig 501
    {latitude: -15.7907024, longitude: -47.8932335, radius: 0.020565974746555166},//torre de tv
    {latitude: -15.698814, longitude: -47.829794, radius: 0.022454257216893186},//tv digital
    {latitude: -15.995427, longitude: -48.052049, radius: 0.0262805327716066},//torre gama - df 480
    {latitude: -15.674457, longitude:-48.189056, radius: 0.03942364908687505},//torre brazlandia
    {latitude: -15.812713, longitude:-48.105442, radius: 0.016331853893863275},//torre ceilandia
    {latitude: -15.885013, longitude:-48.092206, radius: 0.020227624486633573},//torre samambaia
    {latitude: -15.885125, longitude:-48.092320, radius: 0.017847328133416964},//torre samambaia
    
    
    
    //////USO DA TOTVS --- COMENTAR QUANDO PUBLICAR O APLICATIVO//////////
   {latitude:-22.899831, longitude: -43.179108, /*radius: 0.01953208967504019*/radius: 0.08},    

]; 

var deg2rad = function (deg) {
	return deg * (Math.PI/180);
};
var gps = {};


var answer;

var getDistanceBetweenCoordsInKm = function (lat1, lon1, lat2, lon2) {
	var dLat = deg2rad(lat2-lat1),
		dLon = deg2rad(lon2-lon1);
	
	var a =
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = 6371 * c;

	return d;
};

/** Verifica se o ponto de referencia está dentro de alguma das "cercas" informadas
* @param {Object} coords - Coordenada de referencia
* @param {number} coords.latitude
* @param {number} coords.longitude
* @param {Object[]} fences - Array de cercas
* @param {number} fences[].latitude
* @param {number} fences[].longitude
* @param {number} fences[].radius
**/
function coordsInsideFences(coords,fences) {
    //alert(coords.latitude + "," + coords.longitude);
	var distance,
		inside = false;

	!ENV_PRODUCTION && Ti.API.info('coords → ' + JSON.stringify(coords));
	!ENV_PRODUCTION && Ti.API.info('fences → ' + JSON.stringify(fences));

	fences.forEach(function (fence) {
		/*if (!fence.longitude || !fence.latitude) {
			return false;
		}*/

		distance = getDistanceBetweenCoordsInKm(
			Number(coords.latitude), Number(coords.longitude),
			Number(fence.latitude), Number(fence.longitude));

		if (distance <= fence.radius) {
			inside = true;
		}

	});
	
	if (!inside)
	   custAlert("Utilização permitida somente nas dependências da Globo.");
	return inside;
}

function getGPS(){
        //custAlert(Ti.Geolocation.locationServicesEnabled);
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
        	Titanium.Geolocation.purpose = 'Get Current Location';
        	Titanium.Geolocation.getCurrentPosition(function(e) {
    	        if (e.error) {
    	        	custAlert ("Não foi possível encontrar sua localização. Tente novamente mais tarde.");
    	            answer = false;
    	        } else {
    	            //custAlert("latitude : " + e.coords.latitude + " longitude: " + e.coords.longitude);
    	            gps = {
                        latitude: e.coords.latitude,
                        longitude:e.coords.longitude
                    };  
    	            answer = true;
    	        }
        	});
    	} else {
    	    //custAlert('Por favor habilite sua localização.');
    	    dlgLocal.show();
            answer = false; 
    	
        }
}

function localPerm(){
    if (Ti.Geolocation.hasLocationPermissions()){
           getGPS();
    }
    else{
        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(evt) {
            if (evt.success){
                getGPS();  
            }
            else{
            	if (OS_ANDROID)
                	custAlert("O aplicativo não possui permissão para acessar sua localização. Por favor, atualize a permissão do aplicativo nas configurações");
                else
                	dlgLocal.show();
                answer = false;
            }
        }); 
    }
}

exports.checkLocal = function(){
    localPerm();
    if (answer){
        return coordsInsideFences(gps,cercas);
    }
    return false;
};

function configLocal(){
    if (OS_ANDROID){
        var settingsIntent = Titanium.Android.createIntent({
                action: 'android.settings.LOCATION_SOURCE_SETTINGS'
        });
        Ti.Android.currentActivity.startActivity(settingsIntent);
    }
    else{
    	var settingsURL = Ti.App.iOS.applicationOpenSettingsURL;
    	//var settingsURL = 'prefs:root=LOCATION_SERVICES';
		if (Ti.Platform.canOpenURL(settingsURL)) {
    		Ti.Platform.openURL(settingsURL);
		}
    }
}

var dlgLocal = Ti.UI.createAlertDialog({
   title: "CENTRAL 2777",
   message: "A sua localização é necessária para realizar esta operação. Deseja habilitar a localização nas configurações de seu dispositivo?",
   buttonNames:["Configurações","Cancelar"]
});

dlgLocal.addEventListener('click',function(e){
    if (e.index == 0)
        configLocal();
    dlgLocal.hide();
       
});
