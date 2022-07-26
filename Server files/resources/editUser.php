<?php
session_start();

$error1 = '';
$error3 = '';
$error4 = '';
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

$username = trim($_POST['username']);
$email = trim($_POST['email']);
$userId = trim($_POST['id']);

echo " ".$userId." + ".$email." + ".$username." ";
die();

try{
	//connect to database
	$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
	
	
	if(empty($error3) && empty($error4)){
		//checks if any equivalent usernames exist
		$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
		$query->bindValue(1, $username);
		$query->execute();
		$row = $query->fetch(PDO::FETCH_ASSOC);
		
		if ($row) {
			// Username already exists
			echo "Username exists, please choose another!";
		} else {
			if(isset($_POST['username'])){
				// Insert new account
				$query = "UPDATE $table SET username = '".$username."'
				WHERE id = '".$userId."'";
				$db->exec($query);
				echo " New record in ".$table." created successfully";
			}
			if(isset($_POST['email'])){
				// Insert new account
				$query = "UPDATE ".$table." SET email = '".$email."'
				WHERE id = '".$userId."'";
				$db->exec($query);
				echo " New record in ".$table." created successfully";
			}
		}	
	}
	die();
	
}catch (PDOException $e) {
   $errormsg = new stdClass();
   $errormsg->message = 'Could not connect to the database';
   echo $errormsg;
   die();
}
$db = null;	

<?
