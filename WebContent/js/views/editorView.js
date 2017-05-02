define([ 
        'jquery'
       ], function($) {

	var EditorView = function() {
	};

	EditorView.prototype = {

		drawEditor : function() {

			var $editorContainer = $('#editorContainer');
			$('<div>', {
				id : "content",
				class : "content",
				contenteditable : "true"
			}).appendTo($editorContainer).append($('<div><br></div>'));
			
//			$('<div>').appendTo($("#content"));

		}
	};

	return EditorView;

});
