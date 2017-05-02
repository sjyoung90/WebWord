define([
        'jquery'
       ], function($) {

	var contextMenuList = {
		"fontMenu" : "폰트",
		"paraShape" : "문단 모양",
		"listShape" : "문단 번호 모양",
		"insertTableFromContext" : "표 삽입",
		"insertMemoFromContext" : "메모 삽입"
	};

	var fontNameList = {
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

	var paragraphList = {
		"JustifyLeft" : "왼쪽 정렬",
		"JustifyCenter" : "가운데 정렬",
		"JustifyRight" : "오른쪽 정렬",
		"indent" : "들여쓰기",
		"outdent" : "내어쓰기"
	};

	var orderList = {
		"insertUnorderedList" : "·",
		"insertOrderedList" : "1."
	};

	var ContextMenuView = function() {
	};

	ContextMenuView.prototype = {

		drawContextMenu : function() {

			var $contextMenu = $('<div>', {id : "contextMenu"}).css('display', 'none').appendTo($('#editorContainer'));

			// 우클릭 메뉴 생성
			$('<ul>', {id : "contextMenuUl"}).appendTo($contextMenu);
			for ( var list in contextMenuList) {
				$('<li>', { id : list, class : list }).text(contextMenuList[list]).appendTo($("#contextMenuUl"));
			}

			// 글자 모양 - 폰트
			$('<ul>', {id : "fontUl"}).appendTo($('#fontMenu'));
			for ( var list in fontNameList) {
				$('<li>').attr({
					id : list,
					class : "font"
				}).text(fontNameList[list]).appendTo($('#fontUl'));
			}

			// 문단 모양 - 정렬, 들여쓰기, 내어쓰기
			$('<ul>', {id : "paragraphUl"}).appendTo($('#paraShape'));
			for ( var list in paragraphList) {
				$('<li>').attr({
					id : list,
					class : "exec"
				}).text(paragraphList[list]).appendTo($('#paragraphUl'));
			}

			// 문단 번호 모양
			$('<ul>', {id : "listShapeUl"}).appendTo($('#listShape'));
			for ( var list in orderList) {
				$('<li>').attr({
					id : list,
					class : "exec"
				}).text(orderList[list]).appendTo($('#listShapeUl'));
			}

		}
	};

	return ContextMenuView;
});