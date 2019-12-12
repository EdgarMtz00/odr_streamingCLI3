<?php 
	header('Access-Control-Allow-Origin: *'); 
	//$conn = mysqli_connect('localhost', 'root', '', 'odr_streaming'); //<- Primera version
	//$conn = mysqli_connect('localhost', 'root', '', 'odr');
	$conn = mysqli_connect('localhost', 'id11554100_root', 'odrdatabase', 'id11554100_odr');
	$urlBase = 'http://localhost/Odr/';

	function generateId ($idLength) {
		$id = md5(time() . mt_rand(1,1000000));
		$id = substr($id, 0, $idLength);
		return $id;
	}

	function generateUrl ($data) {
		$url = strtolower ($data);
		$url = str_replace(" ", "-", $url);
		return $url;
	}

	function getLastId ($conn) {
		$id = mysqli_query($conn, "SELECT LAST_INSERT_ID();");
		$id = mysqli_fetch_assoc($id);
		$id = $id['LAST_INSERT_ID()'];
		return $id;
	  }
 ?>