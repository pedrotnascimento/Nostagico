$.WidFechar.init({
    text: "MAPA",
    parent: $.winMapa,
});
var mapView;

$.vwCover.addEventListener('click',function(){
	$.vwCover.setVisible(false);
	if (OS_IOS)
		$.searchMap.blur();
	else
		Ti.UI.Android.hideSoftKeyboard();
});


$.vwLegenda.setVisible(false);
$.vwCover.setVisible(false);



$.searchMap.addEventListener('change',function(){
	$.vwCover.setVisible(true);
});
$.searchMap.addEventListener('focus',function(){
	$.vwCover.setVisible(true);
});

function fillAnnotation(anObj,pinColor){
	for (var key in anObj) {
	    if (anObj.hasOwnProperty(key)) {
	        var obj = anObj[key];
	
	        var annotation = maps.createAnnotation({
	            latitude: obj.latitude,
	            longitude: obj.longitude,
	            title: obj.title,
	            subtitle: obj.subtitle,
	            pincolor: pinColor,
	            image: obj.image,
	            rightView: obj.rightView
	            
	        });
			if (OS_IOS)
	        	mapView.addAnnotation(annotation);
	        else
	        	$.vwMap.addAnnotation(annotation);
	    }
	}
}

function showLegenda(){
    $.vwLegenda.setVisible(true);
    $.btnLegenda.removeEventListener('click',showLegenda);
    $.btnLegenda.title = "FECHAR";
    $.btnLegenda.addEventListener('click',hideLegenda);
}

function hideLegenda(){
    $.vwLegenda.setVisible(false);
    $.btnLegenda.title = "LEGENDA";
    $.btnLegenda.removeEventListener('click',hideLegenda);
    $.btnLegenda.addEventListener('click',showLegenda);
    
}

$.btnLegenda.addEventListener('click',showLegenda);
$.vwLegenda.addEventListener('click',hideLegenda);

//Annotations:
var pinRest;
if (OS_ANDROID){
	pinRest = '/images/pinRed2.png';
	pinMG = '/images/pinGrey2.png';
	pinMP = '/images/pinYellow2.png';
	pinPort = '/images/pinOrange2.png';
	pinCC = '/images/pinAzure2.png';
	pinServ = '/images/pinGreen2.png';
	pinSala = '/images/pinCyan2.png';
	pinEstac = '/images/pinPink2.png';
	pinOut = '/images/pinBlue2.png';
	pinPA = '/images/pinMagenta2.png';
	pinPred = '/images/pinPurple2.png';
} else {
	pinRest = '/images/pinRed.png';
	pinMG = '/images/pinGrey.png';
	pinMP = '/images/pinYellow.png';
	pinPort = '/images/pinOrange.png';
	pinCC = '/images/pinAzure.png';
	pinServ = '/images/pinGreen.png';
	pinSala = '/images/pinCyan.png';
	pinEstac = '/images/pinPink.png';
	pinOut = '/images/pinBlue.png';
	pinPA = '/images/pinMagenta.png';
	pinPred = '/images/pinPurple.png';
}

//Todos MGs
if(OS_ANDROID){
 var mg = {
	mg1 : {
		title: "MG1",
		latitude: -22.958728, 
		longitude: -43.406680 ,
		image: pinMG
	},
	mg1A : {
		title: "ESTÚDIO A",
		latitude: -22.958785, 
		longitude: -43.406245 ,
		image: pinMG
	},
	mg1B : {
		title: "ESTÚDIO B",
		latitude: -22.958691, 
		longitude: -43.406553,
		image: pinMG
	},
	mg1C : {
		title: "ESTÚDIO C",
		latitude: -22.958597, 
		longitude:  -43.406856,
		image: pinMG
	},
	mg1D : {
		title: "ESTÚDIO D",
		latitude: -22.958520, 
		longitude: -43.407145 ,
		image: pinMG
	},
	mg2 : { 
		title: "MG2",
		latitude: -22.958985, 
		longitude: -43.405338,
		image: pinMG
	},
	mg2e : { 
		title: "ESTÚDIO E",
		latitude: -22.959223, 
		longitude:  -43.405468,
		image: pinMG
	},
	mg2f : { 
        title: "ESTÚDIO F",
        latitude: -22.958665, 
        longitude: -43.405264,
        image: pinMG
    },
	mg3 : {
		title: "MG3",
		latitude: -22.957928, 
		longitude: -43.407528,
		image: pinMG
	},
	mg3ij : {
		title: "ESTÚDIOS I/J",
		latitude: -22.957678, 
		longitude: -43.407828,
		image: pinMG
	},
	mg3gh : {
		title: "ESTÚDIOS G/H",
		latitude: -22.957822, 
		longitude: -43.407347 ,
		image: pinMG
	},
	estDuv : {
        title: "ESTÚDIO DUVIVIE",
        latitude: -22.957123, 
        longitude: -43.402608,
        image: pinMG
    }
   /* videoShow : {
        title: "VÍDEO SHOW",
        latitude: -22.957849, 
        longitude: -43.407147 ,
        image: pinMG
    }, */
	
 };
}else {
	var mg = {
	mg1 : {
		title: "MG1",
		latitude: -22.958728, 
		longitude: -43.406680 ,
		image: pinMG
	},
	mg1A : {
		title: "ESTÚDIO A",
		latitude: -22.958705, 
		longitude: -43.406160 ,
		image: pinMG
	},
	mg1B : {
		title: "ESTÚDIO B",
		latitude: -22.958611, 
		longitude: -43.406453,
		image: pinMG
	},
	mg1C : {
		title: "ESTÚDIO C",
		latitude: -22.958517, 
		longitude:  -43.406756,
		image: pinMG
	},
	mg1D : {
		title: "ESTÚDIO D",
		latitude: -22.958440, 
		longitude: -43.407045 ,
		image: pinMG
	},
	mg2 : { 
		title: "MG2",
		latitude: -22.958985, 
		longitude: -43.405338,
		image: pinMG
	},
	mg2e : { 
		title: "ESTÚDIO E",
		latitude: -22.959223, 
		longitude:  -43.405468,
		image: pinMG
	},
	mg2f : { 
        title: "ESTÚDIO F",
        latitude: -22.958665, 
        longitude: -43.405264,
        image: pinMG
    },
	mg3 : {
		title: "MG3",
		latitude: -22.957928, 
		longitude: -43.407528,
		image: pinMG
	},
	mg3ij : {
		title: "ESTÚDIOS I/J",
		latitude: -22.957678, 
		longitude: -43.407828,
		image: pinMG
	},
	mg3gh : {
		title: "ESTÚDIOS G/H",
		latitude: -22.957822, 
		longitude: -43.407347 ,
		image: pinMG
	},
	estDuv : {
        title: "ESTÚDIO DUVIVIE",
        latitude: -22.957043, 
        longitude: -43.402508,
        image: pinMG
    }
  
 };
	
}

