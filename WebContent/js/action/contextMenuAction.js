define([ 
         'jquery', 
       ], function($) {

	var ContextMenuAction = function() {
	};

	ContextMenuAction.prototype = {

		ShowMenu : function(e) {

			var posx = e.clientX + window.pageXOffset + 'px'; // 마우스 포인터 Left Position
			var posy = e.clientY + window.pageYOffset + 'px'; // 마우스 포인터 Top  Position
			$('#contextMenu').css({
				position : 'absolute',
				display : 'inline',
				left : posx,
				top : posy
			});

		},

		HideMenu : function() {

			$('#contextMenu').css('display', 'none');

		}

	};
	return ContextMenuAction;
});