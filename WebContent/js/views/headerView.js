define([ 
        'jquery', 
        'event/Event' 
       ], function($, Event) {

	var HeaderView = function() {
	};

	HeaderView.prototype = {
		drawTitle : function() {

			var $editorHeaderDiv = $('#editorHeader');
			var $titleDiv = $('<div>', {id : "title"}).appendTo($editorHeaderDiv);
			$('<h1>Mini Web Write</h1>').appendTo($titleDiv);

		}
	};
	return HeaderView;
});
