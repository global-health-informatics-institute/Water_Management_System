<?php
//start session
session_start();

//if the user is already logged in then redirect user
if($_SESSION['name'] !== "admin" && $_SESSION['loggedin'] === true){
	header("location: index.php");
	exit;
}
?>
