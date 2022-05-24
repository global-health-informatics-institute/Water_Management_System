<?php
require_once "session.php";
$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

if (isset($_POST['submit'])){
	$email = trim($_POST['email']);
	$dbpassword = trim($_POST['password']);
	
	try{
		$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
		
		if(empty($error)){
			$query = $db->prepare("SELECT * FROM $table WHERE email= ?");
		    $query->bindValue(1, $email);
			$query->execute();
			$row = $query->fetch(PDO::FETCH_ASSOC);
			
			if($row){
				if ($dbpassword == $row['password']){
					$_SESSION["userid"] = $row['id'];
					$_SESSION["user"] = $row;
						 
					header("location: index.php");
					exit;
				}else{
					$error.= "<div class='alert alert-danger ms-5 me-5'> invalid password!</div>";
					 }
			}else{
				$error.= "<div class='alert alert-danger ms-5 me-5''>email does not exist!</div>";}
	    
	     }
	     
	     
	}catch (PDOException $e) {
	   $errormsg = new stdClass();
	   $errormsg->message = "Could not connect to the database";
	   echo $errormsg;
	   die();
	}
	$db = null;	
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Login</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel ="stylesheet" href="style.css?v=2">
		<link rel ="stylesheet" href="bootstrap.min.css">
	</head>
	<body>
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="card-title mt-3">Login</div>
					<?php  echo $error; ?>
					<form class="h-100" action ="" method="post">
						<div class="form-group text-start ms-2 me-2">
							<label>Email Address</label>
							<input type = "email" name = "email" placeholder="example@email.com" class="form-control" required/>
						</div>
						<div class="form-group text-start ms-2 me-2">
							<label>Password</label>
							<input type = "password" name = "password" placeholder="password" class="form-control" required/>
						</div>
						<div class="form-group mb-2">
							<input type = "submit" name = "submit" class="btn btn-secondary" value="Login"/>
						</div>
					</form>
					<div> &copy 2022</div>
				</div>
			</div>
		</div>
		<script src="bootstrap.min.js"></script>
	</body>
</html>