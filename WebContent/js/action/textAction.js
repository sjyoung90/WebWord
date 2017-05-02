define([
        'jquery',
        ], function($) {

	var TextAction = function() {
	};

	TextAction.prototype = {
			
		getSelection : function() {
			
			var selection = window.getSelection();
			startOffset = selection.anchorNode.parentNode;  
			endOffset = selection.focusNode.parentNode;
			
				
			while(startOffset.tagName != 'DIV') {
				startOffset = startOffset.parentNode;
			}
			while(endOffset.tagName != 'DIV') {
				endOffset = endOffset.parentNode;
			}
			
//			console.log(startOffset);
//			console.log(endOffset);
			

			return {
				startOffset : startOffset,
				endOffset : endOffset,
				selectionObj : selection
			};
		},

		
		lineHeight : function(selection, target) { 
			var startOffset = selection.startOffset;
			var endOffset = selection.endOffset;
			
//			var fontTag = startOffset.childNodes;
//			fontTag[i].size
			
			if(startOffset == endOffset) {
				startOffset.style.lineHeight = target.value;
			}else {
				
				startOffset.style.lineHeight = target.value;
				endOffset.style.lineHeight = target.value;
				
				console.log($("#content div").index(startOffset));
				console.log($("#content div").index(endOffset));
				
				if($("#content div").index(endOffset) < $("#content div").index(startOffset)) {
					console.log('endOffset < startOffset');
					while(startOffset.previousSibling != endOffset) {
						
						startOffset.previousSibling.style.lineHeight = target.value;
						startOffset = startOffset.previousSibling;
					}
					console.dir(window.getSelection().anchorNode.parentNode);
					console.dir(window.getSelection().anchorOffset);
					console.dir(window.getSelection().focusNode.parentNode);
					console.dir(window.getSelection().focusOffset);
				} else {
					console.log('endOffset > startOffset');
					while(startOffset.nextSibling != endOffset) {
						
						startOffset.nextSibling.style.lineHeight = target.value;
						startOffset = startOffset.nextSibling;
					}
					console.dir(startOffset);
					console.dir(endOffset);
//					console.dir(window.getSelection().anchorNode.parentNode);
//					console.dir(window.getSelection().anchorOffset);
//					console.dir(window.getSelection().focusNode.parentNode);
//					console.dir(window.getSelection().focusOffset);
				}
				
			}
			
		
// var div = document.createElement("span");

// div.style.lineHeight = e.target.value;
// div.style.verticalAlign = "top";
// div.appendChild(selectedText);
// selection.insertNode(div);

		},
		
		letterSpacing : function(selection, target) {  
																
															
			var startOffset = selection.startOffset;
			var endOffset = selection.endOffset;
		
			if(startOffset == endOffset) {
				startOffset.style.letterSpacing = target.value;
			}else {
				
				startOffset.style.letterSpacing = target.value;
				endOffset.style.letterSpacing = target.value;
				
				console.log($("#content div").index(startOffset));
				console.log($("#content div").index(endOffset));
				
				if($("#content div").index(endOffset) < $("#content div").index(startOffset)) {
					console.log('(endOffset < startOffset');
					while(startOffset.previousSibling != endOffset) {
						
						startOffset.previousSibling.style.letterSpacing = target.value;
						startOffset = startOffset.previousSibling;
					}
					console.dir(window.getSelection().anchorNode.parentNode);
					console.dir(window.getSelection().anchorOffset);
					console.dir(window.getSelection().focusNode.parentNode);
					console.dir(window.getSelection().focusOffset);
				}else {
					console.log('(endOffset > startOffset');
					while(startOffset.nextSibling != endOffset) {
						
						startOffset.nextSibling.style.letterSpacing = target.value;
						startOffset = startOffset.nextSibling;
					}
					console.dir(window.getSelection().anchorNode.parentNode);
					console.dir(window.getSelection().anchorOffset);
					console.dir(window.getSelection().focusNode.parentNode);
					console.dir(window.getSelection().focusOffset);
				}
				
			}

		},
		
		justifyLeft : function(selection, target) {
			
			var startOffset = selection.startOffset;
			var endOffset = selection.endOffset;
			
			console.log($("#content div").index(startOffset));
			console.log($("#content div").index(endOffset));
			
			if(startOffset == endOffset) {
				startOffset.style.textAlign = "left";
			}else {
				
				startOffset.style.textAlign = "left";
				endOffset.style.textAlign = "left";
				
				if($("#content div").index(endOffset) < $("#content div").index(startOffset)) {
					
					while(startOffset.previousSibling != endOffset) {
						
						startOffset.previousSibling.style.textAlign = "left";
						startOffset = startOffset.previousSibling;
					}

				}else {
					while(startOffset.nextSibling != endOffset) {
						
						startOffset.nextSibling.style.textAlign = "left";
						startOffset = startOffset.nextSibling;
					}
				}
				
			}
		},
		
		justifyCenter : function(selection, target) {
			var startOffset = selection.startOffset;
			var endOffset = selection.endOffset;
			
			if(startOffset == endOffset) {
				startOffset.style.textAlign = "center";
			}else {
				
				startOffset.style.textAlign = "center";
				endOffset.style.textAlign = "center";
				
				if($("#content div").index(endOffset) < $("#content div").index(startOffset)) {
					
					while(startOffset.previousSibling != endOffset) {
						
						startOffset.previousSibling.style.textAlign = "center";
						startOffset = startOffset.previousSibling;
					}

				}else {
					
					while(startOffset.nextSibling != endOffset) {
						
						startOffset.nextSibling.style.textAlign = "center";
						startOffset = startOffset.nextSibling;
					}
				}
				
			}
		},
		
		justifyRight : function(selection, target) {
			var startOffset = selection.startOffset;
			var endOffset = selection.endOffset;
			
			if(startOffset == endOffset) {
				startOffset.style.textAlign = "right";
			}else {
				
				startOffset.style.textAlign = "right";
				endOffset.style.textAlign = "right";
				
				if($("#content div").index(endOffset) < $("#content div").index(startOffset)) {
					
					while(startOffset.previousSibling != endOffset) {
						
						startOffset.previousSibling.style.textAlign = "right";
						startOffset = startOffset.previousSibling;
					}

				}else {
					
					while(startOffset.nextSibling != endOffset) {
						
						startOffset.nextSibling.style.textAlign = "right";
						startOffset = startOffset.nextSibling;
					}
				}
				
			}
		},
		
// indent : function(startOffset, endOffset) {
//			
// if(startOffset == endOffset) {
// startOffset.style.marginLeft += 48;
// }else {
//				
// startOffset.style.paddingLeft += 48;
// endOffset.style.paddingLeft += 48;
//				
// if($("#content div").index(endOffset) < $("#content div").index(startOffset))
// {
//					
// while(startOffset.previousSibling != endOffset) {
//						
// startOffset.previousSibling.style.paddingLeft = '800px';
// startOffset = startOffset.previousSibling;
// }
//
// }else {
//					
// while(startOffset.nextSibling != endOffset) {
//						
// startOffset.nextSibling.style.paddingLeft = '800px';
// startOffset = startOffset.nextSibling;
// }
// }
//				
// }
//			
// },
//		
// outdent : function(startOffset, endOffset) {
//			
//			
//			
// },

	};
	return TextAction;
});
