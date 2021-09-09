var formatDate = require('util').formatDate;
var operation = $.args.operation;

$.osNumber.text = operation.osNumber;

var totalEffort = 0;
var numEmployees = 0;
var numEmployeesQueried = 0;

var date = new Date(operation.startDate);
var startDateText = getDate(date);
var startTimeText = getTime(date);
$.lblInitDate.text = startDateText;
$.lblInitTime.text = startTimeText;

date = new Date(operation.endDate);
var endDateText = getDate(date);
var endTimeText = getTime(date);
$.lblEndDate.text = endDateText;
$.lblEndTime.text = endTimeText;

$.lblObsDesc.setText(operation.observations);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winConcludedOP);

$.WidFechar.init({
    text: "OPERAÇÃO #" + operation.opNumber,
    parent: $.winConcludedOP,
    parentRefreshCallback: function() {
        Alloy.createController('myOP').getView().open();
    }
});
MemoryClear.clear($.winConcludedOP);
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
var vwEffort = $.vwEffort;

var vwOperationContainer = Ti.UI.createView({
   width: "100%",
   layout: "vertical" 
});
var vwDetailsContainer = Ti.UI.createView({
   width: "100%",
   layout: "vertical" 
});

var vwEffortContainer = Ti.UI.createView({
   width: "100%",
   layout: "vertical" 
});

$.winConcludedOP.remove(vwMain);
$.winConcludedOP.remove(vwDetails);
$.winConcludedOP.remove(vwEffort);

$.niceTabs.addView(vwOperationContainer,'OPERAÇÃO');
$.niceTabs.addView(vwEffortContainer,'ESFORÇO');
$.niceTabs.addView(vwDetailsContainer,'INFORMAÇÕES');

vwDetailsContainer.add(vwDetails);
vwOperationContainer.add(vwMain);
vwEffortContainer.add(vwEffort);

setCardHeightWhenTabbed($.vwCard, $.vwCreateSection);
setCardHeightWhenTabbed($.vwDetailsCard, $.vwEndBreak);
setCardHeightWhenTabbed($.vwEffortCard, $.vwBottomSection);

var manutentores = operation.manutentores.split(/\n/gi);

for(var i =1 ; i< manutentores.length; i++){

    $["manut" + i ].setText(manutentores[i]);
}

for(; i<=2;i++)
    $["view" + i ].hide();
    
function processPauseString(string, isTechnical,pauses) {
    var pauseStrings = string.split("#");

    for (var i = 1; i < pauseStrings.length; i++) {
        var pauseFields = pauseStrings[i].split("@");

        pauses.push({
            description: pauseFields[0],
            start: pauseFields[1],
            end: pauseFields[2],
            isTechnical: isTechnical
        });
    }
}

function displayPauses(pauses,pausesContainer) {
    pauses.sort(function(a, b) {
        return new Date(a.start) - new Date(b.start);
    });

    for (var i = 0; i < pauses.length; i++) {
        addPause(pauses[i],pausesContainer);
    }
}

