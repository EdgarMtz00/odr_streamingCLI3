<?php 
    require ('../common.php');

    $contenidoPost = $_POST['ContenidoPost'];
    $idUsuario = $_POST['IdUsuario'];
    $fecha = $_POST['FechaDeCreacion'];
    $idThread = $_POST['IdThread'];

    $qCreatePost = mysqli_query($conn, "INSERT INTO post (ContenidoPost, FechaDeCreacion, IdUsuario, IdThread)
    VALUES ('$contenidoPost', '$fecha', '$idUsuario', '$idThread');");

    if($qCreatePost){
        echo "Si se pudo subir UwU";
    } else {
        echo "No se pudo :c";
    }
?>