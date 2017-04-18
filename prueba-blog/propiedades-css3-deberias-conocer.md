# 6 propiedades de CSS3 que deberías conocer

### A pesar de ser el estándar desde hace años, hoy en día todavía existen propiedades de CSS3 que no todo el mundo conoce. Vamos a repasar las más importantes.

En 2011, CSS3 comenzó a ser la recomendación oficial de la [W3C](http://www.w3c.es/), incorporando nuevas características y técnicas (sombras, RGBA, degradados, animaciones... ) a través de módulos que han ido estandarizándose con el tiempo. Estas nuevas características han servido para mejorar la experiencia de usuario al navegar en sitios web.

En este artículo vamos a hacer un repaso de las propiedades más importantes utilizadas hoy en día que forman parte de CSS3. 

## box-shadow
Soportada por prácticamente [todos los navegadores](https://caniuse.com/#search=box-shadow), aplica una sombra al elemento sobre el que se establece esta propiedad.

	box-shadow: [eje-x] [eje-y] [radio] [color];
    
Recibe cuatro parámetros que determinan la sombra:

- Posición en el eje X
- Posición en el eje Y
- Radio de la sombra
- Color

Un ejemplo podría ser:

    box-shadow: 2px 2px 15px #252525;

Que aplicado a una imagen daría el siguiente resultado:

![Propiedad box-shadow en una imagen](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-box-shadow.png)

Además, podemos establecer varias sombras para un mismo elemento, lo que nos permite crear un gran número de efectos diferentes, por ejemplo:

    box-shadow: 14px 14px 16px #67C3E6, -4px -4px 6px #FEF9BF;

![Propiedad box-shadow en una imagen](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-multiple-box-shadow.png)


## text-shadow
Soportada también por la mayoría de navegadores sin necesidad de usar prefijos, es muy similar a *box-shadow*, usando la misma sintaxis, pero aplicada a un texto:

	text-shadow: [eje-x] [eje-y] [radio] [color];

Y acepta los mismos parámetros:

- Posición en el eje X
- Posición en el eje Y
- Radio de la sombra
- Color

Por ejemplo:

    text-shadow: 2px 2px 3px #67C3E6;

![Propiedad de CSS text-shadow](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-text-shadow.png)

Esta propiedad es muy útil si, por ejemplo, queremos hacer un contorno al texto combinando varias sombras:

    text-shadow: 0 1px 0 #67C3E6, 0 -1px 0 #67C3E6, 1px 0 0 #67C3E6, -1px 0 0 #67C3E6;

![Propiedad de CSS text-shadow](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-multiple-text-shadow.png)

## transition
Posiblemente una de las mejores funcionalidades que se añadieron en CSS3. Esta propiedad nos permite, según la [especificación de la W3C](https://www.w3.org/TR/css3-transitions/), cambiar los valores de CSS de manera progresiva durante un tiempo determinado.

Su sintaxis es la siguiente:

    transition: [propiedad-css] [tiempo] [curva-tiempo] [retardo];

 Donde:
 - **Propiedad CSS:** nombre o nombres de propiedades CSS a las que se aplicarán la transición. Podemos utilizar '*all*' para indicar que se aplique a todas las [propiedades compatibles](https://www.w3.org/TR/css3-transitions/#animatable-properties).
 - **Tiempo:** duración de la transición, en segundos.
 - **Curva de tiempo:** [curva cúbica bézier](https://es.wikipedia.org/wiki/Curva_de_B%C3%A9zier#Curvas_c.C3.BAbicas_de_B.C3.A9zier), que determina la velocidad de la animación en cada momento. Aunque podemos establecer una curva personalizada, también disponemos de las siguientes, ya establecidas: *linear*, *ease*, *ease-in*, *ease-out* y *ease-in-out*.

Un ejemplo podría ser:

    transition: all 1s ease-out;

## gradient

Otra de las características que incorpora CSS3 es la creación gradientes, tanto lineales como circulares, a través de sus funciones *linear-gradient* y *radial-gradient*. 

La sintaxis de los lineales es:

    linear-gradient([dirección], [color-1], [color-2]...);

Donde:
- **Dirección**: orientación del gradiente. Se pueden usar ángulos (360deg, 180deg) o palabras clave (*to top*, *to top left*, *to bottom*...).
- **Colores:** podemos establecer, como mínimo, dos colores al gradiente.

Para aplicar un gradiente como fondo a un *div* podríamos usar:

    background: linear-gradient(to top left, #67C3E6, #FEF9BF);

![CSS gradiente lineal](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-linear-gradient.png)

La sintaxis de los circulares es:

    radial-gradient([forma] [tamaño] at [posicion], [color-1], [color-2]...);

Donde:
- **Forma:** círculo (*circle*) o elipse (*ellipse*).
- **Tamaño:** podemos indicar un tamaño específico (en píxeles, porcentaje...) o usar algunos ya definidos como, por ejemplo, *closest-corner*, que cubre hasta la esquina más próxima.
- **Posición:** su valor por defecto es *center*. Establece la posición del gradiente, de manera similar a *background-position*.
- **Colores:** colores que formarán el gradiente.

Un ejemplo sería:

    background: radial-gradient(#FEF9BF, #67C3E6);

![CSS gradiente lineal](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/prueba-blog/css-radial-gradient.png)

## @font-face o @import
Otra de las características más usadas, ya que nos permite definir e importar cualquier tipografía para usarla en nuestro sitio web. 

La sintaxis de **@font-face** es:

    @font-face {
    	font-family: [nombre];
    	src: url([direccion]);
    }

Una vez importada, podremos usarla en cualquier elemento:

    h1 {
    	font-family: [nombre];
    }

Para importar fuentes con **@import** el procedimiento es similar:

    @import url([direccion]);

Cabe destacar que las tipografías pueden estar almacenadas en el propio servidor de la página, o en otros externos, como en [Google Fonts](https://fonts.google.com/), que nos ofrece una amplia colección de fuentes compatibles con todos los navegadores.

## Media Queries

Con el auge de los dispositivos móviles y tablets en los últimos años, los desarrolladores web se han visto obligados a adaptar sus páginas web a cualquier **resolución** de pantalla. De esa problemática surge una nueva técnica, conocida como **media queries**.

La regla **@media** nos permite especificar cierto tipo de propiedades a elementos en función de diversas características del dispositivo desde el que se accede a la página, como las **dimensiones**, **orientación** o **resolución**.

Por ejemplo, para establecer propiedades que se cumplirán solo cuando la pantalla del dispositivo esté en horizontal y tenga un ancho de menos de 700px.

    @media (min-width: 700px) and (orientation: landscape) {
    	img {
    		width: 700px;
    	}
    }

## Para finalizar
A pesar de ser de las más importantes, existen otras que debemos tener en cuenta como layouts (grid y flexbox), animaciones, transformaciones, bordes... Puedes ver una lista completa en este [enlace](http://www.quackit.com/css/css3/properties/).

Por último, si estás interesado en conocer el estado actuar de desarrollo de CSS3, puedes consultarlo en la web oficial de la [W3C](https://www.w3.org/Style/CSS/current-work.en.html).