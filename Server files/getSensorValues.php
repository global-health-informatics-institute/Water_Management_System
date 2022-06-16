<?php
session_start();

$tank_id = $_GET['q'];

$user = "admin";
$password = "password";
$database = "WMS";
$table1 = "sensorValues";
$table2 ="commands";
$table3 = "users";

try{
  $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  $myObj = new stdClass();
  #$data_points = array();

  foreach($db->query("SELECT * FROM $table1 WHERE watertank_id = '".$tank_id."'  order by id DESC limit 1") as $row) {
    
    #$points = array("x" => $row['Timestamp'],"y"=>$row['WellTank']);
    #array_push($data_points,$points);
    
    $myObj->stamp = $row['id'];
    $myObj->pressure = $row['Pressure'] ;
    $myObj->volume = $row['Volume'] ;
    $myObj->warning1 = $row['warning1'] ;
    $myObj->warning2 = $row['warning2'] ;
    $myObj->tankid = $row['watertank_id'];
  }
  foreach($db->query("SELECT * FROM $table2 WHERE watertank_id = '".$tank_id."' order by id DESC limit 1") as $row) {
    $myObj->pump1 = $row['wellPump'];
    $myObj->pump2 = $row['pressurePump'];
    $myObj->valve1 = $row['wellValve'];
    $myObj->valve2 = $row['wbValve'];
    $myObj->override = $row['overRide'];
    $myObj->opCode = $row['OpCode'];

  }
  
  foreach($db->query("SELECT username FROM $table3 WHERE username = '".$_SESSION['name']."'") as $row) {
    $myObj->uname = $row['username'];
    

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
