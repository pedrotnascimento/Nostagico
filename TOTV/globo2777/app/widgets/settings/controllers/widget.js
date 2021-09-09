$.show = function(){
	$.vwSet.setVisible(true);
};

$.hide = function(){
	$.vwSet.setVisible(false);
};

$.btnVoltar.addEventListener('click',function(){
	$.vwSet.setVisible(false);
});

$.btnAjuda.addEventListener('click',function(){
	//Texto de ajuda
});

$.btnSair.addEventListener('click',function(){
	var Cloud = require ('ti.cloud');
    Cloud.Users.logout(function (e) {
    });
	$.vwSet.getParent().close();
});
