<?php
include 'common.php';
$body = file_get_contents('php://input'); 
$body = json_decode($body);
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idUsuario = $body->idUsuario;
    $nombreLogro = $body->nombreLogro;
    if($nombreLogro == 'Pelicula'){
        $nombreLogro = 'cinefilo';
    }
    $repeticiones = 1;
    $response = array();
    $busqueda = '%'.strtolower($nombreLogro).'%';
    //revisar si ya tiene progreso en el logro
    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones, l.IdLogro from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and l.titulo like '$busqueda'");
    if($logro){
        //si es asi lo aumenta
        while($l = $logro->fetch_array(MYSQLI_ASSOC)){
            $id = $l["IdLogro"];
            if($l['progreso'] < $l['repeticiones']){
                $actualizar_logro = mysqli_query($conn, "UPDATE usuariologros SET progreso = progreso + '$repeticiones' WHERE idUsuario = '$idUsuario' and idLogro = '$id'");
            }
        }
    }else{
        //si no, crea la relacion entre el logro y el usuario
        if($nombreLogro == 'Serie'){
            $logro = array(3, 4, 5, 6, 7);
        }else if($nombreLogro == 'Anime'){
            $logro = array(8, 9, 10, 11, 12);
        }else if($nombreLogro == 'Libro'){
            $logro = array(13, 14, 15, 16, 17);
        }else if($nombreLogro == 'Cinefilo'){
            $logro = array(18, 19, 20, 21, 22);
        }else if($nombreLogro == 'Comic'){
            $logro = array(23, 24, 25, 26, 27);
        }else   if($nombreLogro == 'Manga'){
            $logro = array(28, 29, 30, 31, 32);
        }else if($nombreLogro == 'Revista'){
            $logro = array(33, 34, 35, 36, 37);
        }else if($nombreLogro == 'Música'){
            $logro = array(38, 39, 40, 41, 42);
        }
        foreach($logro as $id){
            $crear_logro = mysqli_query($conn, "INSERT INTO usuariologros (IdUsuario, IdLogro, progreso) Values ('$idUsuario', '$id', '$repeticiones')");
        }
    }
    //regresa la informacion del logro creado o modificado
    $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and l.titulo = '$nombreLogro'");
    $logro = mysqli_fetch_assoc($logro);
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