<?php
session_start();

$error1 = '';
$error3 = '';
$error4 = '';
$error5 = '';
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
			$error1 .= '<div id="e1" class= "alert alert-danger ms-5 me-5"> Please complete the registration form<button type="button" class="btn-close ms-2" aria-label="Close" onclick="close1()"></div>';
			
        }
        
        // Make sure the submitted registration values are not empty.
        if (empty($username) || empty($email) || empty($u_password)) {
			// One or more values are empty.
			$error1 .= '<div id="e2" class= "alert alert-danger ms-5 me-5"> Please complete the registration form<button type="button" class="btn-close ms-2" aria-label="Close" onclick="close2()"></div>';
			
        }
        
        //validates email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$error3 .= '<p id="e3" class= "mt-0 text-danger text-start"> Email is not valid!</p>';
		}
		
		//validates username characters
		if (preg_match('/^[a-zA-Z0-9]+$/', $_POST['username']) == 0) {
			$error4 .= '<p id="e4" class= " mt-0 text-danger text-start"> Username is not valid!</p>';
			
		}
		
		//Checks length of password
		if (strlen($_POST['password']) > 20 || strlen($_POST['password']) < 5) {
			$error5 .= '<p id="e5" class= " mt-0 text-danger text-start">Password must be between 5 and 20 characters long!</p>';
		}
        
        if(empty($error3) && empty($error4) && empty($error5) && empty($error1)){
			//checks if any equivalent usernames exist
			$query = $db->prepare("SELECT * FROM $table WHERE username= ?");
			$query->bindValue(1, $username);
			$query->execute();
			$row = $query->fetch(PDO::FETCH_ASSOC);
			
			if ($row) {
				// Username already exists
				$error1 .= 'Username exists, please choose another!';
			} else {
				// Insert new account
				$query = "INSERT INTO $table (username,email,password)
				VALUES ('".$username."','".$email."', '".$u_password."') ";
				$db->exec($query);
				$error1 .= "<div  class='alert alert-success ms-5 me-5'> New record in ".$table." created successfully</div>";
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
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "../assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="../assets/bootstrap.min.css">
		<link rel ="stylesheet" href="../assets/all.min.css">
		<link rel ="stylesheet" href="../css/adminRegister.css?v=<?php echo time() ?>">
		<script src="../assets/jquery.min.js"></script>
		<title>Admin</title>
	</head>
	<body class="bg-light">
		<!--Start of navbar-->
		<div class="navbar navbar-expand-lg navbar-dark shadow mb-3">
		  <div class="container-fluid">
			<a class="navbar-brand" href="admin.php"><img src="../assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon "></span>
			</button>
			<div class=" offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white" style="width: auto;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
			  <div class="offcanvas-header">
				<a href="../admin.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
				<button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			  </div>
			  <div class ="offcanvas-body">
				<hr>
				<ul class="navbar-nav ms-auto nav-pills mb-auto">
				  <li id = "home" class="nav-item">
					<a href="../admin.php" class="nav-link" aria-current="page">
						<i class="fas fa-home nav-icon"></i>
					  Overview
					</a>
				  </li>
				  <li id = "dash" class="nav-item">
					<a href="userManagement.php" class="nav-link">
					   <i class="fas fa-user-plus nav-icon"></i>
					   Manage users 
					</a>
				  </li>
				</ul>
				<hr>
				<div class="dropdown">
				  <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="../assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2">
					<strong> <?=$_SESSION['name']?></strong>
				  </a>
				  <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
					<li id ="signout" ><a class="dropdown-item" href="../logout.php">Sign out</a></li>
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div id="main-container" class= "container d-flex h-100 mt-5">
			<div id="thecard2" class="card shadow col-md-5 mb-5">
				<div class="text-end"><button type="button" class="btn-close mt-3 pe-5" aria-label="Close" onclick="close6()" ></button></div>
				<div class="img-pos mb-0 mt-3"><img class="user-img" src="../assets/images/user-regular.svg"/></div>
				<div class="card-title mt-2 mb-4"><strong>Admin Register</strong></div>
				<?php  echo $error1; ?>
				<form class="h-100 mt-3" action ="" method="post">
					<div class ="row" >
						<div class="form-floating col-lg-6 mb-3">
						  <input type="text" class="input-fields form-control" id="floatingInput" placeholder="Username" name = "username" >
						  <label for="floatingInput"><i class="fas fa-user ms-1 me-2"></i>Username</label>
						  <?php  echo $error4; ?>
						</div>
						<div class="form-floating col-lg-6 mb-3">
						  <input type="email" class="input-fields form-control" id="floatingEmail" placeholder="Email" name = "email">
						  <label for="floatingPassword"><i class="fas fa-at ms-1 me-2"></i>Email</label>
						  <?php  echo $error3; ?>
						</div>
						<div class="form-floating col-lg-12 mb-3">
						  <input type="password" class="input-fields form-control" id="floatingPassword" placeholder="Password" name = "password">
						  <label for="floatingPassword"><i class="fas fa-key ms-1 me-2"></i>Password</label>
						  <?php  echo $error5; ?>
						</div>
					</div>
					<div class="form-group mb-2">
						<input type = "submit" id ="register" name = "submit" class="btn btn-secondary" value="Register"/>
					</div>
				</form>
				<div class="mb-3 mt-2"><a href="http://ghii.org" class="org-link text-muted"><small>GHII, &copy 2022 </small></a></div>
				</div>
			</div>
		</div>
		<script src="../assets/bootstrap.min.js"></script>
		<script src="../assets/all.min.js"></script>
		<script src="../scripts/adminRegister.js?v=<?php echo time() ?>"></script>
	</body>
</html>
