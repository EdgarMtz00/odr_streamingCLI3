<?php
    require ('common.php');
    $charId = '';
    $idPersHold = generateId (15);
    $idScanHolder = '';

    if (isset($_POST['charId'])) {
        $charId = $_POST['charId'];
    }

    if (isset($_POST['idScanHolder'])) {
        $idScanHolder = $_POST['idScanHolder'];
    }

    if ($conn) {
        $getPersQuery = mysqli_query($conn, "INSERT INTO personajesholder VALUES ('$idPersHold', '$charId', '$idScanHolder')");
        if ($getPersQuery)
            print("CHAR AÑADIDO");
        else
            print("CHAR NO AÑADIDO :C");
    }
?>