$(function() {
	var height = $(window).height();

	// Cada vez que se haga scroll
	$(document).scroll(function() {
		// Obtenemos el valor del scroll
		var scrollTop = $(this).scrollTop();
		var px = scrollTop / 70;

		// Si el valor del scroll es menor que el alto de la página continuaremos.
		// Se establece así para que lo siguiente solo se ejecute cuando la cabecera
		// esté visible
		if(scrollTop < height) {
			// Movemos el fondo del contenedor (la cabecera) a medida
			// que se va haciendo scroll en la página
			$("#contenedor").css({"background-position": "center -" + scrollTop / 6 + "px"});
			$("#logo").css({"top": "calc(-6vh + " + scrollTop + "px/4)"});
		}
	});
});