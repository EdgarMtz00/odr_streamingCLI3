<?php
include 'common.php';
$body = file_get_contents('php://input'); 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idUsuario = $body['idUsuario'];
    $idLogro = $body['idLogro'];
    $repeticiones = $body['rep'];
    $response = array();
    //revisar si ya tiene progreso en el logro
    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and u.idLogro = '$idLogro'");
    if($logro){
        //si es asi lo aumenta
        $logro = mysqli_fetch_assoc($logro);
        if($logro['progreso'] < $logro['repeticiones']){
            $actualizar_logro = mysqli_query($conn, "UPDATE usuariologros SET progreso = progreso + '$repeticiones' WHERE idUsuario = '$idUsuario' and idLogro = '$idLogro'");
        }
    }else{
        //si no, crea la relacion entre el logro y el usuario
        $crear_logro = mysqli_query($conn, "INSERT INTO usuariologros (IdUsuario, IdLogro, progreso) Values '$idUsuario', '$idLogro', '$repeticiones'");
    }
    //regresa la informacion del logro creado o modificado
    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and u.idLogro = '$idLogro'");
    $response['completado'] = $logro['progreso'] >= $logro['repeticiones'];
    echo json_encode($response);
}elseif($_SERVER['REQUEST_METHOD']=='GET'){
    $idUsuario = $_GET['idUsuario'];
    //nueva query para obtener logro + progreso si es que hay
    $result = mysqli_query($conn, "SELECT l.IdLogro, l.recompensa, l.descripcion, l.titulo, l.repeticiones, u.progreso from logros as l left join usuariologros as u on u.idLogro = l.idLogro and u.idUsuario = '$idUsuario'");
    $response = array();
    //juntar y enviar todos los logros
    while($row = mysqli_fetch_assoc($result)){
        $response[] = $row;
    }
    echo json_encode($response);
}
 ?>