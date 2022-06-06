<?php
$error = '';
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

if (isset($_POST['submit'])){
	$username = trim($_POST['username']);
	$email = trim($_POST['email']);
	$u_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
	
	try{
		//connect to database
		$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
		
		//checks if form is complete
		if (!isset($_POST['username'], $_POST['password'], $_POST['email'])) {
			// Could not get the data that should have been sent.
			$error .= '<div class= "alert alert-danger ms-5 me-5"> Please complete the registration form</div>';;
			
        }
        
        // Make sure the submitted registration values are not empty.
        if (empty($username) || empty($email) || empty($u_password)) {
			// One or more values are empty.
			$error .= '<div class= "alert alert-danger ms-5 me-5"> Please complete the registration form</div>';
			
        }
        
        //validates email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$error .= '<div class= "alert alert-danger ms-5 me-5"> Email is not valid!</div>';
		}
		
		//validates username characters
		if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['username']) == 0) {
			$error .= '<div class= "alert alert-danger ms-5 me-5"> Username is not valid!</div>';
			
		}
		
		//Checks length of password
		if (strlen($_POST['password']) > 20 || strlen($_POST['password']) < 5) {
			$error .= '<div class= "alert alert-danger ms-5 me-5">Password must be between 5 and 20 characters long!</div>';
		}
        
        if(empty($error)){
			//checks if any equivalent usernames exist
			$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
			$query->bindValue(1, $username);
			$query->execute();
			$row = $query->fetch(PDO::FETCH_ASSOC);
			
			if ($row) {
				// Username already exists
				$error .= 'Username exists, please choose another!';
			} else {
				// Insert new account
				$query = "INSERT INTO $table (username,email,password)
				VALUES ('".$username."','".$email."', '".$u_password."') ";
				$db->exec($query);
				$error .= "<div  class='alert alert-success ms-5 me-5'> New record in ".$table." created successfully</div>";
				header("location: login.php");
				exit;
			}
			
		}
	     
	}catch (PDOException $e) {
	   $errormsg = new stdClass();
	   $errormsg->message = 'Could not connect to the database';
	   echo $errormsg;
	   die();
	}
	$db = null;	
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Admin</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel ="stylesheet" href="css/adminRegister.css?v=3">
		<link rel ="stylesheet" href="assets/bootstrap.min.css">
	</head>
	<body class="bg-light">
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="card-title mt-3">Admin Register</div>
				<div class="img-pos" ><img class="user-img" src="assets/images/user-regular.svg"/></div>
				<?php  echo $error; ?>
				<form class="h-100" action ="" method="post">
					<div class="form-group text-center ms-2 me-2">
						<input class="register" type = "username" name = "username" placeholder="username" class="form-control" required/>
					</div>
					<div class="form-group text-center ms-2 me-2">
						<input class="register" type = "email" name = "email" placeholder="example@email.com" class="form-control" required/>
					</div>
					<div class="form-group text-center ms-2 me-2">
						<input class="register" type = "password" name = "password" placeholder="password" class="form-control" required/>
					</div>
					<div class="form-group mb-2">
						<input type = "submit" id ="register" name = "submit" class="btn btn-secondary" value="Register"/>
					</div>
				</form>
				<div> &copy 2022</div>
				</div>
			</div>
		</div>
		<script src="assets/bootstrap.min.js"></script>
		<script src="scripts/adminRegister.js"></script>
	</body>
</html>
