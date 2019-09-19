<?php
    // Este php es para obtener los datos para el componente
    require('../common.php');
    $posts = [];

    if ($conn) {
        // Obteniendo sagas
        $qPosts = mysqli_query($conn, "SELECT IdPost, ContenidoPost, FechaDeCreacion, IdThread, post.IdUsuario, Nickname FROM post, personalizacion WHERE post.IdUsuario = personalizacion.IdUsuario");
        while ($auxQPosts = mysqli_fetch_assoc($qPosts)) {
            $posts[] = $auxQPosts;
        }
        
        echo json_encode(array('posts'=>$posts));
    }
?>