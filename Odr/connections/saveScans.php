<?php 
	require ('common.php');
	$idLength = 15;
	$thumbnail = $_POST['thumbnailScans'];
	$idSaga = $_POST['idSaga'];
	$titulo = $_POST['tituloScans'];
	$descripcion = $_POST['descripcionScans'];
	$category = $_POST['category'];
	$scans = json_decode($_POST['Scans'], true);
	
	$idScanHolder = '';
	$nPaginas = '';
	$newTags = '';
	$saved = false;
	if (isset($_POST['idScanHolder'])){
		$idScanHolder = $_POST['idScanHolder'];
	}

	if (isset($_POST['nPaginas'])){
		$nPaginas = $_POST['nPaginas'];
	}

	if (isset($_POST['tags'])) {
		$newTags = $_POST['tags'];
	}
	// Genera la ID de los scans ejemplo "6cc815e0bb78fdb"
	$idScan = md5(time() . mt_rand(1,1000000));
	$idScan = substr($idScan, 0, $idLength);
	
	$ruta = '../'.$category.'/'.$idScanHolder;
	$fullRuta = $ruta.'/'.$idScan;

	$cont = 0;
	// Crear carpeta de categorias
	if(!is_dir('../'.$category)){
		mkdir('../'.$category);
	}
	// Crear carpeta individual del conjunto de scans
	if(!is_dir($fullRuta)){
		mkdir($fullRuta);
	}
	foreach ($scans as $aux) {
		$cont++;
		if (file_put_contents( $fullRuta.'/'.$cont.'.jpg', base64_decode($aux)) &&
			file_put_contents( $fullRuta.'/thumbnail.jpg', base64_decode($thumbnail))) {
			if ($conn && !$saved) {
				// echo $idScan.' '.$idSaga.' '.$idScanHolder.' '.$titulo.' '.$fullRuta.' '.$nPaginas;
				$query = "INSERT INTO scans VALUES ('$idScan','$idSaga', '$idScanHolder', '$titulo', '$idScan', '$nPaginas')";
				$resultQ = mysqli_query($conn, $query);
				if ($resultQ){
					echo "GOOD!";
					$saved = true;
					// Obtener todos los tags del ScanHolder
					$loadedTags = [];
					$resultSHT = mysqli_query($conn, "SELECT * FROM getshtags WHERE idScanHolder = '$idScanHolder'");
					while ($aux = mysqli_fetch_assoc($resultSHT)) {
						$loadedTags[] = $aux['nombretag'];
					}
					// Comprobar si algun tag del nuevo contenido no se encuentra en los del scanholder
					if (is_array($loadedTags)) {
						if (is_array($newTags)) {
							foreach ($newTags as $auxTag) {
								if (!in_array($auxTag, $loadedTags)) {
									getIdAndSave ($idScanHolder, $auxTag, $idScan, $conn);
								}
							}
						} else {
							if (!in_array($newTags, $loadedTags)) {
								getIdAndSave ($idScanHolder, $newTags, $idScan, $conn);
							}
						}
					} else {
						
					}
				}
				else
					echo "Bad Good :c";
			}
			echo "OK";
		}
		else{
			echo "BAD";
		}
	}

	function getIdAndSave ($idScanHolder, $newTag, $idScan, $conn) {
		// Obtener la id del tag nuevo
		$queryTag = mysqli_query($conn, "SELECT * FROM tags WHERE nombreTag = '$newTag'");
		$resultTag = mysqli_fetch_assoc($queryTag);
		$idTag = $resultTag['idTag'];
		// Guardar la nueva ID
		$querySTag = mysqli_query($conn, "INSERT INTO shtags (idScanHolder, idTag) VALUES ('$idScanHolder', '$idTag')");
		// Guardar tag en ScansTag
		$queryScansTag = mysqli_query($conn, "INSERT INTO tagsscan (idScans, idTag) VALUES ('$idScan', '$idTag')");
	}
 ?>