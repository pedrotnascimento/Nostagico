

function alert(description, title){
    if(!title)
        title = 'CENTRAL 2777';
    
    var _dialog = Titanium.UI.createAlertDialog({
        title:title,
        ok: 'OK'
    });
    _dialog.setMessage(description);
    _dialog.show();
}
exports.alert = alert;
