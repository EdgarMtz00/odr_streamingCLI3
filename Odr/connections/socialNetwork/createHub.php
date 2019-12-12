<?php 
    require ('../common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    $tituloHub = $_POST['TituloHub'];
    $idUsuario = $_POST['IdUsuario'];
    $idSaga = $_POST['IdSaga'];
    $idPersonaje = $_POST['IdPersonaje'];

    $qCreateHub = mysqli_query($conn, "INSERT INTO hub (TituloHub, IdUsuario, IdSaga, IdPersonaje)
    VALUES ('$tituloHub', '$idUsuario', '$idSaga', '$idPersonaje');");

    if($qCreateHub){
        echo "Si se pudo subir UwU";
    } else {
        echo "No se pudo :c";
    }
?>