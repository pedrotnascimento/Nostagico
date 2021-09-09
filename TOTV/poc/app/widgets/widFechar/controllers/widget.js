var parent;

var Image = require('imagelib');
var parentRefreshCallback = null;

$.init = function(_params) {

	var arrowImage = Image.createFromFile("images/ic-chevron-left.png");

	var arrowView = arrowImage.getViewByHeight(20);
	
	if (OS_IOS) {
		arrowView.bottom = "10dp";	
	} else {
		arrowView.bottom = "15dp";
	}
	
	arrowView.left = "12dp";
	

	$.viewClickLeft.add(arrowView);

	$.lblCancel.text=_params.text.toUpperCase();
	parent = _params.parent;

	if ("parentRefreshCallback" in _params) {
        parentRefreshCallback = _params.parentRefreshCallback;
    }
};

function voltar(e){
    if (parentRefreshCallback) {
        parentRefreshCallback();
    }

	parent.close();
}

$.changeColor = function(color){
    $.vwCancel.backgroundColor = color;
};

$.addElement = function(element){
    $.vwCancel.add(element); 
};

$.setRightIconFunction = function(callback) {
	$.viewClickRight.addEventListener('click', callback);
};

$.addRightIcon = function(imageView) {
	if (OS_IOS) {
		imageView.bottom = "10dp";	
	} else {
		imageView.bottom = "15dp";
	}
	
	imageView.right = "12dp";	
	imageView.bubbleParent = true;
	
	$.viewClickRight.add(imageView);
};

$.setVisible = function(visible) {
    if (visible) {
        if (OS_IOS) {
            $.vwCancel.height = 60;
        } else {
            $.vwCancel.height = 50;
        }
    } else {
        $.vwCancel.height = 0;    
    }    
}
