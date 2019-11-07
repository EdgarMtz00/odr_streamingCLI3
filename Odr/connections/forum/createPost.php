<?php 
    require ('../common.php');

    $contenidoPost = $_POST['ContenidoPost'];
    $idUsuario = $_POST['IdUsuario'];
    $fecha = $_POST['FechaDeCreacion'];
    $idThread = $_POST['IdThread'];

    $qCreatePost = mysqli_query($conn, "INSERT INTO post (ContenidoPost, FechaDeCreacion, IdUsuario, IdThread)
    VALUES ('$contenidoPost', '$fecha', '$idUsuario', '$idThread');");

    if($qCreatePost){
        //buscar logro llamado creador de contenido 
        $logro = mysqli_query($conn, "SELECT u.progreso, l.repeticiones, l.IdLogro from usuariologros as u join logros as l on u.idLogro = l.idLogro Where u.idUsuario = '$idUsuario' and l.Titulo like 'Creador de contenido%'");
        $logro = mysqli_fetch_assoc($logro);
        //si ya estaba registrado 
        if($logro){
            //lo aumenta
            if($logro['progreso'] < $logro['repeticiones']){
                $actualizar_logro = mysqli_query($conn, "UPDATE usuariologros as u, logros as l SET u.progreso = u.progreso + '1' WHERE u.idUsuario = '$idUsuario' and l.Titulo like 'Creador de contenido%'");
            }
        }else{
            //si no, crea la relacion entre el logro y el usuario
            $crear_logro = mysqli_query($conn, "INSERT INTO usuariologros (IdUsuario, IdLogro, progreso) Values ('$idUsuario', 43, 1), ('$idUsuario', 44, 1), ('$idUsuario', 45, 1), ('$idUsuario', 46, 1), ('$idUsuario', 47, 1)");
        }
        echo "Si se pudo subir UwU";
    } else {
        echo "No se pudo :c";
    }
?>