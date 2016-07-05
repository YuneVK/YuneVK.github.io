/**
 * 		DWEC Tarea 7 - Sonia Ruiz Cayuela
 * 	Para el diseño me he basado en el siguiente ejemplo de freeCodeCamp:
 * 	https://www.freecodecamp.com/challenges/build-a-simon-game
 * 	
 * 	Pero tanto el CSS como el JS los he realizado desde 0 (como se puede ver,
 * 	el código no se parece).
 *
 *  Se han realizado las siguientes partes extra:
 *  	- Utilización del teclado además del ratón
 *  	- Uso de eventos táctiles (en la otra carpeta)
 *  	- Niveles de dificultad
 */

// Preparamos las variables que usaremos en toda la ejecución

/**
 * Secuencia que se ejecutará en el juego, y que el usuario tendrá que 
 * repetir. Es un array que almacenará el número del color que 
 * corresponda (0-> verde, 1-> rojo, 2-> amarillo, 3-> azul)
 */
var secuencia = [];

/**
 * Secuencia que irá haciendo el jugador en su turno. Almacena el 
 * código del color que ha seleccionado, solo si es correcto
 */
var secuenciaPlayer = [];

/**
 * Array con los colores de fondo que tendrán los divs cuando
 * no estén iluminados
 */
var coloresCSS = ["#00AC00", "#D60000", "#D6C800", "#027798"];
/**
 * Array con los colores de fondo que tendrán los divs cuando
 * estén iluminados
 */
var coloresCSSOn = ["#6BFC6B", "#FF4646", "#FFFF56", "#50C6E8"];

/**
 * Array con la duración de la luz encendida dependiendo del nivel.
 * Por ejemplo, en el nivel 1 la luz se mantendrá encendida el tiempo
 * que esté indicado en la primera posición del array
 */
var tiempoNivel = [1000, 600, 400, 150];

// Nivel de dificultad seleccionado
var nivel = 0;

/**
 * Array con las frecuencias para los sonidos, en el siguiente orden:
 * verde, rojo, amarillo, azul, error.
 */
var frecuencias = ["415.305", "311.127", "247.942", "207.652", "100"]; 

/**
 * Array que almacenará los osciladores de Web Audio Api, para conectarlos
 * cuando se necesiten
 */
var osciladores = [];

/**
 * Se utilizará mientras se reproduzca la secuencia de la máquina. Almacenará
 * el número de la posición del array 'secuencia' que corresponda. Por ejemplo, 
 * si se van a iluminar dos colores, 'secuencia' tendrá dos valores, por lo que
 * al principio contadorColorActual valdrá 0, y cuando se ilumine el primer color, 
 * pasará a 1 para indica cuál se va a iluminar a continuación
 */
var contadorColorActual;

/**
 * Variable que usaremos para cambiar el contenido del elemento con ID pantallaP,
 * es decir, la pantalla donde se irá mostrando cuándo es el turno de usuario, 
 * si ha acertado...
 */
var mensaje;

/**
 * Indica el color (y sonido) que se está iluminando, para saber cuál se tiene
 * que apagar. (Realizando esta tarea me he encontrado con varios errores respecto
 * a la sincronización al encender/apagar el color/sonido que corresponde. Una
 * de las soluciones fue establecer esta variable)
 */
var colorActual;

var context = null; // Donde crearemos el objeto AudioContext
var osc = null; // Crearemos los osciladores en esta variable


/**
 * Tenemos que comprobar si Web Audio Api es compatible con el navegador
 * que se esté usando, por lo que intentaremos crear el objeto AudioContext y,
 * si salta un error, mostramos el aviso al usuario.
 */
try {
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	context = new AudioContext();
} catch(e) {
	alert("Su navegador no soporta Web Audio Api");
}

/**
 * Si la ejecución llega hasta aquí significa que no ha saltado la excepción
 * y el navegador es compatible. Por lo tanto, crearemos los osciladores con
 * las frecuencias establecidas en el array frecuencia
 */
