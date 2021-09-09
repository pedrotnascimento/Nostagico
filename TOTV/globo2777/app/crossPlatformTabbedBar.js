/**
 * Android doesn't have a tabbedBar like iOS does, so this was my attempt at duplicating the functionality and API
 * http://docs.appcelerator.com/titanium/2.0/index.html#!/api/Titanium.UI.ButtonBar
 * @param {Dictionary<Titanium.UI.Button>} params
 */

function createTabbedBar(params) {
  if (!params.labels || params.labels.length === 0) {
    throw "You must specify button titles in a 'labels' member on the passed in object";
  }
  
  //if on iOS, just return native tabbedbar
  if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
    return Ti.UI.iOS.createTabbedBar(params);
  }
  //only tested on android, but I guess it might work elsewhere. maybe. 
  else if (Ti.Platform.osname != 'android') {
    throw "CrossPlatformTabbedBar doesn't support "+Ti.Platform.osname;
  }
  
  //scrollView prevents overflow buttons from wrapping.
  var self = Ti.UI.createScrollView(params);
  self.layout = 'horizontal';
  self.backgroundColor = '#000000';
  self.borderRadius = 4;
    
  //can designate which to start highlighted
  var index = params.index || 0;
  
  //prepare colors
  var orig = params.backgroundColor || "#DDDDDD";
  var darker = shade(params.backgroundColor, 'darker');
  var lighter = shade(params.backgroundColor, 'lighter')
    
  //loop through labels and create buttons
  var buttons = [];
  var nButtons = params.labels.length
  var cWidth = (100/nButtons);
  for (var i = 0; i < nButtons; i++) {
    
    //create button - actually a view
    var wrapper = Ti.UI.createView({
      width:cWidth+'%',
      center : { x: (cWidth*i + cWidth/2).toFixed(2)+"%"},
      top:1,
      bottom:1
    });
    var button = Ti.UI.createView({
      top:0,
      bottom:0,
      left: (i===0) ? 1 : 0,
      right:1
    });
        
    //add label to buttons
    button.add(Ti.UI.createLabel({
      text:params.labels[i],
      color:"#EEEEEE",
      font: {
        fontSize:12,
        fontWeight:'bold'
      }
    }));
    wrapper.add(button);
        
    //attach behavior to buttons
    (function(){
      var my_index = i;
      button.addEventListener('click',function(){
          setIndex(my_index);
      });
    })();
        
    //add buttons to row
    buttons.push(button);
    self.add(wrapper);
  }
  
  function setIndex(newIndex) {
    index = newIndex;
    self.index = newIndex;
    for (var i = 0; i < buttons.length; i++) {
      var buttonBaseColor = (i===index) ? darker : orig;
      var buttonLightColor = (i===index) ? orig : lighter;
      buttons[i].setBackgroundColor(buttonBaseColor);
      if (typeof buttons[i].setBackgroundGradient != 'undefined') { 
        buttons[i].setBackgroundGradient({
          type: 'linear',
          startPoint: { x: '50%', y: '0%' },
          endPoint: { x: '50%', y: '100%' },
          colors: [ 
            { color: buttonLightColor, offset: 0.0},
            { color: 'transparent', offset: 1.0 }
          ]
        });
      }
    }
  }
  function getIndex() {
      return index;
  }
    
  self.setIndex = setIndex;
  self.getIndex = getIndex;
  
  setIndex(index);
  return self;
}

function shade(_hexColorIn, _multiplier) {
  
  //handle defaults
  var hexColorIn = _hexColorIn || "#DDDDDD";
  var multiplier = _multiplier || 1; //note: won't change
  if (multiplier == 'lighter') multiplier = 1.666;
  if (multiplier == 'darker') multiplier = 0.6;
  
  //translate to RGB values
  var startsWithBang = (hexColorIn.charAt(0)=='#');
  hexColorIn = startsWithBang ? hexColorIn.substring(1,7) : hexColorIn;
  var r = parseInt(hexColorIn.substring(0,2), 16);
  var g = parseInt(hexColorIn.substring(2,4), 16);
  var b = parseInt(hexColorIn.substring(4,6), 16);
  
  //manipulate RGB values
  r = r * multiplier;
  g = g * multiplier;
  b = b * multiplier;
  
  //translate back to hex
  var hexColorOut = (startsWithBang) ? '#' : '';
  hexColorOut += "" + ("0"+(Math.min(Math.round(r), 255)).toString(16)).slice(-2);
  hexColorOut += "" + ("0"+(Math.min(Math.round(g), 255)).toString(16)).slice(-2);
  hexColorOut += "" + ("0"+(Math.min(Math.round(b), 255)).toString(16)).slice(-2);
  
  //Ti.API.info("Color in: "+hexColorIn+", color out: "+hexColorOut);
  return hexColorOut;
}


exports.createTabbedBar = createTabbedBar;
exports.version = 1.0;
exports.author = "Jonathan Mitchell";
