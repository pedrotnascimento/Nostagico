function dialog(object) {
    var defaultAlert = {
        message: "Alert!",
        ok: "OK",
        title:  Ti.App.name
    };

    if (object) {
        if (!object.hasOwnProperty('message')) {
            object.message = defaultAlert.message;
        }

        if (!object.hasOwnProperty('ok')) {
            object.ok = defaultAlert.ok;
        }

        if (!object.hasOwnProperty('title')) {
            object.title = defaultAlert.title;
        }
    } else {
        object = defaultAlert;
    }

    var dialog = Ti.UI.createAlertDialog(object);
    dialog.show();
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateEmail(email) {
    if (!email) {
        return false;
    }

    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
}

function printObject(object, tabCount) {
    if (!tabCount) {
        tabCount = 0;
    }

    var tabs = '';
    for (var i = 0; i < tabCount; i++) {
        tabs = tabs + '    ';
    }

    for (k in object) {
        if (object.hasOwnProperty(k)) {
            if (typeof(object[k]) == 'object') {
                console.log('|' + tabs + k + ': {');
                printObject(object[k], tabCount + 1);
                console.log('|' + tabs + '}');
            } else {
                console.log('|' + tabs + k + ': ' + object[k]);
            }
        }
    }
}

function askForCameraPermission(cameraCallback) {
    if (Ti.Media.hasCameraPermissions()) {
        cameraCallback();
    } else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success === true) {
                cameraCallback();
            } else {
                cameraCallback(e);
            }
        });
    }
}

function formatDate(date)
{
    var arr = date.split(/[- :T]/);
    return arr;
}

function displayBigString(s) {
    var chunkSize = 32;

    var length = s.length;

    for (var i = 0; i < length; i += chunkSize) {
        console.log(s.substring(i, Math.min(length, i + chunkSize)));
    }
}

exports.dialog = dialog;
exports.validateEmail = validateEmail;
exports.printObject = printObject;
exports.askForCameraPermission = askForCameraPermission;
exports.displayBigString = displayBigString;
exports.getRandomInt = getRandomInt;

exports.cDateToString = function(dateString){     
     
     var compString = dateString.replace("+0000","Z");
     var date = new Date(compString);
    //  date =new Date(date.toISOString());
     date.setHours(date.getHours() - 3);
    //  var iso =  date.toISOString();
     var month = date.getMonth() + 1;
     if (month < 10) {month = "0" + month;}
    //  alert(date.toISOString());
    // d= new Date();
    alert(date.toISOString() + " " +  date.getDate(), date.toString());
     return date.getDate() + "." + month  + "." + date.getFullYear();    
};
exports.formatDate = formatDate;