for (var i = 0; i < frecuencias.length; i++) {
	// Creamos el oscilador
	osc = context.createOscillator();
	// Le asignamos la frecuencia
	osc.frequency.value = frecuencias[i];
	// El tipo de onda será triangular
	osc.type = 'triangle';
	// Iniciamos el oscilador
	osc.start(0);
	// Lo añadimos el array osciladores
	osciladores.push(osc);
}

/**
 * Función esTactil
 * Se utilizará para comprobar si el dispositivo a través
 * del cual se accede a la página es táctil o no, para saber
 * qué eventos activar.
 *
 * Función obtenida de: https://ctrlq.org/code/19616-detect-touch-screen-javascript
 */
function esTactil() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

// Cuando cargue la página se ejecutará la función inicio()
window.addEventListener('load', inicio);

/**
 * Función inicio()
 * Se ejecutará cuando cargue la página. Llama a función para crear
 * el tablero y crea el evento para comenzar la partida cuando se
 * pulse el botón Play y el de aumentar el nivel cuando se pulse
 * sobre Nivel
 */
function inicio() { 
	crearTablero(); // Creamos el tablero

	// Cambiamos el contenido de la pantalla
	mensaje = document.getElementById("pantallaP");
	mensaje.innerHTML = "-------------";

	// Con esTactil() sabremos si el dispositivo que carga la página
	// es táctil. De esta forma crearemos unos eventos u otros en función
	// del dispositivo
	if (esTactil()) { // Si es táctil
		// Creamos el evento para iniciar partida (táctil)
		document.getElementById("botonPlay").addEventListener('touchstart',iniciarJuego);
		// Creamos el evento para subir de nivel
		document.getElementById("botonNivel").addEventListener('touchstart',cambiarNivel);
	} else { // Si no lo es
		// Creamos el evento para iniciar partida
		document.getElementById("botonPlay").addEventListener('click',iniciarJuego);
		// Creamos el evento para subir de nivel
		document.getElementById("botonNivel").addEventListener('click',cambiarNivel);
	}

	// Los botones para jugar y aumentar el nivel, como ahora se pueden
	// pulsar, le cambiaremos el estilo al cursor
	document.getElementById("botonPlay").style.cursor = "pointer";
	document.getElementById("nivelNum").style.cursor = "pointer";
}

/**
 * Función crearTablero
 * Se inicia cuando se carga la página y se encarga
 * de crear los elementos HTML necesarios para crear
 * el tablero del juego. El tablero estará compuesto por:
 *
 * - Div contenedor.
 * 		- Un div para cada color
 * 		- Div centro, con el menú del juego
 * 			- Div para el logo
 * 				- H1 con el logo
 * 			- Div para la pantalla
 * 				- P con el contenido de la pantalla
 * 			- Div contador
 * 				- H2 contador
 * 				- P, indicando el contador
 * 			- Div Play
 * 				- Div que se usará como botón
 * 				- P, indicando que es el botón para jugar
 * 			- Div nivel, para aumentar el nivel
 * 				- Div, se usará como botón
 * 				- P, indica que es el botón para subir nivel
 * 	- Div con información sobre los controles
 */
