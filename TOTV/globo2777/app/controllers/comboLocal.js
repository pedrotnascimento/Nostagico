// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (OS_ANDROID)
    $.pickLocalAnd3.setVisible(false);
else
	$.pickLocaliOS3.setVisible(false);
    
var localLabel = args.label;

var local_id = "";
var local_desc = "";

var localArray = args.localArray;
var localArray2 = [];
var localArray3 = [];

$.btnConf.setVisible(false);

$.WidFechar.init({
    text: "SELECIONE SEU LOCAL",
    parent: $.winComboLocal
});

$.WidNR.show();
function androidPick(){
     
    var parentId = "-1";
    var parentId2 = "-1";
    
    //local id : -1
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  Selecione um local",color:'black',backgroundColor:'white'}));
    //local id : 3635
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  Estudios Globo",color:'black',backgroundColor:'white'}));
    //local id: 4167
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  Complexo Jardim Botânico",color:'black',backgroundColor:'white'}));
    //local id: 4164
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  TV Globo Emissora - SP",color:'black',backgroundColor:'white'}));
    //local id: 3801
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  TV Globo Emissora - MG",color:'black',backgroundColor:'white'}));
    //local id: 4166
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  TV Globo Emissora - DF",color:'black',backgroundColor:'white'}));
    //local id: 4165
    $.pColLocalAnd.addRow(Ti.UI.createPickerRow({title:"  TV Globo Emissora - PE",color:'black',backgroundColor:'white'}));
    
    $.pColLocalAnd2.addRow(Ti.UI.createPickerRow({title:"  Não há locais disponíveis",color:'black',backgroundColor:'white'}));
    $.pickLocalAnd.setSelectedRow(0, 1);
    $.pickLocalAnd.setSelectedRow(0, 0);
   
    $.pickLocalAnd.addEventListener('change',function(e){
        $.WidNR.show();
        var rowIndex = e.rowIndex;
        $.btnConf.setVisible(false);
        $.pickLocalAnd3.setVisible(false);
        $.pColLocalAnd3.removeAllChildren();
        $.pColLocalAnd2.removeAllChildren();
        switch(rowIndex){
            case 1:
                parentId = "3635";
            break;
            case 2:
                parentId = "4167";
            break;
            case 3:
                parentId = "4164";
            break;
            case 4:
                parentId = "3801";
            break;
            case 5:
                parentId = "4166";
            break;
            case 6:
                parentId = "4165";
            break;
            default:
                parentId = "-1";
            break;
        }
        
        localArray2 = [];
        if (parentId == "-1"){
            $.pColLocalAnd2.addRow(Ti.UI.createPickerRow({title:"  Não há locais disponíveis",color:'black',backgroundColor:'white'}));
        }
        else{
            
            $.pColLocalAnd2.addRow(Ti.UI.createPickerRow({title:"  Selecione um local",color:'black',backgroundColor:'white'}));
            for (var counter = 0; counter < localArray.length; counter++){
                if (parentId == localArray[counter].ascendente){
                    localArray2.push(localArray[counter]);
                    $.pColLocalAnd2.addRow(Ti.UI.createPickerRow({title:"  " + localArray[counter].desc,color:'black',backgroundColor:'white'}));
                }
                
            }
            $.pickLocalAnd2.setSelectedRow(0, 1);
            $.pickLocalAnd2.setSelectedRow(0, 0);
        }
        
        $.WidNR.hide();
    });
    
    $.pickLocalAnd2.addEventListener('change',function(e){
        
        var rowIndex = e.rowIndex;
        $.btnConf.setVisible(false);
        $.pickLocalAnd3.setVisible(false);
        $.pColLocalAnd3.removeAllChildren();
        if (rowIndex == 0)
            parentId2 = "-1";
        else {
            $.WidNR.show();
            parentId2 = localArray2[rowIndex -1 ].local_id;
            
           
            localArray3 = [];
            for (var counter = 0; counter < localArray.length; counter++){
                if (parentId2 == localArray[counter].ascendente)
                    localArray3.push(localArray[counter]);
                
            }   
            
            if (localArray3.length == 0){
                $.btnConf.setVisible(true);
                local_id = parentId2;
                local_desc = localArray2[rowIndex - 1].desc;
            }
            else{
                $.pickLocalAnd3.setVisible(true);
                $.pColLocalAnd3.addRow(Ti.UI.createPickerRow({title:"   Selecione um local",color:'black',backgroundColor:'white'}));
                for (var counter = 0; counter < localArray3.length; counter++){
                    $.pColLocalAnd3.addRow(Ti.UI.createPickerRow({title:"  " + localArray3[counter].desc,color:'black',backgroundColor:'white'}));
                }
                $.pickLocalAnd3.setSelectedRow(0, 1);
                $.pickLocalAnd3.setSelectedRow(0, 0);
            }
            $.WidNR.hide();
        }
    }); 
    
    $.pickLocalAnd3.addEventListener('change',function(e){
        var rowIndex = e.rowIndex;
        if (rowIndex == 0)
            $.btnConf.setVisible(false);
        else{
            $.btnConf.setVisible(true);
            local_id = localArray3[rowIndex - 1].local_id;
            local_desc = localArray3[rowIndex - 1].desc;  
        }
    });

    $.WidNR.hide();
}

