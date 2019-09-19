<?php
    require ('../common.php');
    $idProfile = '';
    $response = '';
    $status = '';
    if (isset($_POST['idProfile'])) {
        $idProfile = $_POST['idProfile'];
    }

    if ($conn) {
        $qUser = mysqli_query($conn, "SELECT * FROM personalizacion  WHERE IdUsuario = '$idProfile'");
        if ($qUser) {
            $response = mysqli_fetch_assoc($qUser);
            $status = 'OK';
        } else {
            $response = 'NO SE ENCONTRO USER';
            $status = 'ERROR';
        }
        echo json_encode(array('response'=>$response, 'status'=>$status));
    }
?>