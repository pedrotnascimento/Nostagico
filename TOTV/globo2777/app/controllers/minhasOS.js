// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var errorLog = "";
var Cloud = require('ti.cloud');
var ssaLib = require('SSAlib');
var XHR = require('xhr');

var div = [];

var gestao = $.args.gestao;
divisoes = $.args.divisoes;

// if(!gestao)
//     $.winOS.remove($.relatorio);
//ssaLib.fillLocal(Ti.App.divisoes_solicita, div);

var SSAsituacaoRetorno = {
    "LABELENCERRADA": {
        text: " ENCERRADA ",
        color: "#ff7d00"
    },
    "LABELPROGRAMADA": {
        text: " PROGRAMADA ",
        color: "#111111"
    },
    "LABELCADASTRADA": {
        text: " CADASTRADA ",
        color: "#1111ff"
    },
    "LABELCANCELADA": {
        text: " CANCELADA ",
        color: "#ff1111"
    },
    null: {
        text: " N/A ",
        color: "#000000"
    }
};

$.WidNR.show();

//Buscar informações de OS associadas ao usuário logado
var listOS = [];
var listStatus = [];
var listItems = [];
if (!gestao) {
    $.WidFechar.init({
        text: "SOLICITAÇÕES",
        parent: $.winOS
    });
        Cloud.Objects.query({
        classname: 'os',
        limit: 100,
        order: "-updated_at",
        where: {
            user_id: Ti.App.user_id
        }
    }, buscaOS);
    
    
} else {
    $.WidFechar.init({
        text: "GESTÃO DE SOLICITAÇÕES",
        parent: $.winOS
    });


    
    Cloud.Objects.query({
        classname: 'os',
        limit: 400,
        order: "-updated_at",
    },
    buscaOS);
   
}

function buscaOS(e) {
    if (e.success) {

        for (var i = 0; i < e.os.length; i++) {
            var os = e.os[i];            
            
            var item = {
                id: {
                    text: os.os_id_globo + ' - ' + os.os_serv_id
                },
                properties: {
                    searchableText: os.os_serv_id
                }
            };

            var osInfo;
            if (os.pesq_nota != '') {
                osInfo = {
                    os: os,
                    status: " CONCLUÍDA ",
                    color: "#009946"
                };
                item.status = {
                    text: " CONCLUÍDA ",
                    borderColor: "#009946",
                    color: "#009946"
                };
            } else {
                osInfo = {
                    os: os,
                };
            }
            
            listOS.push(osInfo);

            if (os.pesq_nota == '') {
                $.listSecOS.appendItems([item]);
                listItems.push(osInfo);
                buscaOsSSA(i, item, os,  $.listSecOS.items.length - 1);
            }
        }
        if(gestao){ 
	    Cloud.Objects.query({
	        classname: 'ss',
	        // limit:50,
	        order: "updated_at",
            where:{
                is_os: false
            }
	    },buscaSS);
	    }
	    else{
		    	     
		    Cloud.Objects.query({
		        classname: 'ss',
		        // limit:50,
		        order: "updated_at",
                where:{
                    user_id: Ti.App.user_id,  
                    is_os: false
	            }
		    },buscaSS);
	
	    }
        $.WidNR.hide();
    } else {
        custAlert('Sistema indisponível no momento. Por favor tente novamente mais tarde');
        $.WidNR.hide();
    }
}


function buscaOsSSA(i, item, os, inxDisplay){
        var sending = {
                codigoOS: os.os_id,
        };
        var url;
        if (ENV_PRODUCTION)
            url = "http://tvglobogestao.astrein.com.br/api/ssa/BuscaSituacaoOS";
        else
            url = "http://gestaotvglobohml.astrein.com.br/api/ssa/BuscaSituacaoOS";
        var onload = holdOS(i,inxDisplay, item);
        var onerror = errorSSA(os);

        if (OS_IOS) {
            var xhr = new XHR();
            //xhr.POST("http://freegeoip.net/json/", data, onSuccessCallback, onErrorCallback, options);
            xhr.POST(url,
                JSON.stringify(sending),
                onload,
                onerror, {});
        } else {
            xhr = Ti.Network.createHTTPClient();
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.open('POST', url);
            xhr.onload = onload;
            xhr.onerror = onerror;
            xhr.send(JSON.stringify(sending));
        }
}

