<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");
header("Access-Control-Allow-Headers: *");

echo file_get_contents('https://www.wowprogress.com/guild/'
    . $_GET['region']
    .'/'
    . $_GET['realm']
    .'/'
    . $_GET['guild']
    .'/json_rank');