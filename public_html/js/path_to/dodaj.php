<?php
    define ('SITE_ROOT', realpath(dirname(__FILE__) . '/path_to'));
    $tmp_file_name = $_FILES['Filedata']['tmp_name'];
    $ok=move_uploaded_file($tmp_file_name,SITE_ROOT.$_FILES['Filedata']['name']);
    // This message will be passed to 'oncomplete' function
    echo $ok ? "OK" : "FAIL";
?>