$.WidFechar.init({
    text: "Esqueceu sua senha?",
    parent: $.winRetrievePassword
});

$.bt01.addEventListener('click',function(e){
	Alloy.createController('index').getView().open();
});

MemoryClear.clear($.winRetrievePassword);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winRetrievePassword);