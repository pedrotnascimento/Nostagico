var geofence = require('geofence');

var Cloud = require ('ti.cloud');

$.btnEsq.addEventListener('click',function(e){
	var ctrlEsq = Alloy.createController('esqSenha').getView();
	ctrlEsq.open();
});
if (OS_ANDROID)
	$.winLogin.addEventListener('androidback', function(e){
		//disable back button
	});

$.btnVis.addEventListener('click',function(){
   if (geofence.checkLocal())
        Alloy.createController('visitante').getView().open(); 
});


var login ; 
if((login= Ti.App.Properties.getObject("meuLogin"))!=null && login.version == Ti.App.version){
	$.fldUser.setValue(login.user);
}else{
    Ti.App.Properties.setObject("meuLogin", null);
}

function abrirCad(){ 
    if (geofence.checkLocal())
        Alloy.createController('cadastro').getView().open();
}

function abrirMenu(){ 
	$.fldUser.blur();
	$.fldSenha.blur();
	$.WidNR.show();
	
	if (require('validateFields').checkEmail($.fldUser.getValue())){
	   var xhr = Ti.Network.createHTTPClient({
                        onload: ValidaLogin,
                        onerror: onError
                    });
                    if (ENV_PRODUCTION)
                        xhr.open("POST","http://tvglobogestao.astrein.com.br/api/ssa/ValidaLoginExterno");
                    else
                        xhr.open("POST","http://gestaotvglobohml.astrein.com.br/api/ssa/ValidaLoginExterno");
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    var sending = { 
                            usucodusu: $.fldUser.getValue() + "",//converter para string,
                            senha: $.fldSenha.getValue()
                        };
                    xhr.send(JSON.stringify(sending));
                    // exemplo valido para loginusuari
                    // {    
                    //  usucodusu: "36301-0" ,
                    //  senha: "game"
                    // }

    }
    else{
        $.WidNR.hide();
        custAlert("Por favor insira um email válido.");
    }
} 

function logoutUser(){
	Cloud.Users.logout(function (e) {
	});
	
}

function ValidaLogin(){
	var res = JSON.parse(this.responseText);
	var user = res.erroLog;
	Ti.App.divisoes_solicita = res.divisoes;
	var VALIDA_LOGIN_OK = 1;
	user.senha = $.fldSenha.getValue();

	Ti.App.Properties.setObject("meuLogin",{version:Ti.App.version,user:$.fldUser.getValue()});
	
	if (res.erroLog.codigoRetorno==VALIDA_LOGIN_OK) {
		loginNoCloud(user);
	}
	else{
        $.WidNR.hide();
        var errorSSA;
        if(res.erroLog.codigoRetorno==0){
            custAlert("Erro: " + res.erroLog.descricao);
        }
        else if((errorSSA = res.erroLog.descricao.split(": ")[1].split(":")[0]) && (errorSSA == "400" || errorSSA == "403" || errorSSA == "503")){
            custAlert("Erro: Sistema SSA indisponível. Tente novamente mais tarde'");
        }
	}
}

