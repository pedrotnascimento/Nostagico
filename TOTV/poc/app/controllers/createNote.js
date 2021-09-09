var getRandomInt = require('util').getRandomInt;

//Add search icon to view:
var searchIcon = Image.createFromFile("images/ic_search.png");
var searchIconView = searchIcon.getViewByHeight(25);
searchIconView.right = 7;
$.vwSearch.add(searchIconView);

//Add dropdown icon to view: 
//TODO: Add the correct icon @Thiago
var dropdownIcon = Image.createFromFile("images/ic_search.png");
var dropdownIconView = searchIcon.getViewByHeight(25);
dropdownIconView.right = 7;
$.vwNoteType.add(dropdownIconView);

//Note type option dialog
var noteOptions = ['Z1', 'Z2', 'Z3', 'Z4'];
var opts = {
    options: noteOptions,
    buttonNames: ['Cancelar'],
    title: 'TIPO DE NOTA'
};
var optDialogNoteType = Ti.UI.createOptionDialog(opts);

///////////
$.WidFechar.init({
    text: "Criar nota de manutenção",
    parent: $.winCreateNote
});

setCardHeight($.vwCard, $.vwCreateSection);
//////

function changeSearchText(newText) {
    $.lblSearch.text = newText;
}

$.txtAreaDescription.addEventListener('change', function () {
    $.lblWordCount.text = $.txtAreaDescription.getValue().length + "/140";
});

optDialogNoteType.addEventListener('click', function (event) {
    if (event.button == 0)
        $.lblSelectType.text = noteOptions[event.index];
    optDialogNoteType.hide();
});

$.vwNoteType.addEventListener('click', function () {
    optDialogNoteType.show();
});

$.vwSearch.addEventListener('click', function () {
    Alloy.createController('winSelEquip', {callback: changeSearchText}).getView().open();
});


//criação da caixa de dialogo

$.btnCreate.addEventListener('click', function () {
    $.indicator.showIndicator();
    if ($.lblSelectType.text != 'Selecione' && $.txtAreaDescription.value != '' && $.lblSearch.text != 'Pesquisar') {
        Cloud.Objects.create({
            classname: 'note',
            fields: {
                type: $.lblSelectType.text,
                description: $.txtAreaDescription.value,
                equipmentCode: $.lblSearch.text,
                osNumber: getRandomInt(0, 999999999),
                noteNumber: getRandomInt(0, 99999)
            }
        }, function (e) {
            $.indicator.hideIndicator();
            if (e.success) {
                console.log(JSON.stringify(e));
                $.lb01.text = "Nota de manutenção criada com sucesso: #" + e.note[0].noteNumber;
                $.alertDialog.show();
            } else {
                dialog({
                    title: 'Erro de Cloud',
                    message: 'Servidor indisponível'
                });
            }
        });
    } else {
        dialog({
            title: 'Erro',
            message: 'Preencha todos os campos'
        });
    }
});

function closeWindow() {
    $.winCreateNote.close();
}

MemoryClear.clear($.winCreateNote);
$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winCreateNote);
