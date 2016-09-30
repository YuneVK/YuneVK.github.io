$(function() {


	$(".skills").css("opacity", "0");

	$('.text').textillate({ in: { effect: 'fadeIn' } });

	$(window).scroll(function () {

		var y = $(this).scrollTop();

		//console.log(bottom);

		var header =  $('header').offset().top / 1.5;
		var seccion1 =  $('#seccion1').offset().top / 1.5;
		var seccion2 =  $('#seccion2').offset().top / 1.5;
		var seccion3 =  $('#seccion3').offset().top / 1.5;

		if (y >= header && y <= seccion1) {
			$("body").css("background-image", "url('img/front.jpg')");
		} else if (y >= seccion1 && y < seccion2) {
			
			$("body").css("background-image", "url('img/left.jpg')");
		} else if (y >= seccion2 && y < seccion3) {
			$("body").css("background-image", "url('img/right.jpg')");
		} else {
			$("body").css("background-image", "url('img/back.jpg')");
		}

		//console.log($('.skills').offset().top);

		/*if (y > $('.skills').offset().top && y < $(".blogs").offset().top) {
			console.log("llegamos a skills");
			$('.skills').textillate({ in: { effect: 'rollIn' } });
		} else if (y > $('.blogs').offset().top && y < $(".contacto").offset().top) {
			console.log("llegamos a blogs");
			$('.blogs').textillate({ in: { effect: 'rollIn' } });
		} else if (y > $('.contacto').offset().top && y < $(".skills").offset().top) {
			console.log("llegamos a contacto");
			$('.contacto').textillate({ in: { effect: 'rollIn' } });
		}*/


		var hT = $('.skills').offset().top,
			hH = $('.skills').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();

		if (wS > (hT+hH-wH)){
			$(".skills").css("opacity", "1");
			$('.skills').textillate({ in: { effect: 'bounceIn' } });
		}




	});

	function resize(){
// Load Variables - we do this here so they are reset when the screen changes size.
var SW = $(window).width();
var VH = SW * 0.5625; 
var SH = $(window).height();
var VW = SH * 1.777;
// Screen size check based on 16:9 ratio
if (SW > VW) {
$("#video iframe").width(SW).height(VH).css("top", -(VH - SH) /2);
} else { 
$("#video iframe").height(SH).width(VW).css("left", -(VW - SW) /2);
}
// Confirmation
console.log("Resized")
} resize();

$(window).resize(function() {
resize(); 

});


});