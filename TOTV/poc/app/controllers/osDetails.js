var os = $.args.os;
var formatDate = require('util').formatDate;
var finished = $.args.finished;

console.log(JSON.stringify(os));

if (!finished) {
    $.lbldescription.setText(os.description.text);
    $.lblequipCode.setText(os.equipmentCode.text);
    $.labelNoteNumber.setText(os.noteNumber.text);

    var temp = os.created_at.text.replace("+0000", "Z");
    var date = formatDate(temp);
    date = date[2] + "." + date[1] + "." + date[0];
    $.lblStartDate.setText(date);
    $.lblEndDate.setText(date);
} else {
    $.lbldescription.setText("PMC_LIMPEZA E TROCA DE CONECTORES (728D)");
    $.lblequipCode.setText("M72250L8116-01003");
    $.labelNoteNumber.setText("00001");
    $.lblStartDate.setText("02.02.2017");
    $.lblEndDate.setText("02.02.2017");
}

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

// Início do código em si

var scrollViewDetails = Ti.UI.createScrollView({
    layout: "vertical",
    width: "100%",
    scrollType: "vertical"
});
$.niceTabs.addView(scrollViewDetails, "DETALHES DA O.S.");

var scrollViewOperations = Ti.UI.createScrollView({
    layout: "vertical",
    width: "100%",
    scrollType: "vertical"
});
$.niceTabs.addView(scrollViewOperations, "OPERAÇÕES (4)");

$.WidFechar.init({
    text: "O.S. " + os.OSNumber.text,
    parent: $.winOSDetails   
});

$.OSNumber.text =  os.OSNumber.text;

var operationsDataSet = [
    {
        operationCode: {
            text: '0010'
        },
        workerNumber: {
            text: 'N/D'
        },
        paddingUp: {
            height: 16
        }
    },
    {
        operationCode: {
            text: '0020'
        },
        workerNumber: {
            text: 'N/D'
        },
        paddingUp: {
            height: 16
        }
    },
    {
        operationCode: {
            text: '0030'
        },
        workerNumber: {
            text: 'N/D'
        },
        paddingUp: {
            height: 16
        }
    },
    {
        operationCode: {
            text: '0040'
        },
        workerNumber: {
            text: 'N/D'
        },
        paddingUp: {
            height: 16
        }
    }
];

var listViewOperations = $.listViewOperations;
$.winOSDetails.remove(listViewOperations);
scrollViewOperations.add(listViewOperations);

$.listSectionOperations.setItems(operationsDataSet);

$.listViewOperations.addEventListener('itemclick', function (e) {
    Alloy.createController('OpDetails', {
        finished: finished,
        OSNumber: os.OSNumber.text,
        OPNumber: e.section.items[e.itemIndex].operationCode.text
    }).getView().open();
});

var vwMain = $.vwMain;
$.winOSDetails.remove(vwMain);
scrollViewDetails.add(vwMain);

MemoryClear.clear($.winOSDetails);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winOSDetails);
