window.onload = function() {
	// Secciones de la página
	var inicio = "<h1>¿Qué necesitas?</h1>";

	var drivers = "<h1>Drivers</h1>";

	var sevicio = "<h1>Servicio técnico</h1>";

	var consumibles = "<h1>Consumibles</h1>";

	var videos = "<h1>Vídeos</h1>";

	var seleccionados = ["", "", ""];


	// Iniciamos los checkbox
	$('#problema1').switchable({label_position: 'after'});

	$('#problema2').switchable({label_position: 'after'});

	$('#problema3').switchable({label_position: 'after'});

	$('.switchable-holder').on('click', function(event) {
		switch ($(event.target).parent().next().text()) {
			case "Mala calidad en copias":
				if (seleccionados[0] == "") {
					seleccionados[0] = "Mala calidad en copias";
				} else {
					seleccionados[0] = "";
				}
				break;
			case "Atascos en papel":
				if (seleccionados[1] == "") {
					seleccionados[1] = "Atascos en papel";
				} else {
					seleccionados[1] = "";
				}
				break;
			case "Códigos de error":
				if (seleccionados[2] == "") {
					seleccionados[2] = "Códigos de error";
				} else {
					seleccionados[2] = "";
				}
				break;
		}
	});



	/**$("nav div").on('click', function(event) {
		//event.preventDefault();
		//console.log("Pulsado " + $(this).attr("id"));
		
		$("#contenidoSas *").fadeOut('slow');
		
		switch ($(this).attr("id")) {
			case "drivers":
				setTimeout(function() { 
					$("#contenidoSas").html(drivers);
					$("#contenidoSas *").fadeIn('slow');
				}, 500);
				
				break;
			case "servicio":
				setTimeout(function() { 
					$("#contenidoSas").html(sevicio);
					$("#contenidoSas *").fadeIn('slow');
				}, 500);
				break;
			case "consumibles":
				setTimeout(function() { 
					$("#contenidoSas").html(consumibles);
					$("#contenidoSas *").fadeIn('slow');
				}, 500);
				break;
			case "videos":
				setTimeout(function() { 
					$("#contenidoSas").html(videos);
					$("#contenidoSas *").fadeIn('slow');
				}, 500);
				break;
		}

	});*/

	$('#enviar').on('click', function(e) {
		e.preventDefault();
		working = true;

    	var $this = $('button'),
      		$state = $('.state'),
      		$snipper = $('.spinner');
		$this.addClass('loading botonEnviado');
		$state.html('Espere');
		$snipper.addClass('okSpinner');
		$('.form-group').css('opacity', '0');

		var valido = true;

		// Validamos el mensaje
		var mensaje = $('#mensaje').val();

		if (mensaje == "") {
			$("#errorMensaje").text("Debes introducir un mensaje");
			$("#errorMensaje").show();
			valido = false;
		}

		if (valido) {
			setTimeout(function() {
				console.log(mensaje);
				console.log(seleccionados);

				$snipper.removeClass('okSpinner');
	        	$this.addClass('okButton');
	        	$state.html('Se ha enviado su mensaje. En breves nos pondremos en contacto con usted');
	        	$("#errorMensaje").hide();
	        	$('#mensaje').val("");
	        	setTimeout(function() {
		          $state.html('Entrar');
		          $this.removeClass('okButton loading botonEnviado');
		          working = false;

		          $('.form-group').css('opacity', '1');
	        	}, 2000);
	      	}, 3000);
		} else {
        	setTimeout(function() {
        		$snipper.removeClass('okSpinner');
				$state.html('Entrar');
				$this.removeClass('okButton loading botonEnviado');
				working = false;

				$('.form-group').css('opacity', '1');
        	}, 2000);
		}
	});
}