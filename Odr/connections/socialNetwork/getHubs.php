<?php
    // Este php es para obtener los datos para el componente
    require('../common.php');
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    $hubs = [];

    if ($conn) {
        // Obteniendo hubs
        $qHubs = mysqli_query($conn, "SELECT TituloHub, IdHub, IdSaga, IdPersonaje, hub.IdUsuario, Nickname FROM hub, personalizacion where hub.IdUsuario = personalizacion.IdUsuario");
        while ($auxQHubs = mysqli_fetch_assoc($qHubs)) {
            $hubs[] = $auxQHubs;
        }
        
        echo json_encode(array('hubs'=>$hubs));
    }
?>