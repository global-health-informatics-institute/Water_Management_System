<?php
session_start();
//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: login.php");
	exit;
}
//check the name of the user
if($_SESSION['name'] !== "admin"){
		header("location: index.php");
    exit;
}
require_once "config.php";

//get background-image path when page is loaded
if(isset($_POST['toggle'])){
	
	$myObj = new stdClass();
	foreach($db->query("SELECT image_path FROM settings WHERE user_id = '".$_SESSION['id']."'") as $row){	
	$myObj->url = $row['image_path'];
	}
	$myJSON = json_encode($myObj);
    echo $myJSON;
    die();
}

?>
