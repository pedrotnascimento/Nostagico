var formatDate = require('util').formatDate;
var args = $.args || {};
item = args.item.noteData;

$.lblNoteNumber.setText(item.noteNumber);
var date = formatDate(item.created_at);
$.lblCreation.setText(date[2] + '/' + date[1] + '/' + date[0] + ' às ' + (date[3] - 3) + ':' + date[4]);
$.lblType.setText(item.type);
$.lblDescription.setText(item.description);
$.lblCode.setText(item.equipmentCode);

//ATENÇÃO: COLOQUEI UM ADDEVENTLISTENER PARA O WINDOW, E AO FECHAR O WIDGET FECHAVA O APP
MemoryClear.clear($.win);
$.imageHolder.image = Alloy.Globals.backgroundImageHandle;

$.WidFechar.init({
    text: "Nota: #" + item.noteNumber,
    parent: $.win
});