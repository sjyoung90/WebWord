define([
        
   'jquery',

], function($) {
	
var TableAction = function() {
	if(!(this instanceof TableAction)) {
		return new TableAction();
	}
	count = 0;
};	
	
TableAction.prototype = {
			
		createTable : function() {
			
			var row;
			var col;
			count++;
			
			if($("#inputRow").val() == '' || $("#inputCol").val() == '') {
				row = prompt('행 : ',''); 
				col = prompt('열 : ','');
			}else {
				row = $("#inputRow").val();
				col = $("#inputCol").val();
			}

			$("#inputRow").val(" ");
			$("#inputCol").val(" ");

			var $tableDiv = $("<div>").css( "resize", "both" );
			
			var $newTable = $("<table>").attr({
				id : "newTable" + count,
				class : "newTable"
			});
		
			var $newTbody = $("<tbody>");
			
			for (var i = 0; i < row; i++) {
				var $newTR = $("<tr>").addClass("tableTR");
				for (var j = 0; j < col; j++) {
				
					var $newTD = $("<td>").addClass("tableTD");

					$("<div>").attr({
						class : "cellDiv"
					}).appendTo($newTD);
					
					$newTD.appendTo($newTR);
				}
				$newTR.appendTo($newTbody);
			}

			$newTbody.appendTo($newTable);
			$newTable.appendTo($tableDiv);
			$tableDiv.appendTo($("#content"));

//			this.execTableEvent();
			
		},
		
		
		deleteTable : function() {
			if($("td.highlight")) {
				var $deleteTarget = $("td.highlight");
				$deleteTarget.parent().parent().parent().parent().remove();
			} else if ($("td.selected")) {
				var $deleteTarget = $("td.selected");
				console.dir($deleteTarget);
				$deleteTarget.parent().parent().parent().parent().remove();

			}	

			
		},
		
		// 위 행 삽입
		addTopRow : function() {
		
			var $newRow = $("<tr>").addClass("tableTR");
			$newRow.insertBefore($('td.selected').parent());
		
			for (var i = 0; i < $('td.selected').parent().find('td').length; i++) {
				var $newCell = $("<td>").addClass("tableTD");
		
				$("<div>").attr({
					class : "cellDiv",
					contenteditable : true
				}).appendTo($newCell);
		
				$newCell.appendTo($newRow);
			}
		},
		
		// 아래 행 삽입
		addBottomRow : function() {
			
			var $newRow = $("<tr>").addClass("tableTR");
			$newRow.insertAfter($('td.selected').parent());
		
			for (var i = 0; i < $('td.selected').parent().find('td').length; i++) {
				var $newCell = $("<td>").addClass("tableTD");
		
				$("<div>").attr({
					class : "cellDiv",
					contenteditable : true
				}).appendTo($newCell);
		
				$newCell.appendTo($newRow);
			}
		},
		
		// 왼쪽 열 삽입
		addLeftCol : function() {
			
			var $table = $('td.selected').parent().parent();
			var $colIndex = $('td.selected').index();
		
			for (var i = 0; i < $table.find("tr").length; i++) {
				var $newCell = $("<td>").addClass("tableTD");
				$newCell.insertBefore($("tr:eq(" + i + ") td:eq(" + $colIndex + ")"));
				
				$("<div>").attr({
					class : "cellDiv",
					contenteditable : true
				}).appendTo($newCell);
			}
		},
		
		// 오른쪽 열 삽입
		addRightCol : function() {
			
			var $table = $('td.selected').parent().parent();
			var $colIndex = $('td.selected').index();
			
			for (var i = 0; i < $table.find("tr").length; i++) {
				var $newCell = $("<td>").addClass("tableTD");
				$newCell.insertAfter($("tr:eq(" + i + ") td:eq(" + $colIndex + ")"));
				
				$("<div>").attr({
					class : "cellDiv",
					contenteditable : true
				}).appendTo($newCell);
			}
		},
		
		// 현재 행 삭제
		deleteRow : function() {
			$("td.selected").parent().find('td').parent().remove();
		},
		
		// 현재 열 삭제
		deleteCol : function() {
			var $table = $('td.selected').parent().parent().parent();
			var $colNum = $("td.selected").index();
			$table.find("tr").find("td:eq(" + $colNum +")").remove();
		},
		
		// 셀 테두리 색상 변경
		setBorderColor : function(target) {
			$("td.highlight").css("border-top", "2px solid" + target.value);
			$("td.highlight").css("border-right", "2px solid" + target.value);
			$("td.highlight").css("border-left", "2px solid" + target.value);
			$("td.highlight").css("border-bottom", "2px solid" + target.value);
		},
		
		// 셀 배경색상 변경
		setBackColor : function(target) {
			$("td.highlight").css("background-color", target.value);
		},
		
		// 드래그로 셀 영역 선택
		selectCell : function() {
			
			var active = false;
			var startCol = 0;
			var startRow = 0;
			var endCol = 0;
			var endRow = 0;
			var thisRow = 0;
			var thisCol = 0;
			var start_cell;
			  
			$(".content:not(.newTable)").mousedown(function() {
				$(".highlight").removeClass("highlight"); // 테이블 외부 선택시 highlight 해제
			});

			$(document).delegate("td", "mousedown", function() {
				active = true;
				$(".highlight").removeClass("highlight"); // 이전 highlight 해제
				$(".selected").removeClass("selected"); // 이전 selection 해제
				$(this).addClass("selected");
				$(this).attr("contenteditable", "true");
//				$(this).unbind("mouseover");
			})
			.delegate("td", "mouseenter", function(){
				if(active) {
						var table = $('td.selected').parent().parent().parent();
						
						start_cell = table.find('td.selected')[0];
						
						startCol = $(start_cell).index();
						startRow = $(start_cell).parents('tr').index();
						
						endCol = $(this).index();
						endRow = $(this).parents('tr').index();
						
						if (startCol > endCol){
							var temp = endCol;
							endCol = startCol;
							startCol = temp;
						}
						
						if (startRow > endRow){
							var temp = endRow;
							endRow = startRow;
							startRow = temp;
						}

						console.log("start = (" + startRow + "," + startCol + ")");
						console.log("end = (" + endRow + "," + endCol + ")");

						for(var j = startRow ; j <= endRow; j++) {
					    	for(var i = startCol ; i <= endCol; i++) {    		
					    		table.find('tr:eq('+j+')').find('td:eq('+i+')').addClass("highlight");
					    	}
						}
						
						thisRow = $('.highlight:last').parents('tr').index();
						thisCol = $('.highlight:last').index();
						
						console.log("this = (" + thisRow + "," + thisCol + ")");
						
						if((endRow < thisRow) || (endCol < thisCol)) {
							for(var j = endRow ; j <= thisRow; j++) {
						    	for(var i = endCol ; i <= thisCol; i++) {
						    		table.find('tr:eq('+j+')').find('td:eq('+i+')').removeClass("highlight");
						    	}
							}
						}
						
						return false;
					}
				})
				
				.delegate("td", "mouseup", function() {
			        active = false;
				});
			
			
		},
		
		resizeTable : function() {
			
		}
		
};
	return TableAction;
});
