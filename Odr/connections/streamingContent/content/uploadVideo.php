<?php
	header('Access-Control-Allow-Origin: *'); 
  require ('../../common.php');

  $idHolder = $_POST['idHolder'];
  $titulo = $_POST['titulo'];
  $URLHolder = $_POST['URLHolder'];
  $category = json_decode($_POST['category'], true);
  $urlVideo = generateUrl($titulo);

  // Crear carpeta del video
  $fullUrl = '../../../'.$category['NombreCategoria'].'/'.$URLHolder.'/'.$urlVideo;
	if(!is_dir($fullUrl)){
		mkdir($fullUrl, 0777, true);
	}

  $dir_subida = $fullUrl.'/';
  $file = $_FILES['file']['name'];
  $ext = pathinfo($file, PATHINFO_EXTENSION);
  $fichero_subido = $dir_subida . '1.' . $ext;
  if (move_uploaded_file($_FILES['file']['tmp_name'], $fichero_subido)) {
      echo json_encode(array('dir'=>$fichero_subido));
      $qSaveVideo = mysqli_query($conn, "INSERT INTO contenido (IdHolder, TituloContenido, URLContenido, NumeroElemento) 
        VALUES ('$idHolder', '$titulo', '$urlVideo', '1');");
      if ($qSaveVideo)
        echo 'video subido';
  } else {
      echo "¡Posible ataque de subida de ficheros!\n";
  }
?>  