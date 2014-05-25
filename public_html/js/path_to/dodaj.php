<?php

      $fileTypes = array('bmp'); // Allowed file extensions
      define ('SITE_ROOT', realpath(dirname(__FILE__) . '/path_to'));
      $tmp_file_name = $_FILES['Filedata']['tmp_name'];
      $fileParts = pathinfo($_FILES['Filedata']['name']);
        if (in_array(strtolower($fileParts['extension']), $fileTypes)) {
            move_uploaded_file($tmp_file_name,SITE_ROOT.$_FILES['Filedata']['name']);
             echo 'ok';
            } else {
    echo 'Invalid file type.';
    }
    ?>