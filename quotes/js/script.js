$().ready(function() {
	/**
	 * Función animation
	 * Recibe por parámetros el identificador del elemento o elementos que se animarán, junto con el nombre
	 * de dicha animación, y realiza la animación añadiendo la clases necesarias y eliminándolas una vez
	 * terminada.
	 * 
	 * @param  String elements      String que identifica al elemento o elementos que se van a animar
	 * @param  String animationName Nombre de la animación que se establecerá
	 */
	function animation(elements, animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(elements).addClass('animated ' + animationName).one(animationEnd, function() {
			$(elements).removeClass('animated ' + animationName);
		});
	}

	/**
	 * Función randomQuote
	 * Obtiene una frase aleatoria utilizando la API 'Quotes on Design' y 
	 * la muestra
	 */
	function randomQuote() {
		// El el botón mostraremos el icono de carga
		$('#new').html('<i class="fa fa-spinner fa-spin fa-fw"></i> New quote');
		// Obtenemos la llamada mediante ajax
		$.ajax( {
			url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
			success: function (data) {
				var post = data.shift(); // The data is an array of posts. Grab the first one.
				// Si la cita es demasiado larga no la mostraremos, y buscaremos otra, llamando otra vez
				// a esta función
				if (post.content.length > 200) {
					randomQuote();
				} else {
					// Eliminamos el icono de carga del botón
					$('#new').html('<i class="fa fa-random" aria-hidden="true"></i> New quote');
					animation("#quoteContainer", "fadeIn");
					// Como la frase viene con etiquetas de párrafo, los eliminamos
					$('#quote').html(post.content.substring(3, post.content.length - 5));
					// Mostraremos el nombre del autor en mayúsculas
					$('#author').html("— " + (post.title).toUpperCase());
				}
			},
			cache: false
		} );
	};

	randomQuote(); // Cuando cargue la página mostraremos una frase

	// Cuando se haga click sobre el botón para generar una nueva frase
	$("#new").on("click", function(e) {
		e.preventDefault(); // Cancelamos el evento
		
		randomQuote(); // Generamos la frase y la mostramos
	});

	// Cuando se haga click sobre el botón para Twittear la frase
	$("#tweet").on("click", function(e) {
		e.preventDefault(); // Cancelamos el evento
		// Obtenemos el frase eliminando los espacios del final
		var quote = $('#quote').html().substring(0, $('#quote').html().length - 2);
		// Obtenemos el autor, eliminando los dos primeros caracteres (el guión y el espacio)
		var	author = $('#author').html().substring(2);

		// Como en la página mostramos el nombre del autor en mayúsculas, para twittearlo no lo
		// mostraremos así, si no con la primera letra en mayúsculas y el resto en minúsculas.
		// Para ello pasaremos el String a Array y, a través de la función map(), realizamos la 
		// conversión
		author = author.split(' ').map(function(val) {
			return val[0] + val.substring(1).toLowerCase();
		});

		// Unimos el Array en un String
		author = author.join(' ');

		// Preparamos el texto que se enviará por Twitter
		var tweet = "'" + quote + "', " + author;

		// Abriremos una nueva pestaña para que el usuario pueda enviarlo
		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet), '_blank');
	});
});

