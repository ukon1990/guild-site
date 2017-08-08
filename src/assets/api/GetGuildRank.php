<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");
header("Access-Control-Allow-Headers: *");

echo file_get_contents('https://www.wowprogress.com/guild/eu/emerald-dream/Cake%20or%20pie/json_rank');