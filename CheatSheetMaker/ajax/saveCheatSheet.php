<?php

    if (!empty($HTTP_RAW_POST_DATA)) {
        $file = fopen("../cheatSheets/theOne.json", "w");
        fwrite($file, $HTTP_RAW_POST_DATA);
        fclose($file);
    }

?>