
var MyReservation = (function(){
	var wip = false;
	function init(){
		cancelEventBind();
		confirmEventBind();
	}

	function cancelEventBind(){
		$(".booking_cancel button").on("click",cancel.bind(this));
	}
	
	function cancel(){
		$(".popup_booking_wrapper").fadeIn();
	}

	function confirmEventBind(){
		$(".popup_booking_wrapper")
			.on("click", ".popup_btn_close",function(){
				$(".popup_booking_wrapper").fadeOut();
			})
			.on("click", ".btn_gray",function(){
				$(".popup_booking_wrapper").fadeOut();
			})
			.on("click", ".btn_green",function(){
				if(!wip){
					wip = true;
					setTimeout(function(){ //이 시점에 Promise적용해보기
						wip = false;
						$(".popup_booking_wrapper").fadeOut()
					},500)	
				}
				
			})
			
	}
	
	return {
		init: init
	}
		
})();

$(function(){
	MyReservation.init();
});



// some.on("hi",function(){
// 	console.log("fire hi event");
// });