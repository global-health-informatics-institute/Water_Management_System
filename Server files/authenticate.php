<?php
session_start();

$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);

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
		
		echo 1;
	}		

}

