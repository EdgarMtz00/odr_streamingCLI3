<?php  
	require ('../common.php');
	$dir = $urlBase . 'resources/';
	if(isset($_POST['idSaga'])){
		$idSaga = $_POST['idSaga'];
	}
	$result = [];
	$resultQ = NULL;

	if ($conn) {
		if (isset($idSaga)) {
			$resultQ = mysqli_query($conn, "SELECT * FROM getSagaData WHERE idSaga = '$idSaga'");
		} else {
			$resultQ = mysqli_query($conn, "SELECT * FROM saga");
		}
		if (mysqli_num_rows($resultQ) > 0) {
			while ($aux = mysqli_fetch_assoc($resultQ)) {
				$result[] = $aux;
			}
			echo json_encode($result);
		}
	}
 ?>