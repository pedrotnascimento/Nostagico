$.winLogin.open();

$.btnForgotPassword.addEventListener('click', function () {
    Alloy.createController('retrievePassword').getView().open();
});

$.btnLogin.addEventListener('click', function () {
    var email = $.fldEmail.getValue();
    var password = $.fldPassword.getValue();

     //email = "joaogabriel@fcagroup.com";
    //email = "pedroivo@fcagroup.com";
    // email = "analista@fcagroup.com";
    //password = "1234";

    $.indicator.showIndicator();
    Cloud.Users.login({
        login: email,
        password: password
    }, function(e) {
        $.indicator.hideIndicator();
        if (e.error) {
            if (e.code == 401) {
                dialog({
                    title: 'Erro de Login',
                    message: 'Credenciais inválidas'
                });
            } else {
                dialog({
                    title: 'Erro de Login',
                    message: 'Servidor indisponível'
                });
            }
        } else {
            Alloy.Globals.profileID = Number(e.users[0].role);
            Alloy.Globals.userData = e.users[0];
            switch (Alloy.Globals.profileID) {
                case 1:
                case 2:
                    Alloy.createController('home').getView().open();
                    break;
                case 3:
                    Alloy.createController('myOP').getView().open();
                    //Alloy.createController('concludedOP').getView().open();
                    break;
            }
        }
    });
});

MemoryClear.clear($.winLogin);
$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winLogin);
