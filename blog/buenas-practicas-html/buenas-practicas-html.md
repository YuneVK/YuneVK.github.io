# 10 buenas prácticas de HTML para escribir código limpio y mantenible

## Vamos a dar un repaso a algunas de las pautas más extendidas para mejorar la calidad de nuestro código HTML, siguiendo siempre el estándar de la W3C y nuestra propia experiencia.

![Buenas prácticas HTML](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/blog/buenas-practicas-html/img/buenas-practicas-html.png "Buenas prácticas HTML")

¿Por qué es importante seguir unas buenas prácticas y cumplir los estándares al escribir código? La respuesta es sencilla, para que sea limpio, legible, escalable y fácil de mantener, incluso para otros programadores.

Este artículo va dirigido tanto a personas con pocos conocimientos de **HTML**, como para aquellas que ya cuentan con cierta experiencia en este lenguaje. 

### 1 - Declara el DOCTYPE

A través de la declaración del tipo de documento, o **DOCTYPE**, indicamos el estándar usado al construir un documento HTML. De esta forma, los navegadores que lean esta declaración interpretarán el documento con el lenguaje y versión definidos. 

Cabe destacar que, estando en 2017, no debemos usar un **DOCTYPE** obsoleto, y utilizar siempre la versión recomendada de HTML, que a día de hoy es HTML5.

**Mal** (por usar versiones antiguas):
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
```
**Bien** (se declara el DOCTYPE de una versión actual y recomendada de HTML):
```
<!DOCTYPE html>
```
Como dato de interés, si quieres saber por qué la declaración del DOCTYPE de **HTML5** es tan sencilla comparada con la de versiones anteriores, puedes consultar el siguiente [enlace](https://dev.w3.org/html5/html-author/#doctype-declaration) de la **W3C**.

### 2 - Cierra las etiquetas

Una de las primeras cosas que se estudian cuando se está aprendiendo **HTML** es que las etiquetas deben cerrarse, y en el mismo orden en el que abrieron.

**Mal:**
```
<div>
	<p>Contenido
	<p>Contenido</p>
</div>
```

**Bien:**
```
<div>
	<p>Contenido</p>
	<p>Contenido</p>
</div>
```
Cabe destacar que en **HTML5** se introdujeron las **etiquetas vacías** (*void tags* en inglés) que son un caso especial que no necesitan etiqueta de cierre.

**Mal:**
```
<p>Este es<br></br>un mal ejemplo</p>
```
**Bien:**
```
<p>Este es<b>un buen ejemplo</p>
```
Dichas etiquetas son:
```
<area>, <base>, <br>, <col>, <embed>, <hr>, <img>, <input>, <keygen>, <link>, <menuitem>, <meta>, <param>, <source>, <track>, <wbr>
```
Puedes consultar más información sobre las etiquetas vacías en el siguiente [enlace](https://www.w3.org/TR/html51/syntax.html#void-elements).

### 3 - Usa minúsculas en los nombres de etiquetas, atributos y valores

A pesar de no afectar al funcionamiento de la página, es una recomendación escribir siempre las etiquetas, atributos y valores en **minúsculas**, ya que mejora la legibilidad del código.

**Mal:**
```
<SECTION>
	<h1>Web App Design</H1>
	<P>Contenido</P>
<section>
```
**Bien:**
```
<section>
	<h1>Web App Design</h1>
	<p>Contenido</p>
<section>
```

### 4 - Usa el atributo Alt en imágenes

Las imágenes deben incluir siempre dicho atributo, que proporciona, como su nombre indica, un **texto alternativo** a la imagen. Su uso mejora la accesibilidad ya que, por ejemplo, los lectores de pantalla se basan en este atributo para proporcionar un contexto a las imágenes.

Dicho valor debe ser lo suficientemente descriptivo al contenido. Si la imagen no tiene ninguna relevancia (como un icono, por ejemplo), es recomendable seguir incluyendo el atributo, aunque esté vacío.

**Mal:**
```
<img src="img/logo.png">
```
**Bien:**
```
<img src="img/logo.png" alt="Web App Design Logo">
```

### 5 - Usa una indentación consistente

Esto es aplicable a cualquier lenguaje: un código con mala **indentación** o sin ella carece en gran medida de legibilidad.

Indentar es utilizar espacios a la derecha de cada línea con el objetivo de mejorar la **legibilidad** del código, por lo que es un aspecto importante y que deberíamos tenerlo siempre en cuenta.

En el modo de hacerlo tenemos varias opciones, mediante **tabulaciones** (*Tab*) o **espacios** (1, 2, o los que se prefieran). Esto ya es cuestión personal (yo personalmente prefiero *Tabs*), aunque podríamos tomar como referencia la [guía de estilos de Google](https://google.github.io/styleguide/htmlcssguide.html#Indentation) que recomienda dos espacios.

Sea como sea (con tabulaciones, dos, tres espacios...) lo importante es que sea consistente en todo el código.

**Mal:**
```
<div>
<h1>Web App Design</h1>
   <ul>
 <li>Elemento 1</li>
    <li>Elemento 2</li>
   <li>Elemento 3</li>
  </ul>
  </div> 
