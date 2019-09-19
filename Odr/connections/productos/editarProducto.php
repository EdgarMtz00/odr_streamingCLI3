<?php
    require ('../common.php');
    $titulo = '';   if (isset($_POST['titulo'])){ $titulo = $_POST['titulo']; }
    $descripcion = '';   if (isset($_POST['descripcion'])){ $descripcion = $_POST['descripcion']; }
    // $creador = '';   if (isset($_POST['creador'])){ $creador = $_POST['creador']; }
    $stock = "";   if (isset($_POST['stock'])){ $stock = $_POST['stock']; }
    $categoria = "";   if (isset($_POST['categoria'])){ $categoria = $_POST['categoria']; }
    $precio = "";   if (isset($_POST['precio'])){ $precio = $_POST['precio']; }
    $nFotos = 0;   if (isset($_POST['nFotos'])){ $nFotos = $_POST['nFotos']; }
    $imagenes = []; if (isset($_POST['imagenes'])){ $imagenes = json_decode($_POST['imagenes'], true); }
    $id = ''; if (isset($_POST['id'])){ $id = $_POST['id']; }

    $status = '';
    $response = '';
    
    if ($conn) {
        $qCreate = mysqli_query($conn, "UPDATE productos SET nombreProducto = '$titulo', descripcion = '$descripcion', cantidad = '$stock',
        precio = '$precio', numeroElemento = '$nFotos', categoria = '$categoria' WHERE idProducto = '$id'") 
        or die(mysqli_error($conn));

        if ($qCreate) {
            $ruta = "../../productos/". $id .'/';
            $imgCont = 0;
            foreach($imagenes as $aux) {
                $imgCont++;
                if(file_put_contents($ruta.$imgCont.'.jpg', base64_decode($aux))){
                }
            }
            $status = 'OK';
            $response = 'PRODUCTO EDITADO';
        } else {
            $status = 'BAD';
            $response = 'ERROR DE QUERY';
        }
    } else {
        $status = 'BAD';
        $response = 'ERROR DE CONEXION A LA BASE';
    }

    echo json_encode(array('status' => $status, 'response' => $response, 'id'=>$id));
?>