function crearTablero() {
	// Array que se usará para nombar los DIVS con sus colores
	var colores = ["verde", "rojo", "amarillo", "azul"];

	// Creamos el div contenedor
	var contenedor = document.createElement("div");
	// Le asignamos un ID
	contenedor.setAttribute("id", "contenedor");
	// Añadimos el DIV al body de la página
	document.body.appendChild(contenedor);

	// Con el bucle for, crearemos tantos divs como elementos
	// tenga el array 'colores', en este caso cuatro
	for (var i = 0; i < colores.length ; i++) {
		// Creamos el DIV
		var color = document.createElement("div");
		// Le asignamos una clase, con el nombre del color
		color.setAttribute("class", colores[i]);
		// Le asignamos un ID con el 'código' del color
		color.setAttribute("id", i);
		// Lo añadimos al DIV contenedor
		contenedor.appendChild(color);
	}

	// Creamos el DIV que se usará como zona central en el tablero
	var centro = document.createElement("div");
	// Le asignamos un ID
	centro.setAttribute("id", "centro");
	// Lo añadimos al DIV contenedor
	contenedor.appendChild(centro);

	// Creamos el elemento H1, que será el logo
	var logo = document.createElement("h1");
	// Le añadimos un ID
	logo.setAttribute("id", "logo");
	// Creamos un nodo de texto con el contenido del logo
	var logoTexto = document.createTextNode('Simon');
	// Añadimos el contenido al H1
	logo.appendChild(logoTexto);
	// Añadimos el H1 al DIV centro
	centro.appendChild(logo);

	// Creamos el DIV que usaremos como pantalla
	var pantalla = document.createElement("div");
	// Le asignamos un ID
	pantalla.setAttribute("id", "pantalla");
	// Creamos el elemento P, el contenido de la pantalla
	var pantallaP = document.createElement("p");
	// Le asignamos un ID
	pantallaP.setAttribute("id", "pantallaP");
	// Añadimos el elemento P al DIV pantalla
	pantalla.appendChild(pantallaP);
	// Añadimos el DIV pantalla al DIV central
	centro.appendChild(pantalla);


	// Creamos el DIV en el que se mostrará el contador
	var contadorDiv = document.createElement("div");
	// Le asignamos un ID
	contadorDiv.setAttribute("id", "contador");
	// Lo añadimos al DIV centro
	centro.appendChild(contadorDiv);

	// Creamos el elemento H2 que irá dentro del contador
	var contadorH = document.createElement("h2");
	// Le asignamos como ID 'puntuacion'
	contadorH.setAttribute("id", "puntuacion");
	// Creamos el contenido del H2
	var textoCont = document.createTextNode('--');
	// Se lo añadimos al H2
	contadorH.appendChild(textoCont);
	// Añadimos el H2 al DIV contador
	contadorDiv.appendChild(contadorH);

	// Creamos el elemento P, que irá dentro del DIV contador
	var contadorP = document.createElement("p");
	// Creamos el contenido de P
	var textoCont = document.createTextNode('PUNTOS');
	// Añadimos el nodo de texto a P
	contadorP.appendChild(textoCont);
	// Añadimos el elemento P al DIV contador
	contadorDiv.appendChild(contadorP);

	// Creamos el DIV que contendrá el botón play
	var play = document.createElement("div");
	// Le asignamos un id
	play.setAttribute("id", "play");
	// Lo añadimos al DIV central
	centro.appendChild(play);

	// Creamos el DIV botón (el botón para jugar es un
	// DIV, no un elemento BUTTON)
	var playBot = document.createElement("div");
	// Asignamos un ID
	playBot.setAttribute("id", "botonPlay");
	// Lo añadimos al DIV 'play'
	play.appendChild(playBot);

	// Creamos el elemento P
	var playP = document.createElement("p");
	// Creamos el nodo de texto
	var textoPlay = document.createTextNode('JUGAR');
	// Añadimos el nodo al elemento P
	playP.appendChild(textoPlay);
	// Lo añadimos al DIV play
	play.appendChild(playP);

	// Creamos el DIV que contendrá el botón del nivel
	var nivel = document.createElement("div");
	// Le asignamos un id
	nivel.setAttribute("id", "nivel");
	// Lo añadimos al DIV central
	centro.appendChild(nivel);

	// Creamos el DIV botón
	var nivelBot = document.createElement("div");
	// Asignamos un ID
	nivelBot.setAttribute("id", "botonNivel");
	// Lo añadimos al DIV 'nivel'
	nivel.appendChild(nivelBot);

	// Creamos el elemento P, irá dentro del botón
	// indicando el nivel actual
	var nivelNum = document.createElement("p");
	// Asignamos un ID
	nivelNum.setAttribute("id", "nivelNum");
	// Creamos un nodo de texto con el contenido
	var nivelTexto = document.createTextNode("1");
	// Añadimos el nodo de texto al elemento P
	nivelNum.appendChild(nivelTexto);
	// Añadimos el elemento P al DIV botón
	nivelBot.appendChild(nivelNum);

	// Creamos el elemento P
	var nivelP = document.createElement("p");
	// Creamos el nodo de texto
	var textoNivel = document.createTextNode('NIVEL');
	// Añadimos el nodo al elemento P
	nivelP.appendChild(textoNivel);
	// Lo añadimos al DIV nivel
	nivel.appendChild(nivelP);
}

