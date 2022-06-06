<?php
require_once "session.php";
$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

if (isset($_POST['submit'])){
	$username = trim($_POST['username']);
	$u_password = trim($_POST['password']);
	
	try{
		$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
		
		//checks if form is complete
		if (!isset($_POST['username'], $_POST['password'])) {
			// Could not get the data that should have been sent.
			$error.= "<div class='alert alert-danger ms-5 me-5'> Please complete the registration form!</div>";
			
        }
        
        // Make sure the submitted registration values are not empty.
        if (empty($username) || empty($u_password)) {
			// One or more values are empty.
			$error .= "<div class='alert alert-danger ms-5 me-5'> Please fill in all the fields!</div>";
			
        }
		
		if(empty($error)){
			
			if($username == 'admin'){
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
							 
						header("location: admin.php");
						exit;
					}else{
						$error.= "<div class='alert alert-danger ms-5 me-5'> invalid password!</div>";
						 }
				}else{
					$error.= "<div class='alert alert-danger ms-5 me-5''>username does not exist!</div>";}		
			
			}else{
				$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
				$query->bindValue(1, $username);
				$query->execute();
				$row = $query->fetch(PDO::FETCH_ASSOC);
				
				if($row){
					if (password_verify($row['password'],$u_password)){
						
						session_regenerate_id();
						$_SESSION['loggedin'] = True;
						$_SESSION['name'] = $row['username'];
						$_SESSION['id'] = $row['id'];
							 
						header("location: index.php");
						exit;
					}else{
						$error.= "<div class='alert alert-danger ms-5 me-5'> invalid password!</div>";
						 }
				}else{
					$error.= "<div class='alert alert-danger ms-5 me-5''>username does not exist!</div>";}
			}
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
		<link rel ="stylesheet" href="css/login.css?v=3">
		<link rel ="stylesheet" href="assets/bootstrap.min.css">
	</head>
	<body class="bg-light">
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="card-title mt-3">Sign In</div>
				<div class="img-pos" ><img class="user-img" src="assets/images/user-regular.svg"/></div>
				<?php  echo $error; ?>
				<form class="h-100" action ="" method="post">
					<div class="form-group text-center ms-2 me-2">
						<input class="login" type = "text" name = "username" placeholder="username" class="form-control" required/>
					</div>
					<div class="form-group text-center ms-2 me-2">
						<input class="login" type = "password" name = "password" placeholder="password" class="form-control" required/>
					</div>
					<div class="form-group mb-2">
						<input type = "submit" id ="login" name = "submit" class="btn btn-secondary" value="Login"/>
					</div>
				</form>
				<div> &copy 2022</div>
				</div>
			</div>
		</div>
		<script src="assets/bootstrap.min.js"></script>
		<script src="scripts/login.js"></script>
	</body>
</html>
