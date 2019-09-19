<?php
    // Este PHP es para conseguir especificamente los nombres de todos los personajes que hay, solamente,
    // para poder mostrarlos sin la descripcion que pues puede ser larga y pesada
    require ('common.php');
    $response = [];

    if ($conn) {
        $getPersQuery = mysqli_query($conn, "SELECT idPersonaje, nomPersonaje FROM personajes");
        while ($aux = mysqli_fetch_assoc($getPersQuery)) {
            $response[] = $aux;
        }
        echo json_encode($response);
    }
?>