// Arguments passed into this controller can be accessed via the `$.args` object directly or:
//
var Cloud = require ('ti.cloud');
var args = $.args;
var rest = args.idRest;
$.WidNR.show();
var idRest;
var lblEditar = Ti.UI.createLabel({   
    color: "white",
    height: Ti.UI.SIZE,
    right: "10dp",
    bottom: "9dp",
    width: Ti.UI.SIZE,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
});
if(Ti.App.user_role == "admin"){
	lblEditar.text = "EDITAR";
} else {
	lblEditar.setVisible(false);
}

$.WidFechar.init({
    text: "CARDÁPIO",
    parent: $.winVerCard
});
$.WidFechar.changeColor("#ea7f34");


var pesquisaValue;

switch(rest){
			
		case 1:
		// As Bentas
		if (ENV_PRODUCTION)
			idRest = "5877c7bebb8c090943d20bcf";
		else
	    	idRest = "5845c68582d0510945c27268";
	break;
		
		case 2:
		//Bob's
		if (ENV_PRODUCTION)
			idRest = "5877c850dce215094e55b102";	
		else
	    	idRest = "5845c06fbb8c09094b60fb4b";
	break;
		
		case 3:
		//Bon Grille
		if (ENV_PRODUCTION)
			idRest = "5877c8c353c1c60947407f6b";
		else
	    	idRest = "583b364c53c1c609473b1f86";
	break;
		
		case 4:
		//Casa do Pao de Queijo
		if (ENV_PRODUCTION)
			idRest = "5877c7e6dce2150946578fd8";
		else
	    	idRest = "5845c5e582d051094dc1c0dd";
	break;
		
		case 5:
		//Emporium Pax
		if (ENV_PRODUCTION)
			idRest = "58778c05bb8c090943cae09a";
		else
	    	idRest = "585a8da682d0510945d2fc99";
	break;
		
		case 6:
		// Executivo
		if (ENV_PRODUCTION)
			idRest = "587792be82d051094d323c0f";
		else
	    	idRest = "5846ebc6d398780943ebe955";
	    
	break;
		
		case 7:
		//Food Truck MPs
		if (ENV_PRODUCTION)
			idRest = "58778ba482d051094d319769";
		else
	    	idRest = "585a8e2283b1320950d79d19";
	break;
		
		case 8:
		//Food Truck - Predio de Criação
		if (ENV_PRODUCTION)
			idRest = "58778b1bbb8c09094bcf0ff2";
		else
	    	idRest = "585a8e7982d051094dd3613c";
	break;
		
		case 9:
		//La Fruteria
		if (ENV_PRODUCTION)
			idRest = "587793564fafb30947ce4c7f";
		else
	    	idRest = "5845c8b84fafb3094761bbf6";
	break;
		
	
		case 10:
		//MAC
		if (ENV_PRODUCTION)
			idRest = "5877931283b132095036b794";
		else
	    	idRest = "5845cb9ddce215094edf24c2";
	break;
		
		case 11:
		//Paleteca
		if (ENV_PRODUCTION)
			idRest = "58778aa34fafb3094fd08082";
		else
	    	idRest = "585a8eae82d051094dd363d9";
	break;
		
		case 12:
		//Pé da Fruta
		if (ENV_PRODUCTION)
			idRest = "58778c9c82d051094d31acef";
		else
	    	idRest = "584952854fafb3094f94890c";
	    
	break;
		
		case 13:
		//Polis Sucos
		if (ENV_PRODUCTION)
			idRest = "5877c86c83b1320948391025";
		else
	    	idRest = "5845bf23bb8c0909435d5716";
	break;
	
		case 14:
		//Rei do Mate
		if (ENV_PRODUCTION)
			idRest = "58778c73dce215094e4eba76";
		else
	    	idRest = "585a8bf5bb8c09094b73cdde";
	    
	break;
		
		case 15:
		//Restaurante +
		if (ENV_PRODUCTION)
			idRest = "58778c4582d051094530d317";
		else
	    	idRest = "585a8ca082d051094dd3411c";
	    
	break;
		
		case 16:
		// Sabor das Estrelas
		if (ENV_PRODUCTION)
			idRest = "58779334d39878094b574814";
		else
	    	idRest = "5845c8ef83b1320950c48d20";
	    
	break;
	
		case 17:
		// Subway
		if (ENV_PRODUCTION)
			idRest = "58778ce7dce215094e4ec18d";
		else
	    	idRest = "5849521d53c1c6093ff7f7cc";
	    
	break;
	
	    case 18:
	    //Tudo a Ler
	    if (ENV_PRODUCTION)
	    	idRest = "58778a3082d051094530974c";
		else
	    	idRest = "585a8fac83b1320950d7a82f";
	break;
		
		
}



var scrollGallery = Ti.UI.createScrollableView({
  showPagingControl:false,
  top:'10%',
   contentWidth: 'auto',
    contentHeight: 'auto',
    showHorizontalScrollIndicator: true,
  maxZoomScale:300,
  minZoomScale:0.1
});
var viewCollection = [];
Cloud.PhotoCollections.showPhotos({
    limit:20,
    collection_id: idRest
}, function (e) {
    if (e.success) {

        if (e.photos.length==0) {
        	if(Ti.App.user_role != "admin"){
           	 	custAlert('Cardápio indisponível no momento!');
            	$.winVerCard.close();
          } else {
          	$.WidNR.hide();
          }
        } else {
            for (var i = 0; i < e.photos.length; i++) {
            	
  				var view = Ti.UI.createScrollView({showHorizontalScrollIndicator:false,
                showVerticalScrollIndicator:true,
                maxZoomScale:10,
                height:'90%',
                width:'100%',
                minZoomScale:1.0,
               	zoomScale:0.1,});
                        
                        
  					var img = Ti.UI.createImageView({height:'80%',width:'100%'});
  					if (OS_ANDROID)
  					     img.enableZoomControls = true; 
  					if (i < e.photos.length) { 
                         img.image = e.photos[i].urls.original;
 				    }
             //  var imgFoto = Ti.UI.createImageView({image: e.photos[0].urls.original, width: "100%", height: "100%" }); 
            	view.add(img);
            	viewCollection.push(view);
            }
           /* scrollGallery.addEventListener('scroll', function(){
          		 if (scrollGallery.currentPage < (e.photos.length-1)) {
   					 var nxt = scrollGallery.currentPage+2; // get the 2nd next image (since the next one is already loaded)
    		     	scrollGallery.views[nxt].children[0].image = e.photos[nxt];
  				}
			}); */
			scrollGallery.views = viewCollection;
			$.winVerCard.add(scrollGallery);
			$.WidNR.hide();
       }
       
    } else {
        custAlert('Cardápio indisponível no momento.');
        $.WidNR.hide();
        /*alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));*/
        $.winVerCard.close(); 
    }
    
});

function edtCardapio() {   
	 Alloy.createController('upCardapio',{idRest:rest}).getView().open();
	 $.winVerCard.close();
};

lblEditar.addEventListener('click',edtCardapio);

$.WidFechar.addElement(lblEditar);

$.winVerCard.addEventListener('close',function(e){
   require('clearMemory').clear($.winVerCard);
});