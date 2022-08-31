<?php
require_once "../resources/config.php";
$tank_id = "";
$currentVolume = "";
$volume_data = [];
$volume_array = [];
$pump = "";
$valve = "";
$flow = "";
$totalConsumption = 0;
$currentConsumption = 0;
$record_count = 0;
$prev_record_count = 0;

//this block constantly updates the water consumption of specified tank
if(isset($_POST['reading'])){
	
	$tank_id = $_POST['tank_id'];
	//get the number of rows in the sensorValues table
	$result = $db->prepare("SELECT * from sensorValues WHERE watertank_id = ".$tank_id." ");
	$result->execute();
	$record_count = $result->rowCount();
	
	//get the states of the water pump and outlet valve
	foreach($db->query("SELECT * from commands WHERE watertank_id = ".$tank_id." ") as $row){
		$pump = $row['waterPump'];
		$valve = $row['outletValve'];
	}
	
	//get the consumption, flowrate and record count
	foreach($db->query("SELECT Flow_rate, Total_consumption,Record_count from statistics WHERE watertank_id = ".$tank_id." ")as $row){
		$flow = (int) $row['Flow_rate'];
		$totalConsumption = (float) $row['Total_consumption'];
		$prev_record_count = (int) $row['Record_count'];
	}
	//Checks if outlet valve is on
	if($valve === "1"){
		
		//checks if the water pump is on
		if($pump === "1"){
			
			//gets the recently recorded volume, calculate current consumption using Volume * flow constant, updates the total consumption
			foreach($db->query("SELECT Volume from sensorValues WHERE watertank_id = ".$tank_id." ORDER BY id DESC LIMIT 1")as $row){
				$currentVolume = (float) $row['Volume'];
			}
			
			//only updates consumption if a new volume reading has been recorded
			if($record_count !== $prev_record_count){
				$constant = 44/$flow;
				$currentConsumption = $currentVolume * $constant;
				$totalConsumption = $totalConsumption + $currentConsumption;
				$sql = "UPDATE statistics SET total_consumption = '".$totalConsumption."' WHERE watertank_id = '".$tank_id."'";
				$db->exec($sql);
				echo $totalConsumption/1000;
			}else{
				echo $totalConsumption/1000;
			} 
		}else{
			//if the pump is off, gets the last two known volume values, finds the difference, if positive, add it to the total consumption
			foreach($db->query("SELECT Volume from sensorValues WHERE watertank_id = ".$tank_id." ORDER BY id DESC LIMIT 2")as $row){
				array_push($volume_data,($row['Volume']));
			}
			//only updates consumption if a new volume reading has been recorded
			if($record_count !== $prev_record_count){
				$val = (float) $volume_data[1] - (float) $volume_data[0];
				if($val > 0){
					$totalConsumption = $totalConsumption + abs($val);
					$sql = "UPDATE statistics SET total_consumption = '".$totalConsumption."' WHERE watertank_id = '".$tank_id."'";
					$db->exec($sql);
					$sql = "UPDATE statistics SET Record_count = '".$record_count."' WHERE watertank_id = '".$tank_id."'";
					$db->exec($sql);
					echo $totalConsumption/1000;
				}
			}else{
				echo $totalConsumption/1000;
			}
		}
	}
	
}

?>
