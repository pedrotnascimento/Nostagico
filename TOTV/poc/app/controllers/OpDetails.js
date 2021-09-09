// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var osNumber = $.args.OSNumber;
var opNumber = $.args.OPNumber;
var osFinished = $.args.finished;

var tannenbaum = "";
var selectedMaintainers = 0;
var processedMaintainers = 0;

// Remover algumas opções caso o usuário seja solicitante
if (Alloy.Globals.profileID != 2 || osFinished) {
    $.btnCreate.hide();
    $.vwCreateSection.height = 0;
    $.labelMaintainer.hide();
    $.vwSearch.hide();
    $.hrMaintainer.hide();
}

$.WidFechar.init({
    text: "Operação " + opNumber,
    parent: $.winOpDetails
});

var searchIcon = Image.createFromFile("images/ic_search.png");
var searchIconView = searchIcon.getViewByHeight(25);
searchIconView.right = 7;

$.vwSearch.add(searchIconView);
$.lblOsNumber.text = osNumber;

function changeSearchText(newText) {
    $.lblSearch.text = newText;
}

$.vwSearch.addEventListener('click', function () {
    Alloy.createController('selectManut', {
        callback: changeSearchText
    }).getView().open();
});

function updateTannenbaum(maintainerName) {
    return function(e) {
        if (e.success) {
            var id = Alloy.CFG.joaoId;

            if (maintainerName.includes("Pedro")) {
                id = Alloy.CFG.pedroId;
            }

            tannenbaum += "#" + id + "@" + e.operationUser[0].id;

            if (++processedMaintainers == selectedMaintainers) {
                Cloud.Objects.create({
                    classname: 'operation',
                    fields: {
                        osNumber: osNumber,
                        opNumber: opNumber,
                        status: 0,
                        manutentores: $.lblSearch.text,
                        tannenbaum: tannenbaum
                    }
                }, function (e) {
                    $.indicator.hideIndicator();
                    if (e.success) {
                        $.winOpDetails.close();
                        dialog({
                            title: 'Sucesso',
                            message: 'Operação distribuída com sucesso.'
                        });
                    } else {
                        dialog({
                            title: 'Erro de Cloud',
                            message: 'Servidor indisponível'
                        });
                    }
                });
            }
        } else {
            dialog({
                title: 'Erro de Cloud',
                message: 'Servidor indisponível'
            });
        }
    };
};

$.btnCreate.addEventListener('click', function () {
    if ($.lblSearch.text != 'Pesquisar') { // SEPARADOS POR PULA LINHA
        $.indicator.showIndicator();
        tannenbaum = "";

        var names = $.lblSearch.text.split("\n");

        selectedMaintainers = names.length - 1;

        for (var i = 1; i < names.length; i++) {
            var name = names[i];

            Cloud.Objects.create({
                classname: 'operationUser',
                fields: {
                    pauses: '',
                }
            }, updateTannenbaum(names[i]));
        }
    } else {
        dialog({
            title: 'Erro',
            message: 'Selecione os manutentores'
        });
    }
});

setCardHeight($.vwCard, $.vwCreateSection);

MemoryClear.clear($.winOpDetails);

$.imageHolder.image = Alloy.Globals.backgroundImageHandle;
var hideKeyboard = new HideKeyboard($.winOpDetails);
