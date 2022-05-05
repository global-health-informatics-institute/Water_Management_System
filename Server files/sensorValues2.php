<?php

$user = "esp32";
$password = "password";
$database = "Water_Management_System";
$table1 = "sensorValues";
$table2 ="commands";

try{
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  $myObj = new stdClass();

  foreach($db->query("SELECT * FROM $table1") as $row) {
    $myObj->pressure = $row['Pressure'] ;
    $myObj->wellTank = $row['WellTank'] ;
    $myObj->wbTank = $row['WbTank'] ;
    $myObj->warning1 = $row['warning1'] ;
    $myObj->warning2 = $row['warning2'] ;
  }

  foreach($db->query("SELECT * FROM $table2") as $row) {
    $myObj->pump1 = $row['wellPump'];
    $myObj->pump2 = $row['pressurePump'];
    $myObj->valve1 = $row['wellValve'];
    $myObj->valve2 = $row['WbValve'];
    $myObj->override = $row['overRide'];

  }


  $myJSON = json_encode($myObj);
  echo $myJSON;

} catch (PDOException $e) {
   $errormsg = new stdClass();
   $errormsg->message = "Could not connect to the database";
   echo $errormsg;
   die();
}
