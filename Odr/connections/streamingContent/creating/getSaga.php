<?php  
	// De aqui se obtienen los datos necesarios para la creacion de un nuevo contenido
	require ('../../common.php');
	$dir = $urlBase . 'resources/';
	if(isset($_POST['idSaga'])){
		$idSaga = $_POST['idSaga'];
	}
	$result = [];
	$resultQ = NULL;

	if ($conn) {
		// Obtener informacion de las sagas
		$resultQ = mysqli_query($conn, "SELECT IdSaga, TituloSaga FROM saga");
		$idSaga = '';
		$sagaCont = 0;
		$holdersCont = 0;
		while ($aux = mysqli_fetch_assoc($resultQ)){
			$idSaga = $aux['IdSaga'];
			$result['Sagas'][$sagaCont] = $aux;
			$qHolders = mysqli_query($conn, "SELECT IdHolder, IdSaga, IdCategoria, TituloHolder, URLHolder FROM holder");
			while ($auxHolders = mysqli_fetch_assoc($qHolders)){
				$result['Sagas'][$sagaCont]['Holders'][$holdersCont++] = $auxHolders;
			}
			$sagaCont++;
		}

		$qCategorias = mysqli_query($conn, "SELECT * FROM getCategoriasType");
		$Categorias = [];
		while($auxCategs = mysqli_fetch_assoc($qCategorias)) {
			$Categorias[] = $auxCategs;
		}
		$result['Categorias'] = $Categorias;
		echo json_encode($result);
	}
 ?>