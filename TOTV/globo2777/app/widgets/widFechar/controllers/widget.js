var parent;

$.init = function(_params){
	$.lblCancel.text=_params.text;
	parent = _params.parent;
};
function voltar(e){
	 parent.close();
}

$.changeColor = function(color){
    $.vwCancel.backgroundColor = color;
};

$.addElement = function(element){
    $.vwCancel.add(element);
};