//Todas portarias
if(OS_ANDROID){
  var portarias = {
	PORTARIA1 : {
		title: "PORTARIA 1",
        latitude: -22.963169,
        longitude: -43.404453,
        image: pinPort
	},
	PORTARIA2 : {
		title: "PORTARIA 2",
        latitude: -22.961100, 
        longitude: -43.405630 ,
        image: pinPort
	},
	PORTARIA3 : {
		title: "PORTARIA 3",
        latitude: -22.9574386,
        longitude: -43.4049279,
        image: pinPort
	},
	PORTARIA4 :{
		title: "PORTARIA 4",
		latitude: -22.9565200,
		longitude: -43.403207,
		image: pinPort,
	},
	PORTARIA5 :{ 
		title: "PORTARIA 5",
		latitude: -22.957016, 
		longitude: -43.401876,
		image: pinPort
	},
  };
} else {
	var portarias = {
	PORTARIA1 : {
		title: "PORTARIA 1",
		latitude: -22.963169,
		longitude: -43.404453,
		image: pinPort
	},
	PORTARIA2 : {
		title: "PORTARIA 2",
        latitude: -22.961100, 
        longitude: -43.405630 ,
        image: pinPort
	},
	PORTARIA3 : {
		title: "PORTARIA 3",
        latitude: -22.9574386,
        longitude: -43.4049279,
        image: pinPort
	},
	PORTARIA4 :{
		title: "PORTARIA 4",
		latitude: -22.9565200,
		longitude: -43.403207,
		image: pinPort,
	},
	PORTARIA5 :{ 
		title: "PORTARIA 5",
		latitude: -22.957016, 
		longitude: -43.401876,
		image: pinPort
	},
  };
	
	
}

//Todos CCs
var cc = {

	cc1 : {
		title: "CC1",
		latitude: -22.956043, 
		longitude: -43.408531, 
		image: pinCC
	},
	cc2 : {
		title: "CC2",
		latitude: -22.955549, 
		longitude: -43.403152, 
		image: pinCC
	},
	cc3: {
		title: "CC3",
		latitude: -22.958129, 
		longitude: -43.402243,  
		image: pinCC
	},
	
};

//Todos MPs
if(OS_ANDROID){
  var mp = {
	mp1 : {
		title: "MP1",
		latitude: -22.957791, 
		longitude: -43.406278 ,
		subtitle: "Amarelo" ,
		image: pinMP
	},
	mp2: {
		title: "MP2",
		latitude: -22.957653, 
		longitude: -43.406679 ,
		subtitle: "Azul Claro",
		image: pinMP
	},
	mp3: {
		title: "MP3",
		latitude: -22.957218, 
		longitude: -43.407118 ,
		subtitle: "Branco",
		image: pinMP
	},
	mp4: {
		title: "MP4",
		latitude: -22.957091, 
		longitude: -43.407360,
		subtitle: "Azulão",
		image: pinMP
	},
	mp5: {
		title: "MP5",
		latitude: -22.957679, 
		longitude: -43.405941 ,
		subtitle: "Salmão",
		image: pinMP
	},
	mp6: {
		title: "MP6",
		latitude: -22.957343,
		longitude:  -43.406741  ,
		subtitle: "Pessego",
		image: pinMP
	},
	mp7: {
		title: "MP7",
		latitude: -22.957231, 
		longitude: -43.406324 ,
		subtitle: "Verde",
		image: pinMP
	},
  };
} else {
	 var mp = {
	mp1 : {
		title: "MP1",
		latitude: -22.957700, 
		longitude: -43.406200 ,
		subtitle: "Amarelo" ,
		image: pinMP
	},
	mp2: {
		title: "MP2",
		latitude: -22.957620, 
		longitude: -43.406480 ,
		subtitle: "Azul Claro",
		image: pinMP
	},
	mp3: {
		title: "MP3",
		latitude: -22.957178, 
		longitude: -43.407018 ,
		subtitle: "Branco",
		image: pinMP
	},
	mp4: {
		title: "MP4",
		latitude: -22.957091, 
		longitude: -43.407360,
		subtitle: "Azulão",
		image: pinMP
	},
	mp5: {
		title: "MP5",
		latitude: -22.957679, 
		longitude: -43.405840 ,
		subtitle: "Salmão",
		image: pinMP
	},
	mp6: {
		title: "MP6",
		latitude: -22.957263,
		longitude:  -43.406641  ,
		subtitle: "Pessego",
		image: pinMP
	},
	mp7: {
		title: "MP7",
		latitude: -22.957180, 
		longitude: -43.406200 ,
		subtitle: "Verde",
		image: pinMP
	},
  };
}

