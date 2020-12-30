<?php
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
$db_host = 'localhost';
$db_username = 'sedhec_hcuser';
$da_password = 'kampala12345';
$db_name = 'badaye_';
$mysqli = new mysqli($db_host, $db_username, $da_password, $db_name);

if($mysqli->connect_error){
    die('Error: (' .  $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

?>
