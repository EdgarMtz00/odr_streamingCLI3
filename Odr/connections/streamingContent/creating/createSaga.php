<?php
    require ('../../common.php');

    $spectedPostIndexes = ['tituloSaga', 'coverPic', 'bgPic'];
    $recivedPostValues = [];

    foreach ($spectedPostIndexes as $aux) {    
        if (isset($_POST[$aux])) {
            $recivedPostValues[$aux] = $_POST[$aux];
        }
    }

    //Generar la id aleatorea de los holders
    $auxId = md5(time() . mt_rand(1,1000000));
    $auxId = substr($auxId, 0, 15);
    //Nombres para las imagenes
    $coverPic = md5(time() . mt_rand(1,1000000));
    $coverPic = substr($coverPic, 0, 10);
    $bgPic = md5(time() . mt_rand(1,1000000));
    $bgPic = substr($bgPic, 0, 10);

    $coverPic = $coverPic.".jpg";
    $bgPic = $bgPic.".jpg";

    if ($conn) {
        $ruta = '../../../resources/';
        if (!file_put_contents( $ruta.$coverPic, base64_decode($recivedPostValues['coverPic']))) {
            unset($coverPic);
        }
        if (!file_put_contents( $ruta.$bgPic, base64_decode($recivedPostValues['bgPic']))) {
            unset($bgPic);
        }

        $coverPicUrl = $coverPic;
        $bgPicUrl = $bgPic;
        $tituloSaga = $recivedPostValues['tituloSaga'];
        $urlSaga = strtolower ($tituloSaga);
        $urlSaga = str_replace(" ", "-", $urlSaga);
        print($coverPicUrl);

        $queryInsert = mysqli_query($conn, "INSERT INTO saga (TituloSaga, ThumbnailSaga, BackgroundSaga, URLSaga) VALUES ('".$recivedPostValues['tituloSaga']."', '$coverPicUrl', '$bgPicUrl', '$urlSaga')");

        if($queryInsert)
            echo "ALLOK XD";
    }
?>