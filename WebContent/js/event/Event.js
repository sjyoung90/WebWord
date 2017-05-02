define([ 
        'jquery',
		'action/tableAction', 
		'action/memoAction', 
		'action/textAction',
		'action/searchAction', 
		'action/contextMenuAction',
		'common/commonLibrary'
		],function($, TableAction, MemoAction, TextAction, SearchAction, ContextMenuAction, CommonLibrary) {

	var Event = function() {
		memoAction = new MemoAction();
		tableAction = new TableAction(this);
		textAction = new TextAction;
		searchAction = new SearchAction;
		contextMenuAction = new ContextMenuAction;
		
		commonLibrary = new CommonLibrary;
		this.newSelection = new commonLibrary.selection(); // commonLibrary의 selection 호출
		
		_this = this;
	};

	Event.prototype = {

			execFunction : function(funcType, execFunc, selection, target) {
				if(funcType == "exec") {
					document.execCommand(target.id, false, target.value);
				} else if(funcType == "selectFunc") { // selectFunc
					execFunc(selection, target);
				} else if(funcType == "targetFunc") {
					execFunc(target);
				}
			},
			
			execTextEvent : function(funcType, execFunc, selection, target) {
				
				var $selectedTD = $("td.highlight");
				if($selectedTD.length != 0) {
					var tableSelection = this.newSelection.getSelection();
					var range = document.createRange();
					console.log("length = " + $selectedTD.length);
					for(var i=0; i<$selectedTD.length; i++) {
						range.selectNodeContents($selectedTD[i]);
						tableSelection.removeAllRanges();
						tableSelection.addRange(range);
						this.newSelection.sel = tableSelection;
//						console.log("sel = " + this.newSelection.sel);
						this.newSelection.range = range;
						
//						var typeInfo = this.newSelection.getType();
						
						console.log("anchorText = " + tableSelection.anchorNode.textContent);
//						console.log("anchorOffset = " + tableSelection.anchorOffset);
						console.log("range info = " + range.toString());
						console.log("type info = " + this.newSelection.getType());
						
						this.execFunction(funcType, execFunc, tableSelection, target);
					}
					
				} else {
					this.execFunction(funcType, execFunc, selection, target);
				}
				
				
			},

			attachTextEvent : function() {
				//글자 관련  이벤트 
				$(".exec").mousedown(function(e) {
					e.preventDefault();
				}).click(function(e) {
					_this.execTextEvent("exec", document.execCommand, null, e.target);
				});

				$(".color, .select").change(function(e) {
					_this.execTextEvent("exec", document.execCommand, null, e.target);
				}).focus(function() {
					this.selectedIndex = -1;
					this.blur();
				});

				$(".font").mousedown(function(e) {
					e.preventDefault();
				}).click(function(e) {
					var target = {
						id : "fontName",
						value : e.target.id
					};
					_this.execTextEvent("exec", document.execCommand, null, target);
				});

				//문단 관련  이벤트 
				$(".textHeightSelect").change(function(e) {
					var selection = textAction.getSelection();
					_this.execTextEvent("selectFunc", textAction.lineHeight, selection, e.target);
				}).focus(function() {
					this.selectedIndex = -1;
					this.blur();
				});

				$(".textWidthSelect").change(function(e) {
					var selection = textAction.getSelection();
					_this.execTextEvent("selectFunc", textAction.letterSpacing, selection, e.target);
				}).focus(function() {
					this.selectedIndex = -1;
					this.blur();
				});
				
				$(".JustifyLeft").click(function(e) {
					var selection = textAction.getSelection();
					_this.execTextEvent("selectFunc", textAction.justifyLeft, selection, e.target);
				});
				
				$(".JustifyCenter").click(function(e) {
					var selection = textAction.getSelection();
					_this.execTextEvent("selectFunc", textAction.justifyCenter, selection, e.target);
				});
				
				$(".JustifyRight").click(function(e) {
					var selection = textAction.getSelection();
					_this.execTextEvent("selectFunc", textAction.justifyRight, selection, e.target);
				});
				//기타 기능 이벤트 
				$(".findNext").click(function() {
					_this.execTextEvent("selectFunc", searchAction.findText);
				});

				$(".changeText").click(function() {
					_this.execTextEvent("selectFunc", searchAction.changeText);
				});
				
				$(".memo").mousedown(function(e) {
					e.preventDefault();
				}).click(function() {
					var selection = textAction.getSelection().selectionObj;
					_this.execTextEvent("selectFunc", memoAction.createMemo, selection);
				});

				$(".print").click(function() {
					var mywindow = window.open('', 'content', 'height=800,width=900');
					mywindow.document.write('<html><head><title>my webwrite</title>');
					mywindow.document.write('</head><body>');
					mywindow.document.write($("#content").html());
					mywindow.document.write('</body></html>');

					mywindow.print();
					mywindow.close();
				});
			},

			attachRightClickEvent : function() { // 우클릭 이벤트 연결

				$(".content").mousedown(function(e) {
					var btn = e.button;
					if (btn == 2) {
						_this.execTextEvent("targetFunc", contextMenuAction.ShowMenu, null, e);
						e.preventDefault();
					} else {
						_this.execTextEvent("targetFunc", contextMenuAction.HideMenu);
					}
					
				});

				$(".content").focusout(function() {
					_this.execTextEvent("targetFunc", contextMenuAction.HideMenu);
				});

				$("#insertTableFromContext").click(function() {
					_this.execTextEvent("targetFunc", tableAction.createTable);
				});

				$("#insertMemoFromContext").mousedown(function(e) {
					e.preventDefault();
				}).click(function() {
					var selection = textAction.getSelection().selectionObj;
					_this.execTextEvent("selectFunc", memoAction.createMemo, selection);
				});

				$("#fontMenu").mousedown(function(e) {
					e.preventDefault();
				});
				$("#paraShape").mousedown(function(e) {
					e.preventDefault();
				});
				$("#listShape").mousedown(function(e) {
					e.preventDefault();
				});

			},
			
			attachTableEvent : function() {

				$(".createTable").mousedown(function(e) {
					e.preventDefault();
				}).click(function() {
					_this.execTextEvent("targetFunc", tableAction.createTable);
					_this.execTableEvent();
				});

				$(".deleteTable").click(function() {
					_this.execTextEvent("targetFunc", tableAction.deleteTable);
				});

				$(".addTopRow").click(function() {
					_this.execTextEvent("targetFunc", tableAction.addTopRow);
				});

				$(".addBottomRow").click(function() {
					_this.execTextEvent("targetFunc", tableAction.addBottomRow);
				});

				$(".addLeftCol").click(function() {
					_this.execTextEvent("targetFunc", tableAction.addLeftCol);
				});

				$(".addRightCol").click(function() {
					_this.execTextEvent("targetFunc", tableAction.addRightCol);
				});

				$(".deleteRow").click(function() {
					_this.execTextEvent("targetFunc", tableAction.deleteRow);
				});

				$(".deleteCol").click(function() {
					_this.execTextEvent("targetFunc", tableAction.deleteCol);
				});

				$(".tableBorderColor").change(function(e) {
					_this.execTextEvent("targetFunc", tableAction.setBorderColor, null, e.target);
				});

				$(".tableBackColor").change(function(e) {
					_this.execTextEvent("targetFunc", tableAction.setBackColor, null, e.target);
				});
			},

			execTableEvent : function() {
				$('table').mousedown(function() {
					_this.execTextEvent("targetFunc", tableAction.selectCell);
				});
				
				
			}
	};

	return Event;

});