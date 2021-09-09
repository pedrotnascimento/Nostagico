// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var Cloud = require ('ti.cloud');
var args = $.args;
var rest = args.idRest;

$.WidFechar.init({
    text: "EDITAR CARDÁPIO",
    parent: $.winUpCardapio
});
$.WidFechar.changeColor("#ea7f34");

var idRest;
var idFoto = [];
var deletedImage;

$.WidNR.show();
function excluirFoto(e){
    $.WidNR.show();
    $.alertDialog.hide();
	if(e.index == 1){
		Cloud.Photos.remove({
            photo_id: idFoto
    	}, function (e) {
        	if (e.success) {
        	    
        	    vwGaleria.remove(deletedImage);
            	custAlert('Foto excluída com sucesso');
            	
            	$.WidNR.hide();
        	} else {
        	    $.WidNR.hide();
            	custAlert("Erro no sistema. Tente novamente mais tarde.");
        	}
    	   });
	}
	else{
		$.WidNR.hide();
	}
}

/*$.imgCancel.addEventListener('click',function(e){
	$.winUpCardapio.close();
});*/
/*
var view1 = Ti.UI.createView({ backgroundColor:'#123', height:'90%', top:"10%" });
var view2 = Ti.UI.createView({ backgroundColor:'#246', height:'90%', top:"10%" });
var view3 = Ti.UI.createView({ backgroundColor:'#48b', height:'90%', top:"10%" });

var scrollableView = Ti.UI.createScrollableView({
  views:[view1,view2,view3],
  showPagingControl:true
});

$.winVerCard.add(scrollableView);
*/

switch(rest){
			
		case 1:
		// As Bentas
	    idRest = "5845c68582d0510945c27268";
	break;
		
		case 2:
		//Bob's
	    idRest = "5845c06fbb8c09094b60fb4b";
	break;
		
		case 3:
		//Bon Grille
	    idRest = "583b364c53c1c609473b1f86";
	break;
		
		case 4:
		//Casa do Pao de Queijo
	    idRest = "5845c5e582d051094dc1c0dd";
	break;
		
		case 5:
		//Empório Pax
	    idRest = "";
	break;
		
		case 6:
		// Executivo
	    idRest = "5846ebc6d398780943ebe955";
	break;
		
		case 7:
		//Food Truck MPs
	    idRest = "585a8e2283b1320950d79d19";
	break;
		
		case 8:
		//Food Truck - Predio de Criação
	    idRest = "585a8e7982d051094dd3613c";
	break;
		
		case 9:
		//La Fruteria
	    idRest = "5845c8b84fafb3094761bbf6";
	break;
		
	
		case 10:
		//MAC
	    idRest = "5845cb9ddce215094edf24c2";
	break;
		
		case 11:
		//Palheteca
	    idRest = "585a8eae82d051094dd363d9";
	break;
		
		case 12:
		//Pé da Fruta
	    idRest = "584952854fafb3094f94890c";
	break;
		
		case 13:
		//Polis Sucos
	    idRest = "5845bf23bb8c0909435d5716";
	break;
	
		case 14:
		//Rei do Mate
	    idRest = "585a8bf5bb8c09094b73cdde";
	break;
		
		case 15:
		//Restaurante +
	    idRest = "585a8ca082d051094dd3411c";
	break;
		
		case 16:
		// Sabor das Estrelas
	    idRest = "5845c8ef83b1320950c48d20";
	break;
	
		case 17:
		// Subway
	    idRest = "5849521d53c1c6093ff7f7cc";
	break;
	
	    case 18:
	    //Tudo a Ler
	    idRest = "585a8fac83b1320950d7a82f";
	break;
		
		
}

var vwGaleria = Ti.UI.createScrollView({ layout: 'horizontal', height: '300dp', width:'100%', top: '150dp',
                showHorizontalScrollIndicator: "true"});
if (OS_ANDROID){
    vwGaleria.scrollType =  "horizontal";
}
var vwBlank = Ti.UI.createView({ width: '5dp',
});
var viewCollection = [];
Cloud.PhotoCollections.showPhotos({
    page: 1,
    per_page: 20,
    collection_id: idRest
}, function (e) {
    if (e.success) {
    	
        if (!e.photos) {
            custAlert('Não há fotos atualmente para este restaurante');
        } else {
          
           
            for (var i = 0; i < e.photos.length; i++) {
            	
  					idFoto = e.photos[i].id;
  					var img = Ti.UI.createImageView({height:'40%',width:'40%',customId:idFoto});
  					
                    img.image = e.photos[i].urls.original;
                         
 				    
              
            	
            	
            	img.addEventListener('click', function showAlert(et){
            		idFoto = et.source.customId;
                    deletedImage = et.source;
                    $.alertDialog.show();
            	});
            	vwGaleria.add(img);
            	vwGaleria.add(vwBlank);
            	
            }
           /* scrollGallery.addEventListener('scroll', function(){
          		 if (scrollGallery.currentPage < (e.photos.length-1)) {
   					 var nxt = scrollGallery.currentPage+2; // get the 2nd next image (since the next one is already loaded)
    		     	scrollGallery.views[nxt].children[0].image = e.photos[nxt];
  				}
			}); */
			//ListGallery.views = viewCollection;
			$.winUpCardapio.add(vwGaleria);
            
       }
       $.WidNR.hide();
    } else {
        /*alert('Error:\n' + idRest // +
           // ((e.error && e.message) || JSON.stringify(e))
           );*/
          custAlert('Serviço indisponível no momento. Tente novamente mais tarde.');
        $.WidNR.hide();
    }
    
});
////////////////////////////

function abrirGaleria(e)
{
	Titanium.Media.openPhotoGallery({
	success:function(event) {
	    
		// called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			$.WidNR.show();
			Cloud.Photos.create({
                                    photo: event.media,
                                    collection_id: idRest,
                                    su_id : '5824923753c1c6093f1d2ec0'
                                }, function (evt) {
                                    $.WidNR.hide();
                                    if (!evt.success) {
                                       custAlert("Serviço indisponível no momento. Tente novamente mais tarde.");
                                    }
                                    else{
                                        idFoto = evt.photos[0].id;
                                        var img = Ti.UI.createImageView({height:'40%',width:'40%',customId:idFoto});
                    
                                        img.image = event.media;
                                        
                
                                        img.addEventListener('click', function showAlert(et){
                                            idFoto = et.source.customId;
                                            deletedImage = et.source;
                                            $.alertDialog.show();
                                        });
                                        vwGaleria.add(img);
                                        vwGaleria.add(vwBlank);
                                    }
                                });
			
		} else {
			custAlert("Serviço indisponível no momento. Tente novamente mais tarde.");
			$.WidNR.hide();
		}
	},
	cancel:function() {

	},
	error:function(error) {
		// called when there's an error
		custAlert('Erro: ' + error.code,'GALERIA');
	},

});
}

$.btnAdicionar.addEventListener('click', function(e){ abrirGaleria();});
/////////////////////////////

$.winUpCardapio.addEventListener('close',function(e){
   require('clearMemory').clear($.winUpCardapio);
});
