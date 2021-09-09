var args = arguments[0] || {};

var _init = {};

$.showIndicator = function() {
	$.overlay.visible = true;
	$.indicator.show();
};

$.hideIndicator = function() {
	$.overlay.visible = false;
	$.indicator.hide();
};

(function() {
	_init = {
		opacity : args.opacity,
		message : args.message,
		backgroundColor : args.backgroundColor,
	};
	
	if (_init.opacity) {
		$.overlay.opacity = _init.opacity;
	}
	
	if (_init.message) {
		$.indicator.message = _init.message;
	}
	
	if (_init.backgroundColor) {
		$.overlay.backgroundColor = _init.backgroundColor;
	}	
})();
