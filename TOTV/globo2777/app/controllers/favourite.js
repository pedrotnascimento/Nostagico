// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args || {};

services = $.args.services;


$.WidFechar.init({
    text: "ESCOLHA O FAVORITO",
    parent: $.fav
});

var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'rowtitle',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: '10dp',
                color: "#000"
            }
        }
    ]
};
  
var listView = Ti.UI.createListView({
    // Maps the plainTemplate object to the 'plain' style name
    templates: { 'plain': plainTemplate },
    // Use the plain template, that is, the plainTemplate object defined earlier
    // for all data list items in this list view
    defaultItemTemplate: 'plain',
    height: "80%",
    top: 0
});
var data = [];
for (var i = 0; i < services.length-1; i++) {
	//dado que o ultimo elemento eh empty(e este nao eh servico), nao se itera em services ateh o final

    backgroundColor = services[i].displayed? "#AAA": "#FFF"; 
    data.push({
        // Maps to the rowtitle component in the template
        // Sets the text property of the Label component
        rowtitle : { text:services[i].text },
        // Sets the regular list data properties
        properties : {
            itemId: services[i].title,
            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
            backgroundColor: backgroundColor
        }
    });
}
$.section = Ti.UI.createListSection({items: data});
listView.sections = [$.section];

//ao clicar em um item, e.itemId(titulo do servico) 
//é passado para a tela principal para atualização
listView.addEventListener('itemclick', function(e){
    var index = e.itemIndex;
    if(!services[index].displayed){
        Ti.App.addFavouriteCallback(index);
        $.fav.close();
    }
    
});

$.fav.add(listView);
 
if(Ti.App.Properties.title!="empty"){
    var deleteButton = Ti.UI.createButton({
        title: "Excluir Favorito",
        width: "80%",
        backgroundColor: "#A00",
        color: "#ffffff",
        backgroundColor: "#C73636",
        borderRadius: "9" 
    }); 

    deleteButton.addEventListener('click', function(e){  
        //ADICIONAR ULTIMA POSIÇÃO DE SERVIÇOS == EXCLUIR FAVORITO == TORNA-LO EMPTY
        Ti.App.addFavouriteCallback(services.length-1);
        $.fav.close();
    });

    $.fav.add(deleteButton); 
}

$.fav.addEventListener('close',function(e){
    require('clearMemory').clear($.fav);
});
