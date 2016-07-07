$(function() {
	var height;

	function cambiarMargin() {
		// Obtenemos el alto de la pantalla en píxeles
		height = $(window).height();

		// El contenido de la página tendrá como margin-top el alto
		// de la misma, para que la imagen de fondo ocupe toda la pantalla
		$("#contenido").css({"margin-top": height + "px"});		
	}

	cambiarMargin();

	// Cada vez que se haga scroll
	$(document).scroll(function() {
		// Obtenemos el valor del scroll
		var scrollTop = $(this).scrollTop();
		// Ese valor lo dividimos entre 70 para el efecto de blur
		var px = scrollTop / 70;

		// Si el valor del scroll es menor que el alto de la página continuaremos.
		// Se establece así para que lo siguiente solo se ejecute cuando la cabecera
		// esté visible
		if(scrollTop < height) {
			// Aplicamos blur y movemos el fondo del contenedor (la cabecera) a medida
			// que se va haciendo scroll en la página
			$("#contenedor").css({
				"-webkit-filter": "blur(" + px + "px)",
				"background-position": "center -" + px  * 10 + "px"
			});
			// El mensaje de 'Scroll down' también se moverá al mismo ritmo
			//$("#mensaje").css({"top": "calc(85% - " + scrollTop + "px)"});
			$("#logo").css({"top": "calc(-6vh + " + scrollTop + "px/3)"});
		}
	});

	$(window).resize(cambiarMargin);

	// Si cambia la orientación de la página la recargaremos para que 
	// se vea correctamente y no se produzcan errores
	//$(window).on('orientationchange', function(e) {
	//	window.location.reload(); 
	//});
});