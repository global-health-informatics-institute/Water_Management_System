<?php
//start session
session_start();

//if the user is already logged in then redirect user
if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true){
	header("location: index.php");
	exit;
}
?>
