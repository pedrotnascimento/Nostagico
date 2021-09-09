$.emailLabel.text = Alloy.Globals.userData.email;
$.profileLabel.text = Alloy.Globals.profileNames[Alloy.Globals.profileID - 1];

setCardHeight($.vwCard, $.vwCreateSection);

$.WidFechar.init({
    text: "Meu Perfil",
    parent: $.windowMyProfile
});

function logout() {
    Cloud.Users.logout(function (e) {
        if (e.success) {
            Alloy.createController('index').getView().open();
        } else {
            dialog({
                title: 'Erro de Logout',
                message: 'Servidor indisponível'
            });
        }
    });
};

MemoryClear.clear($.windowMyProfile);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.windowMyProfile);