```
**Bien:**
```
<div>
	<h1>Web App Design</h1>
	<ul>
		<li>Elemento 1</li>
		<li>Elemento 2</li>
		<li>Elemento 3</li>
	</ul>
</div>
```

### 5 - Separa el contenido de la presentación

No uses **estilos en línea**. HTML es el contenido, y CSS proporciona la presentación visual de dicho contenido. No los mezcles.

Al mezclarlos, se consiguen páginas más lentas, difíciles de leer y mantener. Tener el estilo y el contenido separado ayudará al equipo de desarrollo a realizar cambios y mantenimiento de una forma mucho más eficiente.

Por ello, siempre es recomendable utilizar horas de estilo **externas**, junto con clases para aplicar estilos según sea necesario.

**Mal:**
```
<p style="color: red;">Información</p>
```
**Bien:**
```
<p class="alerta">Información</p>
```

### 6 - Usa etiquetas semánticas y evita la Divitis

Se podría definir *Divitis* como esa mala práctica de usar divs para organizar todo el contenido de la página. Aunque funciona, empeora la legibilidad y sobrecarga el código.

Es más recomendable mantener nuestro código lo más limpio y reducido posible, reduciendo el uso de clases e id innecesarios para vincular estilos a un solo elemento.

Para ello, podemos utilizar los **elementos estructurales** de HTML5 de forma adecuada, como:
```
<header>, <aside>, <section>, <article>, <menu>, <footer>...
```
**Mal:**
```
<div id="encabezado"></div>
<div id="navegacion"></div>
<div id="contenido">
	<div class="articulo"></div>
	<div class="articulo"></div>
</div>
<div id="pie"></div>
```
**Bien:**
```
<header></header>
<nav></nav>
<main>
	<article></article>
	<article></article>
</main>
<footer></footer>
```
### 7 - Omite el valor de atributos booleanos

Existen atributos en HTML conocidos como [atributos booleanos](http://w3c.github.io/html/infrastructure.html#sec-boolean-attributes). Según el estándar, y a pesar de lo que pueda parecer, estos atributos no admiten los valores *true* o *false*, se representan incluyendo (*true*) u omitiendo (*false*) su nombre.

Son ejemplos de **atributos booleanos**:
```
checked, selected, disabled, readonly...
```
Es por ello, que debemos usarlos correctamente y omitir siempre su valor.

**Mal:**
```
<input type="checkbox" name="ejemplo" checked="checked">
```
**Bien:**
```
<input type="checkbox" name="ejemplo" checked>
```

### 8 - Especifica el idioma usado en la página

Otra de las básicas es indicar en qué idioma se encuentra el contenido de nuestra página, por ejemplo:
```
<!DOCTYPE html>
<html lang="es">
	...
</html>
```
Gracias al código anterior indicamos que nuestra página se encuentra en español. 

### 9 - Especifica la codificación de caracteres

También de las más conocidas, especificar correctamente la **codificación de caracteres** nos permitirá la correcta visualización del contenido de nuestra página, incluyendo tildes y caracteres especiales como *ñ*, indicando al navegador cómo debe interpretarlos.

Para especificarla, debemos añadir la siguiente línea al *header* de la página:
```
<meta charset="UTF-8"/>
```
En este caso indicamos como sistema de codificación **UTF-8** al ser el más extendido y usado.

Si deseas conocer más información sobre la codificación de caracteres puedes consultar el siguiente [artículo de la W3C](https://www.w3.org/International/questions/qa-html-encoding-declarations).

### 10 - Valida tu código

La última práctica que vamos a mencionar en este artículo es **validar** nuestro código para comprobar que cumple con los estándares. Y qué mejor forma para validarlo que usando la herramienta realizada por la misma organización que establece dichos estándares: [W3C](https://validator.w3.org/).

Hay que tener en cuenta que no nos debemos obsesionar con el resultado, ya que no obtener la validación complete no quiere decir siempre que sea un mal código. Podéis comprobar el resultado de la validación de páginas como [Google](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.google.es%2F), [Twitter](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftwitter.com%2F) o incluso [GitHub](https://validator.w3.org/nu/?doc=https%3A%2F%2Fgithub.com%2F).

![Validador HTML de W3C](https://raw.githubusercontent.com/YuneVK/YuneVK.github.io/master/blog/buenas-practicas-html/img/validador-html-w3c.png "Validador HTML de W3C")

A pesar de ellos, sí lo podemos usar como un **depurador** útil para identificar ciertos errores, lo que nos puede ahorrar tiempo a la hora de identificar dichos fallos.

### Para finalizar

De todas las pautas que existen y podríamos comentar, hemos seleccionado estas diez por ser las que consideramos más importantes, aunque hay muchas más.

En **Web App Design** apostamos siempre por crear código de calidad, que garantice legibilidad, mantenibilidad y compatibilidad con todos los navegadores.

¿Qué opinas de estas pautas? ¿Sueles seguirlas? ¿Tienes alguna que quieras añadir? No dudes en dejarnos un comentario en esta publicación o a través de nuestras redes sociales.