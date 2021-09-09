// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args || {};
var isManut = false;
var Cloud = require ('ti.cloud');
var ImageFactory = require('ti.imagefactory');
var divisoes = $.args.divisoes; 

//var errorLog = "";

var localdb = require('armInterno');
$.imgGal.setVisible(false);


//Ajuste de tela de formulário para telas maiores que o iphone 5
if (OS_IOS){
	//Posiciona o botão de envio mais pra baixo da tela
    if (Ti.Platform.displayCaps.platformHeight > 568) {
    	var newHeight = (Ti.Platform.displayCaps.platformHeight/parseFloat(568))*75;
    	$.vwBtn.height = newHeight+"dp";
    }
    //Ajusta telas menores que o iphone 5 para garantir a presença do botão de não achou QR
    else if (Ti.Platform.displayCaps.platformHeight < 568){
    	$.vwLocal.height = "160dp";
    	$.lblSel1.height = "30dp";
    	$.lblSel1.top = "25dp";
    	
		$.winForm.addEventListener('androidback', function(e){
			//disable back button
		});
    	
    }
}
else{
	//Tratamento especial android pois a função retorna em px e não em dp
    var screenHeight = Ti.Platform.displayCaps.platformHeight/parseFloat(Ti.Platform.displayCaps.logicalDensityFactor);
    if (screenHeight > 568) {
        var newHeight = (screenHeight/parseFloat(568)) * 75;
        $.vwBtn.height = newHeight+"dp";
    }
    //Ajusta telas menores que o iphone 5 para garantir a presença do botão de não achou QR
    else if (screenHeight < 568){
    	$.vwLocal.height = "160dp";
    	$.lblSel1.height = "30dp";
    	$.lblSel1.top = "25dp";
    }
}

Ti.App.localId = "";
Ti.App.localDesc = "";
$.WidFechar.changeColor("#B24F91");
var idLocal = [];
idLocal[0] = -1;
var topAlign;
var localArray = args.localArray;

var lblLocalId = $.lblLocalId;

var tipo = args.tipo || args;
var user = args.user;
var idServ;
var idTipo = -1;

var text;

var codTipoSSA ;
var divisoes = args.divisoes;

switch (tipo){
   case "bebedouro":
		descOpt = ["Atendimento Técnico","Desmobilização de bebedouro","Desmobilização temporária e reinstalação",
		"Instalação de novo ponto de bebedouro","Reparo de bebedouro","Substituição de bebedouro"];
		text = "BEBEDOURO INDUSTRIAL";
		idServ = 0;
		codTipoSSA = 82;
		
   break;
	
   case "ctrlPragas":
		descOpt = ["Desinsetização para controle de pragas baratas","Desintetização para controle de pragas diversas",
		"Desintetização para controle de pragas mosquito","Fumacê"];
		text = "CONTROLE DE PRAGAS";
		idServ = 1;
		codTipoSSA = 88;
   break;
   
   case "guardaChuva":
		descOpt = ["Reposição de guarda chuva"];
		text = "GUARDA CHUVA";
		idServ = 2;
		codTipoSSA = 111;
   break;
   
   case "limpVerde":
		descOpt = ["Capina e Roça","Poda",
		"Recolhimento de resíduos","Reconstrução", "Remoção","Outros"];
   		text = "LIMPEZA DE ÁREA VERDE";
   		idServ = 3;
		codTipoSSA = 93;
   break;
   
   case "limpInt":
		descOpt = ["Limpeza de mobiliário","Limpeza interna",
		"Limpeza interna reposição","Melhoramentos"];
		text = "LIMPEZA INTERNA";

		idServ = 4;
		codTipoSSA = 105;
   break;
   
   case "maqCafe":
		descOpt = ["Abastecimento de insumos","Atendimento técnico", "Desmobilização","Desmobilização temporária e reinstalação",
		"Instalação de novo ponto","Limpeza","Reembolso"];
		text = "MÁQUINA DE CAFÉ";
		idServ = 5;
		codTipoSSA = 94;
		
   break;
   
   case "purificador":
   		descOpt = ["Instalar novo purificador","Limpeza de purificador","Reinstalação do purificador",
   		"Atendimento técnico","Desmobilização temporária"];
		text = "PURIFICADOR DE ÁGUA";
		idServ = 6;
		codTipoSSA = 98;
   break;
   
   case "repro":
   		descOpt = ["Abastecimento de folha","Abastecimento de grampos","Atendimento técnico",
   		"Limpeza da máquina","Troca de toner"];
   		text  = "REPROGRAFIA";
   		idServ = 7;
		codTipoSSA = 99;
   break;
   
   case "snack":
   		descOpt = ["Abastecimento de insumos","Atendimento técnico", "Desmobilização","Desmobilização temporária e reinstalação",
   		"Instalação de novo ponto","Reembolso","Limpeza"];
   		text =   "SNACK/BEBIDA GELADA";
   		idServ = 8;
		codTipoSSA = 95;
   break;

   case "nespresso":
		descOpt = ["Reposição de cápsulas"];
		text  = "NESPRESSO";
		idServ = 9;
		codTipoSSA = 106;
   break;
   
   case "manut":
   		text = "MANUTENÇÃO";
   		descOpt = ["Verificar ar condicionado","Entupimento de banheiro",
   		"Troca de lâmpada","Reparo de portas/janelas","Verificar parte elétrica",
   		"Verificar vazamento","Outros"];
   		idServ = 10;
		isManut = true;
   break;
   
   
}
if(idServ == 5 || idServ == 8 || idServ == 0 || idServ == 6){
	$.lblInfo.text = "Nº da Máquina / Info. Adicional";
}
if (OS_ANDROID)
    descOpt.splice(0, 0, 'Selecione uma opção');

