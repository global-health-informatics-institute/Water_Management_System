<?php
session_start();
require_once "config.php";
$myObj = new stdClass();

//if the user is not logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: login.php");
	exit;
}
//if the name in the session is admin, redirect
if($_SESSION['name'] == "admin"){
		header("location: login.php");
    exit;
}

if(isset($_POST['toggle'])){
	foreach($db->query("SELECT image_path FROM settings WHERE user_id = ".$_SESSION['id']."") as $row){	
	$myObj->url = $row['image_path'];
	}
	$myJSON = json_encode($myObj);
    echo $myJSON;
    die();
}

?>
