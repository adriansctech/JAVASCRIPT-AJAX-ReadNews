<?php
ini_set("display_errors", 1);

  if (isset($_REQUEST['fuente'])) {
	switch($_REQUEST['fuente']) {
		case "osi":
			$url="https://www.osi.es/actualidad/avisos/rss";
			break;
		case "linux":
			$url="http://www.linuxsecurity.com/static-content/linuxsecurity_advisories.rss";
			break;
		case "secure":
			$url="https://securelist.com/feed/";
			break;
		default:
			echo "La fuente indicada no es válida. Debe ser osi, linux o secure";
			return;
			break;
	}
    $xmlDoc = new DOMDocument('1.0', 'utf-8');
	$xmlDoc->load($url);
//	$xmlDoc->set_charset('utf8');

	$noticia=[];

	$noticia['medio']=$xmlDoc->getElementsByTagName('channel')->item(0)->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
	if ($_REQUEST['fuente']=='osi')
		$noticia['medio']="Oficina de Seguridad del Internauta - ".$noticia['medio'];

	$noticias=$xmlDoc->getElementsByTagName('item');
	$numNoticia=rand(0, ($noticias->length)-1);

	$noticia['titulo']=($noticias->item($numNoticia)->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue);
	$noticia['enlace']=$noticias->item($numNoticia)->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
	$noticia['pubdate']=$noticias->item($numNoticia)->getElementsByTagName('pubDate')->item(0)->childNodes->item(0)->nodeValue;

	echo json_encode($noticia);
  } else {
	echo "No has indicado ninguna fuente. Debe ser osi, linux o secure";
  }
?>
