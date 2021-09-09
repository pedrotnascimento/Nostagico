$.vwViewNote.addEventListener('click', function () {
    Alloy.createController('viewNote').getView().open();
});

if (Alloy.Globals.profileID != 2) {
	$.option3.text = "Visualizar O.S.";
}

$.vwCreateNote.addEventListener('click', function () {
    Alloy.createController('createNote').getView().open();
});

$.vwViewOS.addEventListener('click', function () {
    Alloy.createController('OSVisualization').getView().open();
});

var person = Image.createFromFile("images/ic-person.png");
var personView = person.getViewByHeight(20);

$.WidFechar.addRightIcon(personView);
$.WidFechar.setRightIconFunction(function () {
    Alloy.createController('myProfile').getView().open();
});

$.WidFechar.init({
    text: "Gestão de O.S.",
    parent: $.winHome
});

MemoryClear.clear($.winHome);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winHome);
