<?php 
require ('common.php');
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

	if ($conn) {
		$resultQ = mysqli_query($conn, "SELECT * FROM tags");
		$result = [];

		if (mysqli_num_rows($resultQ) > 0) {
			while ($aux = mysqli_fetch_assoc($resultQ)) {
				$result[] = $aux;
			}
			echo json_encode($result);
		}
	}
 ?>