//Restaurantes tem subtitle = Restaurante
if(OS_ANDROID) {
  var rest = {
	saborEst : {
		title: "SABOR DAS ESTRELAS",
		latitude: -22.958392, 
		longitude: -43.407184,
		image: pinRest
	},
	restExec : {
		title: "PRAÇA 2 / RESTAURANTE EXECUTIVO",
		latitude: -22.958220, 
		longitude: -43.405120,
		image: pinRest,
		subtitle: "BOB'S\nBON GRILLÊ\nCASA DO PÃO DE QUEIJO\nEMPORIUM PAX\nLA FRUTERIA\nPALETECA\nPOLIS SUCOS",
	    
	},
	bJornal : {
		title: "BANCA DE JORNAL",
		latitude: -22.961200, 
		longitude: -43.405956 , 
		image: pinRest
	},
	peFruta : {
		title: "PÉ DA FRUTA",
		latitude: -22.959095, 
		longitude: -43.406207,
		image: pinRest
	},
	foodtruck1 : {
		title: "FOOD TRUCK CRIAÇÃO",
		latitude: -22.960705,
		longitude: -43.406500,
		image: pinRest
	},
	asBentas : {
		title: "AS BENTAS",
		latitude: -22.958082, 
		longitude:  -43.402780,
		image: pinRest
	},
	foodtruck2 : {
		title: "FOOD TRUCK MP",
		latitude: -22.957564, 
		longitude:  -43.406352,
		image: pinRest
	},
	mac : {
		title: "RESTAURANTE MAC",
		latitude: -22.956613, 
		longitude:  -43.405673,
		image: pinRest
	},
	subway1 : {
		title: "SUBWAY",
		latitude: -22.960999, 
		longitude: -43.406093,
		image: pinRest
	},
	restMais : {
		title: "RESTAURANTE +",
		latitude: -22.961235, 
		longitude: -43.406100,
		image: pinRest
	},
	restTer1 : {
		title: "RESTAURANTE TERCEIROS I",
		latitude: -22.961689, 
		longitude: -43.406105,
		image: pinRest
	},
	restTer2 : {
		title: "RESTAURANTE TERCEIROS II",
		latitude: -22.956544, 
		longitude: -43.403828,
		image: pinRest 
	},
	reiMate1 : {
		title: "REI DO MATE",
		latitude: -22.956411, 
		longitude: -43.403237,
		image: pinRest 
	},
	reiMate2 : {
		title: "REI DO MATE",
		latitude: -22.957291,
		longitude:  -43.401952,
		image: pinRest 
	},
	restFig : {
		title: "RESTAURANTE FIGURANTES",
		latitude: -22.956630, 
		longitude: -43.401299,
		image: pinRest 
	},
  };
}else {

// CRIA VIEW DA PRAÇA 2 /////////////////////////////////	
	var vwPraca2 = Ti.UI.createView({
		height: 50,
		width: 50
	});
	
	var vwPraca2Full = Ti.UI.createView({
		height: 200,
		width: 305,
		borderRadius: 3,
		backgroundColor: "white"
	});
	
	var lblPraca2Title = Ti.UI.createLabel({
		text: "PRAÇA 2 / RESTAURANTE EXECUTIVO",
		font: {fontWeight:'bold'},
		
		top: 3,
		
	});
	var lblPraca2Text = Ti.UI.createLabel({
		text: "BOB'S\nBON GRILLÊ\nCASA DO PÃO DE QUEIJO\nEMPORIUM PAX\nLA FRUTERIA\nPALETECA\nPOLIS SUCOS ",
		font: {fontSize:13},
		left: 5,
		top: 30
	});
	var btnPraca2Fechar = Ti.UI.createButton({
		title: "FECHAR",
		borderRadius: 5,
		backgroundColor: "#169bd5",
		color: "white",
		width: 90,
		bottom: 5
		
	});
	
	btnPraca2Fechar.addEventListener('click', function(){
		vwPraca2Full.setVisible(false);
	});
	vwPraca2Full.add(lblPraca2Title);
	vwPraca2Full.add(lblPraca2Text);
	vwPraca2Full.add(btnPraca2Fechar);
	
	vwPraca2Full.setVisible(false);
	$.winMapa.add(vwPraca2Full);
	
	var btnPraca2 = Ti.UI.createButton({
		title: "VER +",
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	btnPraca2.addEventListener('click', function(){
	 vwPraca2Full.setVisible(true);
	});
	vwPraca2.add(btnPraca2);

	 var rest = {
	 	
	saborEst : {
		title: "SABOR DAS ESTRELAS",
		latitude: -22.958392, 
		longitude: -43.407184,
		image: pinRest
	},
	restExec : {
		title: "PRAÇA 2 / REST. EXECUTIVO ",
		latitude: -22.958220, 
		longitude: -43.405120,
		image: pinRest,
		rightView: vwPraca2,
		
		subtitle: "Bob's, Bon Grillê, C. do Pão de Queijo, Emporium Pax, La Fruteria, Polis Sucos"	
	   // subtitle: "BOB'S\nBON GRILLÊ\nCASA DO PÃO DE QUEIJO\nEMPÓRIO PAX\nLA FRUTERIA\nPALETECA\nPOLIS SUCOS",
	},
	bJornal : {
		title: "BANCA DE JORNAL",
		latitude: -22.961200, 
		longitude: -43.405956 , 
		image: pinRest
	},
	peFruta : {
		title: "PÉ DA FRUTA",
		latitude: -22.959095, 
		longitude: -43.406207,
		image: pinRest
	},
	foodtruck1 : {
		title: "FOOD TRUCK CRIAÇÃO",
		latitude: -22.960705,
		longitude: -43.406500,
		image: pinRest
	},
	asBentas : {
		title: "AS BENTAS",
		latitude: -22.957483,
		longitude:  -43.401862,
		image: pinRest
	},
	foodtruck3 : {
		title: "FOOD TRUCK",
		latitude: -22.95763,
		longitude:  -43.40202,
		image: pinRest
	},
	foodtruck2 : {
		title: "FOOD TRUCK MP",
		latitude: -22.957564, 
		longitude:  -43.406352,
		image: pinRest
	},
	mac : {
		title: "MAC (RESTAURANTE)",
		latitude: -22.956613, 
		longitude:  -43.405673,
		image: pinRest
	},
	subway1 : {
		title: "SUBWAY",
		latitude: -22.960999, 
		longitude: -43.406093,
		image: pinRest
	},
	restMais : {
		title: "RESTAURANTE +",
		latitude: -22.961235, 
		longitude: -43.406100,
		image: pinRest
	},
	restTer1 : {
		title: "RESTAURANTE TERCEIROS I",
        latitude: -22.961689, 
        longitude: -43.406105,
        image: pinRest
	},
	restTer2 : {
		title: "RESTAURANTE TERCEIROS II",
		latitude: -22.956544, 
		longitude: -43.403828,
		image: pinRest 
	},
	reiMate1 : {
		title: "REI DO MATE",
		latitude: -22.956411, 
		longitude: -43.403237,
		image: pinRest 
	},
	reiMate2 : {
		title: "REI DO MATE",
		latitude: -22.957291,
		longitude:  -43.401952,
		image: pinRest 
	},
	restFig : {
		title: "RESTAURANTE FIGURANTES",
		latitude: -22.956561, 
		longitude: -43.401155,
		image: pinRest 
	},
  };
}


//Serviços
var serv = {
    malote : {
        title: "MALOTE",
        subtitle: "2444-4540",
        latitude: -22.962838, 
        longitude: -43.404190 ,
        image: pinServ
    },
	werner : {
		title: "WERNER",
		subtitle: "2444-8601",
		latitude: -22.960535, 
		longitude: -43.406649, 
		image: pinServ
	},
	planta : {
		title: "PLANTÁRIO E FLORICULTURA",
		subtitle: "2444-4247",
		latitude: -22.959585, 
		longitude: -43.405542,
		image: pinServ
	},
	brgIncen : {
		title: "BRIGADA DE INCÊNDIO",
		subtitle: "2444-5555",
		latitude: -22.958695, 
		longitude: -43.408301,
		image: pinServ  
	},
	/*itau : {
		title: "ITAÚ",
		latitude: -22.961350, 
		longitude: -43.405875, 
		image: pinServ,
	},*/
	
	pMedico : {
		title: "POSTO MÉDICO",
		subtitle:"2444-4777",
		latitude: -22.961464, 
		longitude: -43.406421, 
		image: pinServ
	},
	pacheco : {
		title: "PACHECO",
		subtitle:"2444-4990",
		latitude: -22.961353, 
		longitude: -43.406702, 
		image: pinServ
	},
	ctCopias : {
		title: "CT CÓPIAS",
		subtitle:"2444-4455",
		latitude: -22.961168, 
		longitude: -43.406965, 
		image: pinServ
	},
	/*santanderBradesco : {
		title: "SANTANDER E BRADESCO",
		latitude: -22.960949,  
		longitude: -43.406792, 
		image: pinServ
	},*/
	catPes : {
		title: "CENTRAL DE P&S",
		subtitle: "2540-2777",
		latitude: -22.961668, 
		longitude: -43.406460 , 
		image: pinServ
	},
	achadosPerd : {
		title: "ACHADOS E PERDIDOS",
		subtitle: "2444-7331",
		latitude: -22.963237, 
		longitude: -43.404667, 
		image: pinServ
	},
	floric : {
        title: "FLORICULTURA",
        subtitle: "2444-5574",
        latitude: -22.959013, 
        longitude: -43.407212 , 
        image: pinServ
    },	
};

//SALAS DE REUNIÃO
var salas = {
	s2803 : {
		title: "SALA DE REUNIÃO 2803",
		latitude: -22.960904, 
		longitude: -43.405810 , 
		image: pinSala
	},
	s911 : {
        title: "SALA DE REUNIÃO 911",
        latitude: -22.957723, 
        longitude: -43.405919, 
        image: pinSala
    },
	s5010 : {
		title: "SALA DE REUNIÃO 5010",
		latitude: -22.958401, 
		longitude: -43.405049,
		image: pinSala 
	},
	s3046 : {
		title: "SALA DE REUNIÃO 3046",
		latitude: -22.957687, 
		longitude: -43.407689,
		image: pinSala 
	},
	s444e454b : {
		title: "SALAS DE REUNIÃO 444 e 454B",
		latitude: -22.960653, 
		longitude: -43.407500 , 
		image: pinSala
	},
	s1a6 : {
		title: "SALAS DE REUNIÃO 1 a 6",
		latitude: -22.962784, 
		longitude: -43.404036 , 
		image: pinSala
	},
	s825 : {
		title: "SALA DE REUNIÃO 825",
		latitude: -22.956417, 
		longitude: -43.403646 ,
		image: pinSala
	},
	s1904 : {
		title: "SALA DE REUNIÃO 1904",
		latitude: -22.957345, 
		longitude:  -43.406731,
		image: pinSala
	},
	
};

//ESTACIONAMENTOS
var estac = {
	estacA2 : {
		title: "ESTACIONAMENTO A2",
		latitude: -22.962130,
		longitude:  -43.405079, 
		image: pinEstac
	},
	
	estacB2 : {
		title: "ESTACIONAMENTO B2",
		latitude: -22.960654, 
		longitude: -43.404992 , 
		image: pinEstac
	},
	estacA3 : {
		title: "ESTACIONAMENTO A3",
		latitude: -22.956848, 
		longitude: -43.404697,
		image: pinEstac
	},
	estacB3 : {
		title: "ESTACIONAMENTO B3",
		latitude: -22.958591, 
		longitude: -43.404169 ,
		image: pinEstac
	},
	estacB5 : {
		title: "ESTACIONAMENTO B5",
		latitude: -22.957312, 
		longitude: -43.400584 ,
		image: pinEstac
	},
};

//Todos os outros que não se encaixaram em um perfil
if(OS_ANDROID) {
  var outros = {
    ete : {
        title: "ETE",
        latitude: -22.962729, 
        longitude: -43.406338  ,
        image: pinOut
    },
	lago : {
		title: "LAGO",
		latitude: -22.956566, 
		longitude: -43.408135, 
		image: pinOut
	},
	/*eDeCasa : {
		title: "É DE CASA",
		latitude: -22.958024, 
		longitude: -43.404203, 
		image: pinOut
	},*/
	
	
	/*BBB : {
		title: "BBB",
		image: pinOut,
		latitude: -22.956524, 
		longitude: -43.408925 , 
	},*/
	pae : {
		title: "PAE",
		latitude: -22.956769, 
		longitude: -43.407963,
		image: pinOut
	},
	se9 : {
		title: "SE 9",
		latitude: -22.956977, 
		longitude: -43.406649,
		image: pinOut
	},
	cag2 : {
		title: "COGERAÇÃO/CAG2",
		latitude: -22.959049, 
		longitude: -43.409119,
		image: pinOut
	},
	
	cag1 : {
		title: "CAG1",
		latitude: -22.959248, 
		longitude: -43.407048,
		image: pinOut
	},
	eta : {
		title: "ETA",
		latitude: -22.959170, 
		longitude: -43.407376,
		image: pinOut
	},
	eixo300:{
		title: "EIXO 300",
		latitude:  -22.959734,
		longitude:  -43.407023, 
		image: pinOut
	},
	areaIndustrial : {
		title: "ÁREA INDUSTRIAL",
		latitude: -22.960839, 
		longitude: -43.407022,
		image: pinOut 
	},
	/*glpEfeitos : {
		title: "GALPÃO DE EFEITOS",
		latitude: -22.961591, 
		longitude: -43.402347,
		image: pinOut
	},*/
	
	sub138 : {
		title: "SUBESTAÇÃO 138KV",
		latitude: -22.957750, 
		longitude: -43.397455,
		image: pinOut
	},
	
	heliponto : {
		title: "HELIPONTO",
		latitude: -22.960111, 
		longitude: -43.405964 ,
		image: pinOut
	},
	cntRes : {
		title: "CENTRAL DE RESÍDUOS",
		latitude: -22.961926, 
		longitude: -43.407655 ,
		image: pinOut
	},
	
	/*dancaFam : {
		title: "DANÇA DOS FAMOSOS",
		latitude: -22.962831, 
		longitude: -43.405200,
		image: pinOut
	},*/
	reservA : {
		title: "RESERVATÓRIO A",
		latitude: -22.962719, 
		longitude: -43.404599,
		image: pinOut
	},
/*	theVoice : {
		title: "THE VOICE",
		latitude: -22.956040, 
		longitude: -43.403273,
		image: pinOut
}, */
	igjMult : {
		title: "IGREJA MULTIUSO",
		latitude: -22.956555, 
		longitude: -43.401711,
		image: pinOut 
	},
	armaZ : {
		title: "ARMA Z.",
		latitude: -22.957445, 
		longitude: -43.398129,
		image: pinOut
	},
	/*maisVoce : {
		title: "MAIS VOCÊ",
		latitude: -22.955652, 
		longitude: -43.409212,
		image: pinOut 
	},*/
		
	
  };
} else {
	
	var outros = {
    ete : {
        title: "ETE",
        latitude: -22.962729, 
        longitude: -43.406338  ,
        image: pinOut
    },
	lago : {
		title: "LAGO",
		latitude: -22.956566, 
		longitude: -43.408135, 
		image: pinOut
	},
	/*eDeCasa : {
		title: "É DE CASA",
		latitude: -22.958024, 
		longitude: -43.404203, 
		image: pinOut
	},*/
	
	
	/*BBB : {
		title: "BBB",
		image: pinOut,
		latitude: -22.956524, 
		longitude: -43.408925 , 
	},*/
	pae : {
		title: "PAE",
		latitude: -22.956769, 
		longitude: -43.407963,
		image: pinOut
	},
	se9 : {
		title: "SE 9",
		latitude: -22.956977, 
		longitude: -43.406649,
		image: pinOut
	},
	cag2 : {
		title: "COGERAÇÃO/CAG2",
		latitude: -22.959049, 
		longitude: -43.409119,
		image: pinOut
	},
	
	cag1 : {
		title: "CAG1",
		latitude: -22.959248, 
		longitude: -43.407048,
		image: pinOut
	},
	eta : {
		title: "ETA",
		latitude: -22.959170, 
		longitude: -43.407376,
		image: pinOut
	},
	eixo300:{
		title: "EIXO 300",
		latitude:  -22.959734,
		longitude:  -43.406923, 
		image: pinOut
	},
	areaIndustrial : {
		title: "ÁREA INDUSTRIAL",
		latitude: -22.960839, 
		longitude: -43.407022,
		image: pinOut 
	},
	/*glpEfeitos : {
		title: "GALPÃO DE EFEITOS",
		latitude: -22.961591, 
		longitude: -43.402347,
		image: pinOut
	},*/
	
	sub138 : {
		title: "SUBESTAÇÃO 138KV",
		latitude: -22.957750, 
		longitude: -43.397455,
		image: pinOut
	},
	
	heliponto : {
		title: "HELIPONTO",
		latitude: -22.960111, 
		longitude: -43.405964 ,
		image: pinOut
	},
	cntRes : {
		title: "CENTRAL DE RESÍDUOS",
		latitude: -22.961926, 
		longitude: -43.407655 ,
		image: pinOut
	},
	
	/*dancaFam : {
		title: "DANÇA DOS FAMOSOS",
		latitude: -22.962831, 
		longitude: -43.405200,
		image: pinOut
	},*/
	reservA : {
		title: "RESERVATÓRIO A",
		latitude: -22.962719, 
		longitude: -43.404599,
		image: pinOut
	},
/*	theVoice : {
		title: "THE VOICE",
		latitude: -22.956040, 
		longitude: -43.403273,
		image: pinOut
}, */
	igjMult : {
		title: "IGREJA MULTIUSO",
		latitude: -22.956555, 
		longitude: -43.401711,
		image: pinOut 
	},
	armaZ : {
		title: "ARMA Z.",
		latitude: -22.957445, 
		longitude: -43.398129,
		image: pinOut
	},
	/*maisVoce : {
		title: "MAIS VOCÊ",
		latitude: -22.955652, 
		longitude: -43.409212,
		image: pinOut 
	},*/
		
	
  };
  
	
}

var pa = {
    pulmao : {
        title: "PULMÃO",
        latitude: -22.956522, 
        longitude:-43.407617  ,
        image: pinPA
    },
	pa20 : {
		title: "PA 20",
		latitude: -22.961832, 
		longitude: -43.406556,
		image: pinPA
	},
	pa17 : {
		title: "PA 17",
		latitude: -22.959646, 
		longitude: -43.402754 ,
		image: pinPA
	},
	pa15 : {
		title: "PA 15",
		latitude: -22.958741, 
		longitude: -43.402980 ,
		image: pinPA
	},
	pa09 : {
		title: "PA 09",
		latitude: -22.958411, 
		longitude: -43.402682 ,
		image: pinPA
	},
	pa18 : {
		title: "PA 18",
		latitude: -22.957960, 
		longitude: -43.402730 ,
		image: pinPA
	},
	pa13 : {
		title: "PA 13",
		latitude: -22.957162, 
		longitude: -43.402258 ,
		image: pinPA
	},
	pa11 : {
		title: "PA 11",
		latitude: -22.957318, 
		longitude: -43.401700,
		image: pinPA
	},
	pa16 : {
		title: "PA 16",
		latitude: -22.957402, 
		longitude: -43.400877,
		image: pinPA
	},
	
	
	pa04 : {
		title: "PA 04",
		latitude: -22.955940, 
		longitude: -43.403555,
		image: pinPA
	},
	pa05 : {
		title: "PA 05",
		latitude: -22.955074, 
		longitude: -43.403027,
		image: pinPA
	},
	pa06 : {
		title: "PA 06",
		latitude: -22.956097, 
		longitude: -43.407218 ,
		image: pinPA, 
	}, 
	pa03 : {
		title: "PA 03",
		latitude: -22.956463, 
		longitude: -43.402190  ,
		image: pinPA
	}, 
	pa02 : {
		title: "PA 02",
		latitude:-22.956867,  
		longitude: -43.400271  ,
		image: pinPA 
	}, 
	pa01 : {
		title: "PA 01",
		latitude:-22.957617, 
		longitude: -43.397946  ,
		image: pinPA
	}, 
	pa08 : {
		title: "PA 08",
		latitude: -22.957162, 
		longitude: -43.408262 ,
		image: pinPA
	}, 
	pa07 : {
		title: "PA 07",
		latitude: -22.956250,
		longitude:  -43.409109 ,
		image: pinPA
	}, 
	pa12 : {
		title: "PA 12",
		latitude: -22.956920, 
		longitude:  -43.408618  ,
		image: pinPA
	}, 
};

//Predios/Galpões
var predios = {
	mac : {
		title: "MAC",
		latitude: -22.956623, 
		longitude:  -43.405573,
		image: pinPred
	},
		ccs : {
		title: "CCS",
		latitude: -22.960744, 
		longitude: -43.407004,
		image: pinPred
	},
	ccr : {
		title: "CCR",
		latitude: -22.960850, 
		longitude: -43.406953,
		image: pinPred
	},
	
	cdeETecnologia : {
		title: "CDE E TECNOLOGIA",
		latitude: -22.961574, 
		longitude: -43.407246,
		image: pinPred
	},
	almoxarifa : {
		title: "ALMOXARIFADO CENTRAL",
		latitude: -22.961335, 
		longitude: -43.407395,
		image: pinPred
	},
	fabCen : {
		title: "FÁBRICA DE CENÁRIOS",
		latitude: -22.960924, 
		longitude: -43.408127,
		image: pinPred
	},
	benFig : {
		title: "BENEFICIAMENTO DE FIGURINO",
		latitude: -22.960709, 
		longitude: -43.408545,
		image: pinPred
	},
	escBrit : {
		title: "ESCOLA BRITÂNICA",
		latitude: -22.962275, 
		longitude: -43.409375,
		image: pinPred
	},

	mntCar : {
		title: "MANUT. CARRINHOS",
		latitude: -22.962454, 
		longitude: -43.406479 ,
		image: pinPred
	},
	ct : {
		title: "CENTRO DE TREINAMENTO",
		latitude: -22.962658, 
		longitude: -43.405510 ,
		image: pinPred
	},
	dpCen : {
		title: "DEPÓSITO DE PEÇAS CENOGRÁFICAS",
		latitude: -22.957429, 
		longitude: -43.398084 , 
		image: pinPred
	},
	
	armOp : {
		title: "ARMAZENAGEM OPERÁRIA",
		latitude: -22.956407,
		longitude:  -43.403685, 
		image: pinPred
	},
	cpp : {
		title: "CPP",
		latitude: -22.957260, 
		longitude: -43.405559,
		image: pinPred
	},
	
	glpExt:{
		title: "GALPÃO DE EXTERNAS",
		latitude: -22.959428,   
		longitude:-43.403874,
		image: pinPred 
	},
	glpDi:{
		title: "GALPÕES DI",
		latitude: -22.959815, 
		longitude:-43.404314,
		image: pinPred  
	},
	glpObras:{
		title: "GALPÃO DE OBRAS",
		latitude: -22.958912,  
		longitude: -43.403976, 
		image: pinPred
	},
	arqMidia : {
		title: "ARQ. DE MÍDIA",
		latitude: -22.957474, 
		longitude: -43.405939,
		image: pinPred
	},
	glpVoice : {
		title: "GALPÃO DE ENSAIOS",
		latitude: -22.955939, 
		longitude: -43.403116, 
		image: pinPred
	},
	igjRenara : {
		title: "IGREJA RENARA",
		latitude: -22.962051, 
		longitude: -43.400133, 
		image: pinPred
	},
		
	net : {
		title: "NET",
		latitude: -22.961837, 
		longitude: -43.399411,
		image: pinPred
	},
	cmgSol : {
		title: "COMINGERSOL",
		latitude: -22.961884, 
		longitude: -43.399067,
		image: pinPred
	},
	ricoh : {
		title: "RICOH",
		latitude: -22.961330,  
		longitude: -43.399211,
		image: pinPred
	},
	sntCruz : {
		title: "G. SANTA CRUZ",
		latitude: -22.960172, 
		longitude: -43.397952 ,
		image: pinPred
	},
	tvlie : {
		title: "TV LIÊ",
		latitude: -22.956812, 
		longitude: -43.397903 ,
		image: pinPred
	},
	glpEfeitos : {
		title: "GALPÃO DE EFEITOS",
		latitude: -22.961591, 
		longitude: -43.402347,
		image: pinPred
	},
	pCriacao : {
		title: "P. DE CRIAÇÃO",
		latitude: -22.960828, 
		longitude: -43.406033,
		image: pinPred
	},
	pFigurino : {
		title: "P. DE FIGURINO",
		latitude: -22.960407, 
		longitude: -43.407146,
		image: pinPred
	},
	pServAdm : {
		title: "P. SERVIÇOS ADM",
		latitude: -22.961611, 
		longitude: -43.406421,
		image: pinPred
	},
	pTransportes : {
		title: "P. DE TRANSPORTES",
		latitude: -22.963333, 
		longitude: -43.404802,
		image: pinPred
	},
	nPPortaria1 : {
        title: "Novo Prédio Portaria 1",
        latitude: -22.962829, 
        longitude: -43.404179 ,
        image: pinPred
    },
	pArmz : {
		title: "PRÉDIO DE ARMAZENAGEM",
		latitude: -22.959376, 
		longitude: -43.406438 ,
		image: pinPred
	},
	pManut : {
        title: "P. de Manutenção",
        latitude: -22.961654, 
        longitude: -43.406774,
        image: pinPred
    },
};
//Cores
var azure;
var blue;
var cyan;
var green;
var magenta;
var orange;
var purple;
var red;
var rose;
var violet;
var yellow;


var marcadorArray = [mg,mp,cc,portarias,rest,predios,salas,estac,serv,pa,outros];
var colorMatrix = [cyan,cyan,blue,yellow, green, rose, magenta, red , orange,azure, blue];


var maps;
// Google Maps para iOS
if (OS_IOS){

	maps = Alloy.Globals.Map;
	var mapView = maps.createView({
    mapType: Alloy.Globals.Map.HYBRID_TYPE,
    region: {latitude:-22.961290, longitude:-43.406066,latitudeDelta:0.00043,
    		longitudeDelta:0.0020282,zoom:30,bearing:10,viewingAngle:30},
    animate:true,
    regionFit:true,
    userLocation:true,
	});
	azure = maps.ANNOTATION_AZURE; 
	blue = maps.ANNOTATION_BLUE;
	cyan = maps.ANNOTATION_CYAN;
	green = maps.ANNOTATION_GREEN;
	magenta = maps.ANNOTATION_MAGENTA;
	orange = maps.ANNOTATION_ORANGE;

	red = maps.ANNOTATION_RED;
	rose = maps.ANNOTATION_ROSE;
	violet = maps.ANNOTATION_PURPLE;
	yellow = maps.ANNOTATION_YELLOW;
	
}
else{
	maps = Alloy.Globals.Map;
	
	//Cores no Android
	azure = maps.ANNOTATION_AZURE; 
	blue = maps.ANNOTATION_BLUE;
	cyan = maps.ANNOTATION_CYAN;
	green = maps.ANNOTATION_GREEN;
	magenta = maps.ANNOTATION_MAGENTA;
	orange = maps.ANNOTATION_ORANGE;
	//purple = maps.ANNOTATION_PURPLE; //so ios
	red = maps.ANNOTATION_RED;
	rose = maps.ANNOTATION_ROSE;
	violet = maps.ANNOTATION_VIOLET;
	yellow = maps.ANNOTATION_YELLOW;
	

}



function remvAnnotations(){
	if (OS_IOS)
		mapView.removeAllAnnotations();
	else
		$.vwMap.removeAllAnnotations();
}

function filtro(filtroArray,pinColor){
	//Remove todas anotações e depois coloca só as do filtro
	remvAnnotations();
	fillAnnotation(filtroArray,pinColor);
}



function filtroTodos(){
	//Remove todas anotações e depois coloca todas
	//mg,mp,cc,portarias,rest,predios,salas,estac,serv, pa, outros
	remvAnnotations();
	for (var counter = 0; counter < marcadorArray.length; counter++){
		fillAnnotation(marcadorArray[counter],colorMatrix[counter]);
	}
}
function searchFor(){
	if ($.searchMap.value == "" || $.searchMap.value == null){
		filtroTodos();
	}
	else{
		remvAnnotations();

		for (var counter = 0; counter < marcadorArray.length ; counter++) {
			var anObj = marcadorArray[counter];
			for (var key in anObj) {
			    if (anObj.hasOwnProperty(key)) {
			        var obj = anObj[key];
					if (compareString(obj.title,$.searchMap.value) != -1) {
				        var annotation = maps.createAnnotation({
				            latitude: obj.latitude,
				            longitude: obj.longitude,
				            title: obj.title,
				            subtitle: obj.subtitle,
				            pincolor: red,
				            image:obj.image,
				            rightView: obj.rightView
				           
				        });
				        var theRegion =  {latitude:obj.latitude, longitude:obj.longitude,latitudeDelta:0.00043,longitudeDelta:0.0020282,zoom:30,bearing:10,viewingAngle:30};
						if (OS_IOS)
						{
				        	mapView.addAnnotation(annotation);
				        	mapView.region = theRegion;
				        }
				        else
				        {
				        	$.vwMap.addAnnotation(annotation);
				        	$.vwMap.region = theRegion;
				        }
				        
				        
			       }
			    }
			}
		}
	}
		
}

//Realiza pesquisa basica
$.searchMap.addEventListener('change',searchFor);

var opts = {
  selectedIndex: 0,
  title: 'Filtrar Mapa'
};
opcoesArray = ['Todos', 'Módulos de Gravação(MGs)/Estúdios','Módulos de Produção(MPs)','Cidades cenográficas(CCs)','Portarias','Restaurantes/Pontos de alimentação','Prédios/Galpões','Salas de Reunião','Estacionamentos','Serviços','Pontos de Apoio(PAs)','Outros'];
if(OS_IOS){
	opcoesArray.push('Cancelar');
	opts.cancel = opcoesArray.length-1 ;
}
else{
    opts.buttonNames = ["Cancelar"];
}
opts.options = opcoesArray;

var dialog = Ti.UI.createOptionDialog(opts);

dialog.addEventListener('click',function(event){

	var selectedIndex = event.index;
	if (selectedIndex == 0)
		filtroTodos();
	else if (OS_IOS && selectedIndex == opcoesArray.length-1){
	    filtroTodos();
	}
	else
		filtro(marcadorArray[selectedIndex - 1],colorMatrix[selectedIndex - 1]);
	dialog.hide();
});

$.btnFiltro.addEventListener('click',function(){
	$.searchMap.value = "";
	dialog.show();
});

$.searchMap.value = $.args.pesquisa;
searchFor();

//Garante que a busca funcione de forma correta no iOS no startup
if (OS_IOS)
	$.vwMain.add(mapView);
	
$.winMapa.addEventListener('close',function(e){
    //require('clearMemory').clear($.winMapa);
});
		
function compareString(objString,busca){
    return (String(objString)).toUpperCase().indexOf(busca.toUpperCase());
}

