
var Main = {
	init : function(){
		this.currentIndex = 1;
		this.currentCategory = 1;
	}
}

var Template = {
		"product": function (alt, img, title, addr, desc){
			return  '<li class="item">'+
			'<a href="#" class="item_book">'+
			    '<div class="item_preview"><img alt="'+alt+'" class="img_thumb" src="'+img+'"><span class="img_border"></span></div>'+
			    '<div class="event_txt">'+
			        '<h4 class="event_txt_tit"> <span>'+title+'</span> <small class="sm">'+addr+'</small> </h4>'+
			        '<p class="event_txt_dsc">'+desc+'</p>'+
			   ' </div>'+
			'</a>'+
			'</li>';
		}
}

var Rolling = (function(){
	var Main;
	var count = 0;
	var direction = 1;
	var start = 0;
	var totalPromotionCard;
	var promotionCardWidth;
	
	var reId;
	var id = autoAnimate();
	
	function autoAnimate(){
		return setInterval(function(){
			animate();
		},2000);
	}
	
	function animate(){
		if(count === totalPromotionCard-1){
			direction = -1;
		}else if(count === 0){
			direction = 1;
		}
		
		count += direction;
		
		$(".container_visual .visual_img").animate({
			left: promotionCardWidth*count*-1
		});
		
	}
	
	function rerunAutoAnimate(){
		if(reId){
			clearTimeout(reId);
			reId = undefined;
		}
		return setTimeout(function(){
			id = autoAnimate();
		},4000);
	}
	
	function init(main){
		Main = main;
		totalPromotionCard = $(".container_visual .visual_img li").length;
		promotionCardWidth = $(".container_visual .visual_img li").width();
		
		$(".container_visual .prev_inn").on("click",function(e){
			reId = rerunAutoAnimate();
			clearInterval(id);
			direction = -1;
			animate();
			e.preventDefault();
		});
		
		$(".container_visual .nxt_inn").on("click",function(e){
			reId = rerunAutoAnimate();
			clearInterval(id);
			direction = 1;
			animate();
			e.preventDefault();
		});	
	}
	
	return {
		init: init
	}
		
})();


var Navigation = (function(){
	var Main, Template;
	var currentSelectedCateroty;
	function selectedItem(e){
		$(currentSelectedCateroty).find("a").removeClass("active");
		currentSelectedCateroty = e.currentTarget;
		$(e.currentTarget).find("a").addClass("active");
		
		var category = $(e.currentTarget).data("category");
		Main.currentCategory = category;
		
		$.ajax("/resources/mock/product.json",{
			data: {
				"page" : 1,
				"category" : Main.currentCategory
			}
		}).then(function(products){
			var leftHtml = [];
			var rightHtml = [];
			products.forEach(function(product, i){
				((i%2)?leftHtml:rightHtml).push(Template.product(
						product.img.alt,
						product.img.src, 
						product.title,
						product.addr,
						product.desc
				));
			});
			$(".lst_event_box").eq(0).html(leftHtml.join(""))
			$(".lst_event_box").eq(1).html(rightHtml.join(""))
			
		});
	}
	
	function init(main, template){
		Main = main;
		Template = template;
		currentSelectedCateroty = $(".section_event_tab ul li.item").get(0);
		$(".section_event_tab ul").on("click","li.item",selectedItem);
	}
	
	return {
		init: init
	}
})();

var MoreButton = (function(){
	var Main,Template;
	function more(e){
		Main.currentIndex++;
		e.preventDefault();
		
		$.ajax("/resources/mock/product.json",{
			data: {
				"page" : Main.currentIndex,
				"category" : Main.currentCategory
			}
		}).then(function(products){
			var left = $(".lst_event_box").eq(0);
			var right = $(".lst_event_box").eq(1);
			products.forEach(function(product, i){
				((i%2)?left:right).append(Template.product(
						product.img.alt,
						product.img.src, 
						product.title,
						product.addr,
						product.desc
				));
			});
		});
	}
	
	function init(main,template){
		Main = main;
		Template = template;
		$(".more .btn").on("click", more);
	}
	
	return {
		init : init
	}
})();


$(function(){
	Main.init();
	Rolling.init(Main);
	Navigation.init(Main,Template);
	MoreButton.init(Main,Template);
});