/**
 * Función resetJuego
 * Se ejecutará antes de comenzar una nueva partida. Elimina el 
 * contenido de los arrays secuencia y secuenciaPlayer,
 * modifica el contenido del contador, para asignarlo a "--" (así
 * se elimina la puntuación de la anterior partida) y de la pantalla
 */
function resetJuego() {
	secuencia = []; // Eliminamos el contenido de 'secuencia'
	secuenciaPlayer = []; // Eliminamos el contenido de 'secuenciaPlayer'

	// Borramos la puntuación del jugador
	document.getElementById("puntuacion").innerHTML = "--";
	// Borramos el contenido de la pantalla
	mensaje.innerHTML = "-------------";

	if (esTactil()) {
		// Evento para cambiar el nivel (versión táctil)
		document.getElementById("botonNivel").addEventListener('touchstart',cambiarNivel);
	} else {
		// Creamos el evento para que el usuario pueda cambiar el nivel. Solo
		// podrá cambiarlo mientras no se esté ejecutando una partida
		document.getElementById("botonNivel").addEventListener('click',cambiarNivel);
	}
	
	// Como ahora se puede pulsar sobre el botón Nivel, cambiamos el cursor
	document.getElementById("nivelNum").style.cursor = "pointer";
}

/**
 * Función desactivarEventos
 * Se ejecutará cada vez que termine el turno de un jugador (tanto si acierta
 * en la secuencia como si falla). Se encarga de eliminar los eventos correspondientes
 * para que el jugador no pueda pulsar en la zona de los colores
 */
function desactivarEventos() {
	// Se elimina el evento que apaga la luz que esté encendida cuando se suelte
	// el ratón (si el jugador termina la secuencia o falla el programa se encargará
	// de apagar las luces, para evitar errores)
	if (esTactil()) {
		document.removeEventListener('touchend', luzOff);
	} else {
		// Eliminamos el evento
		document.removeEventListener('mouseup', luzOff);
	}
	
	// Se eliminan los cuatro eventos correspondientes a pulsar sobre un color, para
	// que el jugador no pueda pulsarlos, por ejemplo, cuando se esté ejecutando una
	// secuencia
	for (var i = 0; i <= 3; i++) {
		if (esTactil()) {
			document.getElementById(i).removeEventListener('touchstart',turnoUser);
		} else {
			// Eliminamos el evento
			document.getElementById(i).removeEventListener('mousedown',turnoUser);
		}
		
		// Cambiamos el curso para indicar que ya no se puede seleccionar
		document.getElementById(i).style.cursor = "default";
	}

	// Eliminamos los eventos correspondientes al teclado
	document.removeEventListener('keypress', turnoUser); // Cuando se pulsa una tecla
	document.removeEventListener('keyup', luzOff); // Cuando se suelta una tecla
}

/**
 * Función iniciarJuego
 * Se encarga de llamar a las funciones necesarias para comenzar una partida. Se ejecutará
 * cada vez que el usuario pulse sobre el botón para jugar
 */
function iniciarJuego() {
	// Reseteamos los valores del juego
	resetJuego();

	if (esTactil()) {
		document.getElementById("botonNivel").removeEventListener('touchstart',cambiarNivel);
	} else {
		// Eliminamos el evento para cambiar el nivel. Mientras se esté ejecutando una
		// partida, no se podrá cambiar
		document.getElementById("botonNivel").removeEventListener('click',cambiarNivel);
	}
	
	// Como ya no se puede cambiar el nivel, modificamos el estilo del cursor
	document.getElementById("nivelNum").style.cursor = "default";

	// Comenzamos una ronda
	ronda();
}

/**
 * Función cambiarNivel
 * Se ejecuta cada vez que el usuario pulsa el botón Nivel. Como su nombre indica, 
 * se encarga de cambiar el nivel de dificultad
 */
