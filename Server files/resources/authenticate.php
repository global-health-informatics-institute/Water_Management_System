<?php
session_start();
require_once "config.php";
$error = "";
$table = "users";
$myObj = new stdClass();

$username = trim($_POST['username']);
$u_password = trim($_POST['password']);

$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
$query->bindValue(1, $username);
$query->execute();
$row = $query->fetch(PDO::FETCH_ASSOC);


if($row){
	if (password_verify($u_password,$row['password'])){
		session_regenerate_id();
		$_SESSION['loggedin'] = True;
		$_SESSION['name'] = $row['username'];
		$_SESSION['id'] = $row['id'];
		
		if($username == "admin"){
			echo 2;
		}else{
			echo 1;	
		}
	}		
}

