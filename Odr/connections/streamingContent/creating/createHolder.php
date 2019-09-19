<?php
    require ('../../common.php');

    $response = "";
    $status = "";
    $spectedPostIndexes = ['idSaga', 'titleHolder', 'descriptionHolder', 'category', 'nomCategory', 
        'thumbnail', 'idChar', 'tags'];
    $recivedPostValues = [];
    //Generar la id aleatorea de los holders
    $auxId = md5(time() . mt_rand(1,1000000));
    $auxId = substr($auxId, 0, 15);
    $recivedPostValues['idScanHolder'] = $auxId;
    // Checar todos los indices de POST esperados y almacenar los que se hayan recibido
    foreach ($spectedPostIndexes as $aux) {
        if (isset($_POST[$aux])) {
            $recivedPostValues[$aux] = $_POST[$aux];
        }
    }
    // Obtener el arreglo de personajes
    $arrayCharacters = json_decode($recivedPostValues['idChar']);
    $tituloHolder = $recivedPostValues['titleHolder'];
    $urlHolder = generateUrl($tituloHolder);

    $queryResult = mysqli_query($conn, "INSERT INTO holder (IdSaga, TituloHolder, DescripcionHolder, IdCategoria, URLHolder) 
        VALUES ('".$recivedPostValues['idSaga']."', '$tituloHolder', 
        '".$recivedPostValues['descriptionHolder']."', '".$recivedPostValues['category']."', '$urlHolder');");
    $idHolder = mysqli_query($conn, "SELECT LAST_INSERT_ID();");
    $idHolder = mysqli_fetch_assoc($idHolder);
    $idHolder = $idHolder['LAST_INSERT_ID()'];
    
    if ($queryResult) {
        // Si la categoria del holder no esta en la saga ps se añade
        $qCategSaga = mysqli_query($conn, "SELECT * FROM sagacateg");
        $auxArray = [];
        while ($auxFetch = mysqli_fetch_assoc($qCategSaga)) {
            $auxArray [] = $auxFetch['idCategoria'];
        }
        if (!in_array($recivedPostValues['category'], $auxArray)) {
            $qInsertCateg = mysqli_query($conn, "INSERT INTO sagacateg (idSaga, idCategoria) VALUES ('".$recivedPostValues['idSaga']."',
                '".$recivedPostValues['category']."')");

            if ($qInsertCateg)
                $response .= "PTM AL FIN 222";
            else 
                $response .= "NOO 222";
        }else {
            $response .= "nomms 222";
        }

        // Insertar las tags del holder 
        $tags = json_decode($recivedPostValues['tags'], true);
        foreach ($tags as $auxTag) {
            $idTag = $auxTag['IdTag'];
            $qTags = mysqli_query($conn, "INSERT INTO holdertags (IdHolder, IdTag) VALUES ('$idHolder', '$idTag')");
        }

        // Si la categoria del holder no esta añadida en la tabla que controla las categorias de los holders se añade
        // Version anterior???
        // $querycategHolders = mysqli_query($conn, "SELECT * FROM shcateg");
        // $auxArray = [];
        // while ($auxFetch = mysqli_fetch_assoc($querycategHolders)) {
        //     $auxArray [] = $auxFetch;
        // }
        // if (!in_array($recivedPostValues['category'], $auxArray)) {
        //     $qInsertCateg = mysqli_query($conn, "INSERT INTO shcateg (idCategoria, idScansHolder) VALUES ('".$recivedPostValues['category']."',
        //         '".$recivedPostValues['idScanHolder']."')");

        //     if ($qInsertCateg)
        //         echo "PTM AL FIN";
        //     else 
        //         echo "NOO";
        // }else {
        //     echo "nomms";
        // }

        $ruta = '../../../'.$recivedPostValues['nomCategory'];
        //Crear carpeta de la categoria
        if(!is_dir($ruta)){
            $response .= 'Carpeta CREADA CATEGORIA';
            mkdir($ruta);
        }
        // Crear la carpeta del holder
        if(!is_dir($ruta.'/'.$urlHolder )){
            $response .= 'Carpeta CREADA';
            mkdir($ruta.'/'.$urlHolder );
        }
        // Mover el thumbnail del holder a su carpeta
        if (file_put_contents( $ruta.'/'.$urlHolder .'/thumbnail.jpg', base64_decode($recivedPostValues['thumbnail']))) {
            $response .= 'thumbnail MOVIDO';
            // Añadir los personajes del holder
            if (is_array($arrayCharacters) || is_object($arrayCharacters)) {
                foreach($arrayCharacters as $auxId) {
                    $getPersQuery = mysqli_query($conn, "INSERT INTO holderpersonajes (idHolder, idPersonaje) VALUES ('$idHolder', '$auxId')");
                    if ($getPersQuery)
                        $response .= "CHAR AÑADIDO";
                    else
                        $response .= "CHAR NO AÑADIDO :C";
                }
            }
        }

        $status = 'OK';
    } else {
        $status = 'BAD';
    }

    echo json_encode(array('status' => $status, 'response' => $response));
?>