$.WidFechar.init({
    text: text,
    parent: $.winForm
});

var photoMedia = [];

function cameraPerm(e){
    if (Ti.Media.hasCameraPermissions()) {
        abrirCamera();
    } else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success) 
                abrirCamera();      
        });
    }
}	

$.lblFoto.addEventListener('click',cameraPerm);
$.imgFoto.addEventListener('click',cameraPerm);
$.imgMedia.addEventListener('click',galleryPerm);

$.imgGal.addEventListener('click',function(){
   $.vwGallery.setVisible(true); 
});
var maximoFotos = false;	
//TODO: fazer aparecer label que avisa a quantidade de fotos que serão enviadas
var photoFile;

var photoArray = [];
var imageQuality;
if (OS_IOS)
    imageQuality = ImageFactory.QUALITY_LOW;
else
    imageQuality = 0.3;
function abrirCamera(){
	
	Titanium.Media.showCamera({
		
		success:function(event) {
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) 
			
			    //Que que faz? 
				//passa o blob(event.media) para um objeto em base64(bytearray) 
				// para passar o bytearray em um request usar o campo text do objeto
				var imageResized = ImageFactory.imageAsResized(event.media,{width:480,height:320,quality:imageQuality});

				photoMedia.push(Ti.Utils.base64encode(imageResized));
				photoFile = event.media.file;
				$.imgGal.setVisible(true);
					
					if (OS_IOS)
					$.listSecGallery.appendItems([{
	                            info:{text: 'CLIQUE PARA REMOVER'},
	                            foto:{image:imageResized},
	                            properties:{height: 180}
	                            }
	                ]);
	            else
	            	$.listSecGallery.appendItems([{
	                            info:{text: 'CLIQUE PARA REMOVER'},
	                            foto:{image:imageResized,transform: Ti.UI.create2DMatrix().rotate(90)},
	                            }
	                ]);	
				//Funcionando
				photoArray.push(imageResized);
				if (photoArray.length == 5){
					  maximoFotos = true;
				      $.lblFoto.text = "MÁXIMO DE FOTOS";
				      $.lblFoto.removeEventListener('click',cameraPerm);
				      $.imgFoto.removeEventListener('click',cameraPerm);
				      $.imgMedia.removeEventListener('click',galleryPerm);
				}
		},
		cancel:function() {
			// called when user cancels taking a picture
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('O dispositivo não possui camera.');
			} else {
				a.setMessage('Erro não esperado: ' + error.code);
			}
			a.show();	
		},
		saveToPhotoGallery:true
		
	});	
	
}
function galleryPerm(e){
	 if (Ti.Media.hasCameraPermissions()) {
        abrirGaleria();
    } else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success) 
                abrirGaleria();      
        });
    }
}

