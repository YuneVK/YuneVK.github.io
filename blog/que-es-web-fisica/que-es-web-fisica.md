# Qué es la Web Física o cómo podemos interactuar con lugares y dispositivos a través de un navegador web

## Hoy en día estamos cada vez más acostumbrados a oír hablar sobre el Internet de las Cosas o tecnologías como NFC, que han cambiado en muchos aspectos nuestro día a día. En este artículo os presentamos otras tecnologías como Web Bluetooth o Web Física que quizás no conocías.

Podríamos definir **Internet of Things** como la interconexión digital de objetos con Internet para intercambiar información con otros dispositivos. Tenemos un ejemplo del Internet de las Cosas en los **relojes inteligentes**, que nos indican nuestras pulsaciones, distancia recorrida, horas de sueño y se conectan a nuestro dispositivo móvil para permitirnos ver estadísticas de nuestra actividad diaria. Es un hecho que este modelo está en constante crecimiento, y compañías como Cisco preveen que [en 2020 tendremos más 50 billones de dispositivos conectados a Internet](http://www.cisco.com/c/dam/en_us/about/ac79/docs/innov/IoT_IBSG_0411FINAL.pdf).

Gracias a la últimas [especificaciones de Bluetooth](https://es.wikipedia.org/wiki/Bluetooth#Especificaciones_y_novedades) y la nueva [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) podemos dar un paso más allá y acercarnos a cumplir lo que nos promete **Google** a través de la **Web Física**: *"Walk up and use anything"* (o *"Acércate y usa cualquier cosa"* en español). Pero, ¿qué significan estos conceptos? ¿En qué consiste la Web Física y cómo nos puede afectar su implantación en nuestro día a día? Comencemos desde el principio.

### ¿Qué es Web Bluetooth?

**Web Bluetooth** es una API que nos permite la interacción de dispositivos con la web. El funcionamiento sería tan sencillo como abrir nuestro navegador habitual, conectarse a través de él a un dispositivo cercano con Bluetooth y controlarlo remotamente mediante el navegador.

**Bluetooth** es un **protocolo de comunicaciones** desarrollado en el año 1994 con el objetivo de ofrecer una versión alternativa a las comunicaciones con cables. 

Durante estos años se han desarrollado varias versiones de este protocolo, pero vamos a destacar la que ha permitido la creación de la tecnología web que estamos tratando en este artículo. **Bluetooth 4.0**, más conocido como **Bluetooth de baja energía** (*Bluetooth Low Energy*) o **Smart Bluetooth**, fue lanzado en el año 2010 y es destacado por su bajo consumo de energía, lo que permite su implantación en pequeños dispositivos con baterías que pueden durar años sin necesidad de cargarlas.

// Imagen bluetooth-smart.logo.png

A pesar de llevar ya unos años en desarrollo, la tecnología Web Bluetooth todavía no forma parte del estándar de **W3C**, y no se recomienda usarla en producción por el bajo [porcentaje de dispositivos compatibles](https://caniuse.com/#feat=web-bluetooth), aproximadamente un 50%, entre los que se encuentran los navegadores de Android, Chrome y Opera. Podemos conocer mejor el funcionamiento de esta API a través de su [documentación oficial](https://webbluetoothcg.github.io/web-bluetooth/).

### El papel de Google: balizas y Web Física

Han pasado unos años desde que **Google** presentó una propuesta para que los dispositivos móviles puedan interactuar con el entorno que les rodea: **Web Física** (*Physical Web*) y **balizas** (*Beacons*).

// Imagen physical-web-logo.png

A través de su [página web](https://google.github.io/physical-web/), describen la Web Física como un *"enfoque abierto que permite interacciones rápidas y sin fisuras con objetos físicos y ubicaciones"*. Mediante el uso de balizas que son escuchadas por los dispositivos de los usuarios a través de Bluetooth.

Cada elemento que emita una baliza contará con su propia **página web** (ya sea estática con ciertos datos o una interactiva con la que podamos interactuar) a la que podremos acceder desde nuestro dispositivo acercándonos y a través de la **notificación** que recibiremos. Cabe destacar que no necesitaremos conexión a internet para interactuar con estos elementos, ya que se realiza en **redes locales**.

// Imagen physical-web-ejemplo.png

Gracias a esta tecnología podremos interactuar con los elementos que nos rodean: parquímetros, carteles, paradas de autobuses, tiendas, museos... Y todo ello **sin instalar ninguna aplicación adicional**.

Imaginemos que nos acercamos a una parada de autobús y podemos ver de forma rápida desde nuestro móvil cuándo pasará el autobús que estamos esperando, o estar en un centro comercial y que, cuando realicemos una compra, esta información sea recogida por el parquímetro para aumentar nuestra estancia. Otro ejemplo podría ser encontrarnos un perro cuyo collar implemente esta tecnología y podamos saber al instante si se trata de un perro perdido y, en caso afirmativo, notificar al dueño, como podemos ver en el siguiente vídeo:

[Vídeo de YouTube](https://www.youtube.com/watch?v=-Y77cUI_z30)

Pero, ¿cómo funciona exactamente? Gracias a la Web Física podremos ver una **lista de enlaces** de los objetos que tenemos a nuestros alrededor desde nuestro dispositivo. Estos objetos contarán con una **baliza BLE** (*Bluetooth Low Energy*), que es un dispositivo que emitirá las señales de Bluetooth mediante [Eddystone](https://github.com/google/eddystone), un protocolo abierto y multiplataforma introducido por **Google** en 2015, que permite la comunicación sin instalar ninguna **App** y, además puede enviar información sobre sensores (temperatura, humedad...).

// Imagen web-fisica-ilustracion.png

Podemos ver una presentación realizada por el equipo de desarrollo a través del siguiente vídeo:

[Vídeo de YouTube](https://www.youtube.com/watch?v=1yaLPRgtlR0)

En resumen, podemos concluir que una **Web Física** está compuesta por una **baliza** y una **URL** que nos da acceso a una página o aplicación web.

Como es un proyecto **Open Source**, también podemos acceder a su [repositorio oficial de GitHub](https://github.com/google/physical-web) para leer su código, documentación y tener acceso a demos y recursos.

### Balizas, otra vez

Hablando de **balizas** (o *beacons*, en inglés) seguramente recordemos otra tecnología bastante introducida por **Apple** en iOS 7, **iBeacon**. También haciendo uso de **Bluetooth Low Energy**, una de las propuestas con las que se anunció era que las tiendas detectaran a potenciales compradores, y que al reconocerlos cerca pudieran enviar publicidad a sus dispositivos con, por ejemplo, ofertas especiales que puedan ser de interés para ellos.

// Imagen ibeacon-logo.png

Como vemos, es una tecnología bastante similar a la creada por Google, con la diferencia de que la Web Física (**Physical Web**) es un proyecto totalmente libre y cuya implementación es bastante más sencilla que la alternativa ofrecida por Apple.

### El futuro de esta tecnología

Como vemos, es un avance en el mundo de las comunicaciones, y supone una alternativa a otras tecnologías como** NFC**, cuyo rango de alcance máximo es de **20cm**, frente a los **100m** de **BLE**.

Algunos analistas aseguran que el concepto de **Physical Web*** supone el **futuro de Internet**, y un gran paso en el desarrollo del **Internet de las Cosas**, permitiendo que estemos cada vez más interconectados a los elementos que nos rodean. ¿Será un paso más para la desaparición de las aplicaciones móviles? ¿Crees que la tecnología web le está ganando terreno a las aplicaciones móviles? Te recomendamos nuestro artículo sobre [tipos de aplicaciones](https://webappdesign.es/apps-hibridas-nativas-y-web-responsive/) en el que comparamos aplicaciones nativas, web e híbridas. También te invitamos a que nos indiques en los comentarios qué opinas sobre estas cuestiones, si conocías ya esta tecnología y qué usos crees que se podría dar además de los ya mencionados.