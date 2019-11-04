<?php
    require ('../../common.php');
    $charName = '';
    $charDesc = '';
    $charPics = [];
    $profilePic = '';
    $nPaginas = 0;
    $url = "";
    $status = "";
    $response = "";

    if (isset($_POST['charName'])){
        $charName = $_POST['charName'];
    }
    if (isset($_POST['charDesc'])){
        $charDesc = $_POST['charDesc'];
        $charDesc = str_replace("\n", "<br>", $charDesc);
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

    $url = generateUrl($charName);
    $charDesc = str_replace("'", "''", $charDesc);
    
    if ($conn) {
        $ruta = "../../../Characters/".$url.'/';
        $imgCont = 0;
        $insertQuery = mysqli_query($conn, "INSERT INTO personajes (NombrePersonaje, DescripcionPersonaje, NumeroImagenes, URLPersonaje) 
        VALUES ('$charName', '$charDesc', '$nPaginas', '$url');");
        if ($insertQuery) {
            // Crear carpeta individual del conjunto de scans
            if(!is_dir($ruta)){
                mkdir($ruta, 0777, true);
            }
            foreach($charPics as $aux) {
                $imgCont++;
                if(file_put_contents($ruta.$imgCont.'.jpg', base64_decode($aux))){
                    $response .= 'imgSubida';
                }
            }
            if(file_put_contents($ruta.'profile.jpg', base64_decode($profilePic))){
                $response .= 'profileSubido';
            }
            $status = "OK";
        } else {
            $status = "BAD";
            $response .= mysqli_error($conn);
        }
    } else {
        $status = "BAD CONN";
        $response .= mysqli_error($conn);
    }

    echo json_encode(array('status' => $status, 'response' => $response));
?>