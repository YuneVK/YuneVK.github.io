$(function() {
	var height = $(window).height(); // Alto de la página
	var device = navigator.userAgent; // Navegador que se está usando
	// Variable que utilizaremos para saber el margen que deberá tener el menú cuando
	// se muestre u oculte, en función del ancho de la página
	var leftMenu;

	$('#loading').addClass('animated fadeOut');
	$('#loading').css({'z-index': '-300'});

	$('#contenidoHeader').css({'opacity': '0'});
	$('#contenidoHeader').addClass('animated fadeIn');

	var activo = false; // Si ya se ha realizado la animación de las barras de skills
	// Establecemos un waypoint para animar las barras de skills cuando sean visibles
	var aboutWP = new Waypoint({
		element: $('#skillsContenido'),
		handler: function(direction) {
			if (!activo) { // Si no se ha animado
				// Por cada barra de skill se mostrará la animación
				$('.skillbar').each(function(){
					$(this).find('.skillBarra').animate({
						width:$(this).attr('data-percent')
					},3000);
				});

				// También se mostrará una animación en el contador, que irá aumentando su valor
				$('.contador').each(function () {
					var $this = $(this);
					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 3000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				activo = true;
			}
		},
		offset: '100%'
	});


	// Comprobamos si se accede a la página mediante un dispositivo táctil
	if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)) {
		console.log("Movil");
		// Si es un móvil mostraremos el fondo estático de estrellas
		// y la información de los elementos del portfolio no tendrán
		// el efecto hover, si no que se verán directamente
		$("#estrellas").css({"opacity": "1"});
		$(".infoItem").css({"opacity": "1"});
	} else { // Si no es un móvil
		// Iniciamos el fondo de particles.js
		particlesJS.load('particles-js', 'assets/particles.json', function() {
			console.log('callback - particles.js config loaded');
		});

		// Los dos fondos de montañas (los de la parte posterior) serán fijos
		// para cambiar la velocidad con la que se mueven al hacer scroll (esto
		// no se hará en la versión móvil por rendimiento)
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
				// Movemos los fondos a una velocidad inferior a la del scroll para consegui el efecto parallax
				$("#fondo1").css({"background-position": "center bottom +" + (scrollTop/1.3) + "px"});
				$("#fondo2").css({"background-position": "center bottom +" + (scrollTop/1.1) + "px"});
			}
		});		
	}

	

	/* 
	 * Smooth scrolling (transiciones al navegar entre las secciones de la página por el menú)
	 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
	 */
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				ocultarMenu();
				return false;
			}
		}
	});

	// Cuando se pulse sobre el botón del menú para abrirlo o cerrarlo
	$('#botonMenu').click(function() {
		ocultarMenu();
	});

	/**
	 * Función ocultarMenu
	 * Oculta o muestra el menú de navegación
	 */
	function ocultarMenu() {
		// Para mostrar el menú tendremos que cambiar el margen de este.
		// Como tenemos dos tipos de menú en función del ancho de la ventana, 
		// obtenemos este valor para establecer el margen que tendrá
		if ($(window).width() <= 768) {
			leftMenu = "-100vw";
		} else {
			leftMenu = "-15em";
		}

		// Creamos o eliminamos la clase 'open' del botón para que cambie de aspecto
		$('#botonMenu').toggleClass('open');

		// Si el margen de la barra es 0, se estará mostrando, por lo que cambiamos
		// su margen al calculado para ocultarla
		if ($("nav").css("left") == '0px') {
			$("nav").css({"left": leftMenu});
		} else { // Si la barra está oculta
			// Cambiamos su margen a 0 para mostrarla
			$("nav").css({"left": "0"});
		}
	}

	
});