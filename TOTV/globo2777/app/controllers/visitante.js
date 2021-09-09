
function sair(){
    $.winVis.close();
}

function goMapa(){
    Alloy.createController('mapa',{pesquisa:""}).getView().open();
}

function goRest(){
    Alloy.createController('restaurantes').getView().open();
}

$.imgSair.addEventListener('click',sair);

$.vwMapa.addEventListener('click',goMapa);

$.vwRest.addEventListener('click',goRest);

$.winVis.addEventListener('close',function(e){
   require('clearMemory').clear($.winVis); 
});