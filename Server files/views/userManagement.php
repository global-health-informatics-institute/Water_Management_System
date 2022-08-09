<?php
session_start();
$error = "";
$error1 = '';
$error3 = '';
$error4 = '';
$user = "admin";
$password = "password";
$database = "WMS";
$table = "users";

//connect to database
$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);

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

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "../assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="../assets/css/bootstrap.min.css">
		<link rel ="stylesheet" href="../assets/css/all.min.css">
		<link rel ="stylesheet" href="../css/userManagement.css?v=<?php echo time() ?>">
		<link rel ="stylesheet" href="../assets/css/jquery-ui.min.css">
		<title>User Management</title>
	</head>
	<body id ="document" class="bg-light">
		<!--Preloader-->
		<div id="preloader" class="modala">
		  <!-- Modal content -->
		  <div class="modala-content d-flex">
			  <span>Loading... </span>
			  <div class="spinner-grow" style="animation-delay: calc(-0.45s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.3s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.15s / var(--d,1));" role="status">
			  </div>
		  </div>
		</div>
		<!--Start of navbar-->
		<div class="navbar navbar-expand-lg navbar-dark shadow mb-3">
		  <div class="container-fluid">
			<a class="navbar-brand" href="../admin.php" title="Water management system"><img src="../assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
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
					<a href="../admin.php" class="nav-link" aria-current="page" title="Overview">
						<i class="fas fa-home nav-icon"></i>
					  Overview
					</a>
				  </li>
				  <li id = "dash" class="nav-item">
					<a href="userManagement.php" class="nav-link" title="Manage Users">
					   <i class="fas fa-user nav-icon"></i>
					   User Management
					</a>
				  </li>
				  <li id = "stats" class="nav-item">
					<a href="statistics.php" class="nav-link" title="Statistics">
					   <i class="fas fa-chart-line nav-icon"></i>
					   Statistics
					</a>
				  </li>
				</ul>
				<hr>
				<div class="dropdown" title="Profile">
				  <div class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="../assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2">
					<strong> <?=$_SESSION['name']?></strong>
				  </div>
				  <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
					<li id ="signout" title="sign out"><a class="dropdown-item" href="../logout.php">Sign out</a></li>
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div id="main-container" class= "container d-flex h-100 mt-5">
			<div id="thecard2" class="card shadow mb-5 w-75">
				<div style ="overflow-x:auto;">
					<table id ="usersT" class="table table-hover">
					  <thead class = "thead-light">
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
									  <th scope="row"><img src="../assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2"></th>
									  <td id = "theId">'.$row['id'].'</td>
									  <td id = "username" >'.$row['username'].'</td>
									  <td>'.$row['email'].'</td>
									  <td><div class = "d-flex"><div onClick = "editUser(this)" title="Edit" style="border-right:1px solid; padding-right:5px;"><i class="far fa-edit edit"></i></div><div style="padding-left:5px;" onClick ="deleteUser(this)" title="Delete"><i class="far fa-trash-alt trash"></i></div></div></td>
									</tr> ';
							}					
						?>
						<tr>
							<th><a href="adminRegister.php" title="Add User" class="nav-link"><i id="add-icon" class="fa-solid fa-circle-plus"></i></a></th>
							<td class="lastItem"></td>
							<td class="lastItem"></td>
							<td class="lastItem"></td>
							<td class="lastItem"></td>
						</tr>
					  </tbody>
					</table>
				</div>
				</div>
			</div>
		</div>
		<div id="dialog-confirm" title="Delete User Profile?" class="visually-hidden">
		  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>User profile will be permanently deleted and cannot be recovered. Are you sure?</p>
		</div>
		<div id="dialog-message" title="User Deleted" class="visually-hidden">
		  <p>
			<span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
			You have successfully deleted the user profile
		  </p>
		</div>
		<!-- The Modal -->
		<div id="myModal" class="modala visually-hidden">
		  <!-- Modal content -->
		  <div class="modala-content d-flex">
			  <span>Loading... </span>
			  <div class="spinner-grow" style="animation-delay: calc(-0.45s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.3s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.15s / var(--d,1));" role="status">
			  </div>
		  </div>
		</div>
		<div id="dialog-form" title="Edit user details" class="visually-hidden">
		  <div id = "badge" class = "alert visually-hidden"></div>
		  <form id = "myEnter" class="h-100 mt-3" action ="">
			<div class="form-floating me-3 ms-3">
			  <input type="text" class="input-fields form-control" id="name" placeholder="Username" required>
			  <label for="name"><i class="fas fa-user me-2"></i>Username</label>
			</div>
			<div class="form-floating me-3 ms-3 mt-3">
			  <input type="email" class="input-fields form-control" id="email" placeholder="Email" required>
			  <label for="email"><i class="fas fa-key me-2"></i>Email</label>
			</div>																										
		</form>
		</div>
		<script src="../assets/js/jquery.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/dataTables.dateTime.min.js"></script>
		<script src="../assets/js/dataTables.buttons.min.js"></script>
		<script src="../assets/js/dataTables.bootstrap5.min.js"></script>
		<script src="../assets/js/jquery-ui.js"></script>
		<script src="../assets/js/bootstrap.min.js"></script>
		<script src="../assets/js/all.min.js"></script>
		<script src="../scripts/userManagement.js?v=<?php echo time() ?>"></script>
	</body>
</html>
