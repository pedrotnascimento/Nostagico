/**
 * The slide menu widget
 * 
 * @class Widgets.com.mcongrove.slideMenu
 */
var sections = [];
var nodes = [];
var color;
var divisoes;
/**
 * Initializes the slide menu
 * @param {Object} _params
 * @param {Array} _params.nodes The nodes (menu items) to show in the side menu as defined by the JSON configuration file
 * @param {Object} _params.color The colors for the menu
 * @param {String} _params.color.headingBackground The background color for menu headers
 * @param {String} _params.color.headingText The text color for menu headers
 */

var geofence = require('geofence');


$.init = function(_params) {
	sections = [];
	nodes = [];
	color = typeof _params.color !== "undefined" ? _params.color : null;
	divisoes = _params.divisoes;

	// Creates a TableViewSection for each tab with a menuHeader property
	buildSections(_params.nodes);

	if(sections.length > 0) {
		var currentSection = -1;
	}

	for(var i = 0; i < _params.nodes.length; i++) {
		// Iterates through the created sections
		if(_params.nodes[i].menuHeader) {
			currentSection++;
		}

		var tab = Ti.UI.createTableViewRow({
			id: _params.nodes[i].id,
			height: "47dp",
			backgroundcolor: "#111",
			backgroundSelectedColor: "#DCE3E6",
			selectedBackgroundColor: "#DCE3E6"
		});

		var label = Ti.UI.createLabel({
			text: _params.nodes[i].title,
			top: "0dp",
			left: "20dp",
			right: "13dp",
			height: "46dp",
			font: {
				fontSize: "16dp",
				fontFamily: "HelveticaNeue-Light"
			},
			color: "#76A9E9",
			touchEnabled: false
		});

		if(_params.nodes[i].image) {
			var icon = Ti.UI.createImageView({
				image: _params.nodes[i].image,
				width: "21dp",
				height: "21dp",
				top: "13dp",
				left: "13dp",
				touchEnabled: false,
				preventDefaultImage: true
			});

			tab.add(icon);
		}

		tab.add(label);

		if(sections.length > 0) {
			sections[currentSection].add(tab);

			// If the last tab has been created and added to a section or
			// the next tab is a new header, append the current section to the TableView
			if(i + 1 !== _params.nodes.length) {
				if(_params.nodes[i + 1].menuHeader) {
					$.Nodes.appendSection(sections[currentSection]);
				}
			} else {
				$.Nodes.appendSection(sections[currentSection]);
			}
		} else {
			nodes.push(tab);
		}
	}

	if(nodes.length > 0) {
		$.Nodes.setData(nodes);
	}

	// We have to remove before adding to make sure we're not duplicating
	$.Nodes.removeEventListener("click", handleClick);
	$.Nodes.addEventListener("click", handleClick);
};

/**
 * Handles a click event on the nodes container
 * @param {Object} _event The event
 */
function handleClick(_event) {
	if(typeof _event.index !== "undefined") {
		$.setIndex(_event.index);
	}
};

/**
 * Builds out the table sections
 * @param {Object} _nodes The tab items to show in the side menu
 * @private
 */
function buildSections(_nodes) {
	for(var i = 0; i < _nodes.length; i++) {
		// Assigns special menuHeader styling
		if(_nodes[i].menuHeader) {
			var header = Ti.UI.createView({
				top: "0dp",
				height: "20dp",
				width: Ti.UI.FILL,
				backgroundColor: color.headingBackground
			});

			var headerText = Ti.UI.createLabel({
				text: _nodes[i].menuHeader,
				top: "2dp",
				left: "13dp",
				font: {
					fontSize: "12dp",
					fontWeight: "HelveticaNeue-Light"
				},
				color: color.headingText,
				touchEnabled: false,
				verticalAlignment: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				isHeader: true
			});

			header.add(headerText);

			var section = Ti.UI.createTableViewSection({
				headerView: header
			});

			sections.push(section);
		}
	}
};

/**
 * Clears all items from the side menu
 */
$.clear = function() {
	$.Nodes.setData([]);
	$.Nodes.removeAllChildren();
};

/**
 * Sets the indexed item as active
 * @param {Object} _index The index of the item to show as active
 */
$.setIndex = function(_index) {
	$.Nodes.selectRow(_index);
};

// Move the UI down if iOS7+
if(OS_IOS && parseInt(Ti.Platform.version.split(".")[0], 10) >= 7) {
	$.Nodes.top = "20dp";
}
function abrirOS(){
	Alloy.createController('minhasOS',{gestao:false, divisoes:divisoes}).getView().open();
}
function abrirGestao(){
	Alloy.createController('minhasOS',{gestao:true, divisoes:divisoes}).getView().open();
}
function abrirRest(){
    if (Ti.App.user_role == "admin")
	   Alloy.createController('restaurantes').getView().open();
	else if (geofence.checkLocal())
	   Alloy.createController('restaurantes').getView().open();
}

function abrirMapa(){
    if (Ti.App.user_role == "admin")
	   Alloy.createController('mapa').getView().open();
	else if (geofence.checkLocal())
       Alloy.createController('mapa').getView().open();

}
$.lblRest.addEventListener('click', abrirRest);
$.lblSO.addEventListener('click', abrirOS);
$.lblMapa.addEventListener('click', abrirMapa);


if(Ti.App.user_role == "admin"){
	var lblGestor = Ti.UI.createLabel({
		text: "GESTÃO DE SOLICITAÇÕES",
		left: "7%",
		top: "5dp",
		color: "#009ddb",
	});
	
	$.vwFixo.add(lblGestor);
	lblGestor.addEventListener('click', abrirGestao);
	
}else {
	$.Nodes.height = "70%";
}	
	


