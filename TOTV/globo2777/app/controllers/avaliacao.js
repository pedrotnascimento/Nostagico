

// Initialize the slide menu
$.WidFechar.init({
    text: "PESQUISA DE AVALIAÇÃO",
    parent: $.winAval
});
var Cloud = require ('ti.cloud');

os = $.args.item.os;

var dlgClose = Ti.UI.createAlertDialog({
   title: "CENTRAL 2777",
   message: "Pesquisa enviada com sucesso",
   buttonNames:['Ok']
});

dlgClose.addEventListener('click',function(evt){
   if (evt.index == 0){
       dlgClose.hide();
       $.winAval.close();
   } 
});


var nota = "";
var btnsArr =  {"Péssimo":$.btnPes,
				"Ruim":$.btnRuim,
				"Bom":$.btnBom,
				"Excelente":$.btnExc
			};

function selectBtn(e){

	nota && $.resetClass(btnsArr[nota],'notSelBtn');
	nota = e.source.title;
	$.resetClass(btnsArr[nota],'selBtn');
}
$.btnPes.addEventListener('click',selectBtn);
$.btnRuim.addEventListener('click',selectBtn);
$.btnBom.addEventListener('click',selectBtn);
$.btnExc.addEventListener('click',selectBtn);

$.btnEnviar.addEventListener('click',function(){
	if (nota != "") {
		Cloud.Objects.update({
		    classname: 'os',
		    id: os.id,
		    fields: {
		        pesq_nota: nota,
		        pesq_coment: $.areaInfo.getValue()
		    }
		}, function (e) {
		    if (e.success) {
		        //Mudar o status da OS na tela de minhas OS
		        
		        
		    	os.pesq_nota = nota;
		    	os.pesq_coment = $.areaInfo.getValue();
		    	
		    	$.args.section.updateItemAt($.args.index,{
                            id:{text: os.os_id_globo + ' - ' + os.os_serv_id},
                            status:{text: " CONCLUÍDA ",borderColor:"#009946",color:"#009946"},
                            properties: {searchableText:os.os_serv_id }
                });
		    	
				dlgClose.show();        
		    } else {
		        custAlert("Servidor indisponível no momento, tente novamente mais tarde!");
		    }
		});
	}
	else
		custAlert("Por favor, escolha uma avaliação para esta O.S.");
});



$.winAval.addEventListener('close',function(e){
    require('clearMemory').clear($.winAval);
    nota = null;
    Cloud = null;  
});
$.winAval.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextArea') {
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.areaInfo.blur();          
        }
     }
    
});