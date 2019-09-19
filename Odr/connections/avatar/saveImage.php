<?php
    require ('../common.php');

    $imagen = $_POST['imagen'];
    $profile = $_POST['profile'];
    // $profile = 'UO6GgA1HonYuP5DrYSOslx1Ldq53';
    print("El perfil: " . $profile);

    if(file_put_contents('../../Profiles/'.$profile."/profile.jpg", base64_decode($imagen))){
        print("TODO BIEN");
    } else {
        print("TODO MAL");
    }
?>