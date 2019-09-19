<?php 
	require ('../../common.php');

	$thumbnail = $_POST['thumbnailScans'];
	$idSaga = $_POST['idSaga'];
	$titulo = $_POST['tituloScans'];
	$URLHolder = $_POST['URLHolder'];
	$category = json_decode($_POST['category'], true);
	$scans = json_decode($_POST['Scans'], true);
	
	$idHolder = '';
	$nPaginas = '';
	$newTags = '';
	$saved = false;
	if (isset($_POST['idScanHolder'])){
		$idHolder = $_POST['idScanHolder'];
	}

	if (isset($_POST['nPaginas'])){
		$nPaginas = $_POST['nPaginas'];
	}

	if (isset($_POST['tags'])) {
		$newTags = $_POST['tags'];
	}

	$urlScans = generateUrl($titulo);
	
	$nomCategoria = $category['NombreCategoria'];
	$ruta = '../../../'.$nomCategoria.'/'.$URLHolder;
	$fullRuta = $ruta.'/'.$urlScans;

	print("fullRuta: " . $fullRuta);

	$cont = 0;
	// Crear carpeta de categorias
	if(!is_dir('../'.$nomCategoria)){
		mkdir('../'.$nomCategoria);
	}
	// Crear carpeta individual del conjunto de scans
	if(!is_dir($fullRuta)){
		mkdir($fullRuta);
	}
	// Guardar data en la base de datos
	$qSaveScan = mysqli_query($conn, "INSERT INTO contenido (IdHolder, TituloContenido, URLContenido, NumeroElemento) 
	VALUES ('$idHolder', '$titulo', '$urlScans', '$nPaginas');");
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

	// function getIdAndSave ($idScanHolder, $newTag, $idScan, $conn) {
	// 	// Obtener la id del tag nuevo
	// 	$queryTag = mysqli_query($conn, "SELECT * FROM tags WHERE nombreTag = '$newTag'");
	// 	$resultTag = mysqli_fetch_assoc($queryTag);
	// 	$idTag = $resultTag['idTag'];
	// 	// Guardar la nueva ID
	// 	$querySTag = mysqli_query($conn, "INSERT INTO shtags (idScanHolder, idTag) VALUES ('$idScanHolder', '$idTag')");
	// 	// Guardar tag en ScansTag
	// 	$queryScansTag = mysqli_query($conn, "INSERT INTO tagsscan (idScans, idTag) VALUES ('$idScan', '$idTag')");
	// }
 ?>