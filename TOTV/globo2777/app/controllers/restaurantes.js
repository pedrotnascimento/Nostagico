// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.WidFechar.init({
    text: "RESTAURANTES",
    parent: $.winRest
   
});

function abrirRest1(){ Alloy.createController('perfilRest',{idRest:1}).getView().open();};
function abrirRest2(){ Alloy.createController('perfilRest',{idRest:2}).getView().open();};
function abrirRest3(){ Alloy.createController('perfilRest',{idRest:3}).getView().open();};
function abrirRest4(){ Alloy.createController('perfilRest',{idRest:4}).getView().open();};
function abrirRest5(){ Alloy.createController('perfilRest',{idRest:5}).getView().open();};
function abrirRest6(){ Alloy.createController('perfilRest',{idRest:6}).getView().open();};
function abrirRest7(){ Alloy.createController('perfilRest',{idRest:7}).getView().open();};
function abrirRest8(){ Alloy.createController('perfilRest',{idRest:8}).getView().open();};
function abrirRest9(){ Alloy.createController('perfilRest',{idRest:9}).getView().open();};
function abrirRest10(){ Alloy.createController('perfilRest',{idRest:10}).getView().open();};
function abrirRest11(){ Alloy.createController('perfilRest',{idRest:11}).getView().open();};
function abrirRest12(){ Alloy.createController('perfilRest',{idRest:12}).getView().open();};
function abrirRest13(){ Alloy.createController('perfilRest',{idRest:13}).getView().open();};
function abrirRest14(){ Alloy.createController('perfilRest',{idRest:14}).getView().open();};
function abrirRest15(){ Alloy.createController('perfilRest',{idRest:15}).getView().open();};
function abrirRest16(){ Alloy.createController('perfilRest',{idRest:16}).getView().open();};
function abrirRest17(){ Alloy.createController('perfilRest',{idRest:17}).getView().open();};
function abrirRest18(){ Alloy.createController('perfilRest',{idRest:18}).getView().open();};
 
$.winRest.addEventListener('close',function(e){
   require('clearMemory').clear($.winRest); 
});