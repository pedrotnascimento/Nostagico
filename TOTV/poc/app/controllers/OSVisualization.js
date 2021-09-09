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

// Configuração das listViews

var scrollViewOpen = Ti.UI.createScrollView({
    layout: "vertical",
    width: "100%",
});
$.niceTabs.addView(scrollViewOpen, "Abertas");

var scrollViewFinished = Ti.UI.createScrollView({
    layout: "vertical",
    width: "100%",
});
$.niceTabs.addView(scrollViewFinished, "Concluídas");

var finishedOSDataSet = [
    {
        OSNumber: {
            text: '351761326'
        },
        OPNumber: {
            text: '4'
        },
        paddingUp: {
            height: 16
        },
        properties: {
            searchableText: '351761326',
            selectionStyle: (OS_IOS) ? Ti.UI.iOS.ListViewCellSelectionStyle.NONE : 0,
        }
    },
    {
        OSNumber: {
            text: '351761327'
        },
        OPNumber: {
            text: '4'
        },
        paddingUp: {
            height: 16
        },
        properties: {
            searchableText: '351761327',
            selectionStyle: (OS_IOS) ? Ti.UI.iOS.ListViewCellSelectionStyle.NONE : 0,
        }
    }
];

function OS(data){
    var self = {}
    self.created_at = {text: data.created_at};
    if ("osNumber" in data){
        self.OSNumber ={text: ""+data.osNumber};
    }
    if ("equipmentCode" in data){
        self.equipmentCode = {text:""+data.equipmentCode};
    }
    if ("description" in data){
        self.description = {text:""+data.description};
    }
    if ("noteNumber" in data) {
        self.noteNumber = {text: "" + data.noteNumber};
    }
    self.paddingUp ={height: 16};
    self.properties =  {
            searchableText: data.osNumber,
            selectionStyle: (OS_IOS) ? Ti.UI.iOS.ListViewCellSelectionStyle.NONE : 0,
        };
    self.OPNumber = {text: ""+ 4};
    return self;
}
$.indicator.showIndicator();
Cloud.Objects.query({
    classname: 'note',
    order: "-updated_at"
}, buscaOS);

openOSDataSet = [];
function buscaOS (e){
    $.indicator.hideIndicator();
    if(e.success){
        var resNotes = e.note;
        for (var i=0 ; i<resNotes.length;i++){
            var os = OS(resNotes[i]);
            openOSDataSet.push(os);
            
        }
        $.listSectionOpenOS.setItems(openOSDataSet);
    }
    else{
        alert("Erro ao buscar OS");
    }
}

var listViewOpenOS = $.listOpenOS;
var listViewFinishedOS = $.listFinishedOS;

$.listSectionFinishedOS.setItems(finishedOSDataSet);

$.windowOSVisualization.remove(listViewOpenOS);
$.windowOSVisualization.remove(listViewFinishedOS);
scrollViewOpen.add(listViewOpenOS);
scrollViewFinished.add(listViewFinishedOS);


$.listOpenOS.addEventListener('itemclick', function (e) {
    Alloy.createController('osDetails', {
        os: e.section.items[e.itemIndex],
        finished: false,
    }).getView().open();
});

$.listFinishedOS.addEventListener('itemclick', function (e) {
    Alloy.createController('osDetails', {
        os: e.section.items[e.itemIndex],
        finished: true,
    }).getView().open();
});

$.niceSearch.setVisible(false);
$.niceSearch.setCloseCallback(function () {
    $.WidFechar.setVisible(true);
});
$.niceSearch.setChangeCallback(function (e) {
    listViewOpenOS.searchText = e.value;
    listViewFinishedOS.searchText = e.value;
});

var search = Image.createFromFile("images/ic-search-white.png");
var searchImageView = search.getViewByHeight(25);

$.WidFechar.addRightIcon(searchImageView);
$.WidFechar.setRightIconFunction(function () {
    $.WidFechar.setVisible(false);
    $.niceSearch.setVisible(true);
});

$.WidFechar.init({
    text: "Visualizar O.S.",
    parent: $.windowOSVisualization
});

MemoryClear.clear($.windowOSVisualization);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.windowOSVisualization);
