// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var idRest = args.idRest;


var imgMapa = Ti.UI.createImageView({
    height: "50dp",
    width: "60dp",
    right: "6dp",
    image: "/servicos/mapa.png",
    top:"15dp",
    //bottom:"0dp"
});
    
var pesquisaValue;
var call;

switch(idRest){
	
	case 1:
	     texto = "AS BENTAS";
	     $.imgFotoRest.image = "/images/asbentas.jpg";
	     $.lblTel.text = "(21) 99826-6428";
	     call = "99826-6428";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "11:00 - 17:00";
	     $.lblHorario3.text = "Fechado";
	     $.lblHorario4.text = "Fechado";
	     pesquisaValue = "AS BENTAS";
         
	     
	 break;
	 
	 case 2:
	     texto = "BOB'S";
	     $.imgFotoRest.image = "/images/BOBS.jpg";
	     $.lblTel.text = " (21) 2444-5408 / 5637";
	     call = "24445408";
	     $.lblHorario1.text = "12:00 - 22:00";
	     $.lblHorario2.text = "10:00 - 23:00";
	     $.lblHorario3.text = "10:00 - 22:00";
	     $.lblHorario4.text = "10:00 - 22:00";
	     pesquisaValue = "PRAÇA 2";
	 break;
	 case 3:
	     texto = "BON GRILLÊ";
	     $.imgFotoRest.image = "/images/bongrille-foto02.jpg";
	     $.lblTel.text = "(21) 2444-5409 / 4382";
	     call =  "24445409";
	     $.lblHorario1.text = "12:00 - 16:00";
	     $.lblHorario2.text = "11:00 - 22:00";
	     $.lblHorario3.text = "11:00 - 22:00";
	     $.lblHorario4.text = "11:00 - 22:00";
	     pesquisaValue = "PRAÇA 2";
	 break;
	
	 case 4:
	     texto = "CASA DO PÃO DE QUEIJO";
	     $.imgFotoRest.image = "/images/casadpq.jpg";
	     $.lblTel.text = "(21) 2444-5411 / 4601 / 5561";
	    
	     call = "24445411";
	     $.lblHorario1.text = "10:00 - 18:00";
	     $.lblHorario2.text = "09:00 - 22:00";
	     $.lblHorario3.text = "09:00 - 22:00";
	     $.lblHorario4.text = "09:00 - 22:00";
	     pesquisaValue = "PRAÇA 2";
	 break;
	 case 5:
	     texto = "EMPORIUM PAX";
	     $.imgFotoRest.image = "/images/pax.jpg";
	     $.lblTel.text = "(21) 2444-5930 / 4814";
	     call = "24445930";
	     $.lblHorario1.text = "12:00 - 16:00";
	     $.lblHorario2.text = "09:00 - 20:00";
	     $.lblHorario3.text = "09:00 - 20:00";
	     $.lblHorario4.text = "09:00 - 20:00";
	     pesquisaValue = "PRAÇA 2";
	 break;
	 case 6:
	     texto = "EXECUTIVO";
	       $.imgFotoRest.image = "/images/executivo.jpg";
	     $.lblTel.text = "(21) 2444-7920";
	     call = "24447920";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "11:00 - 16:00";
	     $.lblHorario3.text = "Fechado";
	      $.lblHorario4.text = "Fechado";
	      pesquisaValue = "PRAÇA 2";
         
	 break;
	 case 7:
	     texto = "FOOD TRUCK (MPs)";
	       $.imgFotoRest.image = "/images/foodtruck-foto.jpg";
	     $.lblTel.text = "";
	     call = 0;
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "11:00 - 20:00";
	     $.lblHorario3.text = "Fechado";
	      $.lblHorario4.text = "Fechado";
	      pesquisaValue = "FOOD TRUCK MP";
	 break;
	 case 8:
	     texto = "FOOD TRUCK (CRIAÇÃO)";
	       $.imgFotoRest.image = "/images/foodtruck-foto.jpg";
	     $.lblTel.text = "";
	     call = 0;
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "11:00 - 20:00";
	     $.lblHorario3.text = "Fechado";
	      $.lblHorario4.text = "Fechado";
	      pesquisaValue = "FOOD TRUCK CRIAÇÃO";
	 break;
	 case 9:
	     texto = "LA FRUTERIA";
	     $.imgFotoRest.image = "/images/la-fruteria.jpg";
	     $.lblTel.text = "(21) 2444-8620";
	     call = "24448620";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "08:30 - 21:00";
	     $.lblHorario3.text = "08:30 - 16:00";
	     $.lblHorario4.text = "08:30 - 21:00";
	     pesquisaValue = "PRAÇA 2";
	 break;
	 case 10:
	     texto = "MAC";
	     $.imgFotoRest.image = "/images/MAC.jpg";
	     $.lblTel.text = "(21) 2444-8212";
	     call = "24448212";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "11:30 - 16:00";
	     $.lblHorario3.text = "Fechado";
	     $.lblHorario4.text = "Fechado";
	     pesquisaValue = "MAC";

         
	 break;
	 case 11:
	     texto = "PALETECA";
	     $.imgFotoRest.image = "/images/paleteca.jpg";
	     $.lblTel.text = "";
	     call = 0;
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "10:00 - 22:00";
	     $.lblHorario3.text = "10:00 - 16:00";
	     $.lblHorario4.text = "Fechado";
	     pesquisaValue = "PRAÇA 2";
	 break;
	 
	 case 12:
	     texto = "PÉ DA FRUTA";
	     $.imgFotoRest.image = "/images/pe-da-fruta.jpg";
	     $.lblTel.text = "(21) 2444-5227 / 5622";
	     call = "24445227";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "09:00 - 21:00";
	     $.lblHorario3.text = "Fechado";
	     $.lblHorario4.text = "10:00 - 17:00";
	     pesquisaValue = "PÉ DA FRUTA";
         
	 break;
	 
	 case 13:
	     texto = "POLIS SUCOS";
	     $.imgFotoRest.image = "/images/polis.jpg";
	     $.lblTel.text = "(21) 2444-5049 / 5799";
	     call = "24445049";
	     $.lblHorario1.text = "09:00 - 14:00";
	     $.lblHorario2.text = "09:00 - 00:00";
	     $.lblHorario3.text = "09:00 - 22:00";
	      $.lblHorario4.text = "09:00 - 22:00";
	      pesquisaValue = "PRAÇA 2";
	 break;
	 
	 case 14:
	     texto = "REI DO MATE";
	     $.imgFotoRest.image = "/images/RDM5.jpg";
	     $.lblTel.text = "(21) 2444-7396 / 5124 / 8253";
	     call = "24447396";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "07:00 - 21:00";
	     $.lblHorario3.text = "08:00 - 19:00";
	     $.lblHorario4.text = "08:00 - 19:00";
	     pesquisaValue = "REI DO MATE";
         
	 break;
	 
	 case 15:
	     texto = "RESTAURANTE +";
	       $.imgFotoRest.image = "/images/SODEXO.jpg";
	     $.lblTel.text = "(21) 2444-5717 / 5718 / 7990 / 4201 ";
	    
	     call = "24445717";
	     $.lblHorario1.text = "11:00 - 22:00";
	     $.lblHorario2.text = "06:30 - 00:00";
	     $.lblHorario3.text = "06:30 - 00:00";
	      $.lblHorario4.text = "06:30 - 00:00";
	      pesquisaValue = "RESTAURANTE +";
         
	 break;
	 
	 case 16:
	     texto = "SABOR DAS ESTRELAS";
	     $.imgFotoRest.image = "/images/sabor-das-estrelas.jpg";
	     $.lblTel.text = "(21) 2444-4854";
	     call = "24444854";
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "12:00 - 19:00";
	     $.lblHorario3.text = "12:00 - 15:00";
	     $.lblHorario4.text = "Fechado";
	     pesquisaValue = "SABOR DAS ESTRELAS";
         
	 break;
	 
	 case 17:
	     texto = "SUBWAY";
	     $.imgFotoRest.image = "/images/subway.jpg";
	     $.lblTel.text = "(21) 2444-8311";
	     call = 0;
	     $.lblHorario1.text = "Fechado";
	     $.lblHorario2.text = "10:00 - 22:00";
	     $.lblHorario3.text = "10:00 - 22:00";
	     $.lblHorario4.text = "Fechado";
	     pesquisaValue = "SUBWAY";
         
	 break;
	 
	 case 18:
	     texto = "TUDO A LER";
	     $.imgFotoRest.image = "/images/tudoaler.jpg";
	     $.lblTel.text = "";
	     call = 0;
	     $.lblHorario1.text = "24h";
	     $.lblHorario2.text = "24h";
	     $.lblHorario3.text = "24h";
	     $.lblHorario4.text = "24h";
	     pesquisaValue = "BANCA DE JORNAL";
         
	 break;

}
if (call != 0 ){
    $.lblTel.addEventListener('click', function(){
        Titanium.Platform.openURL('tel:'+ call);
        call = 0;
    });
};
$.WidFechar.init({
    text: texto,
    parent: $.winPerfilRest
});
$.WidFechar.changeColor("#ea7f34");

imgMapa.addEventListener('click',function(){
    Alloy.createController('mapa',{pesquisa:pesquisaValue}).getView().open();
});

$.WidFechar.addElement(imgMapa);

function openCard() {
	 Alloy.createController('verCardapio',{idRest:idRest}).getView().open();
};


$.winPerfilRest.addEventListener('close',function(e){
    require('clearMemory').clear($.winPerfilRest);
});
