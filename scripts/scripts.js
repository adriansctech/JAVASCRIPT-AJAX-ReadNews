var origin = document.getElementsByName("origin");
/*
	Creamos contadores para las mostrar en la tabla las noticias recibidas y clickadas
*/
var countOsi = 0;
var countLinux = 0;
var countSecure = 0;
var countOsiSelected = 0;
var countLinuxSelected = 0;
var countSecureSelected = 0;
/*
	La siguiente variable la utilizaremos como auxiiliar para almacenar la información
	de la noticia que se ha clicado para luego contarla en particular contador
*/
var infoMedio = null;
window.onload = function() {
	/*
		ejecutamos una peticion nada más se muestra el index.html
	*/
	sendPetition();
	/*
		Luego llamamos al a función setInterval para que ejecute la funcion que le indicamos 
		cada tiempo determinado, en este caso es cada dos segundos
	*/
	setInterval(sendPetition, 2000);	
}

function sendPetition(){	
	var petition = new XMLHttpRequest();//Obtenemos la instancia del objeto XMLHttpRequest
	/*
		Llamamos a la función que cuente las veces que se ha seleccionado esa fuente y modifique
		su valor en el código HTML, le enviamos una funcion que devuelve el elemento que esta 
		seleccionado de los radio buttons del HTML
	*/
	//countNew(checkedField());
	/*
		Incluimos dentro de la variable fuente el valor del radioButton 
		que se ha pulsado para realizar la petición AJAX
	*/
	var fuente = "fuente="+checkedField();	
	/*
		Creamos la petición AJAX
	*/	
	petition.onreadystatechange = showNew;//Preparamos la funcion de respuesta
	petition.open('POST', 'scripts/lectorRss.php');//Preparamos la peticion HTTP
	petition.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");	
	petition.send(fuente);//Realizamos la peticion HTTP

}

function showNew(){
	var medio = document.getElementById('medio');
	var title = document.getElementById('title');
	var link = document.getElementById('link');
	var pubdate = document.getElementById('pubdate');
	/*
		readystate: es el estado de la petición, tiene varios códigos para guiarnos;
		0: petición no iniciada
		1: conexión con el servidor establecida
		2: solicitud recibida en el servidor
		3: procesando solicitud
		4: solicitud finalizada y resultado disponible
		Nosotros preguntaremos por el estado 4
	*/
	if(this.readyState == 4){
		/*
			Si el código que nos ha devuelto es un 200, todo ha ido bien, sino tratamos el error
			y se lo mostramos al usuario en un alert, aprovechamos los mensajes de error para 
			poder ofrecer más información de el por qué ha fallado la petición.
		*/
		if(this.status == 200){
			/*
				Trataremos la respuesta de l apetición dentro de un try/catch por si falla algo
			*/
			try{
				/*
					Ahora copnvertimos en un objeto la respuesta del servidor que 
					nos la envia en formato JSON
				*/	
				var arrayNew = JSON.parse(this.responseText);
				//Insertamos la respuesta en los diferentes elementos del HTML				
				medio.innerHTML = arrayNew.medio;				
				title.innerHTML = arrayNew.titulo;
				link.setAttribute("href", arrayNew.enlace);
				link.setAttribute("target", "_blank");
				infoMedio = medio.innerHTML;
				link.addEventListener("click", countNewSelected);
				pubdate.innerHTML = arrayNew.pubdate;
				//Llamamos a la función que cuente las veces que el medio se ha repetido como noticia recibida				
				countNew(checkedField());
			}catch(err){
				alert("Ha ocurrido algún error");
			}				
		}else{
			alert("Ha ocurrido un error; "+this.status+" y su descripción es: "+this.statusText+", el servidor nos ha devuelto esto: "+this.responseText);
		}
	}
}
	
function countNew(fuente){	
	/*
		Esta función dependiendo de la fuente que haya recibido 
		incrementará el valor de las veces que se ha recibido la noticia de un medio
	*/
	switch(fuente){
		case "osi":
			countOsi++;
			document.getElementById("osi_recibed").innerHTML = countOsi;
			break;
		case "linux":
			countLinux++;
			document.getElementById("linux_recibed").innerHTML = countLinux;
			break;
		case "secure": 
			countSecure++;
			document.getElementById("secur_recibed").innerHTML = countSecure;
			break;	
	}
}

//function countNewSelected(medio){	
function countNewSelected(){	
	/*
		Esta función incrementará el valor de la tabla en noticias seleccionadas por 
		el usuario, para ello extraeremos el valor y locomprobaremos
	*/	
	switch(infoMedio){	
		case "Oficina de Seguridad del Internauta - Avisos de seguridad":
			countOsiSelected++;
			document.getElementById("osi_clicked").innerHTML = countOsiSelected;
			break;
		case "LinuxSecurity.com - Security Advisories":
			countLinuxSelected++;
			document.getElementById("linux_clicked").innerHTML = countLinuxSelected;
			break;
		case "Securelist - Information about Viruses, Hackers and Spam": 
			countSecureSelected++;
			document.getElementById("secur_clicked").innerHTML = countSecureSelected;
			break;
	}
}

function checkedField(){
	/*
		Esta función recorre los radio button para averiguar cual es el que se ha seleccionado
		y devolverlo cada vez que se ejecuta 
	*/
	for(var i=0 ; document.getElementsByName("origin").length ; i++){
		if(document.getElementsByName("origin")[i].checked){
			return document.getElementsByName("origin")[i].value;
		}
	}
}