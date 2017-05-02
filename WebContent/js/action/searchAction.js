define([ 
         'jquery', 
       ], function($) {

	var SearchAction = function() {
	};

	SearchAction.prototype = {

		findText : function() {

			var findText = $("#findField").val();
			if (findText == "") {
				alert("텍스트를 해주세요!");
				return;
			}

			var found = false;
			if (window.find) { // Firefox, Google Chrome, Safari

				found = window.find(findText);
			} else {
				if (document.selection && document.selection.createRange) { 
					var textRange = document.selection.createRange();
					if (textRange.findText) {

						if (textRange.text.length > 0) {
							textRange.collapse(true);
							textRange.move("character", 1);
						}

						found = textRange.findText(findText);

						if (found) {
							textRange.select();
						}
					}
				}
			}
			if (!found) {
				alert("다음 텍스트는 없습니다.:\n" + findText);
			}

		},
		changeText : function() {

			var changeText = $("#changeField").val();

			var selection = window.getSelection().getRangeAt(0);
			var selectedText = selection.extractContents();
			var span = document.createElement("span");

			span.appendChild(selectedText);
			selection.insertNode(span);

			span.innerText = changeText;

		}

	};
	return SearchAction;
});