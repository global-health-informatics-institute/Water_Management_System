<?php

$data = json_decode( file_get_contents( 'php://input' ), true );
print_r($data);

$pressure = $data["Pressure"];
$volume = $data["Volume"];
$war1 = $data["warning1"];
$war2 = $data["warning2"];
$pump1 = $data["pump1"];
$pump2 = $data["pump2"];
$valve1 = $data["valve1"];
$valve2 = $data["valve2"];
$override = $data["override"];
$tank_id = $data["tank_id"];

$user = "admin";
$password = "password";
$database = "WMS";
$table = "sensorValues";

try {
  // Create connection
  $conn = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  
  // Check connection
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //inserts data into the database table
  
  if(isset($pressure)){ 
   $sql = "INSERT INTO $table (Pressure, Volume, warning1, warning2, watertank_id)
    VALUES ('".$pressure."','".$volume."', '".$war1."', '".$war2."','".$tank_id."')";
    $conn->exec($sql);
    echo "New record in ".$table." created successfully";
  }
  
  //updates
  if(!isset($pressure) && isset($volume)){
    $sql = "UPDATE sensorValues SET Volume = '".$volume."' WHERE watertank_id = '".$tank_id."' ORDER BY id DESC LIMIT 1";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  } 

  //updates the wellPump in commands table
  if(isset($pump1)){
   $sql = "UPDATE commands SET wellPump = '".$pump1."' WHERE watertank_id = '".$tank_id."'" ;
   $conn->exec($sql);
   echo "record in commands updated successfully";
  }
  
  //updates the pressurePump in commands table
  if(isset($pump2)){
   $sql = "UPDATE commands SET pressurePump = '".$pump2."' WHERE watertank_id = '".$tank_id."'";
   $conn->exec($sql);
   echo "record in commands updated successfully";
  }
  
  //updates the wellValve in commands table
  if(isset($valve1)){
   $sql = "UPDATE commands SET wellValve = '".$valve1."' WHERE watertank_id = '".$tank_id."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  
  //updates the wellValve in commands table
  if(isset($valve2)){
   $sql = "UPDATE commands SET wbValve = '".$valve2."' WHERE watertank_id = '".$tank_id."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  
  //updates the overRide in commands table
  if(isset($override)){
   $sql = "UPDATE commands SET overRide = '".$override."' WHERE watertank_id = '".$tank_id."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }

} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;


