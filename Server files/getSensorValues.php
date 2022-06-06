<?php

$tank_id = $_GET['q'];

$user = "admin";
$password = "password";
$database = "WMS";
$table1 = "sensorValues";
$table2 ="commands";

try{
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  $myObj = new stdClass();
  #$data_points = array();

  foreach($db->query("SELECT * FROM $table1 WHERE watertank_id = '".$tank_id."'") as $row) {
    
    #$points = array("x" => $row['Timestamp'],"y"=>$row['WellTank']);
    #array_push($data_points,$points);
    
    $myObj->stamp = $row['id'];
    $myObj->pressure = $row['Pressure'] ;
    $myObj->wellTank = $row['WellTank'] ;
    $myObj->warning1 = $row['warning1'] ;
    $myObj->warning2 = $row['warning2'] ;
  }

  foreach($db->query("SELECT * FROM $table2 WHERE watertank_id = '".$tank_id."'") as $row) {
    $myObj->pump1 = $row['wellPump'];
    $myObj->pump2 = $row['pressurePump'];
    $myObj->valve1 = $row['wellValve'];
    $myObj->override = $row['overRide'];

  }

  #$myObj -> data_points = $data_points;
  
  $myJSON = json_encode($myObj);
  echo $myJSON;

} catch (PDOException $e) {
   $errormsg = new stdClass();
   $errormsg->message = "Could not connect to the database";
   echo $errormsg;
   die();
}
$db = null;
