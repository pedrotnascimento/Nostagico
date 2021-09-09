var callback = $.args.callback;
var lastSelectedIndex;
var selectedEquipId;
var selectedEquipName;
var selectedNames = ""; 

$.WidFechar.init({
    text: "Criar nota de manutenção",
    parent: $.winCreateNote
});


$.WidFechar.init({
    text: "MANUTENTOR(ES)",
    parent: $.winSelEquip
});

setCardHeight($.vwCard,$.vwSelectSection);

//TODO: pintar os icones de vermelho que são utilizados no template
$.listEquip.addEventListener('itemclick',function(event){
    
  /*  if (typeof lastSelectedIndex != 'undefined')
        event.section.updateItemAt(lastSelectedIndex,{ 
            check:{image: "/images/uncheckedSquare.png"},
            id:{text: selectedEquipId}
    }); */ 
   
    lastSelectedIndex = event.itemIndex;
    var selectedItem = event.section.getItemAt(lastSelectedIndex);

    selectedEquipId = selectedItem.id.text;
     selectedEquipName = selectedItem.name.text;
     
    	selectedNames = selectedNames +"\n" + selectedEquipName;
    

    event.section.updateItemAt(event.itemIndex,{
        check:{image: "/images/checkedSquare.png"},
        id:{text: selectedEquipId}, name:{text: selectedEquipName},
        properties: {
            searchableText: selectedEquipId,
             searchableText: selectedEquipName,
        }
    });
    
});

$.btnSelect.addEventListener('click',function(){
    if (typeof lastSelectedIndex == 'undefined')
        $.dlgError.show();
    else{
        callback(selectedNames);
        $.winSelEquip.close();
    }
});

$.vwSearch.init(function(text){
   $.listEquip.searchText = text; 
});

MemoryClear.clear($.winSelEquip);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winSelEquip);
