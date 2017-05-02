define([  
        'jquery'
       ], function($) {
	
	var MemoAction = function () {
	};
	
	MemoAction.prototype = {
			
			createMemo : function(selection) {

//				var selection= window.getSelection();

				var $maindiv = $('#editorContainer');

			    if(selection == "") {
			    	alert('텍스트를 선택해주세요.');
			    }else {
			    
			    	if($('#commentDiv').val() != '') {
			    		$('<div>',{id : "commentDiv", class : "commentDiv"}).appendTo($maindiv);
			    	}
			    	var $comment = $('<div>',{id : "comment", class : "commentbox"}).appendTo($('#commentDiv'));
			    	
			    	//삭제 버튼
			    	$('<input>', {type : "button", class : "deleteBtn"}).css({
			    		background : 'url(./css/image/trash_icon&16.png) no-repeat',
			    		width: '20px',
			    		height: '20px',
			    		//marginLeft: '40px'
			    	}).appendTo($comment).click(function(e) {
						var targetComment = e.target.parentNode;
						targetComment.parentNode.removeChild(targetComment);
					});
			    	
			    	//저장 버튼
//			    	$('<input>', {type : "button", id : "addMemo"}).css({
//			    		background : 'url(./css/image/push_pin_icon&16.png) no-repeat',
//			    		width: '24px',
//			    		height: '24px'
//			    	}).appendTo($comment);
			    	
			    	
			    	var $div1 = $('<div>', {onselectstart : 'return false'}).css('overflow','hidden').appendTo($comment);
			    	$div1.html('"'+selection+'"'+"에 대한 메모");
			    	var $div2 = $('<div>', {onselectstart : 'return false'}).css('border-bottom','2px solid #888888').appendTo($comment);
			    	var today = new Date();
			    	$div2.html(today.getFullYear() + ". " + (today.getMonth()+1) + ". " + today.getDate() + " "
			    					+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
			    	
			    	
			    	//메모 텍스트
			    	$('<div>', { id : "textField", contenteditable : "true"}).appendTo($comment);

			    	
			    }
			   
		
			},
	
	};
	
	return MemoAction;
});