<?php
    require ('../common.php');
    $id = ''; if (isset($_POST['id'])){ $id = $_POST['id']; }

    $status = '';
    $response = '';
    
    if ($conn) {
        $qBorrar = mysqli_query($conn, "DELETE FROM productos WHERE idProducto = '$id'") 
        or die(mysqli_error($conn));

        if ($qBorrar) {
            $status = 'OK';
            $response = 'PRODUCTO BORRADO';
        } else {
            $status = 'BAD';
            $response = 'ERROR DE QUERY';
        }
    } else {
        $status = 'BAD';
        $response = 'ERROR DE CONEXION A LA BASE';
    }

    echo json_encode(array('status' => $status, 'response' => $response));
?>