function abrirGaleria()
{
	Titanium.Media.openPhotoGallery({
		success:function(event) {
	    
		// called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var imageResized = ImageFactory.imageAsResized(event.media,{width:480,height:320,quality:imageQuality});

				photoMedia.push(Ti.Utils.base64encode(imageResized));
				photoFile = event.media.file;
				$.imgGal.setVisible(true);
				
				if (OS_IOS)
					$.listSecGallery.appendItems([{
	                            info:{text: 'CLIQUE PARA REMOVER'},
	                            foto:{image:imageResized},
	                            properties:{height: 180}
	                            }
	                ]);
	            else
	            	$.listSecGallery.appendItems([{
	                            info:{text: 'CLIQUE PARA REMOVER'},
	                            foto:{image:imageResized},
	                            }
	                ]);	
				//Funcionando
				photoArray.push(imageResized);
				if (photoArray.length == 5){
					  maximoFotos = true;
				      $.lblFoto.text = "MÁXIMO DE FOTOS";
				      $.lblFoto.removeEventListener('click',cameraPerm);
				      $.imgFoto.removeEventListener('click',cameraPerm);
				      $.imgMedia.removeEventListener('click',galleryPerm);
				}
				
			}
			else
				custAlert("Somente fotos são aceitas pelo sistema SSA");
		}
	});
}

if (OS_IOS){
	
	//Cria btn de combo para iOS
	//var tr = Titanium.UI.create2DMatrix();
	//tr = tr.rotate(90);
	
	var btniOSDescCombo = Titanium.UI.createButton({
		
		image: '/images/ic-arrow-down@2x.png'
	});
	
	$.pickDesciOS.rightButton = btniOSDescCombo;
	$.pickDesciOS.rightButtonMode = Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
	descOpt.push("Cancelar");
	var optDesc = Ti.UI.createOptionDialog({
	    options: descOpt,
	    title: 'Escolha uma descrição padrão',
	    cancel:descOpt.length - 1
	}); 
	function abrirOpcDesc(e){
		optDesc.show();
	} 

	optDesc.addEventListener('click',function(event){
		    var selectedIndex = event.index;
		    if (selectedIndex != (descOpt.length - 1) ){
			    $.pickDesciOS.value = descOpt[selectedIndex];
			    $.pickDesciOS.focus();	
			    idTipo = descOpt[selectedIndex];
		    }
	});

}

else{

	for (var index in descOpt)
		$.pickColDescAnd.addRow(Ti.UI.createPickerRow({title:"  " + descOpt[index],color:'black',backgroundColor:'white'}));	
	idTipo = descOpt[0];
	$.pickDescAnd.addEventListener('change',function(e){
		idTipo = descOpt[e.rowIndex];
	});
}


//Scanner de QR Code:

var qrreader = undefined;
var qrCodeWindow = undefined;
var qrCodeView = undefined;

// Depending on the platform, load the appropriate qr module
if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
	qrreader = require('com.acktie.mobile.ios.qr');
} 
else if (Ti.Platform.osname === 'android') {
	qrreader = require('com.acktie.mobile.android.qr');
}

$.vwBtnQR.addEventListener('click',function(){
	var options = {
		backgroundColor : 'black',
		width : '100%',
		height : '90%',
		top : 0,
		left : 0,
		success : readQR,
		cancel : function(e){},
	};
	if (Ti.Media.hasCameraPermissions()) {      
        scanQRFromCamera(options);
    } else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success)         
                scanQRFromCamera(options);     
        });
    }

	
});
var ssaLib = require('SSAlib');

