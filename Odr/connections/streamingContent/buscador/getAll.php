<?php
    // Este php es para obtener los datos para el buscador
    require('../../common.php');
    $sagas = [];
    $holders = [];
    $personajes = [];
    $usuarios = [];

    if ($conn) {
        // Obteniendo sagas
        $qSagas = mysqli_query($conn, "SELECT TituloSaga, ThumbnailSaga, URLSaga FROM saga");
        while ($auxQSagas = mysqli_fetch_assoc($qSagas)) {
            $sagas[] = $auxQSagas;
        }
        // Obteniendo holders
        $qHolders = mysqli_query($conn, "SELECT TituloHolder, URLHolder, URLSaga, NombreCategoria 
        FROM getholdersdata INNER JOIN saga on getholdersdata.IdSaga = saga.IdSaga");
        while ($auxQHolders = mysqli_fetch_assoc($qHolders)) {
            $holders[] = $auxQHolders;
        }
        // Obteniendo personajes
        $qPersonajes = mysqli_query($conn, "SELECT NombrePersonaje, URLPersonaje FROM personajes");
        while ($auxQPersonajes = mysqli_fetch_assoc($qPersonajes)) {
            $personajes[] = $auxQPersonajes;
        }
        // Obteniendo usuarios
        $qUsuarios = mysqli_query($conn, "SELECT * FROM getUsers");
        while ($auxQUsuarios = mysqli_fetch_assoc($qUsuarios)) {
            $usuarios[] = $auxQUsuarios;
        }

        echo json_encode(array('sagas'=>$sagas, 'holders'=>$holders, 'personajes'=>$personajes, 'usuarios'=>$usuarios));
    }
?>