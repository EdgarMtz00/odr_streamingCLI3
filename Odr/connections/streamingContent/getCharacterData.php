<?php
    require ('../common.php');
    $response = [];
    $charUrl = 'madoka-kaname';

    if (isset($_POST['urlChar'])) {
        $charUrl = $_POST['urlChar'];
    }

    if ($conn) {
        $response['response'] = $charUrl;
        $idPersonaje = '';
        $getPersQuery = mysqli_query($conn, "SELECT * FROM personajes WHERE URLPersonaje = '$charUrl'");
        while ($aux = mysqli_fetch_assoc($getPersQuery)) {
            $response['data'] = $aux;
            $idPersonaje = $aux['IdPersonaje'];
        }
        $getDataQuery = mysqli_query($conn, "SELECT * FROM getrelatedholders WHERE idPersonaje = '$idPersonaje'");
        while ($aux = mysqli_fetch_assoc($getDataQuery)) {
            $response['related'][] = $aux;
        }
        echo json_encode($response);
    }
?>