function readQR(data) { 
	var dataLocal;
	if (data != undefined && data.data != undefined) {

		//Titanium.Media.vibrate();
		dataLocal = data.data;
		var localObj = ssaLib.getLocalAndDiv(divisoes, dataLocal);
		if (!localObj){
		    qrCodeWindow.close();
		    setTimeout(function(){
                custAlert("O sistema SSA não possui cadastrado este local");
            },600);
		}
		else{
		  lblLocalId.text = '';
		  $.lblQR1.text = localObj.loc_descri;
          qrCodeWindow.close();  
		  Ti.App.localId = dataLocal;
	    }
	}

};

function scanQRFromCamera(options) {
	qrCodeWindow = Titanium.UI.createWindow({
		navBarHidden: true,
		exitOnClose : false,
		backgroundColor : 'black',
		width : '100%',
		height : '100%',
	});
	qrCodeView = qrreader.createQRCodeView(options);

	var closeButton = Titanium.UI.createButton({
		title : "Voltar",
		bottom : 0,
		left : 0
	});
	var lightToggle = Ti.UI.createSwitch({
		value : false,
		bottom : 0,
		right : 0
	});

	closeButton.addEventListener('click', function() {
		qrCodeView.stop();
		qrCodeWindow.close();
	});

	lightToggle.addEventListener('change', function(event) {
		if (event.value) {
			qrCodeView.turnLightOn();
		} else {
			qrCodeView.turnLightOff();
		}
	});

	qrCodeWindow.add(qrCodeView);
	qrCodeWindow.add(closeButton);

	if (Ti.Platform.osname !== 'ipad' && (options.useFrontCamera === undefined || (options.useFrontCamera != undefined && !options.useFrontCamera))) {
		qrCodeWindow.add(lightToggle);
	}

	// NOTE: Do not make the window Modal for android.  It screws stuff up.  Not sure why
	if (Ti.Platform.osname !== 'android') {
		qrCodeWindow.open({modal:true});
	}
	else
	{
		qrCodeWindow.open();
	}
}

if (Ti.Platform.osname === 'android') {
	var activity = Ti.Android.currentActivity;
	activity.addEventListener('pause', function(e) {
		Ti.API.info('Inside pause');
		if (qrCodeView != undefined) {
			qrCodeView.stop();
		}

		if (qrCodeWindow != undefined) {
			qrCodeWindow.close();
		}
	});
}

$.listGallery.addEventListener('itemclick',function(e){
    var section = e.section;
    var dialog = Titanium.UI.createAlertDialog({
        title:'Deletar foto',                         
        buttonNames:['Confirmar','Cancelar']    ,                        
        message:'Deseja realmente deletar a foto?'                       
    });
                            
    dialog.addEventListener('click',function(event){
        if (event.index == 0){
            photoArray.splice(e.itemIndex,1);
            photoMedia.splice(e.itemIndex,1);
            section.deleteItemsAt(e.index,1);
            if (maximoFotos){
            	$.lblFoto.text = "INSERIR FOTO(S)";
            	maximoFotos = false;
            	$.lblFoto.addEventListener('click',cameraPerm);
				$.imgFoto.addEventListener('click',cameraPerm);
				$.imgMedia.addEventListener('click',galleryPerm);
            //Pode inserir fotos novamente
            //Event listener camera e galeria
            }
            if(photoArray.length > 0){
			       $.imgGal.setVisible(true);
		     }else{
		     	 $.imgGal.setVisible(false);
		     }
        }
        dialog.hide();                         
    });
    dialog.show();                        
    
});

$.imgReturn.addEventListener('click',function(){
   $.vwGallery.setVisible(false); 
});

/////////////////////////////////////////////////////////////////

