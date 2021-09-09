var operation = $.args.operation;

var pauses = [];

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winOPStatus);

$.osNumber.text = operation.osNumber;

var viewPausePicker = $.viewPausePicker;
$.winOPStatus.remove(viewPausePicker);

var viewCurrentPause = $.viewCurrentPause;
$.winOPStatus.remove(viewCurrentPause);

$.WidFechar.init({
    text: "OPERAÇÃO #" + operation.opNumber,
    parent: $.winOPStatus,
    parentRefreshCallback: function() {
        Alloy.createController('myOP').getView().open();
    }
});

var startDate = new Date(operation.startDate);
$.lblInitDate.text = getDate(startDate);
$.lblInitTime.text = getTime(startDate);

function closeThisWindow(){
    $.winOPStatus.close();   
}

$.typePicker.setSelectedRow(0, 0);

$.pauseButton.addEventListener('click', function(e) {
    $.indicator.showIndicator();

    Cloud.Objects.query({
        classname: 'operationUser',
        where: {
            id: $.args.myOperationId
        }
    }, function(e) {
        if (e.success) {

            var pauses = e.operationUser[0].pauses;

            pauses += "#" + $.typePicker.getSelectedRow(0).title + "@" + new Date().toISOString();

            Cloud.Objects.update({
                classname: 'operationUser',
                id: $.args.myOperationId,
                fields: {
                    pauses: pauses
                }
            }, function(e) {
                $.indicator.hideIndicator();
                if (e.success) {
                    Alloy.createController('opStatus', {
                        operation: operation,
                        myOperationId: $.args.myOperationId
                    }).getView().open();

                    $.winOPStatus.close();
                } else {
                    dialog({
                        title: 'Erro de Cloud',
                        message: 'Servidor indisponível'
                    });
                }
            });
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
});

$.finishPauseButton.addEventListener('click', function(e) {
    $.indicator.showIndicator();

    Cloud.Objects.query({
        classname: 'operationUser',
        where: {
            id: $.args.myOperationId
        }
    }, function(e) {
        if (e.success) {

            var pauses = e.operationUser[0].pauses;

            pauses += "@" + new Date().toISOString();

            Cloud.Objects.update({
                classname: 'operationUser',
                id: $.args.myOperationId,
                fields: {
                    pauses: pauses
                }
            }, function(e) {
                $.indicator.hideIndicator();
                if (e.success) {
                    Alloy.createController('opStatus', {
                        operation: operation,
                        myOperationId: $.args.myOperationId
                    }).getView().open();

                    $.winOPStatus.close();
                } else {
                    dialog({
                        title: 'Erro de Cloud',
                        message: 'Servidor indisponível'
                    });
                }
            });
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
});


$.btnPause.addEventListener('click',function(e){
	Alloy.createController('OPPause',{
	    operation:operation,
        callback:closeThisWindow,
        myOperationId:$.args.myOperationId
	}).getView().open();
});

$.btnEnd.addEventListener('click',function(e){
    Alloy.createController('confirmOp',{
        operation:operation,
        callback:closeThisWindow,
        myOperationId:$.args.myOperationId
    }).getView().open();
});

MemoryClear.clear($.winOPStatus);

function addPause(pauseObject) {
    var vwPause = Ti.UI.createView({
       backgroundColor: (pauseObject.isTechnical) ? "#96172e" : "#fafafa",
       height: 30,
    });
    var lblPause = $.UI.create('label',{
        classes:['dateText'],
        text: (pauseObject.isTechnical) ? "PAUSA TÉCNICA" : "PAUSA",
        color: (pauseObject.isTechnical) ? "#ffffff" : "#000000",
        opacity: (pauseObject.isTechnical) ? "1.0" : "0.5",
    });
    vwPause.add(lblPause);
    $.pausesContainer.add(vwPause);
    $.pausesContainer.add($.UI.create('view',{
        classes:["hr"]
    }));

    var vwContainerInit = Ti.UI.createView({
        layout:"horizontal",
        height:"80",
        width:Ti.UI.SIZE
    });

    var vwDateInit = Ti.UI.createView({
       width:"49.5%",
       layout:"vertical"
    });
    vwDateInit.add($.UI.create('label',{
       height: Ti.UI.SIZE,
       classes:["subtitle"],
       text: "DATA INÍCIO"
    }));
    vwDateInit.add($.UI.create('label',{
       height: Ti.UI.SIZE,
       classes:["content"],
       text: getDate(new Date(pauseObject.start))
    }));

    vwContainerInit.add(vwDateInit);

    vwContainerInit.add($.UI.create('view',{
       classes:["vr"]
    }));

    var vwTimeInit = Ti.UI.createView({
       width:"49.5%",
       layout:"vertical"
    });
    vwTimeInit.add($.UI.create('label',{
       height: Ti.UI.SIZE,
       classes:["subtitle"],
       text: "HORA INÍCIO"
    }));
    vwTimeInit.add($.UI.create('label',{
       height: Ti.UI.SIZE,
       classes:["content"],
       text: getTime(new Date(pauseObject.start))
    }));

    vwContainerInit.add(vwTimeInit);
    $.pausesContainer.add(vwContainerInit);
    $.pausesContainer.add($.UI.create('view',{
        classes:["hr"]
    }));

    if (pauseObject.end != "") {
        var vwContainerEnd = Ti.UI.createView({
            layout:"horizontal",
            height:"80",
            width:Ti.UI.SIZE
        });

        var vwDateEnd = Ti.UI.createView({
            width:"49.5%",
            layout:"vertical"
        });
        vwDateEnd.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["subtitle"],
            text: "DATA FIM"
        }));
        vwDateEnd.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["content"],
            text: getDate(new Date(pauseObject.end))
        }));

        vwContainerEnd.add(vwDateEnd);

        vwContainerEnd.add($.UI.create('view',{
            classes:["vr"]
        }));

        var vwTimeEnd = Ti.UI.createView({
            width:"49.5%",
            layout:"vertical"
        });
        vwTimeEnd.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["subtitle"],
            text: "HORA FIM"
        }));
        vwTimeEnd.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["content"],
            text: getTime(new Date(pauseObject.end))
        }));

        vwContainerEnd.add(vwTimeEnd);
        $.pausesContainer.add(vwContainerEnd);
        $.pausesContainer.add($.UI.create('view',{
            classes:["hr"]
        }));
    }

    if (pauseObject.description != "") {
        var viewDescriptionContainer = Ti.UI.createView({
            width:"100%",
            layout:"vertical",
            height: 100
        });
        viewDescriptionContainer.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["subtitle"],
            text: "DESCRIÇÃO"
        }));
        viewDescriptionContainer.add($.UI.create('label',{
            height: Ti.UI.SIZE,
            classes:["content"],
            text: pauseObject.description
        }));

        $.pausesContainer.add(viewDescriptionContainer);
        $.pausesContainer.add($.UI.create('view',{
            classes:["hr"]
        }));
    }
}

