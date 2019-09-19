<?php
    require ('../common.php');
    $urlSaga = 'puella-magi-madoka-magica';
    if (isset($_POST['urlSaga'])){
        $urlSaga = $_POST['urlSaga'];
    }

    if ($conn) {
        $qSagas = mysqli_query($conn, "SELECT * FROM saga WHERE URLSaga = '$urlSaga'");
        $resQSaga = mysqli_fetch_assoc($qSagas);
        $idSaga = $resQSaga['IdSaga'];
        //Obtener holders de una saga
        $contHolders = 0; //Contador para controlar index de los holders
        $qHolders = mysqli_query($conn, "SELECT * FROM getholdersdata WHERE IdSaga = '$idSaga'");
        while ($aux = mysqli_fetch_assoc($qHolders)) {
            // Añadir holders al arreglo de sagas
            $resQHolder [$contHolders] = $aux;
            //Obtener tags de un holder
            $idHolder = $aux['IdHolder']; // ID del holder para traer los tags
            $contTags = 0;
            $qTagsHolder = mysqli_query($conn, "SELECT * FROM gettagsinfo WHERE IdHolder = '$idHolder'");
            while ($auxTags = mysqli_fetch_assoc($qTagsHolder)) {
                $resQHolder [$contHolders]['tags'][$contTags++] = $auxTags;
            }

            //Obtener los contenidos de cada holder
            $qContenidos = mysqli_query($conn, "SELECT * FROM getcontentdata WHERE IdHolder = '$idHolder'");
            $contenidos = [];
            $contContenidos = 0;
            while($auxContenidos = mysqli_fetch_assoc($qContenidos)) {
                $resQHolder [$contHolders]['contenidos'][$contContenidos++] = $auxContenidos;
            }

            // Obtener los personajes que aparecen en los holders
            $contPersonajes = 0;
            $qPers = mysqli_query($conn, "SELECT idPersonaje, nombrepersonaje, urlpersonaje FROM getpersonajesdata WHERE idHolder = '$idHolder'");
            while ($auxPers = mysqli_fetch_assoc($qPers)) {
                $resQHolder [$contHolders]['personajes'][$contPersonajes++] = $auxPers;
                // print_r($resQHolder);
            }
            $resQSaga ['holders'] = $resQHolder;

            $contHolders++;
        }
        //Obtener las categorias de la saga
        $qSagaCateg = mysqli_query($conn, "SELECT * FROM getSagaCategs WHERE IdSaga = $idSaga");
        while ($auxSagaCateg = mysqli_fetch_assoc($qSagaCateg)) {
            $resQSaga ['categorias'][] = $auxSagaCateg;
        }
        print_r(json_encode($resQSaga));
    }
?>