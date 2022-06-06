<?php
//start session
session_start();

//if the user is already logged in then redirect user
if(session_destroy()){
	header("location: login.php");
	exit;
}
?>
