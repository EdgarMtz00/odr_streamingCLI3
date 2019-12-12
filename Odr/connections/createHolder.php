<?php
    require ('common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    $spectedPostIndexes = ['idSaga', 'titleHolder', 'descriptionHolder', 'category', 'nomCategory', 
        'thumbnail', 'idChar'];
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

    $queryResult = mysqli_query($conn, "INSERT INTO scansholder VALUES ('".$recivedPostValues['idScanHolder']."', '".$recivedPostValues['idSaga']."',
        '".$recivedPostValues['titleHolder']."', '".$recivedPostValues['descriptionHolder']."', '".$recivedPostValues['category']."')");
    
    if ($queryResult) {
        // Si la categoria del holder no esta en la saga ps se añade
        $qCategSaga = mysqli_query($conn, "SELECT * FROM sagacateg");
        $auxArray = [];
        while ($auxFetch = mysqli_fetch_assoc($qCategSaga)) {
            $auxArray [] = $auxFetch['idCategoria'];
        }
        if (!in_array($recivedPostValues['category'], $auxArray)) {
            print_r($auxArray);
            print("NO PUEDE SER ".$recivedPostValues['category']);
            $qInsertCateg = mysqli_query($conn, "INSERT INTO sagacateg (idSaga, idCategoria) VALUES ('".$recivedPostValues['idSaga']."',
                '".$recivedPostValues['category']."')");

            if ($qInsertCateg)
                echo "PTM AL FIN 222";
            else 
                echo "NOO 222";
        }else {
            echo "nomms 222";
        }

        // Si la categoria del holder no esta añadida en la tabla que controla las categorias de los holders se añade
        $querycategHolders = mysqli_query($conn, "SELECT * FROM shcateg");
        $auxArray = [];
        while ($auxFetch = mysqli_fetch_assoc($querycategHolders)) {
            $auxArray [] = $auxFetch;
        }
        if (!in_array($recivedPostValues['category'], $auxArray)) {
            $qInsertCateg = mysqli_query($conn, "INSERT INTO shcateg (idCategoria, idScansHolder) VALUES ('".$recivedPostValues['category']."',
                '".$recivedPostValues['idScanHolder']."')");

            if ($qInsertCateg)
                echo "PTM AL FIN";
            else 
                echo "NOO";
        }else {
            echo "nomms";
        }

        $ruta = '../'.$recivedPostValues['nomCategory'];
        // Crear la carpeta del holder
        if(!is_dir($ruta.'/'.$auxId)){
            echo 'Carpeta CREADA';
            mkdir($ruta.'/'.$auxId);
        }
        // Mover el thumbnail del holder a su carpeta
        if (file_put_contents( $ruta.'/'.$auxId.'/thumbnail.jpg', base64_decode($recivedPostValues['thumbnail']))) {
            echo 'thumbnail MOVIDO';
            // Añadir los personajes del holder
            if (is_array($arrayCharacters) || is_object($arrayCharacters)) {
                foreach($arrayCharacters as $auxId) {
                    $idPersHold = generateId (15);
                    $getPersQuery = mysqli_query($conn, "INSERT INTO personajesholder VALUES ('$idPersHold', 
                        '$auxId', '".$recivedPostValues['idScanHolder']."')");
                    if ($getPersQuery)
                        print("CHAR AÑADIDO");
                    else
                        print("CHAR NO AÑADIDO :C");
                }
            }
        }

        echo 'OK';
    } else {
        echo 'NO OK';
    }
?>