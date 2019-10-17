<?php
    require ('../common.php');

    $status = '';
    $response = '';
    $productos = [];
    $emoticones = [];
    
    if ($conn) {
        $qSelect = mysqli_query($conn, "select * from usuario inner join productos on usuario.idUsuario = productos.idUsuario inner join getuserinformation on usuario.idusuario = getuserinformation.idusuario;") or die(mysqli_error($conn));
        $eSelect = mysqli_query($conn, "select e.IdEmoticon, e.NombreDeEmoticon, e.Precio, s.TituloSaga, e.Thumbnail from emoticon as e inner join saga as s on e.IdSaga = s.IdSaga");
        if ($qSelect && $eSelect) {
            while($aux = mysqli_fetch_assoc($qSelect)) {
                $productos[] = $aux;
            }
            while($aux = mysqli_fetch_assoc($eSelect)){
                $emoticones[] = $aux;
            }

            $status = 'OK';
            $response = 'PRODUCTOS OBTENIDOS';
        } else {
            $status = 'BAD';
            $response = 'ERROR DE QUERY';
        }
    } else {
        $status = 'BAD';
        $response = 'ERROR DE CONEXION A LA BASE';
    }

    echo json_encode(array('status' => $status, 'response' => $response, 'productos'=>$productos, 'emoticones'=>$emoticones));
?>