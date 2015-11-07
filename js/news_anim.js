var News = {
	
    speed : 50 / 1000, // 100px / 1000ms
	$ele : null,
	separator : " &nbsp;&nbsp;++&nbsp;&nbsp; ",

	init : function(parts){
		this.$ele = $("#news_content");
		this.$ele.html( this.separator + parts.join(this.separator) + this.separator);
	},

	animate : function(){
	
		var distance = window.innerWidth 

		this.$ele.parent().show();
		var w = this.$ele.width();

		var dur = (distance + w) / News.speed;
		this.$ele.css('left', -w + "px");
		this.$ele.animate({
			left: distance + "px"

		},{duration: dur, easing: "linear", complete: function() {
			News.animate();
	  	}});
	}

}