function iosPick(){
	var localDesc2 = [];
	var localDesc3 = [];
	var optLocal;
	var optLocal2 = Ti.UI.createOptionDialog({
        title: 'Escolha um local',
        cancel:0
    });
	var optLocal3 = Ti.UI.createOptionDialog({
        title: 'Escolha um local',
        cancel:0
    });
    var parentId;
    var parentId2;
    $.pickLocaliOS2.addEventListener('click',function(){
    	optLocal2.show();
    });  
    $.pickLocaliOS3.addEventListener('click', function(){
    	optLocal3.show();
    });
    
    var btnRight1 = Titanium.UI.createButton({

        image: '/images/ic-arrow-down@2x.png'
    });
    var btnRight2 = Titanium.UI.createButton({

        image: '/images/ic-arrow-down@2x.png'
    });
    var btnRight3 = Titanium.UI.createButton({

        image: '/images/ic-arrow-down@2x.png'
    });
    
    $.pickLocaliOS.rightButton = btnRight1;
    $.pickLocaliOS.rightButtonMode = Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
    
    $.pickLocaliOS2.rightButton = btnRight2;
    $.pickLocaliOS2.rightButtonMode = Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
    
    $.pickLocaliOS3.rightButton = btnRight3;
    $.pickLocaliOS3.rightButtonMode = Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
    
    var localOpt = ["Cancelar","Estudios Globo","Complexo Jardim Botânico","TV Globo Emissora - SP","TV Globo Emissora - MG","TV Globo Emissora - DF","TV Globo Emissora - PE"];
    
    optLocal = Ti.UI.createOptionDialog({
        options: localOpt,
        title: 'Escolha um local',
        cancel:0
    });
    function populateCombo3(e){
    	var selectedIndex3 = e.index;
    	if (selectedIndex3 != 0){
            $.pickLocaliOS3.value = localDesc3[selectedIndex3];
            local_id = localArray3[selectedIndex3 - 1].local_id;                            
            local_desc = localArray3[selectedIndex3 - 1].desc;                            
            $.btnConf.setVisible(true);  
        }
    }
    
    function populateCombo2(evt){
    	$.WidNR.show();
            var selectedIndex2 = evt.index;
            if (selectedIndex2 != 0){
                $.pickLocaliOS2.value = localDesc2[selectedIndex2];
                parentId2 = localArray2[selectedIndex2 - 1].local_id;
                $.btnConf.setVisible(false);
                $.pickLocaliOS3.setVisible(false);
                $.pickLocaliOS3.value = "";
               
                localDesc3 = [];
                localArray3 = [];
                localDesc3.push("Cancelar");
                for (var counter2 = 0; counter2 < localArray.length; counter2++){
                    if (parentId2 == localArray[counter2].ascendente){
                        localArray3.push(localArray[counter2]); 
                        localDesc3.push(localArray[counter2].desc) ;
                        
                    }   
                }
                
                if (localArray3.length > 0){
                    $.pickLocaliOS3.setVisible(true);
                            
                    optLocal3.setOptions(localDesc3); 
                    
                    //Remove event listener e reimplementa
                    optLocal3.removeEventListener('click',populateCombo3);
                    optLocal3.addEventListener('click',populateCombo3);
                    
                }
                else{                        
                                            
                    local_id = localArray2[selectedIndex2 - 1].local_id;
                    local_desc = localArray2[selectedIndex2 - 1].desc;                        
                    $.btnConf.setVisible(true);                            
                                            
                }
                                        
            
            }      
            $.WidNR.hide();                                    
    }
    
    function opcLocal(e){
        optLocal.show();
    }
    $.pickLocaliOS.addEventListener('click',opcLocal);
    
    $.pickLocaliOS3.setVisible(false);
    //TERMINAR IOS
    optLocal.addEventListener('click',function(event){
        $.WidNR.show();
        $.btnConf.setVisible(false);
        $.pickLocaliOS3.setVisible(false);
        $.pickLocaliOS2.value = "";
        $.pickLocaliOS3.value = "";
        var selectedIndex = event.index;
        
        $.pickLocaliOS.focus(); 
        switch(selectedIndex){
            case 1:
                parentId = "3635";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            case 2:
                parentId = "4167";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            case 3:
                parentId = "4164";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            case 4:
                parentId = "3801";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            case 5:
                parentId = "4166";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            case 6:
                parentId = "4165";
                $.pickLocaliOS.value = localOpt[selectedIndex];
            break;
            default:
            	parentId = "-1";
            break;
        }
        
        localDesc2 = [];
        localArray2 = [];
        localDesc2.push("Cancelar");
        for (var counter = 0; counter < localArray.length; counter++){
            if (parentId == localArray[counter].ascendente){
                localArray2.push(localArray[counter]); 
                localDesc2.push(localArray[counter].desc) ;
                
            }   
        }
            
        optLocal2.setOptions(localDesc2);
                        
                        
                   
        optLocal2.removeEventListener('click',populateCombo2);
        optLocal2.addEventListener('click',populateCombo2);
         $.WidNR.hide();   
    });
    $.WidNR.hide();
    
    
}
if (localArray.length > 0){
    if(OS_IOS)
        iosPick();
    else
        androidPick();
}
else{
    setTimeout(function(){

         custAlert("Não foi possível carregar a árvore de local dos sistemas");

    }, 2000);
    
    $.WidNR.hide();
}

$.btnConf.addEventListener("click",function(){
	Ti.App.localId = local_id;
    Ti.App.localDesc = $.fldDesc.getValue();
	console.log();
	localLabel.text = 'Local: ' + local_desc;
	$.args.qrLabel.text = "ESCANEAR CÓDIGO QR";
	$.winComboLocal.close();
});

$.winComboLocal.addEventListener('close',function(e){
    require('clearMemory').clear($.winComboLocal);
});

$.winComboLocal.addEventListener('click',function(e){
    if (e.source.apiName != 'Ti.UI.TextField') {
        console.log("hey");
        if (OS_ANDROID){
            Ti.UI.Android.hideSoftKeyboard();    
        }
        else{
          $.fldDesc.blur();
        }
     }
    
});