function cambiarNivel() {
	// Como existen cuatro niveles (del 0 al 3), si el nivel actual
	// es menor que 3 se sumará una unidad
	if (nivel < 3) {
		nivel++;
	} else { // Si el nivel es 3
		// Se cambia al inicial
		nivel = 0;
	}

	// Cambiamos el contenido del botón para indicar el nivel. Como empieza por 0, 
	// sumamos una unidad (para el usuario los niveles irán del 1 al 4)
	document.getElementById("nivelNum").innerHTML = (nivel+1);
}

/**
 * Función ronda
 * Se encarga el control de una ronda en el juego.
 * Cuando comienza una ronda, se añade un número aleatorio a la secuencia,
 * se ejecutan la secuencia de colores y se crean los eventos para 
 * ir comprobando la secuencia del jugador.
 */
function ronda() {
	/**
	 * El siguiente bloque if lo añadí a partir de un error que encontré.
	 * Si pulsabas varias veces seguidas el botón de Play, a veces algunas
	 * luces/sonidos no se apagaban. Por ello, con el siguiente bucle
	 * se comprueba si hay alguna luz encendida. Si es así, se llama a la
	 * función para apagarla
	 */
	if (colorActual) { // Si hay alguna luz encendida
		luzOff(); // Se apaga
	}

	// Mostramos en la pantalla que es el turno de la máquina
	mensaje.innerHTML = "SIMON DICE...";

	// Añadimos un número aleatorio del 0 al 3 a la secuencia
	secuencia.push(Math.floor(Math.random()*4));

	// Cambiamos el marcador. La puntuación será la longitud de la secuencia
	document.getElementById("puntuacion").innerHTML = secuencia.length;

	// El color que se ejecutará primero será el de la primera posición de la secuencia
	colorActual = secuencia[0];
	// La posición en la secuencia será 0, el primero
	contadorColorActual = 0;

	// Los colores se iluminará en función del nivel, y entre cada color pasará medio segundo.
	// El tiempo que establecemos ahora es el que pasará desde que el usuario pulsa el botón
	// para jugar hasta que se empiezan a iluminar los colores
	var tiempo = 500;

	// Por cada elemento del array 'secuencia' se ejecutará lo siguiente
	for (var i = 0; i < secuencia.length; i++) {
		// Se enciende la luz pasado el tiempo establecido
		setTimeout(lucesSimon, tiempo);
		// Le sumamos al tiempo lo que tarda un color en apagarse (varía en función del nivel)
		// y 500 (entre color y color pasa medio segundo)
		tiempo += (tiempoNivel[nivel])+500;
	}
	
	/**
	 * Se tienen que crear los eventos para registrar la secuencia del usuario pero, para
	 * que no se produzca ningún error, se ejecutarán cuando termine la secuencia de la
	 * máquina más un intervalo (medio segundo). Para calcular cuánto tardará en ejecutarse
	 * la secuencia, se multiplica la longitud del array 'secuencia' por lo que tarda la luz
	 * en apagarse en función del nivel más 500. Además, se le sumará al final 500, que contará
	 * como un intervalo sin iluminar.
	 */
	setTimeout(function() {
		// Cambiamos el contenido de la pantalla para indicar que es el turno del jugador
		mensaje.innerHTML = "¡TU TURNO!";
		secuenciaPlayer = []; // Reiniciamos la secuencia del jugador

		// Cuando se suelte el botón del ratón se apagará la luz que esté encendida. Se asigna
		// este evendo al documento entero y no al div que corresponda ya que el usuario puede
		// mantener pulsado el botón en un DIV y soltarlo en otro.
		if (esTactil()) {
			document.addEventListener('touchend', luzOff);
		} else {
			document.addEventListener('mouseup', luzOff);
		}
		
		// Creamos los eventos para cuando pulse sobre un DIV de color. He preferido usar el evento
		// mousedown y mouseup para dar más realismo al juego (cuando se pulsa se enciende, y se apaga
		// cuando lo sueltas)
		for (var i = 0; i <= 3; i++) {
			if (esTactil()) {
				document.getElementById(i).addEventListener('touchstart', turnoUser);
			} else {
				document.getElementById(i).addEventListener('mousedown', turnoUser);
			}
			
			document.getElementById(i).style.cursor = "pointer";
		}

		// Creamos los eventos de teclado, con la misma función que los de ratón
		document.addEventListener('keypress', turnoUser); // Cuando se pulsa una tecla
		document.addEventListener('keyup', luzOff); // Cuando se suelta una tecla
	}, ((tiempoNivel[nivel]+500)*secuencia.length)+500); // Establecemos el tiempo como se ha indicado antes
}

