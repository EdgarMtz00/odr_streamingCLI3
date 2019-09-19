<?php
    // Este php es para obtener los datos para el componente
    require('../common.php');
    $sagas = [];

    if ($conn) {
        // Obteniendo sagas
        $qSagas = mysqli_query($conn, "SELECT TituloSaga, ThumbnailSaga, URLSaga, IdSaga FROM saga");
        while ($auxQSagas = mysqli_fetch_assoc($qSagas)) {
            $sagas[] = $auxQSagas;
        }
        
        echo json_encode(array('sagas'=>$sagas));
    }
?>