function loginNoCloud(user){
Cloud.Users.login({
	   	login: $.fldUser.getValue() ,
	    password: "g277jorGitos"
	}, function (e) {
			if ( e.success) {
			   // if (e.users[0].role == "admin"){
                    Ti.App.user_role = e.users[0].role;
                    Ti.App.user_id = e.users[0].id;
                    Ti.App.user_email =e.users[0].email;
                    Alloy.createController('principal',{user:user, 
                                                divisoes: divisoes
                                            }).getView().open();
                                            $.WidNR.hide(); 
                }

               /* else if (geofence.checkLocal()){
                        Ti.App.user_role = e.users[0].role;
                        Ti.App.user_id = e.users[0].id;
                        Ti.App.user_email =e.users[0].email;
                        Alloy.createController('principal',{user:user, 
                                                    divisoes: divisoes
                                                }).getView().open();
                }
                else{
                    logoutUser();
                }*/
                
            

			else
			{    
				//Se usuário já existe no SSA, mas não no ArrowDB, realiza cadastro
                if (e.code == 401){
                  //  if (geofence.checkLocal()){
                        	Cloud.Users.create({
                        	    username:$.fldUser.getValue(),
                        	    password:"g277jorGitos",
                        	    password_confirmation:"g277jorGitos",
                        	}, function(evt){
                        	    if (evt.success){
                        	       Cloud.Users.login({
                                        login: $.fldUser.getValue() ,
                                        password: "g277jorGitos" 
                                   }, function (event) {
                                        if ( event.success) {
                        	               //if (event.users[0].role == "admin"){
                        	                   //getDivisoes();
                        	                   Ti.App.user_role = event.users[0].role;
                                               Ti.App.user_id = event.users[0].id;
                                               Ti.App.user_email =event.users[0].email;
                                               Alloy.createController('principal',{user:user, 
                                                                        divisoes: divisoes
                                                                    }).getView().open();
                                               $.WidNR.hide();    
                        	               /*}
                        	               else if (geofence.checkLocal()){
                        	                   getDivisoes();
                        	                   Ti.App.user_role = event.users[0].role;
                                               Ti.App.user_id = event.users[0].id;
                                               Ti.App.user_email =event.users[0].email;
                                               Alloy.createController('principal',{user:user, 
                                                                        divisoes: divisoes
                                                                    }).getView().open();
                                               $.WidNR.hide();
                        	               }
                        	               
                        	               else{
                        	                   logoutUser();
                        	                   $.WidNR.hide(); 
                        	               }*/
                        	           }
                        	           else{
                        	             custAlert("Sistema indisponível no momento. Tente novamente mais tarde."); 
                                         $.WidNR.hide();    
                        	           }
                        	    });
                        	    }
                        	    else{
                        	       custAlert("Sistema indisponível no momento. Tente novamente mais tarde."); 
                        	       $.WidNR.hide();      

                        	    }
                        	});
                 //  }
                    
                }
                else{
                	custAlert("Sistema indisponível no momento. Tente novamente mais tarde.");
                	$.WidNR.hide();   
                }

			}
    });
}


function onError (){
	           if(this.status == 0){
	           		custAlert("Erro: Verifique sua conexão com a internet!" );
	           }else{
					custAlert("Erro: " + this.status + ": " + this.responseText);
			   }
			   $.WidNR.hide();
			} 
			
$.winLogin.addEventListener('close',function(e){
    require('clearMemory').clear($.winLogin);
});



$.winLogin.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextField') {
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.fldUser.blur();
          $.fldSenha.blur();  
        }
     }
});

Ti.App.callBackInserirNome = function(nome){
	console.log(nome);
	$.fldUser.setValue(nome);
};

$.winLogin.open();

//Checa se é o primeiro acesso do usuário:
if (Ti.App.Properties.getBool("firstAccess",true)){
    Alloy.createController('onboarding').getView().open();    
}

//Pede permissão de uso da localização
if (OS_ANDROID)
	if (!Ti.Geolocation.hasLocationPermissions())
    	Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS,function(evt){});

// if(((divisoes=Ti.App.Properties.getObject('getLocais'))==null)){
//     console.log('entrou');console.log();
// 	loadingDivisoes = true;
//     var DIVISAO_CENTRAL_DE_SERVICOS = 80;
//     var xhr = Ti.Network.createHTTPClient();
//     xhr.onload = function(){	
//             if(this.responseText==null){
//                 //custAlert("ERRO AO RECEBER LOCAIS DO SSA.");
//                 Ti.App.Properties.setObject('getLocais', null);
//                 loadingDivisoes = false;
//             }else{
//                 divisoes = JSON.parse(this.responseText);
//                 divisoes = JSON.parse(divisoes.d);
//                 divisoes.version = Ti.App.version;
//                 //divisoes_temp?  console.log(diV_CODIGO, Ti.App.divisoes.length): console.log("erro divisoes "+  diV_CODIGO );
//                 Ti.App.Properties.setObject('getLocais', divisoes);
//             }
//         };
//     xhr.onerror = function(){
//         // if(this.status==0)
//         //     custAlert("Verifique a conexão da internet");
//     };

//     xhr.open('POST','http://wshml.astrein.com.br/inspecao/tvglobohml/SSAMRO.asmx/GetLocais');
//     xhr.setRequestHeader('Content-Type', 'application/json');

//     var sending = {
//         codigoDivisao: DIVISAO_CENTRAL_DE_SERVICOS, //TODO: colocar usuario para escolher de onde é vem a solicitação na interface
//         DtUltimoSincronismo: ""
//     };
//     xhr.send(JSON.stringify(sending));    	
// }

Ti.App.callbackGetDivisoes = function (div){
	divisoes = div; 
}
var ssaLib = require('SSAlib');
var divisoes =ssaLib.getDivisoes();