function holdOS(i, inxDisplay, item) {
    return function(e) {
        res = OS_IOS ? JSON.parse(e.data) : JSON.parse(this.responseText);
        //console.log(res);
        var status = SSAsituacaoRetorno[res.situacao];
        item.status = {
            text: status.text,
            borderColor: status.color,
            color: status.color
        };
        $.listSecOS.updateItemAt(inxDisplay, item);
        
        listOS[i].status = status.text;
        listOS[i].color = status.color;
        
    };
};

function errorSSA(){
    return function(e) {
            custAlert("erro:" + JSON.stringify(e) + "\nOS:" + JSON.stringify(os.os_id), 'ERRO OS');
        };

};

function buscaSS (e) {
        if (e.success) {
                var status;
                var color;
                color = "#CCCCCC";

    			var ss = e.ss;
                var onload = holdIdSS(ss);
                var onerror = function (){
                     custAlert("error ss" + JSON.parse(this.responseText)); 
                };
                var url;
                if (ENV_PRODUCTION)
                    url = 'http://tvglobogestao.astrein.com.br/api/ssa/AtualizaSituacaoSS' ;
                else
                    url = 'http://gestaotvglobohml.astrein.com.br/api/ssa/AtualizaSituacaoSS' ;
                // console.log(ss);
        
    			for (var i = 0, sending=[]; i < e.ss.length; i++) {
    				sending.push(SSObject(ss[i].ss_id_globo, ss[i].ss_div ));
    			}
                
                if (OS_IOS) {
                    var xhr = new XHR();
                    //xhr.POST("http://freegeoip.net/json/", data, onSuccessCallback, onErrorCallback, options);
                    xhr.POST(url,
                        JSON.stringify(sending),
                        onload,
                        onerror, {});
                } 
                else {
                    xhr = Ti.Network.createHTTPClient();
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.open('POST', url);
                    xhr.onload = onload;
                    xhr.onerror = onerror;
                    xhr.send(JSON.stringify(sending));
                }

    			function holdIdSS(ss){
    				return 	 function(e){
    				var res = OS_IOS ? JSON.parse(e.data) : JSON.parse(this.responseText);
                    var continueBool;
                    
    				for(var i =0 ; i<res.length; i++){

    					if(res[i].sol_codigo==0)
    						continue;
                        for(var j =0; j<listOS.length;j++)
                            if(res[i].sol_codigo==listOS[j].os.os_id){
                                continueBool = true;
                                break;
                            } 
                        if(continueBool){
                            continueBool = false;
                            continue;
                        }    
                        var date = res[i].dataInicioAtendimento;
        				pdate = datetoCloud(date);
                        var os = {
                            os_id: res[i].sol_codigo,
                            os_id_globo: res[i].sol_codusu,
                            os_local_id: ss[i].ss_local_id,
                            os_serv_id: ss[i].ss_serv_id,
                            os_tipo_id: ss[i].ss_tipo_id,
                            os_desc: ss[i].ss_desc,
                            os_local_desc: ss[i].ss_local_desc,
                            pesq_nota: '',
                            pesq_coment: '',
                            os_div: ss[i].ss_div,
                            os_old_ss: ss[i].ss_id_globo,
                            os_created_at: pdate,
                        };
                        if('undefined' != typeof ss[i].ss_local_full_desc)
                            os.os_local_full_desc =ss[i].ss_local_full_desc;

                         var osCloud = {
                             classname: 'os',
                             fields: os
                         };
                         if(gestao)
                            osCloud.su_id= ss[i].user_id;

                   		 Cloud.Objects.create(osCloud, (function(ss_id_globo, os_id, ss_cloud_id){
                           return  function(e) {
                            if(e.success){
                                Cloud.Photos.query({
                                    where: {
                                        ss_id_globo: ss_id_globo.toString()
                                    }
                                }, function(e) {
                                    if (e.success) {

                                        Cloud.Objects.update({
                                            classname: 'ss',
                                            id: ss_cloud_id,
                                            fields:{
                                                is_os: true
                                            }
                                        },function(e){
                                            if(!e.success){
                                                //api de checagem de  erro
                                                Cloud.Objects.create({
                                                    classname:'error',
                                                    fields:{
                                                        nome: "atualização de status da ss(is_os) no nosso banco(minhasOS.js)",
                                                        log: JSON.stringify(e)
                                                    }
                                                },function(){});
                                            }
                                        });


                                        if (e.photos.length != 0)
                                            for (var i = 0; i < e.photos.length; i++) {
                                                
                                            Cloud.Photos.update({
                                                photo_id: e.photos[i].id,
                                                custom_fields: {
                                                    os_id: os_id.toString()
                                                }
                                            },function(evt) {
                                                if (!evt.success) {
                                                    custAlert('Error:\n' +
                                                        ((evt.error && evt.message) || JSON.stringify(evt)));
                                                    Cloud.Objects.create({
                                                        classname:'error',
                                                        fields:{
                                                            nome: "error copia de foto de SS para OS(minhasOS.js)",
                                                            log: JSON.stringify(evt)
                                                        }
                                                    },function(e){});
                                                } 
                                            });
                                        };

                                    } else {
                                        //custAlert("Ocorreu ao recuperar fotos de SS " + JSON.stringify(e) );
                                        Cloud.Objects.create({
                                                    classname:'error',
                                                    fields:{
                                                        nome: "criação de OS apartir de SS(minhasOS.js)",
                                                        log: JSON.stringify(e)
                                                    }
                                                },function(){});
                                    }
                                });
                                
                            };
                        };
                        })(ss[i].ss_id_globo, os.os_id, ss[i].id));       
                 
                        var osInfo = {
                            os: os
                        };
                        var item = {
                             id: {
                                text: os.os_id_globo + ' - ' + os.os_serv_id
                            },
                            properties: {
                                searchableText: os.os_serv_id
                            }
                        };
                           
                        listOS.push(osInfo);
                        $.listSecOS.appendItems([item]);
                        buscaOsSSA(listOS.length-1, item, os, $.listSecOS.items.length - 1);
                        listItems.push(osInfo);
    				}

    			  };
    			};


            $.WidNR.hide();
        }
    	else {
            custAlert(((e.error && e.message) || JSON.stringify(e)),'Erro');
    		$.WidNR.hide();
        }
    }

