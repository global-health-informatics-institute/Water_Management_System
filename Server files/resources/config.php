<?php
$user = "admin";
$password = "password";
$database = "WMS";

//connect to database
$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
?>
