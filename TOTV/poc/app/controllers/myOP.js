// Configuração do NiceTabs

var highlightSelectorProperties = {
    indicator: {
        backgroundColor: "#96172E",
        height: 2,
        width: "100%",
        bottom: 0,
        left: 0,
    },
    label: {
        color: "#96172E",
        font: {
            fontSize: "15dp",
            fontWeight: "bold",
        }
    }
};

var fadeSelectorProperties = {
    indicator: {
        backgroundColor: "#4C4C4C",
        height: 1,
        width: "100%",
        bottom: 0,
        left: 0,
    },
    label: {
        color: "#FFFFFF",
        font: {
            fontSize: "15dp",
            fontWeight: "bold",
        }
    }
};

$.niceTabs.setHighlightProperties(highlightSelectorProperties);
$.niceTabs.setFadeProperties(fadeSelectorProperties);
/////////////////// fim do nice tabs //////////////////////////////

//inicio da adição de tabs:


//adiciona tabs novas
var scrollViewNew = Ti.UI.createScrollView({
    layout:'vertical',
    width:"100%",
});
$.niceTabs.addView(scrollViewNew,'NOVAS');

//adiciona tabs ativas
var scrollViewActiv = Ti.UI.createScrollView({
    layout:'vertical',
    width:"100%",
});
$.niceTabs.addView(scrollViewActiv,'ATIVAS');

//adiciona tabs pausadas
var scrollViewPaused = Ti.UI.createScrollView({
    layout:'vertical',
    width:"100%",
});
$.niceTabs.addView(scrollViewPaused,'PAUSADAS');

//adiciona tabs concluidas
var scrollViewFinished = Ti.UI.createScrollView({
    layout:'vertical',
    width:"100%",
});
$.niceTabs.addView(scrollViewFinished,'CONCLUÍDAS');

/////////////// fim adicao das tabs ///////////////////////////////




/////////////// inicio configuracao da search bar ///////////////////////////////

//configuracao do nice search bar
$.niceSearch.setVisible(false);
$.niceSearch.setCloseCallback(function () {
    $.WidFechar.setVisible(true);
});


//faz a mundanca entre as tabs de maneira correta
$.niceSearch.setChangeCallback(function (e) {
    listViewNewOP.searchText = e.value;
    listViewActivOP.searchText = e.value;
    listViewPausedOP.searchText = e.value;
    listViewFinishedOP.searchText = e.value;
});

var search = Image.createFromFile("images/ic-search-white.png");
var searchImageView = search.getViewByHeight(25);

$.WidFechar.addRightIcon(searchImageView);
$.WidFechar.setRightIconFunction(function () {
    $.WidFechar.setVisible(false);
    $.niceSearch.setVisible(true);
});


////////////////////// Fim da configuracao da search tab////////////////////////////////

/////////////////// Inicio da logica de cada tab ///////////////////////////////////////

var listViewNewOP = $.listNewOP;
var listViewActivOP = $.listActivOP;
var listViewPausedOP = $.listPausedOP;
var listViewFinishedOP = $.listFinishedOP;

$.windowMyOP.remove(listViewNewOP);
$.windowMyOP.remove(listViewActivOP);
$.windowMyOP.remove(listViewPausedOP);
$.windowMyOP.remove(listViewFinishedOP);
scrollViewNew.add(listViewNewOP);
scrollViewActiv.add(listViewActivOP);
scrollViewPaused.add(listViewPausedOP);
scrollViewFinished.add(listViewFinishedOP);

$.WidFechar.init({
    text: "Minhas Operações",
    parent: $.windowMyOP
});

$.listNewOP.addEventListener('itemclick', function (e) {
    Alloy.createController('newOP', {
        operation: e.section.items[e.itemIndex].properties.operation,
        myOperationId: e.section.items[e.itemIndex].properties.myOperationId
    }).getView().open();
    $.windowMyOP.close();
});

$.listActivOP.addEventListener('itemclick', function (e) {
    Alloy.createController('opStatus', {
        operation: e.section.items[e.itemIndex].properties.operation,
        myOperationId: e.section.items[e.itemIndex].properties.myOperationId
    }).getView().open();
    $.windowMyOP.close();
});

$.listPausedOP.addEventListener('itemclick', function (e) {
    Alloy.createController('PausedOP', {
        operation: e.section.items[e.itemIndex].properties.operation,
        myOperationId: e.section.items[e.itemIndex].properties.myOperationId
    }).getView().open();
    $.windowMyOP.close();
});

$.listFinishedOP.addEventListener('itemclick', function (e) {
    Alloy.createController('concludedOP', {
        operation: e.section.items[e.itemIndex].properties.operation,
        myOperationId: e.section.items[e.itemIndex].properties.myOperationId
    }).getView().open();
    $.windowMyOP.close();
});

////////////// Fim da logica das listas

// Ler as ops do cloud e alocar nas listas corretamente
function allocateOps() {
    $.indicator.showIndicator();
    Cloud.Objects.query({
        classname: 'operation',
        order: "-updated_at",
    }, function (e) {
        $.indicator.hideIndicator();
        if (e.success) {
            var listOperation = _.filter(e.operation, function(item) {
                return item.tannenbaum.includes(Alloy.Globals.userData.id);
            });

            for (var i = 0; i < listOperation.length; i++) {
                
                var operation = listOperation[i];
                var tannenbaum = operation.tannenbaum;
                var userOperations = tannenbaum.split("#");

                var myOperation = _.filter(userOperations, function(element) {
                    var subIds = element.split("@");

                    if (subIds.length > 1) {
                        if (subIds[0] === Alloy.Globals.userData.id) {
                            return true;
                        }
                    }

                    return false;
                })[0];

                var myOperationId = myOperation.split("@")[1];

                var cardData = {
                    paddingUp: {
                        height: 16,
                    },
                    OSNumber: {
                        text: operation.osNumber,
                    },
                    OPNumber: {
                        text: operation.opNumber,
                    },
                    properties: {
                        operation: operation,
                        myOperationId: myOperationId
                    }
                };

                switch (operation.status) {
                    case 0: // new
                        $.listSectionNewOP.appendItems([cardData]);
                        break;
                    case 1: // active
                        $.listSectionActivOP.appendItems([cardData]);
                        break;
                    case 2: // paused
                        $.listSectionPausedOP.appendItems([cardData]);
                        break;
                    case 3: // finished
                        $.listSectionFinishedOP.appendItems([cardData]);
                        break;
                }
            }
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
}

allocateOps();

// Limpar memoria e inserção da imagem de background:
MemoryClear.clear($.windowMyOP);
$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