function displayPauses() {
    pauses.sort(function(a, b) {
        return new Date(a.start) - new Date(b.start);
    });

    for (var i = 0; i < pauses.length; i++) {
        addPause(pauses[i]);
    }

    $.indicator.hideIndicator();
}

function processPauseString(string, isTechnical) {
    var pauseStrings = string.split("#");

    for (var i = 1; i < pauseStrings.length; i++) {
        var pauseFields = pauseStrings[i].split("@");

        var pause = {
            description: pauseFields[0],
            start: pauseFields[1],
            end: "",
            isTechnical: isTechnical
        };

        if (pauseFields.length > 2) {
            pause.end = pauseFields[2];
        }

        pauses.push(pause);
    }
}

function checkUnfinishedPauses(string) {
    var pauseStrings = string.split("#");
    var lastPauseString = pauseStrings[pauseStrings.length - 1];

    var pauseFields = lastPauseString.split("@");

    if (pauseFields.length == 2) {
        $.topItemContainer.add(viewCurrentPause);
    } else {
        $.topItemContainer.add(viewPausePicker);
    }
}

function loadPauses() {
    $.indicator.showIndicator();

    if ("pauses" in operation) {
        processPauseString(operation.pauses, true);
    }

    Cloud.Objects.query({
        classname: 'operationUser',
        where: {
            id: $.args.myOperationId
        }
    }, function(e) {
        if (e.success) {
            if ("pauses" in e.operationUser[0]) {
                checkUnfinishedPauses(e.operationUser[0].pauses);
                processPauseString(e.operationUser[0].pauses, false);
            }

            displayPauses();
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
}

loadPauses();

//Adicionar ao tab group:
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
var vwDetails = $.vwDetails;
var vwMain = $.vwMain;
var vwOperationContainer = Ti.UI.createView({
   width: "100%",
   layout: "vertical" 
});
var vwDetailsContainer = Ti.UI.createView({
   width: "100%",
   layout: "vertical" 
});
$.winOPStatus.remove(vwMain);
$.winOPStatus.remove(vwDetails);
$.niceTabs.addView(vwOperationContainer,'OPERAÇÃO');
$.niceTabs.addView(vwDetailsContainer,'INFORMAÇÕES');
vwDetailsContainer.add(vwDetails);
vwOperationContainer.add(vwMain);

setCardHeightWhenTabbed($.vwCard, $.vwBtnSection);
setCardHeightWhenTabbed($.vwDetailsCard, $.vwEndBreak);

var manutentores = operation.manutentores.split(/\n/gi);

for(var i =1 ; i< manutentores.length; i++){

    $["manut" + i ].setText(manutentores[i]);
}

for(; i<=2;i++)
    $["view" + i ].hide();
