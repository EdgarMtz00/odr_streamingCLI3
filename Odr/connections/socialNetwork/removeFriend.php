<?php
    require('../common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    $idUser = '';
    $idFriend = '';
    $status = "";
    $response = "";

    if (isset($_POST['idUser'])){
        $idUser = $_POST['idUser'];
    }
    if (isset($_POST['idUser'])) {
        $idFriend = $_POST['idFriend'];
    }

    if ($conn) {
        $qFriend = mysqli_query($conn, "DELETE FROM amigos WHERE IdUsuario = '$idUser' AND IdUsuario2 = '$idFriend'");
        if ($qFriend) {
            $status = 'OK';
            $response = 'Friend removed';
        } else {
            $status = 'BAD';
            $response = 'Friend NOT removed';
        }
    } else {
        $status = 'BAD';
        $response = 'No DB connection';
    }
    echo json_encode(array('status' => $status, 'response' => $response));
?>