# JAVASCRIPT-AJAX-ReadNews
Ejercicio relizado durante el curso de CFGS DAW, desarrollo de aplicaciones web, en el que se muestra una lista de posibilidades, que son fuentes de noticias sobre tencología, se irán mostranbdo noticias cada dos segundos según la fuente que hayamos escogido. Estainformación se mostrará adems con un enclace a su página correspondiente, si pùlsamos sobre ella, se abrirá en una nueva pestaña del navegador y podremos acceder a esta noticia y el contador de noticias seleccionadas se incrementará en +1. Concretamente el enunciado decía los iguiente: *****La página tiene un div donde se muestra una noticia cada 10 segundos y debajo un formulario para escoger de qué fuente queremos ver las noticias. Cada 10 segundos hace una petición a lectorRss.php al que le pasa una variable llamada fuente con los valores osi, linux o secure para indicarle la fuente. Dicha página devuelve un objeto JSON con:
medio: la fuente de la noticia, que mostraremos como título h3, 
titulo: el nombre de la noticia, 
enlace: url que mostraremos en una nueva ventana al pinchar sobre el título, 
pubdate: fecha en que se publicó.
Debajo hay una tabla que nos indica el total de noticias recibidas y vistas (que se ha hecho click en ellas) de cada fuente. Dichos datos se almacenarán para futuras visitas a nuestra página.
Debes controlar y mostrar posibles errores del servidor (que no responda, que devuelva un error en vez de un JSON, etc).*****