$.searchBar.addEventListener('change', search);

function search(evt) {
    //makeFilterType();
    $.listOS.searchText = evt.value;
}

$.listOS.addEventListener('itemclick', function(e) {

    var item = $.listSecOS.getItemAt(e.itemIndex);
    var alertDlg = Ti.UI.createAlertDialog({
        title: 'O que você deseja?',
        buttonNames: ['Pesquisa', 'Detalhes', 'Voltar'],
        message: 'Deseja realizar a pesquisa de avaliação ou ver os detalhes da O.S.?'
    });
    alertDlg.addEventListener('click', function(evt) {

        if (evt.index == 0) {
            Alloy.createController('avaliacao', {
                item: listItems[e.itemIndex],
                section: $.listSecOS,
                index: e.itemIndex
            }).getView().open();
        } else if (evt.index == 1)
            Alloy.createController('detalhesOS', {
                os: listItems[e.itemIndex].os,
                div: divisoes
            }).getView().open();
        alertDlg.hide();

    });

    //Pesquisa de Avaliação ou detalhes
    if (item.status.text == " ENCERRADA " && !gestao)
    //if (item.status.text == " PROGRAMADA " && Ti.App.user_role != "admin") //para testes
        alertDlg.show();
    //Detalhes OS
    else
        Alloy.createController('detalhesOS', {
            os: listItems[e.itemIndex].os,
            div: divisoes
        }).getView().open();
});

function SSObject(ss, divisao) {
    var self = {
        "som_codusu": ss,
        "div_codido": divisao, //divisao
        "sol_codusu": 0,
        "situacao": 0,
        "cod_satisfacao": 0,
        "justificativa": "",
        "dataInicioAtendimento": "",
        "dataSemClassificacao": "",
        "dataSatisfacao": "",
        "dataProgramacao": "",
        "slaAtendimento": 0.0,
        "impedimentoDescricao": "",
        "impedimentoAviso": "",
        "dataEncerramento": ""
    };
    return self;

}

function removeItems() {
    for (var counter = 0; counter < listItems.length; counter++)
        $.listSecOS.deleteItemsAt(counter, listItems.length);
    listItems = [];

}

function filterStatus(status) {
    removeItems();
    //alert(status);
    for (var counter = 0; counter < listOS.length; counter++) {
        if (listOS[counter].status == status) { 
            listItems.push(listOS[counter]);
            $.listSecOS.appendItems([{
                id: {
                    text: listOS[counter].os.os_id_globo + ' - ' + listOS[counter].os.os_serv_id
                },
                status: {
                    text: listOS[counter].status,
                    borderColor: listOS[counter].color,
                    color: listOS[counter].color
                },
                properties: {
                    searchableText: listOS[counter].os.os_serv_id
                }
            }]);
        }
    }
}

