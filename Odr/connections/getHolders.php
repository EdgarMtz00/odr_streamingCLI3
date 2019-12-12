<?php
    require('common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    $idSaga = 'asdqeqw';
    if (isset($_POST['idSaga'])) {
        $idSaga = $_POST['idSaga'];
    }
    if ($conn) {
        $resultH = mysqli_query($conn, "SELECT * FROM scansHolder WHERE idSaga = '$idSaga'");
        $result = [];
        while ($aux = mysqli_fetch_assoc($resultH)) {
            $result[] = $aux;
        }
        if ($resultH) {
            echo json_encode($result);
        }
    }
?> 