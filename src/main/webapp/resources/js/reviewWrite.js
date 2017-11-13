        
var Review = (function(){
	function init(){
		eventBind();
	}
	
	var filelist;
	
	function eventBind(){
		$(".review_write_info").on("click", placeHolder);
		$(".review_textarea").on("focusout", focusOut);
		$(".hidden_input").on("change", handleFiles);
		$(".bk_btn").on("click",submit);
	}
	
	function focusOut(e){
		if($(".review_textarea").val().length === 0){
			$(".review_write_info").show();
		}
	}
	
	function placeHolder(e){
		$(this).hide();
		$(".review_textarea").focus();
	}
	
	function handleFiles(e){
		filelist = this.files;
		var result = validate(this.files);
		if(result){
			// 다수개을 올릴 때 어떻게 하는지?
			var reader = new FileReader();
			reader.onload = function(event) {
				$(".lst_thumb li img").attr("src",this.result);
			};
			reader.readAsDataURL(this.files[0]);			
		}else{
			alert(result.msg);
		}
	}
	
	function validate(files){
		// size, 확장자 등등 확인
		return true;
		
	}
	
	function submit(e){
		e.preventDefault();
		
		var formData = new FormData();
	    formData.append("score",1);
	    formData.append("productId",9);
	    formData.append("comment","teststst");
	    formData.append("file1",filelist[0]);
	    formData.append("file2",filelist[1]);
	    
	    
	    $.ajax("/api/my/reservationUserComments", {      
	        type : "POST",
	        dataType : "json",
	        data : formData ,
	        processData: false,
	        contentType: false
	    }).then(function(e){
	    	console.log(e);
	    });
	}
	
	return {
		init:init
	}
})();



var rating;
$(function(){
	var ele = $(".rating")[0];
	var score = $(".star_rank")[0];

	rating = new Rating(ele, {
		target : "input[type=checkbox]",
		score : ".star_rank"
	});

	rating.on("change",function(e){
		console.log(e.score);
	});
	
	Review.init();
	
});
