$(function() {
	var height = $(window).height();
	var device = navigator.userAgent;

	if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
		console.log("Movil");
		$("#estrellas").css({"opacity": "1"});
		$(".infoItem").css({"opacity": "1"});
	} else {
		/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
		particlesJS.load('particles-js', 'assets/particles.json', function() {
			console.log('callback - particles.js config loaded');
		});

		$("#fondo1").css({"background-attachment": "fixed"});
		$("#fondo2").css({"background-attachment": "fixed"});

		// Cada vez que se haga scroll
		$(document).scroll(function() {
			// Obtenemos el valor del scroll
			var scrollTop = $(this).scrollTop();

			// Si el valor del scroll es menor que el alto de la página continuaremos.
			// Se establece así para que lo siguiente solo se ejecute cuando la cabecera
			// esté visible
			if(scrollTop < height) {
				// Movemos el fondo del contenedor (la cabecera) a medida
				// que se va haciendo scroll en la página
				$("#fondo1").css({"background-position": "center bottom +" + (scrollTop/1.3) + "px"});
				$("#fondo2").css({"background-position": "center bottom +" + (scrollTop/1.1) + "px"});
			}
		});		
	}

	$('.skillbar').each(function(){
		$(this).find('.skillBarra').animate({
			width:$(this).attr('data-percent')
		},4000);
	});

	$('.contador').each(function () {
		var $this = $(this);
		$({ Counter: 0 }).animate({ Counter: $this.text() }, {
			duration: 4000,
			easing: 'swing',
			step: function () {
				$this.text(Math.ceil(this.Counter));
			}
		});
	});

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$('.botonAbrir').click(function() {
		$("nav").css({"width": "250px"});
		$('.botonAbrir').addClass('botonCerrar');
		$('.botonAbrir').removeClass('botonAbrir');
		console.log("abierto");
	});

	$('.botonCerrar').click(function() {
		console.log('cerrado');
		$("nav").css({"width": "0"});
		$('.botonCerrar').addClass('botonAbrir');
		$('.botonCerrar').removeClass('botonCerrar');
	});

	//
	// http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_full
	//http://www.w3schools.com/howto/howto_js_topnav.asp
	//http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_push_opacity
	//http://www.w3schools.com/howto/howto_js_sidenav.asp
});