<?php
    require ('../common.php');
    $titulo = '';   if (isset($_POST['titulo'])){ $titulo = $_POST['titulo']; }
    $descripcion = '';   if (isset($_POST['descripcion'])){ $descripcion = $_POST['descripcion']; }
    $idUsuario = '';   if (isset($_POST['idUsuario'])){ $idUsuario = $_POST['idUsuario']; }
    $stock = "";   if (isset($_POST['stock'])){ $stock = $_POST['stock']; }
    $categoria = "";   if (isset($_POST['categoria'])){ $categoria = $_POST['categoria']; }
    $precio = "";   if (isset($_POST['precio'])){ $precio = $_POST['precio']; }
    $nFotos = 0;   if (isset($_POST['nFotos'])){ $nFotos = $_POST['nFotos']; }
    $imagenes = []; if (isset($_POST['imagenes'])){ $imagenes = json_decode($_POST['imagenes'], true); }
    $id = '';

    $status = '';
    $response = '';
    
    if ($conn) {
        $qCreate = mysqli_query($conn, "INSERT INTO productos 
        (idUsuario, nombreProducto, descripcion, cantidad, precio, numeroElemento, categoria) VALUES 
        ('$idUsuario','$titulo', '$descripcion', '$stock', '$precio', '$nFotos', '$categoria')") 
        or die(mysqli_error($conn));

        if ($qCreate) {
            $ruta = "../../Productos/". getLastId ($conn) .'/';
            $imgCont = 0;
            // Crear carpeta individual del producto
            if(!is_dir($ruta)){
                mkdir($ruta, 0777, true);
            }
            foreach($imagenes as $aux) {
                $imgCont++;
                if(file_put_contents($ruta.$imgCont.'.jpg', base64_decode($aux))){
                }
            }
            $id = getLastId($conn);
            $status = 'OK';
            $response = 'PRODUCTO CREADO';
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