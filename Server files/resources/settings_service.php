<?php
require_once "../resources/config.php";
$table = "settings";
$tank_id = "";
$On = "";
$Off = "";
$old_On = "";
$old_Off = "";

$myObj = new stdClass();

//gets current interval values in database and assigns them to variables for comparison 
foreach($db->query("SELECT Interval_on, Interval_off FROM settings WHERE well_id = 1 ") as $row){
	$old_On = $row['Interval_on'];
	$old_Off = $row['Interval_off'];
}

if(isset($_POST['toggle'])){
	foreach($db->query("SELECT Interval_on, Interval_off FROM settings WHERE well_id = 1 ") as $row){	
	$myObj->Interval_on = $row['Interval_on'];
	$myObj->Interval_off = $row['Interval_off'];
	}
	$myJSON = json_encode($myObj);
    echo $myJSON;
    die();
}

//stores the interval values in the database
if(!empty($_POST['Off']) && !empty($_POST['On'])){

	//validates if the values are numeric 
	if(!is_numeric($_POST['Off']) || !is_numeric($_POST['On'])){
		echo "Invalid input, try again.";
		die();
	}
	
	$On = $_POST['On'];
	$Off = $_POST['Off'];
	if(($old_On != $On) && ($old_Off != $Off)){
		$sql = "UPDATE settings SET Interval_on = '".$On."'";
		$db->exec($sql);
		$sql = "UPDATE settings SET Interval_off = '".$Off."'";
		$db->exec($sql);
		echo 3;
		die();
	} else if($old_Off != $Off){
		$sql = "UPDATE settings SET Interval_off = '".$Off."'";
		$db->exec($sql);
		echo 2;
		die();
	} else if($old_On != $On){
		$sql = "UPDATE settings SET Interval_on = '".$On."'";
		$db->exec($sql);
		echo 1;
		die();
	}
}



?>
