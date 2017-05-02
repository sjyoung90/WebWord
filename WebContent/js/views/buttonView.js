define([
        'jquery'
       ], function($) {
	
	var fontSizeOptions = {
			"1" : "9px",
			"2" : "10px",
			"3" : "13px",
			"4" : "16px",
			"5" : "18px",
			"6" : "24px",
			"7" : "32px"
	};
	
	var fontNameOptions = {
			"굴림" : "굴림",
			"바탕" : "바탕",
			"궁서" : "궁서",
			"Nanum Gothic" : "나눔고딕",
			"Nanum Gothic Coding" : "나눔고딕(코딩)",
			"Nanum Brush Script" : "나눔손글씨붓",
			"Nanum Pen Script" : "나눔손글씨펜",
			"Nanum Myeongjo" : "나눔명조",
			"Arial" : "Arial",
			"serif" : "serif",
			"Georgia" : "Georgia",
			"Lucida" : "Lucida"
	};
	
	var textHeightOptions = {
			"1" : "1",
			"1.5" : "1.5",
			"2" : "2",
			"3" : "3"
	};
	
	var textWidthOptions = {
			"-0.1em" : "-0.1",
			"0.1em" : "0.1",
			"0.3em" : "0.3",
			"0.5em" : "0.5",
			"0.8em" : "0.8",
			"1em" : "1",
			"2em" : "2"
	};
	
	var ButtonView = function() {
	};

	ButtonView.prototype = {
			
			setButton : function() {
			
				$('<div>', {id : "toolbar"}).appendTo($('#editorContainer'));
				//텍스트 관련
				this.drawButton("button", "print", "print", "인쇄", "url(./css/image/Flaticon_12022.png)");
				this.drawSeparateBar();
				
				this.drawButton("button", "undo", "exec", "취소", "url(./css/image/undo_icon&16.png)");
				this.drawButton("button", "redo", "exec", "다시", "url(./css/image/redo_icon&16.png)");
				this.drawSeparateBar();
				
				this.drawfontStyleMenu();
				this.drawSeparateBar();
				
				this.drawButton("button", "bold", "exec", "굵게", "url(./css/image/font_bold_icon&16.png)");
				this.drawButton("button", "italic", "exec", "이탤릭체", "url(./css/image/font_italic_icon&16.png)");
				this.drawButton("button", "underline", "exec", "밑줄", "url(./css/image/font_underline_icon&16.png)");
				this.drawButton("button", "strikeThrough", "exec", "취소선", "url(./css/image/font_strokethrough_icon&16.png)");
				this.drawSeparateBar();
				
				$('<text>글자 색 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("color", "foreColor", "color", "글자 색 선택", " ");
				$('<text>글자 배경색 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("color", "backColor", "color", "글자 배경색 선택", " ");
				this.drawSeparateBar();
				
				this.drawButton("button", "InsertOrderedList", "exec", "문단 번호(숫자)", "url(./css/image/list_num_icon&16.png)");
				this.drawButton("button", "insertUnorderedList", "exec", "문단 번호(모양)", "url(./css/image/list_bullets_icon&16.png)");
				this.drawSeparateBar();
				
				this.drawButton("button", "indent", "exec", "들여쓰기", "url(./css/image/indent_increase_icon&16.png)");
				this.drawButton("button", "outdent", "exec", "내어쓰기", "url(./css/image/indent_decrease_icon&16.png)");
				this.drawSeparateBar();
				
				this.drawButton("button", "JustifyLeft", "JustifyLeft", "왼쪽 정렬", "url(./css/image/align_left_icon&16.png)");
				this.drawButton("button", "JustifyCenter", "JustifyCenter", "가운데 정렬", "url(./css/image/align_center_icon&16.png)");
				this.drawButton("button", "JustifyRight", "JustifyRight", "오른쪽 정렬", "url(./css/image/align_right_icon&16.png)");
				this.drawSeparateBar();

				this.drawParaStyleMenu();
				
				$('<br><br>').appendTo($('#toolbar'));

				//테이블 관련 
				
				$('<text>행 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("text", "inputRow", "table");
				$('<text>열 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("text", "inputCol", "table");
				this.drawButton("button", "createTable", "createTable", "테이블 생성", "url(./css/image/createTable.png)");
				this.drawSeparateBar();
				
				this.drawButton("button", "addTopRow", "addTopRow", "위 행 삽입", "url(./css/image/add_top_row.png)");
				this.drawButton("button", "addBottomRow", "addBottomRow", "아래 행 삽입", "url(./css/image/add_bottom_row.png)");
				this.drawButton("button", "addLeftCol", "addLeftCol", "왼쪽 열 삽입", "url(./css/image/add_left_column.png)");
				this.drawButton("button", "addRightCol", "addRightCol", "오른쪽 열 삽입", "url(./css/image/add_right_column.png)");
				this.drawSeparateBar();
				
				this.drawButton("button", "deleteRow", "deleteRow", "행 삭제", "url(./css/image/delete_bottom_row.png)");
				this.drawButton("button", "deleteCol", "deleteCol", "열 삭제", "url(./css/image/Flaticon_1452.png)");
				this.drawButton("button", "deleteTable", "deleteTable", "테이블 삭제", "url(./css/image/remove_table.png)");
				this.drawSeparateBar();
				
				$('<text>테이블 테두리 색 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("color", "tableBorderColor", "tableBorderColor", "테이블 테두리색 선택", " ");
				$('<text>테이블 배경 색 : </text>').css("float", "left").appendTo($('#toolbar'));
				this.drawButton("color", "tableBackColor", "tableBackColor", "테이블 배경색 선택", " ");
				this.drawSeparateBar();
				
				//기타 기능
//				var fileDiv = $("<div>", {class : "fileDiv"}).appendTo($('#toolbar'));
//				$("<input>", {type : "file", class : "insertImage"}).appendTo(fileDiv);
//				this.drawSeparateBar();
				
				this.drawButton("button", "insertMemo", "memo", "메모  삽입", "url(./css/image/spechbubble_sq_line_icon&16.png)");
				this.drawSeparateBar();
				
				this.drawButton("text", "findField", "noExec", "검색 텍스트");
				this.drawButton("button", "findNext", "findNext", "검색", "url(./css/image/zoom_icon&16.png)");
				this.drawButton("text", "changeField", "noExec", "바꾸기 텍스트");
				this.drawButton("button", "changeText", "changeText", "바꾸기", "url(./css/image/pencil_icon&16.png)");
			},

			drawButton : function(btnType, btnID, btnClass, btnTitle, imgUrl) {
				
				$("<input>").attr({
					type : btnType,
					id : btnID,
					class : btnClass,
					title : btnTitle
				}).css({
					background : imgUrl + "no-repeat",
					cursor: 'pointer'
				}).appendTo($('#toolbar'));
		
			},
			

			drawSeparateBar : function() {
				$("<span>").attr({
					class : "separateBar"
				}).appendTo($('#toolbar'));
			},

			drawfontStyleMenu : function() {


				var $toolbarDiv = $('#toolbar');
			
				var $fontSizeSelect = $("<select>", {id : "fontSize", class : "select"}).appendTo($toolbarDiv);
				for(var option in fontSizeOptions) {
					$("<option>", {value : option}).text(fontSizeOptions[option]).appendTo($fontSizeSelect);
				}
				
				var $fontNameSelect = $("<select>", {id : "fontName", class : "select"}).appendTo($toolbarDiv);
				for(var option in fontNameOptions) {
					$("<option>", {value : option}).text(fontNameOptions[option]).appendTo($fontNameSelect);
				}
			},
			
			drawParaStyleMenu : function() {

				var $toolbarDiv = $('#toolbar');
				
				$("<img>").attr({'src':'./css/image/Flaticon_23623.png', 'title' : '글자 간격'}).css("float", "left").appendTo($toolbarDiv);
				var $textHeightSelect = $("<select>", {id : "textHeightSelect", class : "textHeightSelect"}).appendTo($toolbarDiv);
				for(var option in textHeightOptions) {
					$("<option>", {value : option}).text(textHeightOptions[option]).appendTo($textHeightSelect);
				}
			
				$("<img>").attr({'src':'./css/image/Flaticon_23979.png','title' : '글자 넓이'}).css("float", "left").appendTo($toolbarDiv);
				var $textWidthSelect = $("<select>", {id : "textWidthSelect", class : "textWidthSelect"}).appendTo($toolbarDiv);
				for(var option in textWidthOptions) {
					$("<option>", {value : option}).text(textWidthOptions[option]).appendTo($textWidthSelect);
				}
			}

	};

	return ButtonView;
});