function addPause(pauseObject,pausesContainer) {
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
    pausesContainer.add(vwPause);
    pausesContainer.add($.UI.create('view',{
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
    pausesContainer.add(vwContainerInit);
    pausesContainer.add($.UI.create('view',{
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
        pausesContainer.add(vwContainerEnd);
        pausesContainer.add($.UI.create('view',{
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

        pausesContainer.add(viewDescriptionContainer);
        pausesContainer.add($.UI.create('view',{
            classes:["hr"]
        }));
    }
}
 
//Adiciona pausas técnicas
var technicalPauses = [];

if ("pauses" in operation){
    processPauseString(operation.pauses, true,technicalPauses);
    displayPauses(technicalPauses,$.technicalPauseContainer);   
}

function getDuration(startString,endString){
    var startDate = new Date(startString);
    var endDate = new Date(endString);
    
    var seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes/ 60);
    minutes = minutes % 60;
    
    if (hours < 10)
    	hours = "0" + hours;
    if (minutes < 10)
    	minutes = "0" + minutes;
    if (seconds < 10)
    	seconds = "0" + seconds;
    	
    return hours + ":" + minutes + ":" + seconds;

}
var duration = getDuration(operation.startDate,operation.endDate);
$.lblDuration.text = duration; 

//Adiciona horários para cada manutentor
function displayEmployeeTimes(operationObject){
	
	var container = Ti.UI.createView({
		layout:"vertical",
		height: Ti.UI.SIZE
	});
	
	var employeeContainer = $.UI.create('view',{
		classes:['manHolder'],
		top:10
	});
	employeeContainer.add($.UI.create('label',{
		text: operationObject.employee,
		classes:['manText']
	}));
	container.add(employeeContainer);
	
	//INÍCIO DO TRABALHO
	var startView = Ti.UI.createView({
		backgroundColor: "#fafafa",
		height:30,
		top:10
	});
	startView.add($.UI.create('label',{
		text: "INÍCIO",
		classes:['dateText']
	}));
	container.add(startView);
	
	container.add($.UI.create('view',{
		classes:['hr']
	}));
	
	var startDateView = Ti.UI.createView({
		layout:"horizontal",
		height:80,
		width:Ti.UI.SIZE,
	});
	var startDate = Ti.UI.createView({
		width: "49.5%",
		layout: "vertical"
	});
	startDate.add($.UI.create('label',{
		height:Ti.UI.SIZE,
		classes:['subtitle'],
		text:"DATA"
	}));
	startDate.add($.UI.create('label',{
		text:operationObject.startDate,
		classes:['content']
	}));
	startDateView.add(startDate);
	
	startDateView.add($.UI.create('view',{
		classes:['vr']
	}));
	
	var startTime = Ti.UI.createView({
		width: "49.5%",
		layout: "vertical"
	});
	startTime.add($.UI.create('label',{
		height:Ti.UI.SIZE,
		classes:['subtitle'],
		text:"HORA"
	}));
	startTime.add($.UI.create('label',{
		classes:['content'],
		text:operationObject.startTime
	}));
	startDateView.add(startTime);
	container.add(startDateView);
	
	container.add($.UI.create('view',{
		classes:['hr']
	}));
	
	//INSERIR PAUSAS
	if (operationObject.pauses.length > 0){
		var pauseContainer = Ti.UI.createView({
			layout:"vertical",
			height:"Ti.UI.SIZE"
		});
		
		
		displayPauses(operationObject.pauses,pauseContainer);
		pauseContainer.height = Ti.UI.SIZE;
		container.add(pauseContainer);	
	}
	
	//FINAL DO TRABALHO
	var endView = Ti.UI.createView({
		backgroundColor: "#fafafa",
		height:30,
		top:10
	});
	endView.add($.UI.create('label',{
		text: "FIM",
		classes:['dateText']
	}));
	container.add(endView);
	
	container.add($.UI.create('view',{
		classes:['hr']
	}));
	
	var endDateView = Ti.UI.createView({
		layout:"horizontal",
		height:80,
		width:Ti.UI.SIZE,
	});
	var endDate = Ti.UI.createView({
		width: "49.5%",
		layout: "vertical"
	});
	endDate.add($.UI.create('label',{
		height:Ti.UI.SIZE,
		classes:['subtitle'],
		text:"DATA"
	}));
	endDate.add($.UI.create('label',{
		text:operationObject.endDate,
		classes:['content']
	}));
	endDateView.add(endDate);
	
	endDateView.add($.UI.create('view',{
		classes:['vr']
	}));
	
	var endTime = Ti.UI.createView({
		width: "49.5%",
		layout: "vertical"
	});
	endTime.add($.UI.create('label',{
		height:Ti.UI.SIZE,
		classes:['subtitle'],
		text:"HORA"
	}));
	endTime.add($.UI.create('label',{
		classes:['content'],
		text:operationObject.endTime
	}));
	endDateView.add(endTime);
	container.add(endDateView);
	
	container.add($.UI.create('view',{
		classes:['hr']
	}));
	container.add($.UI.create('label',{
		classes:['subtitle'],
		text: "ESFORÇO INDIVIDUAL",
		top:10
	}));
	
	container.add($.UI.create('label',{
		classes:['content'],
		text: operationObject.effort
	}));
	
	container.add($.UI.create('view',{
		classes:['hr'],
		top:10
	}));
	
	$.scrollEmployee.add(container);
}

function subtractPauses(employeeObject){
	employeeObject.pauses.forEach(function(pause){
		employeeObject.effort -= getTimeDifference(pause.start,pause.end);
	});
	technicalPauses.forEach(function(pause){
		employeeObject.effort -=getTimeDifference(pause.start,pause.end);
	});
}

function formatTime(time){
	var seconds = time;
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes/ 60);
    minutes = minutes % 60;
    
    if (hours < 10)
    	hours = "0" + hours;
    if (minutes < 10)
    	minutes = "0" + minutes;
    if (seconds < 10)
    	seconds = "0" + seconds;
    	
    return hours + ":" + minutes + ":" + seconds;
}

function processEmployeeWorkHours(employeeObject, callback){
	var pauses = [];
	Cloud.Objects.query({
        classname: 'operationUser',
        where: {
            id: employeeObject.userOperationId
        }
    }, function(e) {
        if (e.success) {
            employeeObject.pauses = e.operationUser[0].pauses;
            
			processPauseString(employeeObject.pauses, false,pauses);
			employeeObject.pauses = pauses;
			subtractPauses(employeeObject);
			totalEffort += employeeObject.effort;
			employeeObject.effort = formatTime(employeeObject.effort);
            
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
        displayEmployeeTimes(employeeObject);
        ++numEmployeesQueried;
		
		if (numEmployees == numEmployeesQueried){
			$.lblTotalEffort.text = formatTime(totalEffort);
			$.indicator.hideIndicator();	
		}
    });
}

function getTimeDifference(startString,endString){
	var startDate = new Date(startString);
    var endDate = new Date(endString);
    
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);	
}

function processEmployeeInfo(){
	var employeeInfo = operation.tannenbaum.split('#');
	var employees = operation.manutentores.split(/\n/gi);
	numEmployees = employeeInfo.length - 1;
	for (var counter = 1; counter < employeeInfo.length; counter++){
		var employeeObject = {
			startDate: startDateText,
			startTime: startTimeText,
			endDate:endDateText,
			endTime:endTimeText,
			userOperationId: employeeInfo[counter].split('@')[1],
			employee:employees[counter],
			effort:getTimeDifference(operation.startDate,operation.endDate)
		};
		$.indicator.showIndicator();
		processEmployeeWorkHours(employeeObject);
	}
	
}

processEmployeeInfo();

