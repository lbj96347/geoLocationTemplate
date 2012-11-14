<?php

header('Content-type: text/json');

$lat = $_REQUEST['lat'];

$lng = $_REQUEST['lng'];

$baidu_key = 'b9b9393ff19a9555bbda777c572419aa';

$location =  'http://api.map.baidu.com/geocoder?output=json&location='.$lat.',%20'.$lng.'&key='.$baidu_key; 

$json = file_get_contents($location);

echo $json;

?>
