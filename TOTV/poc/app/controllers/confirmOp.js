var operation = $.args.operation;
var lastWindowCallback = $.args.callback;

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winOPStatus);

$.WidFechar.init({
    text: "Operação: #" + operation.opNumber,
    parent: $.winOPStatus
});

setCardHeight($.vwCard, $.vwBtnSection);

var date = new Date(operation.startDate);
$.lblInitDate.text = getDate(date);
$.lblInitTime.text = getTime(date);

date = new Date();
$.lblEndDate.text = getDate(date);
$.lblEndTime.text = getTime(date);

$.btnEnd.addEventListener('click',function() {
    $.indicator.showIndicator();
    Cloud.Objects.update({
        classname: 'operation',
        id: operation.id,
        fields: {
            status: 3,
            endDate: new Date().toISOString(),
            observations: $.txtAreaObs.getValue()
        }
    }, function (e) {
        $.indicator.hideIndicator();
        if (e.success) {
            Alloy.createController('concludedOP', {
                operation: e.operation[0],
                myOperationId: $.args.myOperationId
            }).getView().open();
            lastWindowCallback();
            $.winOPStatus.close();
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
});