$(function() {
	var height = $(window).height();

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

	/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
});