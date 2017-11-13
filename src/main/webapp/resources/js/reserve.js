
var Stepper = extend(eg.Component,{
	init : function(ele, options){
		this.ele = ele;
		this.count = 0;
		this.options = options;

		this.eventBind();
	},
	eventBind : function(){
		$(this.ele)
			.on("click", this.options.plus, this.plusHandler.bind(this))
			.on("click", this.options.minus, this.minusHandler.bind(this));
	},
	setVal : function(){
		$(this.ele).find(this.options.val).val(this.count);
	},
	plusHandler : function(e){
		e.preventDefault();
		if(this.count === 0){
			$(this.ele).find(this.options.val).removeClass("disabled");
			$(this.ele).find(this.options.minus).removeClass("disabled");
		}
		this.count++;
		this.setVal();	
		this.trigger("change",{
			count: this.count
		});		
	},
	minusHandler : function(e){
		e.preventDefault();
		if(this.count > 0){
			this.count--;
			this.setVal();
			this.trigger("change",{
				count: this.count
			});
		}

		if(this.count === 0){
			$(this.ele).find(this.options.val).addClass("disabled");
			$(this.ele).find(this.options.minus).addClass("disabled");
		}
	}
});



$(function(){
	var stepperList = $(".qty");
	stepperList.each(function(i, ele){
		var stepper = new Stepper($(ele).find(".count_control")[0],{
			"val": ".count_control_input",
			"plus" : ".ico_plus3",
			"minus" : ".ico_minus3"
		});

		var price = parseInt($(ele).find(".price").text().replace(",",""));
		var pay = $(ele).find(".total_price");
		stepper.on("change", function(e){
			pay.text(e.count * price);

			if(e.count === 0){
				$(ele).find(".individual_price").removeClass("on_color")	
			}else{
				$(ele).find(".individual_price").addClass("on_color")
			}
		});
	});
});



// some.on("hi",function(){
// 	console.log("fire hi event");
// });