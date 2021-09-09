var callback = $.args.callback;
var lastSelectedIndex;
var selectedEquipId;

$.WidFechar.init({
    text: "CÓDIGO DO EQUIPAMENTO",
    parent: $.winSelEquip
});

MemoryClear.clear($.winSelEquip);

setCardHeight($.vwCard, $.vwSelectSection);

//TODO: pintar os icones de vermelho que são utilizados no template
$.listEquip.addEventListener('itemclick',function(event){
    
    if (typeof lastSelectedIndex != 'undefined')
        event.section.updateItemAt(lastSelectedIndex,{ 
            check:{image: "/images/uncheckedCircle.png"},
            id:{text: selectedEquipId}
    });
    lastSelectedIndex = event.itemIndex;
    var selectedItem = event.section.getItemAt(lastSelectedIndex);
    selectedEquipId = selectedItem.id.text;
    
    event.section.updateItemAt(event.itemIndex,{
        check:{image: "/images/checkedCircle.png"},
        id:{text: selectedEquipId}
    });
    
});

$.btnSelect.addEventListener('click',function(){
    if (typeof lastSelectedIndex == 'undefined')
        $.dlgError.show();
    else{
        callback(selectedEquipId);
        $.winSelEquip.close();
    }
});

$.vwSearch.init(function(text){
   $.listEquip.searchText = text; 
});

MemoryClear.clear($.winSelEquip);
$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winSelEquip);