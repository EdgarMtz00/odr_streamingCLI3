<?php
    require ('../common.php');
    // Este archivo es para guaradar la configuracion del usuario que se le pase

    $configuration = 'pito';
    $fullUrl = '';

    if (isset($_POST['configuration'])){
        $configuration = json_decode($_POST['configuration'], true);
    }

    if ($conn) {
        $Imagen = base64_decode($configuration['base64']);
        $id = $configuration['id'];
        if(!is_dir('../../Profiles')){
            mkdir('../../Profiles');
        }
        if(!is_dir('../../Profiles/'.$id)){
            echo "CREATE PROFILE";
            mkdir('../../Profiles/'.$id);
        } else {
            echo "DONT CREATE PROFILE";
        }
        // if (file_put_contents('../../Profiles/'.$id.'/profile.jpg', $Imagen)) {
        //     print("SE GUARDO LA IMAGEN WE");
        //     $fullUrl = $urlBase . "Profiles/".$id."/profile.jpg";
        // }
            
        $qSaveConfig = mysqli_query($conn, "UPDATE personalizacion SET 
        NombreUsuario = '".$configuration['nombre']."',
        Nickname = '".$configuration['nickname']."',
        Descripcion = '".$configuration['descripcion']."',
        Sexo = '".$configuration['sexo']."',
        Ubicacion = '".$configuration['ubicacion']."',
        Imagen = '$fullUrl',
        Edad = '".$configuration['edad']."',
        NotificacionCorreo = '".$configuration['notificaciones']."',
        IdiomaPreferido = '".$configuration['idioma']."',
        ConfiguracionInicial = '".$configuration['configInicial']."'
        WHERE IdUsuario = '".$configuration['id']."'");

        if ($qSaveConfig)
            echo json_encode(array('response'=>'se ha updateado personalizacion'));
        else
            echo json_encode(array('response'=>'error: '));
    }
?>