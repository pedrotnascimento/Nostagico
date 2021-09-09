/**
 * @author rafael.bellotti
 */

exports.getLocalAndDiv = function (divisoes,localId){
		var div_codigo,
            loc_descri,
            loc_codigo,
            full_loc="",
            loc_codasc,
            CENTRAL_DE_SERVICOS=80;

		for(var i =0; i< divisoes.length; i++){
			if(divisoes[i].loC_CODUSU==localId){
				loc_codigo = divisoes[i].loC_CODIGO;
				div_codigo = CENTRAL_DE_SERVICOS;
				loc_descri = divisoes[i].loC_DESCRI;
                loc_codasc = divisoes[i].loC_CODASC;
				break;
			}
		}
		
		if(!loc_codigo){
		    alert("O sistema SSA não possui informações sobre o local");
			return false;
		}

        full_loc= loc_descri;
        for(var i =0, findAsc=loc_codasc; i< divisoes.length; i++){
            if(divisoes[i].loC_CODIGO==findAsc){
                full_loc=divisoes[i].loC_DESCRI + " / " + full_loc;
                findAsc = divisoes[i].loC_CODASC;
            }
        }
	    return{
			loc_codigo:loc_codigo,
			div_codigo:div_codigo,
			loc_descri:loc_descri,
            loc_codasc:loc_codasc,
            full_loc: full_loc
		};
};

exports.updateSS = function(user_id){
	
	Cloud.Objects.query({
		classname: 'ss',
		limit:100,
		order: "-updated_at",
		where:{
			user_id: user_id
		}
	}, function (e) {
		if (e.success) {
			    		
		}
		
	});
	
};

exports.updateSSGestor = function(){
	Cloud.Objects.query({
		classname: 'ss',
		limit:400,
		order: "-updated_at",
	}, function (e) {
		if (e.success) {
			    		
		}
		
	});
};

function ssUpdateDB(objId,os_id,localId,servId,idTipo,os_desc,local_desc,div_codigo){
	Cloud.Objects.update({
		classname:'os',
		id: objId,
		fields:{
			os_id:os_id,
            os_local_id : localId,
            os_serv_id : servId,
            os_tipo_id : idTipo,
            os_desc : os_desc,
            os_local_desc: local_desc,
            pesq_nota : '',
            pesq_coment: '',
			os_div: div_codigo
		}
	},function(e){
		if (e.success){
			return true;
		}
		else
			return false;
	});
}

function holdIdSS(){
	return 	 function(){
	res = JSON.parse(this.responseText);
	for(var i =0 ; i<res.length; i++){
		if(!res[i].sol_coduso)
			continue;
		var osGlobo = res[i].sol_coduso;//os vista pelo usuario
		xhr = Ti.Network.createHTTPClient();
		xhr.setRequestHeader('Content-Type', 'application/json');
		if (ENV_PRODUCTION)
		  xhr.open('POST', 'http://tvglobogestao.astrein.com.br/api/ssa/BuscaSituacaoOS');  
		else
		  xhr.open('POST', 'http://gestaotvglobohml.astrein.com.br/api/ssa/BuscaSituacaoOS');

		xhr.onload = holdIdOS(osGlobo);
		function holdIdOS(os){
			return 	 function(){
				res = JSON.parse(this.responseText);
				status= SSAsituacaoRetorno[res.situacao]; 
				listOS.push(os);
				if (os.pesq_nota != '')
				{
					listStatus.push("CONCLUÍDA");
					$.listSecOS.appendItems([{
						id:{text: 'O.S. ' + os.os_id + ' - ' + os.os_serv_id},
						status:{text: " CONCLUÍDA ",borderColor:"#FF9733",color:"#FF9733"},
						properties: {searchableText:os.os_serv_id }
						}
					]);
				}
				else{
					listStatus.push(status.text.substring(1,status.length));
					$.listSecOS.appendItems([{
						id:{text: 'O.S. ' + os.os_id + ' - ' + os.os_serv_id},
						status:{text: status.text,borderColor:status.color,color:status.color},
						properties: {searchableText:os.os_serv_id }
					}]);
				}
			};
		}

		xhr.onerror = function(){
			alert(this.responseText);
		};
		var sending = {
			codigoOS: os.os_id	 
		};
		xhr.send(JSON.stringify(sending));

		status= SSAsituacaoRetorno[res.situacao];
		// var data = res.data; 
		listOS.push(ss);
		$.listSecOS.appendItems([{
				id:{text: 'S.S. ' + ss.ss_id + ' - ' + ss.ss_serv_id},
				status:{text: status.text,borderColor:status.color,color:status.color},
				properties: {searchableText:ss.ss_serv_id }
			}
			]);
	}

};
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
    return  timestamp_date + " " + timestamp_time;
}



