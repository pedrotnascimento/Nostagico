var divisoes = $.args.divisoes;
//var gestao = $.args.gestao;
var Cloud = require('ti.cloud');
var cDateToString = require('dateParse').cDateToString;
/*
$.winRel.addEventListener('click', function(e){

    winTo.close();

    fromWin.close();
});
*/
var tempDate;

$.WidFechar.init({
    text: "RELATÓRIO",
    parent: $.winRel
});

var intervalDate = { //LEMBRA DE ATUALIZAR DAQUI A 4 ANOS
    minDate: new Date(2016, 1, 1), //alterar para 2017 quando virar o ano
    maxDate: new Date(2020, 1, 1)
};

fromDateInit = new Date();
fromDateInit.setMonth(fromDateInit.getMonth() - 1);
var fromDate = Ti.UI.createPicker({
    type: Ti.UI.PICKER_TYPE_DATE,
    minDate: intervalDate.minDate,
    maxDate: intervalDate.maxDate,
    value: fromDateInit,
    selectionIndicator: true
});
fromDate.addEventListener('change', function(e){
	 tempDate = e;
});

var fromDateValue = Ti.UI.createLabel({
    text: getDatePatternBR(fromDateInit),   
    width: "80%",
    height: 60,
    value: fromDateInit,
    borderColor: "#009ddb",
	borderRadius: "5",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font:{ fontSize:18}
}); 
$.fromView.add(fromDateValue);



/*fromDateValue.addEventListener('click', function(e) {
	if(OS_IOS){
		fromWin.open();
	}
	else
    fromDate.showDatePickerDialog({
        value: fromDateValue.value.getTime(),
        callback: fromUpdateDate
    });
});*/

var fromWin = Ti.UI.createWindow({backgroundColor:"#ffffff", height:"50%", width:"80%", layout:"vertical",});
var fromBtn = Ti.UI.createButton({title:"OK"});
fromBtn.addEventListener("click", function(e){
    	if(fromUpdateDateAux(tempDate)){
    		$.WidNR.hide();
        	fromWin.close();
    	}
});

fromWin.add(fromDate);
fromWin.add(fromBtn);

fromDate.addEventListener('change', function(e){

    	tempDate = e;
});
//$.viewPicker.h();
fromDateValue.addEventListener('click',fromUpdateDate );
function fromUpdateDate(e) {
	tempDate = fromDateValue;
	$.WidNR.show();
	 if(OS_IOS){
        fromWin.open();
	}
	else
    fromDate.showDatePickerDialog({
        value: fromDateValue.value.getTime(),
        callback: fromUpdateDateAux
    });
}
function fromUpdateDateAux(e){
            if (e.cancel) {
                //Ti.API.info('User canceled dialog');
            } else if (e.value.getTime() <= toDateValue.value.getTime() ) {
                fromDateValue.value = e.value;
                fromDateValue.text = getDatePatternBR(e.value);
                return true;
            } else {
                custAlert("Selecionar data menor que a data final");
            }
}
/////////////////////////from date above//////////////
/////////////////////////to date below/////////////////
var toDate = Ti.UI.createPicker({
    type: Ti.UI.PICKER_TYPE_DATE,
    minDate: intervalDate.minDate,
    maxDate: intervalDate.maxDate,
    value: new Date(),
});

var toDateValue = Ti.UI.createLabel({
    text: getDatePatternBR(), 
    width: "80%",
    height: 60,
    borderWidth: 1,
    value: new Date(),
    borderColor: "#009ddb",
	borderRadius: "5",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font:{ fontSize:18}
});

$.toView.add(toDateValue);
var toWin = Ti.UI.createWindow({backgroundColor:"#ffffff", height:"50%", width:"80%", layout:"vertical",});
var toBtn = Ti.UI.createButton({title:"OK"});
toBtn.addEventListener("click", function(e){

    if(toUpdateDateAux(tempDate)){
        
        toWin.close();
        $.winRel.accessibilityHidden =false;
    }
});

toWin.add(toDate);
toWin.add(toBtn);

toDate.addEventListener('change', function(e){
    tempDate = e;
});
//$.viewPicker.h();
toDateValue.addEventListener('click',toUpdateDate );
function toUpdateDate(e) {
	$.WidNR.show();
	  tempDate = toDateValue;
	 if(OS_IOS){
        toWin.open();
	}
	else
    toDate.showDatePickerDialog({
        value: toDateValue.value.getTime(),
        callback: toUpdateDateAux
    });
}
function toUpdateDateAux(e){
            if (OS_ANDROID && e.cancel) {
                //Ti.API.info('User canceled dialog');
            } else if (fromDateValue.value.getTime() <= e.value.getTime()) {
                toDateValue.value = e.value;
                toDateValue.text = getDatePatternBR(e.value);
                return true;
            } else {
                custAlert("Selecionar data maior que a data inicial");
            }
}

function generateDatePattern(date) {
    if (!date)
    date = new Date();
    var timestamp = date.toISOString();
    timestamp = timestamp.split('T');
    var timestamp_date = timestamp[0].replace(/-/g, '/');
    var timestamp_time = timestamp[1].split('.')[0];
    return timestamp_date + " " + timestamp_time;
}

function getDatePatternBR(date) {
    if (!date)
        date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return day + "/" + month + "/" + year;
}


$.enviar.addEventListener('click', enviaRelatorio);

var ssa = require('SSAlib');

