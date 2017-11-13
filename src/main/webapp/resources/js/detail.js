var Detail = (function(){
	function init(){
		detail();
		infoChange();
	}
	
	function detail(){
		$(".section_store_details").on("click",".bk_more._open",function(e){
			e.preventDefault();
			$(".section_store_details .store_details").removeClass("close3");
			$(".section_store_details .bk_more._open").hide();
			$(".section_store_details .bk_more._close").show();
			
		});
		$(".section_store_details").on("click",".bk_more._close",function(e){
			e.preventDefault();
			$(".section_store_details .store_details").addClass("close3");
			$(".section_store_details .bk_more._open").show();
			$(".section_store_details .bk_more._close").hide();
			
		});
	}
	
	function infoChange(){
		$(".section_info_tab .info_tab_lst").on("click","li",function(e){
			e.preventDefault();
			$(e.delegateTarget).find("li.active").removeClass("active");
			$(e.currentTarget).addClass("active");
			if($(e.currentTarget).hasClass("_detail")){
				$(".detail_area_wrap").removeClass("hide");
				$(".detail_location").addClass("hide");
			}else{
				$(".detail_area_wrap").addClass("hide");
				$(".detail_location").removeClass("hide");
			}
		});
	}
	
	return {
		init: init
	}
		
})();

var PhotoViewer = (function(){
	
	function init(selector){
		$(photoviwer).css({
			"position" : "fixed",
			"left" : "0px",
			"top" : "0px",
			"background-color" : "gray",
			"opacity": 1,
			"z-index": 1300,
			"width" : $(window).width(),
			"height" : $(window).height()
		}).on("click",function(){
			$(this).hide();
		});
	}
	
	return {
		init:init
	}
})();

var LazyLoad = (function(){
	
	var padding = 300;
	function init(selector){
		var imgs = $(selector).toArray();
		var viewportHeight = $(window).height();
		var imgInfos = imgs.map(function(img){
			var offset = $(img).offset();
			return {
				img : img,
				left : offset.left,
				top : offset.top - viewportHeight - padding
			}
		});
		
		checkScroll(imgInfos);
	}
	
	function checkScroll(checkScroll){
		$(window).on("scroll",function scrollHandler(){
			var scrollY = window.scrollY;
			for(var i = 0, l = checkScroll.length; i < l; i++){
				if(checkScroll[i].top < scrollY){
					var url = $(checkScroll[i].img).data("lazy-image");
					$(checkScroll[i].img).attr('src',url);
					checkScroll.splice(i, 1);
					break;
				}
			}
			if(checkScroll.length === 0){
				$(window).off("scroll",scrollHandler);
			}
		})
	}
	
	return {
		init:init
	}
})();

$(function(){
	Detail.init();
//	PhotoViewer.init("#photoviwer");
	LazyLoad.init("img[data-lazy-image]");
});
