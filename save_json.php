<?php
        // Append new form data in json string saved in text file

        // path and name of the file
    $filetxt = 'service_scheme.json';

        // check if all form data are submited, else output error message
        if(isset($_POST['title']) && isset($_POST['lat']) && isset($_POST['lng']) && isset($_POST['description']) && isset($_POST['category'])) {
        // if form fields are empty, outputs message, else, gets their data
        if(empty($_POST['title']) || empty($_POST['lat']) || empty($_POST['lng']) || empty($_POST['description']) || empty($_POST['category'])) {
            echo 'All fields are required';
        }
        else {
        // gets and adds form data into an array
       $data = array(
          'title'=> $_POST['title'],
          'lat'=> (float) $_POST['lat'],
          'lng'=> (float) $_POST['lng'],
          'description'=> $_POST['description'],
          'category'=> $_POST['category'],
        );

        // path and name of the file
        $filetxt = 'service_scheme.json';

        $arr_data = array();        // to store all form data

        // check if the file exists
        if(file_exists($filetxt)) {
          // gets json-data from file
          $jsondata = file_get_contents($filetxt);

          // converts json string into array
          $arr_data = json_decode($jsondata, true);
        }

        // appends the array with new form data
        $arr_data[] = $data;

        // encodes the array into a string in JSON format (JSON_PRETTY_PRINT - uses whitespace in json-string, for human readable)
        $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

        // saves the json string in "data.txt" (in "dirdata" folder)
        // outputs error message if data cannot be saved
        if(file_put_contents('dirdata/data.txt', $jsondata)) echo 'Data successfully saved';
        else echo 'Tidak dapat menyimpan data di "dirdata/data.txt"';
      }
    }
        else echo 'Form fields not submited';
    ?>