function filterMenosConcluida() {
    removeItems();
    for (var counter = 0; counter < listOS.length; counter++) {
        if (listOS[counter].status != " CONCLUÍDA ") {
            listItems.push(listOS[counter]);
            $.listSecOS.appendItems([{
                id: {
                    text: listOS[counter].os.os_id_globo + ' - ' + listOS[counter].os.os_serv_id
                },
                status: {
                    text: listOS[counter].status,
                    borderColor: listOS[counter].color,
                    color: listOS[counter].color
                },
                properties: {
                    searchableText: listOS[counter].os.os_serv_id
                }
            }]);
        }
    }

}

function filterTodos() {
    removeItems();

    for (var counter = 0; counter < listOS.length; counter++) {
        listItems.push(listOS[counter]);

        $.listSecOS.appendItems([{
            id: {
                text: listOS[counter].os.os_id_globo + ' - ' + listOS[counter].os.os_serv_id
            },
            status: {
                text: listOS[counter].status,
                borderColor: listOS[counter].color,
                color: listOS[counter].color
            },
            properties: {
                searchableText: listOS[counter].os.os_serv_id
            }
        }]);
    }

}

var opt = {
    selectedIndex: 0,
    title: 'Filtrar O.S.'
};
opcoesArray = ["NÃO CONCLUÍDAS", "TODOS", "PROGRAMADA", "CADASTRADA", "CANCELADA", "ENCERRADA", "CONCLUÍDA"];
if (OS_IOS) {
    opcoesArray.push('Voltar');
    opt.cancel = opcoesArray.length - 1;
} else {
    opt.buttonNames = ['Voltar'];
}
opt.options = opcoesArray;

var optFilter = Ti.UI.createOptionDialog(opt);

optFilter.addEventListener('click', function(evt) {
    var selectedIndex = evt.index;
    if (OS_ANDROID && evt.button == 1) {
        return;
    } else if (OS_IOS) {
        //QUem estiver com Mac ver no iOS
    }
    //makeFilterStatus();
    switch (selectedIndex) {

        case 0:
            filterMenosConcluida();
            break;

        case 1:
            filterTodos();
            break;

        case 2:
            filterStatus(" PROGRAMADA ");
            break;

        case 3:
            filterStatus(" CADASTRADA ");
            break;

        case 4:
            filterStatus(" CANCELADA ");
            break;

        case 5:
            filterStatus(" ENCERRADA ");
            break;

        case 6:
            filterStatus(" CONCLUÍDA ");
            break;

    }
    /*if (selectedIndex != 6){
    $.searchBar.removeEventListener('change',search);
    $.searchBar.blur();
    $.searchBar.value = '';
    $.searchBar.addEventListener('change',search);
    }*/
    optFilter.hide();
});

$.btnFiltro.addEventListener('click', function() {
    optFilter.show();
});

$.winOS.addEventListener('close',function(e){
    require('clearMemory').clear($.winOS);
    listOS = null;
    listStatus = null;
    listItems = null;
});
 
 
$.winOS.addEventListener('click', function(e) {
    if (e.source.apiName != 'Ti.UI.SearchBar') {
        if (OS_ANDROID) {
            Ti.UI.Android.hideSoftKeyboard();
        } else {
            $.searchBar.blur();
        }
    }
    //alert(errorLog);

});

if(gestao){    
var btnRelatorio = Ti.UI.createView({ 
    //zIndex:"999",
    //top:"25dp", 
    right:"2", 
    width:"30dp", 
    height:"30dp",
    backgroundImage:"/images/relatorio.png"
});

if (OS_IOS){
    btnRelatorio.top = "25dp";
}

function relatorio() {
    var win = Alloy.createController('relatorio', {divisoes:divisoes}).getView();
    win.open();

}

btnRelatorio.addEventListener('click',relatorio);

$.WidFechar.addElement(btnRelatorio);

}

function datetoCloud (date){
     //  "dataInicioAtendimento": "12/07/2016 18:36:27"  ---> [ '29', '12', '2016', '09', '52', '28' ] 
    var date_arr = date.replace(/\/|\:|\s/gi,",").split(",");
    date = new Date();
    date.setDate(date_arr[0]);
    date.setMonth(date_arr[1]-1);
    date.setYear(date_arr[2]);
    date.setHours(date_arr[3]);
    date.setMinutes(date_arr[4]);
    date.setSeconds(date_arr[5]);

    return date.toISOString().split(".")[0].concat("+0000");
}