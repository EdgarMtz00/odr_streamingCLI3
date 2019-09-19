<?php
include 'common.php';
$body = file_get_contents('php://input'); 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idUsuario = $body['idUsuario'];
    $idLogro = $body['idLogro'];
    $repeticiones = $body['rep'];
    $response = array();

    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and u.idLogro = '$idLogro'");
    if($logro){
        $logro = mysqli_fetch_assoc($logro);
        if($logro['progreso'] < $logro['repeticiones']){
            $actualizar_logro = mysqli_query($conn, "UPDATE usuariologros SET progreso = progreso + '$repeticiones' WHERE idUsuario = '$idUsuario' and idLogro = '$idLogro'");
        }
    }else{
        $crear_logro = mysqli_query($conn, "INSERT INTO usuariologros (IdUsuario, IdLogro, progreso) Values '$idUsuario', '$idLogro', '$repeticiones'");
    }
    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and u.idLogro = '$idLogro'");
    $response['completado'] = $logro['progreso'] >= $logro['repeticiones'];
    echo json_encode($response);
}elseif($_SERVER['REQUEST_METHOD']=='GET'){
    $idUsuario = $_GET['idUsuario'];
    $response = mysqli_query($conn, "SELECT * from usuariologros where idUsuario = '$idUsuario'");
    echo json_encode(mysqli_fetch_assoc($response));
}
 ?>