/**
 * Función lucesSimon
 * Se ejecutará cada vez que se tenga que encender una luz al ejecutar
 * la secuencia de la máquina. Se encarga de llamar a la función luzOn y, 
 * pasados unos segundos, cambiar el color actual por el de la siguiente
 * posición en el array (por si se vuelve a ejecutar esta función) 
 * 'secuencia' y llamar a luzOff
 */
function lucesSimon() {
	luzOn(colorActual); // Encendemos la luz
	// Cuando pase el tiempo indicado en función del nivel, se ejecutará
	// la siguiente función
	setTimeout(function() {
		luzOff(colorActual); // Apagamos la luz
		// Sumamos una unidad al contador que nos indica qué color
		// del array 'secuencia' se iluminará despues (si se vuelve a
		// llamar a esta función)
		contadorColorActual++;
		// El colorActual será el de la siguiente posición en el array
		colorActual = secuencia[contadorColorActual];
	}, tiempoNivel[nivel]);
}

/**
 * Función luzOn
 * Se encarga de encender la luz (cambiar de color el fondo del DIV) que
 * esté indicada en la variable 'colorActual'. Además, conecta el oscilador 
 * que corresponda con el color para iniciar el sonido. Como 'colorActual'
 * puede tener cinco valores (del 0 al 3 para los colores, y 5 para activar
 * el sonido del error), el fondo del DIV se cambiará solo si el valor es
 * menor que 4
 */
function luzOn() {
	// Conectamos el oscilador para que se escuche el sonido
	osciladores[colorActual].connect(context.destination);

	if (colorActual < 4) { // Si colorActual no corresponde al error
		// Cambiamos el color de fondo del DIV
		document.getElementById(colorActual).style.background = coloresCSSOn[colorActual];
	}
}

/**
 * Función luzOff
 * Cambia el color de fondo del DIV que esté 'encencido' por el de 'apagado'.
 * También desconecta el sonido para que ya no se escuche. Al igual que en la
 * función luzOff, cuando 'colorActual' corresponde al error (tiene el valor
 * 4), no se cambiará el color de fondo del DIV (ya que no existe ninguno
 * con ID 4)
 */
function luzOff() {
	// Detenemos el sonido
	osciladores[colorActual].disconnect();
	if (colorActual < 4) { // Si colorActual no corresponde al error
		// Cambiamos el color de fondo del DIV
		document.getElementById(colorActual).style.background = coloresCSS[colorActual];
	}
}

/**
 * Función turnoUser
 * Se ejecutará cada vez que el usuario, en su turno, pulse sobre un DIV
 * de color o pulse una tecla. Se encarga de comprobar si el color seleccionado 
 * es correcto, encender la luz que ha pulsado, apagarla...
 *
 * Además, si el usuario selecciona un color incorrecto, termina el turno
 * del usuario y, si termina la secuencia bien, llama a la función ronda()
 * para iniciar una nueva ronda
 * 
 * @param e Evento
 */
