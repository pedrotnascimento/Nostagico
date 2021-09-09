var args = arguments[0] || {};
var _init = {};

var tabViews = [];
var currentTab = 0;

var highlightProperties = {};
var fadeProperties = {};

// TODO: Colocar isso como argumento depois!
var tabSelectorWidth = 120;
var tabSelectorHeight = 40;
var scrollTabSelectorWidth = getPlatformWidth(90);

$.scrollTabSelector.width = scrollTabSelectorWidth;

function updateTabSelector(selector, properties) {
    var label = selector.getChildren()[0];
    var indicator = selector.getChildren()[1];
    
    label.applyProperties(properties.label);
    indicator.applyProperties(properties.indicator)
}

$.scrollableTabDisplay.addEventListener('scrollend', function (e) {
    if (!('view' in e)) {
        return;
    }

    updateTabSelector(tabViews[currentTab], fadeProperties);
    currentTab = e.currentPage;
    updateTabSelector(tabViews[currentTab], highlightProperties);

    var totalWidth = tabViews.length * tabSelectorWidth;
    var platformWidth = scrollTabSelectorWidth;

    var xOffset = currentTab * tabSelectorWidth - platformWidth / 2 + tabSelectorWidth / 2;

    if (OS_IOS) {
        if (xOffset < 0) {
            xOffset = 0;
        }

        if (xOffset > totalWidth - platformWidth) {
            xOffset = totalWidth - platformWidth;
        }
    } else if (OS_ANDROID) {
        xOffset *= 2;
    }

    $.scrollTabSelector.contentOffset = {
        x: xOffset,
        y: 0,
    };
});

function setTabSelectorEventListener(view, index) {
    view.addEventListener('click', function () {
        $.scrollableTabDisplay.scrollToView(index);
    });
};

$.setHighlightProperties = function (properties) {
    highlightProperties = properties;
}

$.setFadeProperties = function (properties) {
    fadeProperties = properties;
}

$.addView = function (view, text) {
    if (tabViews.length < 3) {
        tabSelectorWidth = scrollTabSelectorWidth / (tabViews.length + 1);

        var length = tabViews.length;
        var selectors = $.scrollTabSelector.getChildren();

        for (var i = 0; i < length; i++) {
            var child = selectors[i];
            child.width = tabSelectorWidth;
        }
    }

    var selectorView = Ti.UI.createView({
        left: 0,
        height: tabSelectorHeight,
        width: tabSelectorWidth
    });

    var selectorLabel = Ti.UI.createLabel();
    var selectorIndicator = Ti.UI.createView();

    selectorView.add(selectorLabel);
    selectorView.add(selectorIndicator);

    if (currentTab == tabViews.length) {
        updateTabSelector(selectorView, highlightProperties);
    } else {
        updateTabSelector(selectorView, fadeProperties);
    }

    selectorLabel.text = text.toUpperCase();
    
    setTabSelectorEventListener(selectorView, tabViews.length);

    tabViews.push(selectorView);
    $.scrollTabSelector.add(selectorView);

    var wrappingView = Ti.UI.createView({
        width: "100%",
        height: "100%",
    });
    
    wrappingView.add(view);
    $.scrollableTabDisplay.addView(wrappingView);
    
    $.scrollableTabDisplay.setBubbleParent(true);
    wrappingView.setBubbleParent(true);
    view.setBubbleParent(true);
};
