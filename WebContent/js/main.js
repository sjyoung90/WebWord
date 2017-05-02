require.config({
	paths : {
		jquery : 'libs/jquery'
	},
});

require([
         'libs/domReady', 
         'controller/writeController'
        ], function(domReady, WriteController) {

	domReady(function() {

		console.log("main.js");
		var writeController = new WriteController();
		writeController.initialize();

	});
});
