<?php
session_start();
require_once "config.php";
$table = "users";
$error = "";
$error1 = '';
$error3 = '';
$error4 = '';
$myObj = new stdClass();

if(isset($_POST['toggle'])){
	foreach($db->query("SELECT image_path FROM settings WHERE user_id = ".$_SESSION['id']."") as $row){	
	$myObj->url = $row['image_path'];
	}
	$myJSON = json_encode($myObj);
    echo $myJSON;
    die();
}

//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: ../login.php");
	exit;
}

if(isset($_POST['username'])){
	$username = trim($_POST['username']);
	//checks if any equivalent usernames exist
	$query = $db->prepare("DELETE FROM $table WHERE username= ?");
	$query->bindValue(1, $username);
	$query->execute();
	echo 1;
	$db = null;
	die();	 	
}
//check if you have an update requirement
if(isset($_POST['id'])){
	
	$uname = trim($_POST['uname']);
	$mail = trim($_POST['email']);
	$userId = trim($_POST['id']);
	
	
	
	
	if(empty($error3) && empty($error4)){
		//checks if any equivalent usernames exist
		$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
		$query->bindValue(1, $uname);
		$query->execute();
		$row = $query->fetch(PDO::FETCH_ASSOC);
		
		if ($row) {
			// Username already exists
			echo "Username exists, please choose another!";
		}else {
			if(!empty($uname)){
				//validates username characters
				if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['uname']) == 0) {
					echo "Username is not valid!";
					die();
				}else{
				// Insert new account
				$query = "UPDATE $table SET username = '".$uname."'
				WHERE id = '".$userId."'";
				$db->exec($query);
				echo 1;}
			}
			
			if(!empty($mail)){
				//validates email
				if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
					echo "Email is not valid!";
					die();
				}else{
				// Insert new account
				$query = "UPDATE ".$table." SET email = '".$mail."'
				WHERE id = '".$userId."'";
				$db->exec($query);
				echo 2;}
			}
		   if(empty($mail) && empty($uname)){
				echo "Don't test me bruh...";
			}
		}	
	}
	die();
}

?>
