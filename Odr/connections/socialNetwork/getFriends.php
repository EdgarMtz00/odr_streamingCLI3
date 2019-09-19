<?php
    require('../common.php');
    $idUser = '';
    $status = "";
    $response = "";
    $friends = [];

    if (isset($_POST['idUser'])){
        $idUser = $_POST['idUser'];
    }

    if ($conn) {
        $qFriends = mysqli_query($conn, "SELECT * FROM getamigos WHERE IdUsuario = '$idUser';");
        if ($qFriends) {
            $status = 'OK';
            while ($auxFriends = mysqli_fetch_assoc($qFriends)) {
                $friends[] = $auxFriends;
            }
        } else {
            $status = 'BAD';
            $response = 'Error query';
        }
    } else {
        $status = 'BAD';
        $response = 'No DB connection';
    }
    echo json_encode(array('status' => $status, 'response' => $response, 'data' => $friends));
?>