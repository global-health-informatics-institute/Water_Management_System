<?php
//start session
session_start();

//if the user is already logged in then redirect user
if(isset($_SESSION["userid"]) && $_SESSION["userid"] === true){
	header("location: index.php");
	exit;
}
?>
