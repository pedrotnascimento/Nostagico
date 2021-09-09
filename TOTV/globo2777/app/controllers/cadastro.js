// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var mask = require('mask');

var tvgSel = true;
var tipo = "funcionario";

$.WidFechar.init({
    text: "CADASTRE-SE",
    parent: $.winCad
});

var Cloud = require ('ti.cloud');

function clickTer(){
	if (tvgSel){
		tvgSel = false;
		$.btnTVG.color = "#DDDDDD";
		$.btnTVG.backgroundColor = "white";
		$.btnTer.color = "white";
		$.btnTer.backgroundColor = "#3574A9";	
		tipo = "parceiro";
		$.fldUser.editable = false;
		$.fldUser.backgroundColor = '#DDD';
		$.fldUser.hintText = "Somente para funcionarios";	
	}
}

function clickTvg(){
	if (!tvgSel){
		tvgSel = true;
		$.btnTVG.color = "white";
		$.btnTVG.backgroundColor = "#3574A9";
		$.btnTer.color = "#DDDDDD";
		$.btnTer.backgroundColor = "white";	
		tipo = "funcionario";
		$.fldUser.editable = true;
		$.fldUser.backgroundColor = '#fff';
		$.fldUser.hintText = "Exemplo: 33650";
	}
}

$.btnCad.addEventListener('click',function(e){
        $.WidNR.show();
		var obj = {};
		if((obj = validaDados())){
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			var res = JSON.parse(this.responseText);
			
			if(res.descricao==null){
			    $.WidNR.hide();
				//CADASTRO REALIZADO COM SUCESSO
				var nome = obj.email;
				Ti.App.callBackInserirNome(nome);
				criaNoCloud();
				$.winCad.close();
				
			}
			else{
			    $.WidNR.hide();
				custAlert("SSA: cadastro nao realizado " + res.descricao + "\n" +
							"Se você já estiver cadastrado tente recuperar a senha");
			}
		};
		xhr.onerror = function(){
		    $.WidNR.hide();
			    if(this.status==0){
            		custAlert("Verifique a conexão da internet");
					return;
				}
			
			custAlert("error SSA:" + this.responseText);
		};
		if (ENV_PRODUCTION)
		  xhr.open('POST', 'http://tvglobogestao.astrein.com.br/api/ssa/RegistrarUsuarioExterno');  
	    else
	       xhr.open('POST', 'http://gestaotvglobohml.astrein.com.br/api/ssa/RegistrarUsuarioExterno');  
		xhr.setRequestHeader('Content-Type', 'application/json');
		var sending =  {
			"USU_EMACOM": obj.email,
			"USU_NOME": obj.nome,
			"USU_SENHA": obj.senha,
			"USU_TELCOM": obj.tel,
			"USU_RAMAL": obj.ramal,
			"DIV_CODIGO": 80, 
			"USU_CODIGO": 0, // sempre precisa ser 0
			"USU_CODUSU": ""	
		};

		/*exemplo sending
		{
		"USU_EMACOM": "evelyn.damas.12345@me.com", //o login é o truncamento até o @, neste caso: login é evelyn.damas.12345 
		"USU_NOME": "Evelyn Damas",
		"USU_SENHA": "1", 
		"USU_TELCOM": "", //pode ser vazio
		"USU_RAMAL": "", //pode ser vazio
		"DIV_CODIGO": 80,
		"USU_CODIGO": 0, //precisa ser sempre  0
		"USU_CODUSU": "", //sempre vazio
		}
		*/
		
		xhr.send(JSON.stringify(sending));

		}
		else
		  $.WidNR.hide();
		  
	function criaNoCloud(){
		  	
		Cloud.Users.create({ 
    		username: /*$.fldUser.getValue()*/ $.fldEmail.getValue().substr(0,$.fldEmail.getValue().indexOf('@')),
    		//password: $.fldSenha.getValue(),
    		//QUANDO INSERIR O CAMPO CONFIRMAR SENHA, TROQUE A LINHA ABAIXO PARA PEGAR O VALOR DE TAL CAMPO
    		//password_confirmation: $.fldSenha.getValue(),,
			matricula: $.fldUser.getValue(),
    		email:$.fldEmail.getValue(),
    		password: "g277jorGitos",
    		password_confirmation: "g277jorGitos",
    		first_name: $.fldNome.getValue(),
    		admin: false,
    		custom_fields:{
			  "ramal": $.fldRamal.getValue(),
			  "telefone": $.fldTel.getValue()
			},
    		//last_name: lastName.value //decidir se vai ser usado depois
    		role: tipo
		}, function (e) {
	    	if (e.success) {

				//custAlert('Usuário criado com sucesso! Você está pronto para realizar seu login!', 'Cadastrado com sucesso');

	    	} else {
	        	 /*alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));*/
                $.WidNR.hide();
	        	//custAlert((e.error && e.message) || JSON.stringify(e));
	    	}
		});
 
		  }
});

	//Checa se todos os campos foram preenchidos e operacionais
	function validaDados(){
			var obj = {};
			obj.email = $.fldEmail.getValue();
			obj.senhaConf = $.fldSenhaConf.getValue();
			obj.senha =  $.fldSenha.getValue();

			if(tipo=="funcionario" && ((obj.matricula = $.fldUser.getValue())==null || obj.matricula==""))
				return custAlert("Campo a ser preenchido: Matrícula") && false;
			else if ((obj.nome = $.fldNome.getValue()) == null || obj.nome=="")
				return custAlert("Campo a ser preenchido: Nome") && false;
			else if (obj.email == null || !require('validateFields').checkEmail(obj.email))
				return custAlert("Campo inválido: Email") && false;
			else if (obj.senha  == null)
				return custAlert("Campo a ser preenchido: Senha") && false;
		    else if (obj.senha.length > 10 || obj.senha.length < 6)
		        return custAlert("A senha deve ter entre 6 a 10 caracteres") && false;
			else if (obj.senhaConf  == null)
			 	return custAlert("Campo a ser preenchido: Confirmação de senha") && false;
			else if (obj.senhaConf != obj.senha)
			    return custAlert("Os campos senha e confirmação de senha devem ser iguais") && false;
			obj.ramal = $.fldRamal.getValue();
			obj.tel = $.fldTel.getValue();
			return obj;
	}
$.winCad.addEventListener('close',function(e){
    require('clearMemory').clear($.winCad);
   
});

$.winCad.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextField') {
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.fldUser.blur();  
          $.fldNome.blur();
          $.fldEmail.blur();
          $.fldRamal.blur();
          $.fldTel.blur();
          $.fldSenha.blur();
          $.fldSenhaConf.blur();
        }
     }
    
});
if(OS_IOS){
    $.fldTel.addEventListener("change", function() {
	
    	Mask.mask($.fldTel, Mask.cell);
    });

    $.fldRamal.addEventListener("change", function() {
        Mask.mask($.fldRamal, Mask.phone);
    });
}