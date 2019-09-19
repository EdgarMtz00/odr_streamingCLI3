<?php
    require ('../common.php');

    $userId = 'pito';

    if (isset($_POST['userId'])){
        $userId = $_POST['userId'];
    }

    if ($conn) {
        $qGetConfig = mysqli_query($conn, "SELECT * FROM getuserinformation WHERE IdUsuario = '$userId'");

        $rgetConfig = mysqli_fetch_assoc($qGetConfig);

        if ($rgetConfig) {
            echo json_encode($rgetConfig);
        } else {
            echo json_encode(array('response'=>'error'));
        }
    }
?>