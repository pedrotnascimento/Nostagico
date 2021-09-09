var operation = $.args.operation;

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winNewOP);

$.WidFechar.init({
    text: "OPERAÇÃO #" + operation.opNumber,
    parent: $.winNewOP
});
MemoryClear.clear($.winNewOP);

setCardHeight($.vwCard, $.vwBtnSection);

$.btnStart.addEventListener('click',function(){
    $.indicator.showIndicator();

    var pauseDescription = $.txtAreaDescription.value;

    var pauses = ("pauses" in operation) ? operation.pauses : "";

    pauses += "#" + pauseDescription + "@" + new Date().toISOString();

    Cloud.Objects.update({
         classname: 'operation',
         id: operation.id,
         fields: {
             status: 2,
             pausedStartDate: new Date().toISOString(),
             pauses: pauses
         }
    },function (event) {
         $.indicator.hideIndicator();
         if (event.success){
             Alloy.createController('PausedOP',{
                 operation: event.operation[0],
                 myOperationId: $.args.myOperationId
             }).getView().open();
             if (typeof $.args.callback != "undefined"){
                 $.args.callback();
            }
            $.winNewOP.close();
         } else {
             dialog({
                 title: 'Erro de Cloud',
                 message: 'Servidor indisponível'
             });
         }
    });
});

$.txtAreaDescription.addEventListener('change', function () {
    $.lblWordCount.text = $.txtAreaDescription.getValue().length + "/140";
});

