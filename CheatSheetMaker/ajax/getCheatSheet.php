<?php

    if (!empty($HTTP_RAW_POST_DATA) && file_exists("../cheatSheets/" . $HTTP_RAW_POST_DATA . ".json")) {
        echo file_get_contents("../cheatSheets/" . $HTTP_RAW_POST_DATA . ".json");
    }

?>