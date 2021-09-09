var Image = require('imagelib');
Image.initialize();

var HideKeyboard = require('hide-keyboard');

var MemoryClear = require('clearMemory');

var dialog = require('util').dialog;

var Cloud = require('ti.cloud');

Alloy.Globals.profileNames = ['Solicitante', 'Analista', 'Manutentor'];

Alloy.Globals.profileID = 1;

function getPlatformWidth(fraction) {
    fraction = (typeof fraction === 'undefined') ? 100 : fraction;
    fraction /= 100.0;

    var width = Titanium.Platform.displayCaps.platformWidth;

    // Titanium.Platform.displayCaps.platformWidth é 'px' em Android e 'dp' em iOS. Compensar isso (quero 'dp')
    if (!OS_IOS) {
        width /= parseFloat(Ti.Platform.displayCaps.logicalDensityFactor);
    }

    return width * fraction;
}

function getPlatformHeight(fraction) {
    fraction = (typeof fraction === 'undefined') ? 100 : fraction;
    fraction /= 100.0;

    var height = Titanium.Platform.displayCaps.platformHeight;

    // Titanium.Platform.displayCaps.platformHeight é 'px' em Android e 'dp' em iOS. Compensar isso (quero 'dp')
    if (!OS_IOS) {
        height /= parseFloat(Ti.Platform.displayCaps.logicalDensityFactor);
    }

    return height * fraction;
}

//TODO: Solucionar essa magia negra de ajustar corretamente na tela do Android
function setCardHeight(cardView, buttonSectionView) {
    var widgetHeight;

    if (OS_ANDROID) {
        widgetHeight = 50;
    } else
        widgetHeight = 60;

    var cardHeight = getPlatformHeight() - widgetHeight - buttonSectionView.getHeight() - 2 * buttonSectionView.getTop();

    cardView.setHeight(cardHeight);
}

function setCardHeightWhenTabbed(cardView, buttonSectionView) {
    var widgetHeight;

    if (OS_ANDROID) {
        widgetHeight = 100;
    } else
        widgetHeight = 110;

    var cardHeight = getPlatformHeight() - widgetHeight - buttonSectionView.getHeight() - 2* buttonSectionView.getTop();

    cardView.setHeight(cardHeight);
}

function getDate(dateObj){
    var month = dateObj.getMonth() + 1;
    if (month < 10) {month = "0" + month;}
    
    return dateObj.getDate() + "." + month + "." + dateObj.getFullYear();
}

function getTime(dateObj){
    var hours = dateObj.getHours();
    if (hours < 10) {hours = "0" + hours;}
     
    var mins = dateObj.getMinutes();
    if (mins < 10){mins = "0" + mins;}
    
    return hours + ":" + mins;   
}

var backgroundImage = Image.createFromFile("images/fiatBackground.png");

Alloy.Globals.backgroundImageHandle = backgroundImage.imageFileHandle;
