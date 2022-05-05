<?php

$data = json_decode( file_get_contents( 'php://input' ), true );
print_r($data);

$pressure = $data["Pressure"];
$well = $data["WellTank"];
$wb = $data["WbTank"];
$war1 = $data["warning1"];
$war2 = $data["warning2"];
$pump1 = $data["pump1"];
$pump2 = $data["pump2"];
$valve1 = $data["valve1"];
$valve2 = $data["valve2"];
$override = $data["override"];

$user = "esp32";
$password = "password";
$database = "Water_Management_System";
$table = "sensorValues";

try {
  // Create connection
  $conn = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
  // Check connection
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //inserts data into the database table
  if(isset($pressure)){ 
   $sql = "INSERT INTO $table (Pressure, WellTank, WbTank, warning1, warning2)
    VALUES ('".$pressure."','".$well."', '".$wb."', '".$war1."', '".$war2."')";
    $conn->exec($sql);
    echo "New record in ".$table." created successfully";
  }

  //updates the wellPump in commands table
  if(isset($pump1)){
   $sql = "UPDATE commands SET wellPump = '".$pump1."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  //updates the pressurePump in commands table
  if(isset($pump2)){
   $sql = "UPDATE commands SET pressurePump = '".$pump2."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  //updates the wellValve in commands table
  if(isset($valve1)){
   $sql = "UPDATE commands SET wellValve = '".$valve1."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  //updates the WbValve in commands table
  if(isset($valve2)){
   $sql = "UPDATE commands SET WbValve = '".$valve2."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }
  //updates the overRide in commands table
  if(isset($override)){
   $sql = "UPDATE commands SET overRide = '".$override."'";
   $conn->exec($sql);
   echo "record in ".$table ."updated successfully";
  }



} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;


