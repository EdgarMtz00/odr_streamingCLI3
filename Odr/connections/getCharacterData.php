<?php
    require ('common.php');
    $response = [];
    $charId = 'char2';

    if (isset($_POST['charId'])) {
        $charId = $_POST['charId'];
    }

    if ($conn) {
        $response['response'] = $charId;
        $getPersQuery = mysqli_query($conn, "SELECT * FROM personajes WHERE idPersonaje = '$charId'");
        while ($aux = mysqli_fetch_assoc($getPersQuery)) {
            $response['data'] = $aux;
        }
        $getDataQuery = mysqli_query($conn, "SELECT * FROM getpersrelholders WHERE idPersonaje = '$charId'");
        while ($aux = mysqli_fetch_assoc($getDataQuery)) {
            $response['related'][] = $aux;
        }
        echo json_encode($response);
    }
?>