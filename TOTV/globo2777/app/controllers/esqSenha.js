// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.btnRec.addEventListener('click',function(e){
	var recover = $.fldUser.value;
	if(recover.indexOf('@')!=-1){
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			var REC_SENHA_OK = 0;
			//TODO: esperar tratamendo de codigoRetorno na api da SSA para trabalhar refatorar Code
			console.log(this.responseText);
			var res = JSON.parse(this.responseText);
			custAlert(res.descricao);
			setTimeout(function(){
                $.winRec.close();
            },2000);
			return ;
		};
		xhr.onerror = function(){
			console.log(this.responseText);
		};
		if (ENV_PRODUCTION)
		  xhr.open('POST', 'http://tvglobogestao.astrein.com.br/api/ssa/RecuperarSenha');
		else
		  xhr.open('POST', 'http://gestaotvglobohml.astrein.com.br/api/ssa/RecuperarSenha');
		xhr.setRequestHeader('Content-Type', 'application/json');
		var sending = {
			"USU_EMACOM" : recover
		};
		xhr.send(JSON.stringify(sending));
	}
	else{
		custAlert("digite email valido");
		return;
	}

	
});

var text = "RECUPERAR SENHA";


$.WidFechar.init({
    text: text,
    parent: $.winRec
});

$.winRec.addEventListener('close',function(e){
    require('clearMemory').clear($.winRec);
});

$.winRec.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextField') {
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.fldUser.blur();  
        }
     }
    
});