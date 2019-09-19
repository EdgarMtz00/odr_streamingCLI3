<?php 
	require ('../../common.php');

	$thumbnail = $_POST['thumbnailScans'];
	$idHub = $_POST['idHub'];
	$pie = $_POST['pieImagen'];
    $scans = json_decode($_POST['Scans'], true);
    $fechaDeCreacion = $_POST['fechaDeCreacion'];
    $idUsuario = $_POST['IdUsuario'];

    $saved = false;

	$urlScans = generateUrl($pie);
	
	$ruta = '../../Hub'.$idHub
	$fullRuta = $ruta.'/'.$urlScans;

	print("fullRuta: " . $fullRuta);

	$cont = 0;
	// Crear carpeta individual del conjunto de scans
	if(!is_dir($fullRuta)){
		mkdir($fullRuta);
	}
	// Guardar data en la base de datos
	$qSaveScan = mysqli_query($conn, "INSERT INTO imagenhub (URLImagen, PieImagen, FechaDeCreacion, IdUsuario, IdHub) 
	VALUES ('$urlScans', '$pie', '$fechaDeCreacion', '$idUsuario', '$idHub');");
	if ($qSaveScan)
		echo "Hurra";
	else 
		echo "Alv no se guardo";
	
	// Mover a una carpeta cada scan individual
	foreach ($scans as $aux) {
		$cont++;
		if (file_put_contents( $fullRuta.'/'.$cont.'.jpg', base64_decode($aux)) &&
			file_put_contents( $fullRuta.'/thumbnail.jpg', base64_decode($thumbnail))) {
			echo "OK";
		}
		else{
			echo "BAD";
		}
	}
 ?>