function enviaRelatorio() {
    $.WidNR.show();
    var now = new Date();
    
    var csv = [];
    var ids = [];
    var skipCounter = 0;

    var fromDateString = fromDateValue.value.toISOString();
    fromDateString = dateParserForCloud(fromDateString);
    var toDateString = toDateValue.value.toISOString();
    toDateString = dateParserForCloud(toDateString);

    function query(skip) {
        var queryObj = {
            classname: 'os',
            limit: 1000,
            order: "-updated_at",
            where: {
                created_at: {
                    $gt: fromDateString,
                    $lt: toDateString
                }
            },
            skip: skip
        };

        Cloud.Objects.query(queryObj, function(e) {            
            if (e.success){
                for (var i = 0; i < e.os.length; i++) {
                    csv.push(createCSVRow(e.os[i]));
                    ids.push(e.os[i].user_id);
                }

                if (e.os.length == 0) {     
                    if (csv.length == 0){
                        $.WidNR.hide();
                        custAlert("Não existe OSs nesse período");
                        return;   
                    }
                    else{
                        Cloud.Users.show({
                                user_ids: ids.join() 
                            }, function (e) {
                                if (e.success) {
                                    for(var i = 0 ; i< csv.length; i++){
                                        for(var j =0; j< e.users.length; j++)
                                            if(csv[i].solicitante ==e.users[j].id ){
                                                csv[i].solicitante = e.users[j].first_name;
                                                break;
                                            }
                                    }
                                    
                                    var anexo = createCSVData(csv);           
                                    enviarRelatorioEmailDialog(anexo);

                                } else {
                                    alert('Error:\n' +
                                        ((e.error && e.message) || JSON.stringify(e)));
                                }
                            });
                    
                                
                    }
                    
                }
                else{
                    skipCounter += 1000;
                    query(skipCounter);
                }
            }
            else{
                custAlert("Sistema indisponível no momento. Tente novamente mais tarde.");
                $.WidNR.hide(); 
            }
        }, function(e) {
            alert(e);
        });
    };
    //TODO: PEGAR A QUANTIDADE DE INSTANCIAS, PARA DEFINIR A QUANTIDADE DE SKIPS(ARGUMENTO DE query abaixo)
    query(0);


    function dateParserForCloud(str) {
        str = str.split(".");
        str = str[0] + "+0000";
        return str;
    }
}

function enviarRelatorioEmailDialog(anexo){
    $.WidNR.hide();
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "Relatório CENTRAL2777";
    emailDialog.toRecipients = [Ti.App.user_email];
    emailDialog.messageBody = 'Em anexo, o relatório solicitado no CENTRAL 2777';
    var buffer = Ti.createBuffer({
        value: anexo, 
        type: Ti.Codec.CHARSET_ISO_LATIN_1 
    });
    //ao contrário do que eu achava, o type não define o tipo de codificação do arquivo, mas define a codificação do texto. 
    //o arquivo(plain text) continua sendo codificado em latin1, e os characters estão encodados da mesma forma
    //o pensamento errado era achar que o tipo define a codificação do arquivo, sendo assim, 
    //mudado a codificação do arquivo os characters seriam UTF-8 (default do javascript) e o arquivo também seria, mas está errado

    var blob = buffer.toBlob();
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Relatorio_CENTRAL2777.csv');
    f.write(blob); // write to the file
    emailDialog.addAttachment(f);

    emailDialog.addEventListener('complete',function(evt){
       if (f.exists())
                f.deleteFile();

    });
    emailDialog.open();
}

function createCSVRow(os) {
    var localTemp, local;
    if( 'undefined'== typeof os.os_local_full_desc){
        localTemp = ssa.getLocalAndDiv(divisoes, os.os_local_id);
        local = localTemp.loc_descri;
    }
    else
        local = os.os_local_full_desc;
    var created;
    // se campo nao estiver definido, atribui string, senão atribui campo
    ('undefined' == typeof os.os_created_at && (created = "OS antiga")) || 
    ((created = cDateToString(os.os_created_at)));

    var self = {
        "OS": os.os_id_globo,
        "solicitante": os.user_id,//vai entrar o nome que foi pego com o user_id da OS
        "local": local,
        "serviço": os.os_serv_id,
        "tipo": os.os_tipo_id,
        "descrição": os.os_desc!=""?os.os_desc: "  -  ",
        "descrição do local": os.os_local_desc!=""?os.os_local_desc: "  -  ",
        "nota": os.pesq_nota!=""?os.pesq_nota:"  -  ",
        "comentário": os.pesq_coment!=""?os.pesq_coment: "  -  ",
        "criação": created,
        "atualização": cDateToString(os.updated_at)
    };
    return self;
}

function createCSVData(arr){
    var data = "";
     data += "OS;solicitante;local;serviço;tipo;descrição;descrição do local;nota;comentário;criação          ;atualização       \n";

    for (item in arr){

        data+= arr[item].OS +";";
        data+= arr[item].solicitante + ";";
        data+= "\"" + arr[item].local + "\";";
        data+= "\"" + arr[item].serviço + "\";";
        data+= arr[item].tipo +";";
        data+= "\"" +arr[item].descrição +"\";";
        data+= "\"" +arr[item]["descrição do local"] +"\";";
        data+= arr[item].nota +";";
        data+= "\"" +arr[item].comentário +"\""+ ";";
        data+= "\"" +arr[item].criação +"\""+ ";";
        data+= "\"" +arr[item].atualização +"\""+ "\n";
    }

    return data; 
}
/*
$.winRel.addEventListener('click', function(e){
	if(e.source != toDate && e.source != fromDate){
		toDate.setVisible(false);
		fromDate.setVisible(false);
	}
});*/



$.winRel.open();

$.winRel.addEventListener('close',function(){
	fromWin.close();
	toWin.close();
   require('clearMemory').clear($.winRel); 
   require('clearMemory').clear(fromWin);
   require('clearMemory').clear(toWin);
});

