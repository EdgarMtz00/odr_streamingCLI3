<?php
    require ('common.php');
    $charName = '';
    $charDesc = '';
    $charPics = [];
    $profilePic = '';
    $nPaginas = 0;
    $idChar = generateId (15);

    if (isset($_POST['charName'])){
        $charName = $_POST['charName'];
    }
    if (isset($_POST['charDesc'])){
        $charDesc = $_POST['charDesc'];
    }
    if (isset($_POST['charPics'])){
        $charPics = json_decode($_POST['charPics'], true);
    }
    if (isset($_POST['profilePic'])){
        $profilePic = $_POST['profilePic'];
    }
    if (isset($_POST['nPaginas'])){
        $nPaginas = $_POST['nPaginas'];
    }

    // print_r($charPics);
    print($charName);
    print($charDesc);
    // print($profilePic);
    print($idChar);
    print($nPaginas);
    
    if ($conn) {
        print('Si hubo conn xd');
        $ruta = "../Characters/".$idChar.'/';
        $imgCont = 0;
        $insertQuery = mysqli_query($conn, "INSERT INTO personajes VALUES ('$idChar', '$charName', '$charDesc', '$nPaginas');");
        if ($insertQuery) {
            // Crear carpeta individual del conjunto de scans
            if(!is_dir($ruta)){
                mkdir($ruta);
            }
            foreach($charPics as $aux) {
                $imgCont++;
                if(file_put_contents($ruta.$imgCont.'.jpg', base64_decode($aux))){
                    print('imgSubida');
                }
            }
            if(file_put_contents($ruta.'profile.jpg', base64_decode($profilePic))){
                print('profileSubido');
            }
        }
    }
?>