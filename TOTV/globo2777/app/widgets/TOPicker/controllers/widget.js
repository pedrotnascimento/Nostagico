// arguments
//	title
// 	options
//	optionsTitle
//	cancelTitle (iOS)
//	selectedIndex (iOS)
//	onChange

if ($.args.selectedIndex === null || $.args.selectedIndex === undefined) {
	$.args.selectedIndex = -1;
}

if (OS_IOS) {
	
	$.container.iosPicker.title = $.args.selectedIndex === -1 ? 
		($.args.emptyTitle || '<emptyTitle>') :
		$.args.options[$.args.selectedIndex];
	
	$.args.options.push($.args.cancelTitle || ' Cancelar');
	
} else {
	
	//$.androidPicker.setSelectedRow(0, $.args.selectedIndex);

    
    
    data[0]=Ti.UI.createPickerRow({title:'Bananas'});
    data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
    data[2]=Ti.UI.createPickerRow({title:'Mangos'});
    data[3]=Ti.UI.createPickerRow({title:'Grapes'});
    
    $.androidPicker.add(data);
    $.androidPicker.selectionIndicator = true;
    
}

function iosPickerClick () {
	var cancelIndex = $.args.options.length - 1,
		dialog = Ti.UI.createOptionDialog({
		cancel: cancelIndex,
		options: $.args.options,
		selectedIndex: $.args.selectedIndex || -1,
		destructive: $.args.destructive || -1,
		title: $.args.optionsTitle || '<optionsTitle>' 
	}).show();
	dialog.addEventListener('click', function (e) {
		console.log('TOPicker.dialogClick: ' + JSON.stringify(e));
		if (e.index !== $.args.options.length - 1) {
			$.trigger('change', {
				index: e.index,
				oldIndex: $.selectedIndex
			});
			$.selectedIndex = e.index;
		}
	});
}

function androidPickerChange (e) {
	console.log('TOPicker.androidPicker.change: ' + JSON.stringify(e));
	
	$.trigger('change', {
		index: e.rowIndex,
		oldIndex: $.selectedIndex
	});
	$.selectedIndex = e.rowIndex;	
}

$.setItems = function (options) {
    
};