function turnoUser(e) {
	// Al igual que en la función ronda(), con el siguiente bloque, si alguna
	// luz está encendida (con el fondo cambiado y sonando el audio), se apaga
	// para evitar errores.
	if (colorActual) {
		luzOff();
	}

	// Variable en la que almacenaremos el color seleccionado. Si el usuario
	// se equivoca, 'colorActual' valdrá 4 para indicar que es un error, por
	// lo que necesitaremos saber cuál ha pulsado el usuario
	var color;

	/**
	 * Si el evento que se ha disparado es el del ratón, se almacenará el ID
	 * del DIV sobre el que se ha pulsado.
	 *
	 * Si el evento que se ha disparado es el del teclado, se tendrá que 
	 * comprobar si la tecla pulsada corresponde a una de las válidas
	 * (a -> verde, s -> rojo, z -> amarillo, x -> azul) para asignar a la
	 * variable 'color' el código que corresponda
	 */
	if (e.type == "mousedown" || e.type == "touchstart") { // Si el evento es de ratón
		color = this.id;
	} else { // Si es otro, que será keyPress
		// Obtenemos el valor de la tecla que se ha pulsado
		var presionada = String.fromCharCode(e.charCode);
		// Si es una de las válidas
		if (presionada == "a" || "s" || "z" || "x") {
			switch(presionada) { // Guardamos el valor de su color
				case "a":
					color = 0; // Verde
					break;
				case "s":
					color = 1; // Rojo
					break;
				case "z":
					color = 2; // Amarillo
					break;
				case "x":
					color = 3; // Azul
					break;
			}
		}
	}

	/**
	 * Si en este punto 'color' no tiene ningún contenido, significa que el usuario
	 * ha pulsado una tecla que no corresponde con las indicadas en los controles, 
	 * por lo que la ejecución de esta función terminaría aquí
	 */
	if (color != null) { // Si se ha seleccionado un color válido
		// colorActual (el que se debe iluminar) será el color que se ha pulsado
		colorActual = color;

		// Tendremos que saber en qué posición de la secuencia del jugador estamos, 
		// para comparar la selección con el color que corresponda a la misma posición
		// de la secuencia original. Por ello, almacenamos la longitud de la secuencia
		// del jugador
		var actual = secuenciaPlayer.length;

		// Si el color que se ha seleccionado es igual al de la secuencia original en
		// la misma posición que la longitud del array del jugador, significa que ha acertado
		if (color == secuencia[actual]) {
			luzOn(); // Encemos la luz sobre la que ha pulsado el usuario
			// Añadimos el color al array de la secuencia del jugador
			secuenciaPlayer.push(color);
			// Apagamos la luz cuando pase un segundo
			setTimeout(function() {luzOff();}, 1000);

			// Tenemos que comprobar si el jugador ya ha terminado la secuencia, si es así
			// habrá terminado su turno. El turno termina cuando la longitud de la secuencia
			// del usuario y la original son la misma
			if (secuencia.length == secuenciaPlayer.length) {
				// Indicamos en la pantalla que ha terminado la secuencia
				mensaje.innerHTML = "¡BIEN!";
				desactivarEventos(); // Desactivamos los eventos
				// Cuando pasen dos segundos, comenzará la siguiente ronda (un segundo
				// hasta que la luz se apague y otro más para que no resulte muy seguido)
				setTimeout(ronda, 2000);
			}
		} else { // Si el jugador se equivoca
			// Desactivamos los eventos
			desactivarEventos();
			// Cambiamos el color de fondo del DIV que ha pulsado. No llamamos
			// ahora a la función luzOn porque no queremos que se escuche el sonido
			// del error
			document.getElementById(color).style.background = coloresCSSOn[color];

			colorActual = 4; // Cambiamos el color a 4 para indicar que es un error

			// Ahora llamamos a la función luzOn para escuchar el sonido del error. No
			// cambiará el color de fondo de ningún DIV porque no existe ninguno cuyo
			// ID sea 4
			luzOn();

			// A través de la pantalla indicamos que ha introducido mal la secuencia
			mensaje.innerHTML = "¡MAL!";

			// Cuando pase un segundo, cambiamos el color de fondo del DIV que pulsó
			// el usuario por su color original ('apagado'), detenemos el sonido
			// y reiniciamos los valores del juego. En este punto la partida se ha terminado
			setTimeout(function() {
				document.getElementById(color).style.background = coloresCSS[color];
				luzOff(); 
				resetJuego();
			}, 1000);
		}	
	}
}