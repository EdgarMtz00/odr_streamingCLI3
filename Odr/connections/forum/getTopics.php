<?php
    // Este php es para obtener los datos para el componente
    require('../common.php');
    $topics = [];

    if ($conn) {
        // Obteniendo sagas
        $qTopics = mysqli_query($conn, "SELECT TituloThread, ContenidoThread, FechaDeCreacion, IdThread, IdSaga, IdCategoriaForo, thread.IdUsuario, Nickname FROM thread, personalizacion WHERE thread.IdUsuario = personalizacion.IdUsuario");
        while ($auxQTopics = mysqli_fetch_assoc($qTopics)) {
            $topics[] = $auxQTopics;
        }
        
        echo json_encode(array('topics'=>$topics));
    }
?>