function checkSSA(){
	xhr = Ti.Network.createHTTPClient();
	xhr.setRequestHeader('Content-Type', 'application/json');
	if (ENV_PRODUCTION)
	   xhr.open('POST', 'http://tvglobogestao.astrein.com.br/api/ssa/AtualizaSituacaoSS');
	else
	   xhr.open('POST', 'http://gestaotvglobohml.astrein.com.br/api/ssa/AtualizaSituacaoSS');
	xhr.onload = holdIdSS();
	
	xhr.onerror = function(){
		alert(this.responseText);
	};
	
	var sending = {
		codigoOS: os.os_id	 
	};
	xhr.send(JSON.stringify(sending));
}

/*Input: 
 *photoMedia -> array de fotos encoded base 64
 * user -> id e senha
 * photoArray -> array de fotos sem codificação
 * os -> objeto os
 */
exports.sendOS = function(photoMedia,user,photoArray,os,file,callback){
  
  //Checa se é o mesmo usuário
  if (user.codigoUsuario == os.codUsuario){
      var Cloud = require ('ti.cloud');
      var xhr = Ti.Network.createHTTPClient();
      if (ENV_PRODUCTION)
        xhr.open('POST', 'http://ws.astrein.com.br/inspecao/tvglobo/ssamro.asmx?op=CriarOsCorretivaExterno');
      else
        xhr.open('POST', 'http://wshml.astrein.com.br/inspecao/tvglobohml/SSAMRO.asmx?op=CriarOsCorretivaExterno');
      xhr.setRequestHeader('Content-Type', 'application/soap+xml'); 
      xhr.onload = function(){
          var iTipoDeLog = XMLNodeToJson(this.responseText, 'iTipoDeLog');
          if(!(iTipoDeLog*1)){
        
            var descricao = XMLNodeToJson(this.responseText, 'descricao');
            if("The INSERT statement"==descricao)
                return false;
          }
          var SSAcodigoOS = XMLNodeToJson(this.responseText, 'SOL_CODIGO');
          var codigoOS = XMLNodeToJson(this.responseText, 'SOL_CODUSU');
          
          if(SSAcodigoOS==0)
           return false;
          
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
                if(EnviarImagemOSResult!=EnviarImagemOSResult_OK)
                    return false;         
                      
                photoMedia = null;
            };
            
            xhr.onerror = function(){    
                //Por enquanto nada
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
            var date = new Date();
            var pdate = date.toISOString().split(".")[0].concat("+0000");
            Cloud.Objects.create({ 
                classname: 'os',
                fields: {
                    os_id : SSAcodigoOS.toString(),
                    os_id_globo: codigoOS.toString(),
                    os_local_id : os.local_id,
                    os_serv_id : os.serv_id,
                    os_tipo_id : os.tipo_id,
                    os_desc : os.desc,
                    os_local_desc: os.local_desc,
                    pesq_nota : '',
                    pesq_coment: '',
                    os_div: os.div,
                    os_local_full_desc: os.local_full_desc,
                    os_created_at: pdate
                }
            }, function (e) {
                if (e.success) {
                                        
                    //Envia as fotos
                    for (var count = 0; count < photoArray.length; count++){
                        Cloud.Photos.create({
                            photo: photoArray[count],
                            custom_fields:{
                                os_id:SSAcodigoOS.toString()
                            }
                        },function(et){});
                     }
                     photoArray = null;
                     return callback(os.id,file);
                }
            
            });
          
      };
      
      xhr.onerror = function(){
        //Por enquanto realiza nada
      };
      
      var timestamp = os.timestamp;
      var info =  os.desc;
      info = typeof info!='undefined'? 'Descrição: ' +  info: "";
      info =  os.local_desc != '' ? 'Local: ' + os.local_desc + "\n" + info: info;
      var sending =
                        '<?xml version="1.0" encoding="utf-8"?> '+ 
                        '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+ 
                        '  <soap12:Body><CriarOsCorretivaExterno xmlns="http://tempuri.org/"><codigoUsuario>'+user.codigoUsuario+'</codigoUsuario>'+ 
                        '      <codigoDivisao>'+os.div+'</codigoDivisao>'+ 
                        '      <JsonCriarOS>'+
                        '{ SOL_CODIGO: 0,'+ 
                        '  SOL_DESCRI:\"'+ os.serv_id  + '-' + os.tipo_id+ '\n- Local Completo:'+ os.local_full_desc + '\n'+ '\",'+ 
                        '  SOL_DTHRCA: \"'+ os.timestamp +'\",'+ 
                        '  SOL_DTHREN: "",'+ 
                        '  TIS_CODIGO: 56,'+ 
                        '  LOC_CODIGO:'+ os.loc_codigo+','+ 
                        '  EQU_CODIGO: 0,'+ 
                        '  ACO_TEXTO: "",'+ 
                        '  STF_CODSAT: 0,'+ 
                        '  STF_JUSTIF: "",'+ 
                        '  STF_USUARIO: 0,'+
                        'TSO_CODIGO:'+ os.codTipoSSA+ ','+
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
      
    }
};


