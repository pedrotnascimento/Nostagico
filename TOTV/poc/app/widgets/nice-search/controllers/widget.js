$.setVisible = function (visible) {
    if (visible) {
        if (OS_IOS) {
            $.viewOuterWrapper.height = 60;
        } else {
            $.viewOuterWrapper.height = 50;
        }
//        $.textFieldSearch.focus();
    } else {
        $.viewOuterWrapper.height = 0;

//        if (OS_ANDROID) {
//            $.textFieldSearch.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
//            Ti.UI.Android.hideSoftKeyboard();
//        }
//
//        $.textFieldSearch.blur();
    }
};

$.setCloseCallback = function (callback) {
    $.viewClickRight.addEventListener('click', callback);
};

$.setChangeCallback = function (callback) {
    $.textFieldSearch.addEventListener('change', callback);
};

$.viewClickRight.addEventListener('click', function () {
    $.textFieldSearch.value = '';
    $.textFieldSearch.fireEvent('change', {value:''});
    $.setVisible(false);
});

(function () {
    var searchImage = Image.createFromFile("images/ic-search-white.png");
    var closeImage = Image.createFromFile("images/ic-cancelar.png");

    var searchImageView = searchImage.getViewByWidth(25);
    var closeImageView = closeImage.getViewByWidth(25);

    if (OS_IOS) {
        searchImageView.bottom = "10dp";
        closeImageView.bottom = "10dp";
    } else {
        searchImageView.bottom = "15dp";
        closeImageView.bottom = "15dp";
    }

    searchImageView.left = "12dp";
    closeImageView.right = "12dp";

    $.viewClickLeft.add(searchImageView);
    $.viewClickRight.add(closeImageView);
})();
