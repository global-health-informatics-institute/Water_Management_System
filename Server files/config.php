<?php
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";


try{
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
}catch (PDOException $e) {
   $errormsg = new stdClass();
   $errormsg->message = "Could not connect to the database";
   echo $errormsg;
   die();
}
