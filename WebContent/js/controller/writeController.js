define([
		'jquery',
		'event/Event',
		'views/headerView', 
		'views/editorView', 
		'views/buttonView',
		'views/contextMenuView'
		], function($, Event, HeaderView, EditorView, ButtonView, ContextMenuView) {

	var WriteController = function() {
	};

	WriteController.prototype = {

		initialize : function() {

			var hv = new HeaderView();
			hv.drawTitle();

			var bv = new ButtonView();
			bv.setButton();

			var ev = new EditorView();
			ev.drawEditor();

			var cv = new ContextMenuView();
			cv.drawContextMenu();

			var event = new Event();
			event.attachTextEvent();
			event.attachRightClickEvent();
			event.attachTableEvent();
		}
	};

	return WriteController;
});