//Enviar OS
$.btnEnviar.addEventListener('click',function(){

	if (Ti.App.localId == "")
		custAlert("Por favor, escolha um local.");
	else if (OS_ANDROID && idTipo==descOpt[0])
	   custAlert("Por favor, selecione um tipo de solicitação");
	else if (OS_IOS && idTipo == -1)
		custAlert("Por favor, selecione um tipo de solicitação");
	else {
	     
	   $.WidNR.show();


	var registered = false;
	if(isManut){
	var local = ssaLib.getLocalAndDiv(divisoes, Ti.App.localId);
	if (localdb.checkOnline()){
    	var xhr = Ti.Network.createHTTPClient();
    	    if (ENV_PRODUCTION)
    	       xhr.open("POST","http://tvglobogestao.astrein.com.br/api/ssa/IncluiSSExterno");
    	    else
    		  xhr.open("POST","http://gestaotvglobohml.astrein.com.br/api/ssa/IncluiSSExterno");
    		xhr.setRequestHeader('Content-Type', 'application/json');
    		xhr.onload = function(){
    			//resposta do SSA no envio da OS
    			//console.log(this.responseText);
    			res = JSON.parse(this.responseText);
    			var codigoSS= res.codigoRetorno;
    			//Insere fotos e pega o ID de cada
    				
    			//Insert SS na base local 
    			Cloud.Objects.create({ 
    				    classname: 'ss',
    				    fields: {
    				    	ss_id: "",
    						ss_id_globo: codigoSS.toString(),
    				        ss_local_id : Ti.App.localId,
    				        ss_serv_id : text,
    				        ss_tipo_id : idTipo,
    				        ss_desc : $.areaInfo.getValue(),
    				        ss_local_desc: Ti.App.localDesc,
    						ss_div: local.div_codigo,
							ss_local_full_desc: local.full_loc,
							is_os: false,
    				    }
    					}, function (e) {
    					    if (e.success) {
    					        
    					        //Envia as fotos
                                for (var count = 0; count < photoArray.length; count++){
                                    Cloud.Photos.create({
                                        photo: photoArray[count],
                                        custom_fields:{
    										ss_id: "",
                                            ss_id_globo: codigoSS.toString()
                                        }
                                    }, function (evt) {
                                        if (!evt.success) {
                                           //custAlert('Error:\n' +
                                               // ((evt.error && evt.message) || JSON.stringify(evt)));                        
                                        }
                                       
                                            
                                    });
                                }
                                
    							custAlert('Solicitação enviada com sucesso! Solicitacão:' + codigoSS + "\n"+
											"Após a solicitação ser programada, ela aparecerá em 'Minhas Solicitações'."
											, 'Envio com sucesso');
    							
    							$.WidNR.hide();
    							$.winForm.close();
    					    } else {
    					        $.WidNR.hide();
								 custAlert("Ocorreu um erro ao enviar seu formulário.");
    					        
    					        
    					    }
    				});
    
    		};
    		xhr.onerror = function(){
    			//alert(this.responseText);
    			//errorLog += " " + this.responseText;
    			res = JSON.parse(this.responseText);
    			custAlert("ERROR SSA SS  " + JSON.stringify(res.descricao) );
    			$.WidNR.hide();
    			
    		};
    		
    		//EXEMPLO INCLUIR SS
    		var sending = {
            "div_codigo" : local.div_codigo,
            "som_descri" :   'tipo: ' + idTipo + ' - descrição: ' + $.areaInfo.getValue() + '\nLocal Completo: ' + local.full_loc+ '\n',
            "loc_codigo" : local.loc_codigo,       
            "usu_codigo" : user.codigoUsuario,        
            "foto1" : "" ,
            "foto2" : "" ,
            "foto3" : "" ,
            "foto4" : "" ,
            "foto5" : "" ,
            "nomefoto1" : "" ,
            "nomefoto2" : "" ,
            "nomefoto3" : "" ,
            "nomefoto4" : "" ,
            "nomefoto5" : ""      
    		};
    		//errorLog += " " + JSON.stringify(sending);
    		for(var i=0 ; i<photoMedia.length; i++){
    			sending["foto"+(i+1)] = photoMedia[i].text;
    			sending["nomefoto"+(i+1)] = i; 
    		}
    
    		xhr.send(JSON.stringify(sending));
    	}//FIM IF ISMANUT
    	
    	//Armazena no sqlite caso SS
    	else{
    	    var photoFiles = [];
                           
           for (var counter = 0; counter < photoArray.length; counter++){
               var fileName = "central2777-"+ new Date().getTime() + '.jpg';
               var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
               file.write(photoArray[counter]);
               photoFiles.push(file.nativePath);
           }
           for (var counter2 = photoArray.length - 1; counter2 < 5; counter2++)
               photoFiles.push('');
           
           localdb.storageSS({
               local_id:Ti.App.localId,
               serv_id:text,
               tipo_id:idTipo,
               desc:$.areaInfo.getValue(),
               local_desc:Ti.App.localDesc,
               div:local.div_codigo,
               loc_codigo:local.loc_codigo,
               codUsuario: user.codigoUsuario,
               local_full_desc: local.full_loc
               },photoFiles);
           
           
           var dlgFechar = Ti.UI.createAlertDialog({
              message:  "Você está sem acesso a internet. Sua solicitação foi salva e será enviada quando você estiver online.",
              title: "CENTRAL 2777",
              buttonNames:['OK']
           });
           
           dlgFechar.addEventListener('click',function(e){
               if (e.index == 0){
                    dlgFechar.hide();
                    $.winForm.close();
               }
           });
           dlgFechar.show();

           $.WidNR.hide();
    	    
    	}
    }
    
	
	else{//NAO EH MANUTENÇÃO --> CRIA OS			
			var local = ssaLib.getLocalAndDiv(divisoes, Ti.App.localId);
			if (localdb.checkOnline()){
    			var xhr = Ti.Network.createHTTPClient();
    			if (ENV_PRODUCTION)
    			     xhr.open('POST', 'http://ws.astrein.com.br/inspecao/tvglobo/ssamro.asmx?op=CriarOsCorretivaExterno');
    			else
    			     xhr.open('POST', 'http://wshml.astrein.com.br/inspecao/tvglobohml/SSAMRO.asmx?op=CriarOsCorretivaExterno');
    			xhr.setRequestHeader('Content-Type', 'application/soap+xml');
    			xhr.onload = function(){
    				//errorLog += " " + this.responseText;
    				iTipoDeLog = XMLNodeToJson(this.responseText, 'iTipoDeLog');
    				if(!(iTipoDeLog*1)){
    
    					  $.WidNR.hide();
    					  var descricao = XMLNodeToJson(this.responseText, 'descricao');
    					  if("The INSERT statement"==descricao){
    					  	custAlert("ERRO NO SSA DE SQL");

							  return;
						  }
    					return custAlert("ENVIO DE OS FALHOU");
    				}
    				SSAcodigoOS = XMLNodeToJson(this.responseText, 'SOL_CODIGO');
    				codigoOS = XMLNodeToJson(this.responseText, 'SOL_CODUSU');
    				
    				if(SSAcodigoOS==0){
    					$.WidNR.hide(); 
    					var errorLog = XMLNodeToJson(this.responseText, 'SOL_CODUSU');
    					if(!errorLog){
    						errorLog = XMLNodeToJson(this.responseText, 'descricao');
    					}
    					custAlert("SSA:" +  errorLog);
    					return ;
    				}
    				//ENVIANDO FOTO PARA SSA
                    if(photoMedia.length){
                        xhr = Ti.Network.createHTTPClient();
                        if (ENV_PRODUCTION)
                            xhr.open('POST', 'http://ws.astrein.com.br/inspecao/tvglobo/ssamro.asmx?op=EnviarImagemOS');
                        else
                            xhr.open('POST', 'http://wshml.astrein.com.br/inspecao/tvglobohml/SSAMRO.asmx?op=EnviarImagemOS');
                        xhr.setRequestHeader('Content-Type', 'application/soap+xml');
                        xhr.onload = function () {
    
                            var EnviarImagemOSResult_OK = 0;
                            var EnviarImagemOSResult = XMLNodeToJson(this.responseText, 'EnviarImagemOSResult'); 
                            if(EnviarImagemOSResult!=EnviarImagemOSResult_OK){
    
                                 custAlert("ENVIO DA IMAGEM RESULTOU EM ERRO");
    							 return ;
    						}
    						photoMedia = null;
                        };
    					
    					xhr.onerror = function(){    
    						custAlert("ERRO AO ENVIAR IMAGEM PARA SSA");
    					};
    					for(var i =0, RetornoImagens =[]; i<photoMedia.length; i++ ){
    						RetornoImagens.push({
    							SOL_CODIGO: SSAcodigoOS,
    							SOX_ANEXO:  photoMedia[i].text
    						});
    					}
    
    
    					var sending =
    					'<?xml version="1.0" encoding="utf-8"?>'+ 
    					'<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+ 
    					'  <soap12:Body>'+ 
    					'    <EnviarImagemOS xmlns="http://tempuri.org/">'+ 
    					'      <codigoUsuario>'+user.codigoUsuario+'</codigoUsuario>'+ 
    					'      <senha>'+user.senha+'</senha>'+ 
    					'      <RetornoImagens>'+JSON.stringify(RetornoImagens)+'</RetornoImagens>'+ 
    					'    </EnviarImagemOS>'+ 
    					'  </soap12:Body>'+ 
    					'</soap12:Envelope>'
    					;
    					xhr.send(sending);
    					
    				}
    				//CRIA OS NA NOSSA BASE, USAR ESTE CÓDIGO PARA GERAÇÃO DE OS
        			//Insert OS na base local
					var date = new Date();
					//passa a data de criação para o cloud(parece duplicação de informação
					// mas é pq quando SS se torna OS, a data de criação da OS no nosso banco de dados é diferente
					// da data de quando a OS foi criada no SSA, então o campo os_created_at foi
					// criado para resolver utilizando a mesma lógica as datas de criação de OS e SS)
					console.log(local.full_loc);
					pdate = date.toISOString().split(".")[0].concat("+0000");
                    Cloud.Objects.create({ 
                            classname: 'os',
                            fields: {
                                os_id : SSAcodigoOS.toString(),
    							os_id_globo: codigoOS.toString(),
                                os_local_id : Ti.App.localId,
                                os_serv_id : text,
                                os_tipo_id : idTipo,
                                os_desc : $.areaInfo.getValue(),
                                os_local_desc: Ti.App.localDesc,
                                pesq_nota : '',
                                pesq_coment: '',
    							os_div: local.div_codigo,
								os_local_full_desc: local.full_loc,
    							os_created_at: pdate
                            }
                            }, function (e) {
								console.log(e);
                                if (e.success) {
                                    
                                    //Envia as fotos
                                    for (var count = 0; count < photoArray.length; count++){
                                        Cloud.Photos.create({
                                            photo: photoArray[count],
                                            custom_fields:{
                                                os_id:SSAcodigoOS.toString()
                                            }
                                        }, function (evt) {
                                            if (!evt.success) {
                                                //Por enquanto nada
                                            }
                                        });
                                    }
    								
                                    custAlert('Serviço enviado com sucesso! OS:' + codigoOS, 'Envio com sucesso');
    								$.WidNR.hide();
    								$.winForm.close();
    
                                } else {
                                    custAlert("Ocorreu um erro ao enviar seu formulário.");
                                    $.WidNR.hide();
                                    
                                }
                        });
    
    
    			}; 
    			xhr.onerror = function(){
    				custAlert("ERRO10 "+ this.responseText);
    				$.WidNR.hide();
    			};
    
    			var timestamp = generateDatePattern();
    			var info =  $.areaInfo.getValue();
    			info = typeof info!='undefined'? 'Descrição: ' +  info: "";
				info =  Ti.App.localDesc != '' ? 'Local: ' + Ti.App.localDesc+ "\n" + info: info;  
    			var sending =
    				'<?xml version="1.0" encoding="utf-8"?> '+ 
    				'<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+ 
    				'  <soap12:Body><CriarOsCorretivaExterno xmlns="http://tempuri.org/"><codigoUsuario>'+user.codigoUsuario+'</codigoUsuario>'+ 
    				'      <codigoDivisao>'+local.div_codigo+'</codigoDivisao>'+ 
    				'      <JsonCriarOS>'+
    				'{ SOL_CODIGO: 0,'+ 
    				'  SOL_DESCRI:\"'+ text  + ' - ' + idTipo+ '\n- Local Completo:'+ local.full_loc + '\n'+ '\",'+ 
    				'  SOL_DTHRCA: \"'+ timestamp +'\",'+ 
    				'  SOL_DTHREN: "",'+ 
    				'  TIS_CODIGO: 56,'+ 
    				'  LOC_CODIGO:'+ local.loc_codigo+','+ 
    				'  EQU_CODIGO: 0,'+ 
    				'  ACO_TEXTO: "",'+ 
    				'  STF_CODSAT: 0,'+ 
    				'  STF_JUSTIF: "",'+ 
    				'  STF_USUARIO: 0,'+
    				'TSO_CODIGO:'+ codTipoSSA+ ','+
    				'SER_CODIGO:"",'+  
    				'  USU_CODSOL:'+ user.codigoUsuario+','+ 
    				'  SOL_TEXTO: \"'+ info + '\"}' +
    				'</JsonCriarOS>'+ 
    				'      <JsonApoMobra></JsonApoMobra>'+ 
    				'    </CriarOsCorretivaExterno>'+ 
    				'  </soap12:Body>'+ 
    				'</soap12:Envelope>';
    				//errorLog += " " + JSON.stringify(sending);
    			xhr.send(sending);			
    
    	}// FIM ELSE NAO EH MANUTENÇÃO --> CRIA OS
    	
    //Caso não esteja online: caso OS
        else{
           var photoFiles = [];
                           
           for (var counter = 0; counter < photoArray.length; counter++){
               var fileName = "central2777-"+ new Date().getTime() + '.jpg';
               var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
               file.write(photoArray[counter]);
               photoFiles.push(file.nativePath);
           }
           for (var counter2 = photoArray.length - 1; counter2 < 5; counter2++)
               photoFiles.push('');
           
           
           timestamp = generateDatePattern();
           localdb.storageOS({
               local_id:Ti.App.localId,
               serv_id:text,
               tipo_id:idTipo,
               desc:$.areaInfo.getValue(),
               local_desc:Ti.App.localDesc,
               div:local.div_codigo,
               codTipoSSA:codTipoSSA,
               loc_codigo:local.loc_codigo,
               timestamp:timestamp,
               codUsuario: user.codigoUsuario,
               local_full_desc: local.full_loc
               },photoFiles);
           
           
           var dlgFechar = Ti.UI.createAlertDialog({
              message:  "Você está sem acesso a internet. Sua solicitação foi salva e será enviada quando você estiver online.",
              title: "CENTRAL 2777",
              buttonNames:['OK']
           });
           
           dlgFechar.addEventListener('click',function(e){
               if (e.index == 0){
                    dlgFechar.hide();
                    $.winForm.close();
               }
           });
           dlgFechar.show();

           $.WidNR.hide();
        }
	}
	}
});

function chooseLocal () {
	Alloy.createController('comboLocal',{label: lblLocalId,qrLabel:$.lblQR1,localArray:localArray}).getView().open();
}


function XMLNodeToJson(xmlsstr, node){
	// TODO : testar novamente quando 
	str = xmlsstr.split("<"+ node + ">");
	if(str==xmlsstr)
		return false;
	str = str[1].split("</"+ node + ">");
	if(str[0][0]=='{'){
		
		return JSON.parse(str[0]);
	}
	else{
		return str[0];
	}
}

function generateDatePattern(){
	var date = new Date();
	var timestamp = date.toISOString();
	timestamp = timestamp.split('T');
	var timestamp_date = timestamp[0].replace(/-/g,'/');
	var timestamp_time = timestamp[1].split('.')[0];
	return 	timestamp_date + " " + timestamp_time;
}

$.winForm.addEventListener('close',function(e){
    require('clearMemory').clear($.winForm);
    photoArray = null;
});

$.winForm.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextField') {
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.areaInfo.blur();  
        }
     } 
//alert(errorLog);    
});

ssaLib.getDivisoes(divisoes);
