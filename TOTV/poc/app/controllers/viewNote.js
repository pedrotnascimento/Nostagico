var formatDate = require('util').formatDate;

$.indicator.showIndicator();
Cloud.Objects.query({
    classname: 'note',
    order: "-updated_at"
}, function (e) {
    $.indicator.hideIndicator();
    if (e.success) {
        for (var i = 0; i < e.note.length; i++) {
            var date = formatDate(e.note[i].created_at);
            $.listSectionNotes.appendItems([{
                noteNumber: {
                    text: e.note[i].noteNumber
                },
                properties: {
                    noteData: e.note[i]
                }
            }]);
        }
    } else {
        dialog({
            title: 'Erro de Cloud',
            message: 'Servidor indisponível'
        });
    }
});

$.listNotes.addEventListener('itemclick', function(e){
    var item = $.listSectionNotes.getItemAt(e.itemIndex);
    Alloy.createController("noteDetail", {
        item: item.properties,
    }).getView().open();
});

$.WidFechar.init({
    text: "Visualizar notas de manutenção",
    parent: $.windowViewNote
});

MemoryClear.clear($.windowViewNote);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.windowViewNote);
