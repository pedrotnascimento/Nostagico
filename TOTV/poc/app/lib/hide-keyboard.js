function HideKeyboard(window) {
    var keyboardElements = [];
    var textElementCliked = false;

    function subscribe(element) {
        if (element.apiName != 'Ti.UI.TextField' && element.apiName != 'Ti.UI.TextArea') {
            var eventType = 'click';

            if (element.apiName == 'Ti.UI.ListView') {
                eventType = 'itemclick';
            }

            element.addEventListener(eventType, function() {
                setTimeout(function() {
                    if (!textElementCliked) {
                        if (OS_ANDROID) {
                            Ti.UI.Android.hideSoftKeyboard();
                        } else {
                            keyboardElements.forEach(function (keyboardElement) {
                                keyboardElement.blur();
                            });
                        }
                    }
                }, 10);
            });
        }
    };

    function checkKeyboardNeed(element) {
        if (element.apiName == 'Ti.UI.TextField' || element.apiName == 'Ti.UI.TextArea') {
            keyboardElements.push(element);
            element.addEventListener('click', function() {
                textElementCliked = true;
                setTimeout(function() {
                    textElementCliked = false;
                }, 200);
            });
        }
    };

    function branch(element, callback) {
        if (element) {
            callback(element);

            if (element.getChildren()) {
                element.getChildren().forEach(function (keyboardElement) {
                    branch(keyboardElement, callback);
                });
            }
        }
    };

    this.destroy = function() {

    };

    branch(window, checkKeyboardNeed);
    branch(window, subscribe);
};

module.exports = HideKeyboard;
