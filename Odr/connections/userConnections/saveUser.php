<?php
    require ('../common.php');

    // Esta es la configuracion inicial, cuando se cree un usuario se van a crear filas relacionadas con el usuario en varias tablas pero con informacion vacia
    // Como por ejemplo la tabla de personalizacion

    $userId = '';
    $userEmail = '';
    $hora = '';

    if (isset($_POST['userId'])){
        $userId = $_POST['userId'];
    }
    if (isset($_POST['userEmail'])){
        $userEmail = $_POST['userEmail'];
    }
    if (isset($_POST['hora'])){
        $hora = $_POST['hora'];
    }

    if ($conn) {
        $qSaveUser = mysqli_query($conn, "INSERT INTO usuario VALUES ('$userId', '4', '$userEmail')");
        if(!is_dir('../../Profiles')){
            mkdir('../../Profiles');
        }
        if(!is_dir('../../Profiles/'.$userId)){
            mkdir('../../Profiles/'.$userId);
        }

        if ($qSaveUser) {
            // Crear su fila en personalizacion
            $qCreateConfig = mysqli_query($conn, "INSERT INTO personalizacion (idUsuario, FechaDeRegistro)  VALUES ('$userId', '$hora')");
            if ($qSaveUser) {
                echo json_encode(array('response'=>'ok'));
            } else {
                echo json_encode(array('response'=>'error no se creo personalizacion'));    
            }
        } else {
            echo json_encode(array('response'=>'error no se creo el usuario'));
        }
    }
?>