<?php
    require('../../common.php');
    $tags = [];

    if ($conn) {
        $qTags = mysqli_query($conn, "SELECT * FROM tags");
        while($auxQTags = mysqli_fetch_assoc($qTags)) {
            $tags[] = $auxQTags;
        }
        echo json_encode($tags);
    }
?>