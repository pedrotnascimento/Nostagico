var operation = $.args.operation;

console.log($.args.myOperationId);

$.osNumber.text = operation.osNumber;
var manutentores = operation.manutentores.split(/\n/gi);

for(var i =1 ; i< manutentores.length; i++){

    $["manut" + i ].setText(manutentores[i]);
}

for(; i<=3;i++)
    $["view" + i ].hide();
// if(typeof manutentores[1] != 'undefined'){
// $.manut1.setVisible(true);    
// $.manut1.setText(manutentores[1]);
// }
// if(typeof manutentores[1] != 'undefined'){
// $.manut2.setVisible(true);    
// $.manut2.setText(manutentores[1]);
// }

// if(typeof manutentores[2] != 'undefined'){
// $.manut3.setVisible(true);    
// $.manut3.setText(manutentores[2]);
// }


$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winNewOP);

$.WidFechar.init({
    text: "Operação: #" + operation.opNumber,
    parent: $.winNewOP,
    parentRefreshCallback: function() {
        Alloy.createController('myOP').getView().open();
    }
});

setCardHeight($.vwCard, $.vwBtnSection);

$.btnStart.addEventListener('click',function(){
    $.indicator.showIndicator();
    Cloud.Objects.update({
        classname: 'operation',
        id: operation.id,
        fields: {
            status: 1,
            startDate: new Date().toISOString()
        }
    }, function (e) {
        $.indicator.hideIndicator();
        if (e.success) {
            Alloy.createController('opStatus', {
                operation: e.operation[0],
                myOperationId: $.args.myOperationId
            }).getView().open();
            $.winNewOP.close();
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    });
});