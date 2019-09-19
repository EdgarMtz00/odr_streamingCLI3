<?php 
require ('common.php');

	if ($conn) {
		$resultQ = mysqli_query($conn, "SELECT * FROM categorias");
		$result = [];

		if (mysqli_num_rows($resultQ) > 0) {
			while ($aux = mysqli_fetch_assoc($resultQ)) {
				$result[] = $aux;
			}
			echo json_encode($result);
		}
	}
 ?>