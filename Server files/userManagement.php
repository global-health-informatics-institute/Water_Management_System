<?php
session_start();
$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

//connect to database
$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);

if (isset($_POST['username'])){
	$username = trim($_POST['username']);
	//checks if any equivalent usernames exist
	$query = $db->prepare("DELETE FROM $table WHERE username= ?");
	$query->bindValue(1, $username);
	$query->execute();
	echo 1;
	$db = null;
	die();	 	
}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="assets/bootstrap.min.css">
		<link rel ="stylesheet" href="assets/all.min.css">
		<link rel ="stylesheet" href="css/userManagement.css?v=<?php echo time() ?>">
		<script src="assets/jquery.min.js"></script>
		<title>Admin</title>
	</head>
	<body class="bg-light">
		<!--Start of navbar-->
		<div class="navbar navbar-expand-lg navbar-dark shadow mb-3">
		  <div class="container-fluid">
			<a class="navbar-brand" href="admin.php"><img src="assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon "></span>
			</button>
			<div class=" offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white" style="width: auto;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
			  <div class="offcanvas-header">
				<a href="admin.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
				<button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			  </div>
			  <div class ="offcanvas-body">
				<hr>
				<ul class="navbar-nav ms-auto nav-pills mb-auto">
				  <li id = "home" class="nav-item">
					<a href="admin.php" class="nav-link" aria-current="page">
						<i class="fas fa-home nav-icon"></i>
					  Home
					</a>
				  </li>
				  <li id = "dash" class="nav-item">
					<a href="adminRegister.php" class="nav-link">
					   <i class="fas fa-user-plus nav-icon"></i>
					   Manage users
					</a>
				  </li>
				</ul>
				<hr>
				<div class="dropdown">
				  <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2">
					<strong> <?=$_SESSION['name']?></strong>
				  </a>
				  <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
					<li id ="signout" ><a class="dropdown-item" href="logout.php">Sign out</a></li>
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div id="main-container" class= "container d-flex h-100 mt-5">
			<div id="thecard2" class="card shadow mb-5">
				<div style ="overflow-x:auto;">
					<table class="table table-hover text-start">
					  <thead>
						<tr>
						  <th scope="col"></th>
						  <th scope="col">Id</th>
						  <th scope="col">Username</th>
						  <th scope="col">Email</th>
						  <th scope="col"></th>
						</tr>
					  </thead>
					  <tbody>
						<?php 
							foreach($db->query("SELECT id, username, email FROM users where username != 'admin'") as $row) {
								echo'
									<tr>
									  <th scope="row"><img src="assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2"></th>
									  <td>'.$row['id'].'</td>
									  <td id = "username" >'.$row['username'].'</td>
									  <td>'.$row['email'].'</td>
									  <td><button type="button" class="btn-close" aria-label="Close" onClick ="deleteUser(this)" "></button></td>
									</tr> ';
							}					
						?>
						<tr>
							<th><a href="adminRegister.php" data-bs-toggle="tooltip" data-bs-placement="top" title="Add User" class="nav-link"><i id="add-icon" class="fa-solid fa-circle-plus"></i></a></th>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					  </tbody>
					</table>
				</div>
				</div>
			</div>
		</div>
		<script src="assets/bootstrap.min.js"></script>
		<script src="assets/bootstrap.bundle.min.js"></script>
		<script src="assets/all.min.js"></script>
		<script src="scripts/userManagement.js?v=<?php echo time() ?>"></script>
	</body>
</html>
