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
        // Ver si el usuario que se desea agregar ya lo tiene agregado
        $idChat = generateId(10);
        $qChatExists = mysqli_query($conn, "SELECT idChat FROM amigos WHERE IdUsuario = '$idFriend' AND IdUsuario2 = '$idUser'");
        if (mysqli_num_rows($qChatExists) > 0) {
            $idChat = mysqli_fetch_assoc($qChatExists);
            $idChat = $idChat['idChat'];
            $response .= ' Chat exists ';
            $response .= ' IdUsuario '.$idFriend.' IdUsuario2 '.$idUser.' ';
        } else {
            $response .= ' Chat dont exists';
        }
        $qFriend = mysqli_query($conn, "INSERT INTO amigos (IdUsuario, IdUsuario2, idChat) VALUES ('$idUser', '$idFriend', '$idChat');");
        if ($qFriend) {
            $status = 'OK';
            $response .= ' Friend added';
        } else {
            $status = 'BAD';
            $response .= ' Friend NOT added';
        }
    } else {
        $status = 'BAD';
        $response .= 'No DB connection';
    }
    echo json_encode(array('status' => $status, 'response' => $response, 'idChat'=>$idChat));
?>