/*Input: 
 *photoMedia -> array de fotos encoded base 64
 * user -> id e senha
 * photoArray -> array de fotos sem codificação
 * ss -> objeto ss
 */
exports.sendSS = function(photoMedia,user,photoArray,ss,file,callback){
    if (user.codigoUsuario == ss.codUsuario){
        var xhr = Ti.Network.createHTTPClient();
       // var Cloud = require ('ti.cloud');
        if (ENV_PRODUCTION)
            xhr.open("POST","http://tvglobogestao.astrein.com.br/api/ssa/IncluiSSExterno");
        else
            xhr.open("POST","http://gestaotvglobohml.astrein.com.br/api/ssa/IncluiSSExterno");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function(){ 
            
            var res = JSON.parse(this.responseText);
            var codigoOS= res.codigoRetorno;
            
            Cloud.Objects.create({ 
                classname: 'ss',
                fields: {
                    ss_id: "",
                    ss_id_globo: codigoOS.toString(),
                    ss_local_id : ss.local_id,
                    ss_serv_id : ss.serv_id,
                    ss_tipo_id : ss.tipo_id,
                    ss_desc : ss.desc,
                    ss_local_desc: ss.local_desc,
                    ss_div: ss.div,
                    ss_local_full_desc: ss.local_full_desc,
                    is_os:false,
                }
            }, function (e) {
                if (e.success) {
                                    
                    //Envia as fotos
                    for (var count = 0; count < photoArray.length; count++){
                        Cloud.Photos.create({
                            photo: photoArray[count],
                            custom_fields:{
                                ss_id: "",
                                ss_id_globo: codigoOS.toString()
                            }
                        },function(et){});
                     }
                     return callback(ss.id,file);
                }
                
            });
                                    
        };  
        
        xhr.onerror = function(){
            //Por enquanto realiza nada             
        };
        
        //SENDING SS
        var sending = {
                "div_codigo" : ss.div,
                "som_descri" :   'tipo: ' + ss.serv_id + ' - descrição: ' + ss.desc + '\nLocal Completo: ' + ss.local_full_desc+ '\n',
                "loc_codigo" : ss.loc_codigo,       
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
                
        for(var i=0 ; i<photoMedia.length; i++){
            sending["foto"+(i+1)] = photoMedia[i].text;
            sending["nomefoto"+(i+1)] = i; 
        }
        
        xhr.send(JSON.stringify(sending));
    }
};


exports.getDivisoes=  function (){

    var divisoes=Ti.App.Properties.getObject('getLocais');
    var divV = Ti.App.Properties.getObject('getLocaisVersion');
    console.log("checa divisoes");
    if(divisoes==null || 
    divV==null ||
    divV!=Ti.App.divV){
        console.log('nao tem divisoes');console.log();
        // loadingDivisoes = true;

        var DIVISAO_CENTRAL_DE_SERVICOS = 80;
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function(){
            //alert("this.responseText");
            console.log("busca divisoes");	
                if(this.responseText==null){
                    //custAlert("ERRO AO RECEBER LOCAIS DO SSA.");
                    Ti.App.Properties.setObject('getLocais', null);
                    // loadingDivisoes = false;
                }else{
                    res = JSON.parse(this.responseText);
                    divisoes = res.locais;
                    divV = Ti.App.divV;
                    divisoes.ultimoSinc = res.sUltimoSinc;
                    //divisoes_temp?  console.log(diV_CODIGO, Ti.App.divisoes.length): console.log("erro divisoes "+  diV_CODIGO );

                    Ti.App.Properties.setObject('getLocais', divisoes);
                    Ti.App.Properties.setObject('getLocaisVersion', divV);
                    Ti.App.callbackGetDivisoes(divisoes);

                }
            };
        xhr.onerror = function(){
           // alert(JSON.stringify(this));
            // if(this.status==0)
            //     custAlert("Verifique a conexão da internet");
        };
        if (ENV_PRODUCTION)
            xhr.open('POST','http://tvglobogestao.astrein.com.br/api/ssa/GetLocal');
        else
            xhr.open('POST','http://gestaotvglobohml.astrein.com.br/api/ssa/GetLocal');
        xhr.setRequestHeader('Content-Type', 'application/json');
        // if('undefined' == typeof divisoes.DtUltimoSincronismo)
        //      divisoes.DtUltimoSincronismo = "25/11/2016 10:00";

        var sending = {
            codigoDivisao: DIVISAO_CENTRAL_DE_SERVICOS, //TODO: colocar usuario para escolher de onde é vem a solicitação na interface
            ultimoSinc: "25/11/2016 10:00"
        };
        xhr.send(JSON.stringify(sending));
        return xhr.onload;    	
    }
// alert("hi");
        return divisoes;
}