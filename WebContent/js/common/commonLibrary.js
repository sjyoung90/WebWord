define([
   'jquery',
], function($) {
	var CommonLibrary = function() {
		
	};
	
	CommonLibrary.prototype = {
			
	};
	
	CommonLibrary.prototype.selection = function(){
		this.sel = null;
		this.range = null;
		
		//Selection 가져오기
		this.getSelection = function(){
			if (window.getSelection)
				return window.getSelection(); // HTML5 표준 API
			else{
				return document.selection; // IE
			}
		};

		//Range 가져오기
		this.getRange = function(sel){
			var rng = null;
			if (!sel) sel = this.sel;
			if (!sel) sel = this.sel = this.getSelection();

			if (sel.getRangeAt) {
				try{
					rng = sel.getRangeAt(0);
				}catch(ext){
					rng = null;
				};
			} else {
				rng = sel.createRange();
			}

			return rng;
		};
		
		//Range 타입 가져오기
		this.getType = function(){
			var type = "None";
			if (!this.sel || this.sel == null) return type;

			var controlElements = ['IMG', 'HR', 'TABLE', 'TR', 'TD', 'EMBED', 'OBJECT', 'INPUT', 'SELECT', 'TEXTAREA', 'APPLET', 'AUDIO', 'VIDEO', 'CANVAS']; // 모든 control elements
			var R = this.getRange();
			if (R){
				if (R.startContainer && R.endContainer){
					if (this.sel.rangeCount > 0) {
						type = "Text";
						
						if (R.startContainer == R.endContainer && R.startContainer.nodeType == 1){
							if ((R.endOffset - R.startOffset) == 1){
								if ($.inArray(R.startContainer.childNodes[R.startOffset].nodeName, controlElements) != -1) type = "Control";
							}else if ((R.endOffset - R.startOffset) == 0){
								if ($.inArray(R.startContainer.nodeName, controlElements) != -1) type = "Control";
								if ($.browser.mozilla && type != "Control") {
									try {
										if ($.inArray(R.startContainer.childNodes[R.startOffset].nodeName, controlElements) != -1) type = "Control";
									} catch(e) {}
								}
							}
						}
					}
				}else{
					try {
						var seltype = this.sel.type;
						if (seltype == "Control" || seltype == "Text") type = seltype;
						if (this.sel.createRange().parentElement) type = "Caret";
					} catch(e) {};
				}
			}

			return type;
		};
	};
	
	return CommonLibrary;
});