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
$opCode = $data["opCode"];
$resetM = $data["reset"];
$toggleP = $data["toggleP"];
$Gs = $data["GS"];

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
  if($opCode == 0){
    if(isset($pressure)){ 
     $sql = "INSERT INTO $table (Pressure, Volume, warning1, warning2, watertank_id)
      VALUES ('".$pressure."','".$volume."', '".$war1."', '".$war2."','".$tank_id."')";
      $conn->exec($sql);
      echo "New record in ".$table." created successfully for tank id ".$tank_id." ";
    }
    
    //updates the wellPump in commands table
    if(isset($pump1)){
     $sql = "UPDATE commands SET waterPump = '".$pump1."' WHERE watertank_id = '".$tank_id."'" ;
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
     $sql = "UPDATE commands SET outletValve = '".$valve1."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record in ".$table ."updated successfully";
    }
    
    //updates the wellValve in commands table
    if(isset($valve2)){
     $sql = "UPDATE commands SET inletValve = '".$valve2."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record in ".$table ."updated successfully";
    }
    
    //updates the overRide in commands table
    if(isset($override)){
     $sql = "UPDATE commands SET overRide = '".$override."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record in ".$table ."updated successfully";
    }
    //updates the OpMode in commands table
    if(isset($opCode)){
     $sql = "UPDATE commands SET OpCode = '".$opCode."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record for opCode in ".$table ."updated successfully";
    }
  }

  //Checks incoming opcode and then performs operations
  if($opCode > 0 && $opCode < 6 ){
    
    if(isset($volume)){ 
     $sql = "INSERT INTO $table (Pressure, Volume, warning1, warning2, watertank_id)
      VALUES ('0','".$volume."', '".$war1."', '".$war2."','".$tank_id."')";
      $conn->exec($sql);
      echo "New record in ".$table." created successfully for tank id ".$tank_id." ";
    }

    //updates the wellPump in commands table
    if(isset($pump1)){
     $sql = "UPDATE commands SET waterPump = '".$pump1."' WHERE watertank_id = '".$tank_id."'" ;
     $conn->exec($sql);
     echo "record ".$pump1."  in commands updated successfully";
    }
    
    //updates the pressurePump in commands table
    if(isset($pump2)){
     $sql = "UPDATE commands SET pressurePump = '".$pump2."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$pump2." in commands updated successfully";
    }
    
    //updates the wellValve in commands table
    if(isset($valve1)){
     $sql = "UPDATE commands SET outletValve = '".$valve1."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$valve1." in ".$table ."updated successfully";
    }
    
    //updates the wellValve in commands table
    if(isset($valve2)){
     $sql = "UPDATE commands SET inletValve = '".$valve2."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$valve2." in ".$table ."updated successfully";
    }
    
    //updates the overRide in commands table
    if(isset($override)){
     $sql = "UPDATE commands SET overRide = '".$override."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record in ".$table ."updated successfully";
    }
    //updates the OpMode in commands table
    if(isset($opCode)){
     $sql = "UPDATE commands SET OpCode = '".$opCode."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record opCode in commands updated successfully";
    }
  }

  if($opCode == 6 ){
    
    if(isset($volume) && (isset($war1) || isset($war2))){ 
     $sql = "INSERT INTO $table (Pressure, Volume, warning1, warning2, watertank_id)
      VALUES ('".$pressure."','".$volume."', '".$war1."', '".$war2."','".$tank_id."')";
      $conn->exec($sql);
      echo "New record in ".$table." created successfully for tank id ".$tank_id." ";
    }

    //updates the wellPump in commands table
    if(isset($pump1)){
     $sql = "UPDATE commands SET waterPump = '".$pump1."' WHERE watertank_id = '".$tank_id."'" ;
     $conn->exec($sql);
     echo "record ".$pump1." in commands updated successfully";
    }
    
    //updates the pressurePump in commands table
    if(isset($pump2)){
     $sql = "UPDATE commands SET pressurePump = '".$pump2."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$pump2." in commands updated successfully";
    }
    
    //updates the wellValve in commands table
    if(isset($valve1)){
     $sql = "UPDATE commands SET outletValve = '".$valve1."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$valve1." in ".$table ."updated successfully";
    }
    
    //updates the wellValve in commands table
    if(isset($valve2)){
     $sql = "UPDATE commands SET inletValve = '".$valve2."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$valve2." in ".$table ."updated successfully";
    }
    
    //updates the overRide in commands table
    if(isset($override)){
     $sql = "UPDATE commands SET overRide = '".$override."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record ".$override." in ".$table ."updated successfully";
    }
    //updates the OpMode in commands table
    if(isset($opCode)){
     $sql = "UPDATE commands SET OpCode = '".$opCode."' WHERE watertank_id = '".$tank_id."'";
     $conn->exec($sql);
     echo "record opCode in commands updated successfully";
    }
  }
  
  //GS setup
  if(isset($Gs)){
      if(isset($volume)){ 
      $sql = "INSERT INTO $table (Pressure, Volume, warning1, warning2, watertank_id)
      VALUES ('0','".$volume."', '".$war1."', '".$war2."','".$tank_id."')";
      $conn->exec($sql);
      echo "New record in ".$table." created successfully for tank id ".$tank_id." ";
    }
  }else{
    //updates volume
    if(!isset($opCode) && isset($volume)){
      $sql = "UPDATE sensorValues SET Volume = '".$volume."' WHERE watertank_id = '".$tank_id."' ORDER BY id DESC LIMIT 1";
      $conn->exec($sql);
      echo "record volume in ".$table ."updated for ".$tank_id." successfully";
    }
  }
  //updates reset
  if(isset($resetM)){
    $sql = "UPDATE commands SET reset = '".$resetM."' WHERE watertank_id = '".$tank_id."'";
    $conn->exec($sql);
    echo "record reset in commands updated successfully";
   }
  //show or hide pressure gauge 
  if(isset($toggleP)){
    $sql = "UPDATE commands SET toggle_pressure = '".$toggleP."' WHERE watertank_id = '".$tank_id."'";
    $conn->exec($sql);
    echo "record toggle pressure in commands updated successfully";
  }

} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;


