<?php
    // Este php es para obtener los datos para el componente
    require('../common.php');
    $categories = [];

    if ($conn) {
        // Obteniendo Categorias del foro
        $qCategories = mysqli_query($conn, "SELECT NombreCategoria, Descripcion, URLCategoria, IdCategoriaForo FROM categoriaforo");
        while ($auxQCategories = mysqli_fetch_assoc($qCategories)) {
            $categories[] = $auxQCategories;
        }
        
        echo json_encode(array('categorias'=>$categories));
    }
?>