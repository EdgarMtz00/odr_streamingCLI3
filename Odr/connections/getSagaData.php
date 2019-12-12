<?php
    require ('common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

	$idSaga = '';
    if(isset($_POST['idSaga'])){
		$idSaga = $_POST['idSaga'];
	}else {
		$idSaga = 'asdqeqw'; //SIempre madoka awebo
	}
    //Raiz direccion de imagenes
    $dir = $urlBase . 'resources/';

    $resultado = [];
    $categs = [];
    $scans = [];
    $tags = [];
    //Contadores
    $contHolders = 0;

    if ($conn) {

        $resultSagaInfo = mysqli_query($conn, "select tituloSaga, thumbnailSaga, backgroundSaga from saga WHERE idSaga = '$idSaga'");
        while ($auxResultSagaInfo = mysqli_fetch_assoc($resultSagaInfo)) {
            $auxResultSagaInfo['backgroundSaga'] = $dir.$auxResultSagaInfo['backgroundSaga'];
            $auxResultSagaInfo['thumbnailSaga'] = $dir.$auxResultSagaInfo['thumbnailSaga'];
            $resultado['infoSaga'] = $auxResultSagaInfo;
        }
    	//Devuelve todos los holder de una saga
    	$resultHolder = mysqli_query($conn, "select * from getshdata WHERE idSaga = '$idSaga';");
    	while ($auxResHold = mysqli_fetch_assoc($resultHolder)) {
            
    		$idScanHolder = $auxResHold['idScanHolder'];
    		$resultado['holders'][$contHolders] = $auxResHold;

            //Obtener scans
            $contScans = 0;
            $resultScans = mysqli_query($conn, "select * from getcontentdataview WHERE idScanHolder = '$idScanHolder';");
            while ($auxResultScans = mysqli_fetch_assoc($resultScans)) {
                $scans[$contScans] = $auxResultScans;
                $idScan = $auxResultScans['idScans'];
                // Obtemer tags de scans individuales
                $resultScanTags = mysqli_query($conn, "SELECT * FROM tagsscan INNER JOIN tags ON tagsscan.idTag = tags.idTag WHERE idScans = '$idScan';");
                while ($auxScanTags = mysqli_fetch_assoc($resultScanTags)) {
                    $scans[$contScans]['tags'][] = $auxScanTags['nombreTag'];
                }
                $contScans++;
            }

            //Obtener tags
            $resultTags = mysqli_query($conn, "select * from getshtags WHERE idScanHolder = '$idScanHolder'");
            while ($auxResultTags = mysqli_fetch_assoc($resultTags)) {
                $tags[] = $auxResultTags;
            }

            // Obtener personajes del holder
            $queryCharacters = mysqli_query ($conn, "SELECT * FROM getholdercharacters WHERE idScanHolder = '$idScanHolder'");
            $arrayChars = [];
            while ($auxCharacts = mysqli_fetch_assoc($queryCharacters)) {
                $arrayChars[] = $auxCharacts;
            }
            $resultado['holders'][$contHolders]['characters'] = $arrayChars;

            $resultado['holders'][$contHolders]['tags'] = $tags;
            
            $tags = [];
            

            $resultado['holders'][$contHolders]['scans'] = $scans;

            $contHolders++;
            $scans = [];

    		//Obtener categorias de todos los holders de la saga
    		$resultCateg = mysqli_query($conn, "select nomCategoria from shcateg inner join categorias on shcateg.idCategoria = categorias.idCategoria WHERE idScansHolder = '$idScanHolder';");
    		while ($auxResultCateg = mysqli_fetch_assoc($resultCateg)) {
    			$categs[] = $auxResultCateg['nomCategoria'];
            }
            $resultado['infoSaga']['categoriasSaga'] = $categs;

            
        }
        // Modifique el php en una ocacion y tenia que hacer que devolviera un arreglo infosaga y dentro categoriasSaga
        // para no tener que cambiar todo el proyecto de la pagina
        $auxArray = array ();
        if (isset ($resultado['infoSaga']['categoriasSaga']))
            foreach(array_unique($resultado['infoSaga']['categoriasSaga']) as $xd){
                $auxArray[]= $xd;
            }

        $resultado['infoSaga']['categoriasSaga'] = $auxArray;
        echo json_encode($resultado);
    }
?>