<?php 
    require ('../common.php');

    $tituloThread = $_POST['TituloThread'];
    $contenidoPost = $_POST['ContenidoPost'];
    $idUsuario = $_POST['IdUsuario'];
    $idSaga = $_POST['IdSaga'];
    $idCategoria = $_POST['IdCategoria'];
    $fecha = $_POST['FechaDeCreacion'];

    $qCreateTopic = mysqli_query($conn, "INSERT INTO thread (TituloThread, ContenidoThread, FechaDeCreacion, IdUsuario, IdSaga, IdCategoriaForo)
    VALUES ('$tituloThread', '$contenidoPost', '$fecha', '$idUsuario', '$idSaga', '$idCategoria');");

    if($qCreateTopic){
        echo "Si se pudo subir UwU";
    } else {
        echo "No se pudo :c";
    }
?>