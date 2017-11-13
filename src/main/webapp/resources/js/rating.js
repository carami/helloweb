var Rating = extend(eg.Component,{
	init : function(ele, options){
		this.ele = ele;
		this.options = options;
		this.eles = $(this.options.target);
		this.score = 0;
		this.eventBind();
	},
	eventBind : function(){
		$(this.ele)
			.on("click", this.options.target, this.click.bind(this));
	},
	click : function(e){
		e.preventDefault();
		var val = $(e.target).val();
		this.score = val;
		
		this.eles.each(function(i,v){
			if(i <= val){
				$(v).addClass("checked");
			} else {
				$(v).removeClass("checked");
			}
		});
		
		this.setScore(this.score);
	},
	setScore: function(val){
		$(this.options.score).removeClass("gray_star").text(val);
		this.trigger("change",{
			score: val
		});
	},
	getScore: function(){
		return this.score;
	}
});
