<?php
session_start();
//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: ../login.php");
	exit;
}

require_once "config.php";

$table = "settings";
$tank_id = "";
$On = "";
$Off = "";
$old_On = "";
$old_Off = "";
$myObj = new stdClass();

//gets current interval values in database and assigns them to variables for comparison 
foreach($db->query("SELECT Interval_on, Interval_off FROM well_data ") as $row){
	$old_On = $row['Interval_on'];
	$old_Off = $row['Interval_off'];
}

if(isset($_POST['toggle'])){
	foreach($db->query("SELECT Interval_on, Interval_off FROM well_data ") as $row){	
	$myObj->Interval_on = $row['Interval_on'];
	$myObj->Interval_off = $row['Interval_off'];
	}
	
	foreach($db->query("SELECT image_path FROM settings WHERE user_id = ".$_SESSION['id']." ") as $row){	
	$myObj->url = $row['image_path'];
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
		$sql = "UPDATE well_data SET Interval_on = '".$On."'";
		$db->exec($sql);
		$sql = "UPDATE well_data SET Interval_off = '".$Off."'";
		$db->exec($sql);
		echo 3;
		die();
	} else if($old_Off != $Off){
		$sql = "UPDATE well_data SET Interval_off = '".$Off."'";
		$db->exec($sql);
		echo 2;
		die();
	} else if($old_On != $On){
		$sql = "UPDATE well_data SET Interval_on = '".$On."'";
		$db->exec($sql);
		echo 1;
		die();
	}
}

?>
