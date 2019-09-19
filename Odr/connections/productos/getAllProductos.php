<?php
    require ('../common.php');

    $status = '';
    $response = '';
    $productos = [];
    
    if ($conn) {
        $qSelect = mysqli_query($conn, "select * from usuario inner join productos on usuario.idUsuario = productos.idUsuario inner join getuserinformation on usuario.idusuario = getuserinformation.idusuario;") or die(mysqli_error($conn));

        if ($qSelect) {
            while($aux = mysqli_fetch_assoc($qSelect)) {
                $productos[] = $aux;
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

    echo json_encode(array('status' => $status, 'response' => $response, 'productos'=>$productos));
?>