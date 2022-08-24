<?php
require_once "../resources/config.php";
$error = "";
$table = "sensorValues";
$tank_id = "";

//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: ../login.php");
	exit;
}


if (isset($_POST['tank_id']) && $_SESSION['tank_id'] !== $_POST['tank_id']){
	$tank_id = trim($_POST['tank_id']);
	$_SESSION['tank_id'] = $tank_id;
	echo 1;
	die();	 	
}
if (isset($_POST['tank_id']) && isset($_POST['select'])){
	$tank_id = trim($_POST['tank_id']);
	$_SESSION['tank_id'] = $tank_id;
	echo 1;
	die();	 	
}

 function month($param){
	switch ($param){
		case "01":
			$out = "January";
			break;
		case "02":
			$out = "February";
			break;
		case "03":
			$out = "March";
			break;
		case "04":
			$out = "April";
			break;
		case "05":
			$out = "May";
			break;
		case "06":
			$out = "June";
			break;
		case "07":
			$out = "July";
			break;
		case "08":
			$out = "August";
			break;
		case "09":
			$out = "September";
			break;
		case "10":
			$out = "October";
			break;
		case "11":
			$out = "November";
			break;
		case "12":
			$out = "December";
			break;
		default:
			return "invalid";
		
	}
	return $out;
}

?>
