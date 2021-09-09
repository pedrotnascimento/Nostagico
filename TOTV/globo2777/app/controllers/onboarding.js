var dlgEtica = Ti.UI.createAlertDialog({
    buttonNames:['OK'],
    message:"Este aplicativo está destinado a consultas de informações por colaboradores ou visitantes da TV Globo. As informações existentes não devem ser compartilhadas ou divulgadas.",
    title:"CENTRAL 2777"  
});
dlgEtica.addEventListener('click',function(evt){
    dlgPular.hide();
    if (evt.index == 0){
        $.winOnb.close();   
    }
});
function endOnb(){
    Ti.App.Properties.setBool("firstAccess",false);
    dlgEtica.show();
    
}
var passoCounter = 0;
$.btnFim.setVisible(false);
var dlgPular = Ti.UI.createAlertDialog({
    buttonNames:['Confirmar','Cancelar'],
    message:"Deseja realmente pular a introdução?",
    title:"CENTRAL 2777"  
});

dlgPular.addEventListener('click',function(evt){
    dlgPular.hide();
    if (evt.index == 0){
        endOnb();    
    }
});

$.btnPular.addEventListener('click',function(e){
    dlgPular.show();
});

$.btnAv.addEventListener('click',function(e){
   passoCounter++;
   
   if (passoCounter == 2){
       //Ao chegar no final do onboarding, bota os botões de avançar e pular como invisíveis
       //e faz aparecer botão de finalizar

       $.lblInfo.text = "Cadastre-se ou faça o\nlogin com o seu e-mail \nou entre como visitante.";
       $.btnFim.setVisible(true);
       $.btnPular.setVisible(false);
       $.btnAv.setVisible(false);
       $.vwMain.backgroundImage = "/images/Onboarding_3@3x.png";
   }
   else if (passoCounter == 1){
       
       $.lblInfo.text = "Encontre com mais\nfacilidade as instalações\ndentro dos Estúdios Globo,\nincluindo restaurantes\ne seus cardápios.";
       $.vwMain.backgroundImage = "/images/Onboarding_2@3x.png";
   }
    
});
$.btnFim.addEventListener('click',function(){
    endOnb();
});

$.winOnb.addEventListener('close',function(){
   require('clearMemory').clear($.winOnb);
   dlgEtica = null;
   dlgPular = null;
});


