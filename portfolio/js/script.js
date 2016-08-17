$(function() {
	var height = $(window).height();

	var device = navigator.userAgent;

/*
	var widthOrnament = $('#contenidoHeader h1').width();
	$("#ornament").css({"width": widthOrnament*0.75 + "px"});

	console.log("Ancho: " + widthOrnament);
*/

	if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
		console.log("Movil");
		$("#estrellas").css({"opacity": "1"});

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




});