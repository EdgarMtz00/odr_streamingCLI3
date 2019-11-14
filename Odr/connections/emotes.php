<?php
require ('common.php');

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $idUsuario = $_GET['idUsuario'];    
    $query = mysqli_query($conn, "Select * from usuarioemoticon where idUsuario = '$idUsuario'");
    while ($aux = mysqli_fetch_assoc($query)) {
        $response[] = $aux;
    }
    echo json_encode($response);
}
