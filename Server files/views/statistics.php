<?php
session_start();

$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "sensorValues";
$tank_id = "";

//connect to database
$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
if (isset($_POST['tank_id']) && $_SESSION['tank_id'] !== $_POST['tank_id']){
	$tank_id = trim($_POST['tank_id']);
	$_SESSION['tank_id'] = $tank_id;
	echo 1;
	die();	 	
}
if (isset($_POST['tank_id']) && isset($_POST['select'])){
	$tank_id = trim($_POST['tank_id']);
	$_SESSION['tank_id'] = $tank_id;
	echo 1;
	die();	 	
}

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "../assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="../assets/bootstrap.min.css">
		<link rel ="stylesheet" href="../assets/dataTables.dateTime.min.css">
		<link rel ="stylesheet" href="../assets/buttons.dataTables.min.css">
		<link rel ="stylesheet" href="../assets/all.min.css">
		<link rel ="stylesheet" href="../assets/jquery-ui.min.css">
		<link rel ="stylesheet" href="../assets/dataTables.bootstrap5.min.css">
		<link rel ="stylesheet" href="../assets/buttons.bootstrap5.min.css">
		<link rel ="stylesheet" href="../css/statistics.css?v=<?php echo time() ?>">
		
		<!--Dependencies-->
		<script src="../assets/jquery.min.js"></script>
		<script src="../assets/jquery-ui.js"></script>
		<script src="../assets/moment.min.js"></script>
		<script src="../assets/jquery.dataTables.min.js"></script>
		<script src="../assets/dataTables.dateTime.min.js"></script>
		<script src="../assets/dataTables.buttons.min.js"></script>
		<script src="../assets/dataTables.bootstrap5.min.js"></script>
		<script src="../assets/buttons.bootstrap5.min.js"></script>
		<script src="../assets/apexcharts.min.js"></script>
		
		<title>Statistics</title>
	</head>
	<body id ="document" class="bg-light">
		<!--Start of navbar section-->
		<div class="navbar navbar-expand-lg navbar-dark shadow mb-3">
		  <div class="container-fluid">
			<a class="navbar-brand" href="../admin.php"><img src="../assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
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
				  <?php
					if($_SESSION['name'] == 'admin'){
					  echo'<li id = "dash" class="nav-item">
						<a href="userManagement.php" class="nav-link">
						   <i class="fas fa-user nav-icon"></i>
						   User Management
						</a>
					  </li>';
					}
				  ?>
				  <li id = "stats" class="nav-item">
					<a href="statistics.php" class="nav-link">
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
		<!--end of navbar section-->
		
		<!--start of content section-->
		<div id="main-container" class= "container h-100 mt-5">
			<!--first row-->
			<div class = "row w-25">
			<?php
				if($_SESSION['name'] !== 'admin'){
				echo'
				 <select class="form-select" id="select">
					<option selected value="default">Choose Water Tank</option>';
					  foreach($db->query("SELECT watertank_id, name FROM water_tanks") as $row){
						echo'<option  value="'.$row['watertank_id'].'">'.$row['name'].'</option>';
					  }
				echo '</select>';	
				}
			?>
			</div>
			<!--first row-->
			<div class ="row mb-5">
				<div class = "col-lg-4 col-sm-12 mid"><div class = "card mid-card">Estimated Consumption: 200 cubic meters</div></div>
				<div class = "col-lg-4 col-sm-12 mid"><div class = "card mid-card">Status: <span style="color:green;">Active</span></div></div>
				<div class = "col-lg-4 col-sm-12 mid"><div class = "card mid-card">Recommendation: Reduce water usage</div></div>
			</div>
			<!--second row-->
			<div class="card row shadow-sm mb-2">
				<div class="pt-2 pb-1" style ="overflow-x:auto;">
					<table id="dataTable" class="table table-hover text-start" cellspacing="0">
					  <thead class = "thead-light">
						<tr>
						  <th scope="col"></th>
						  <th scope="col">Time</th>
						  <th scope="col">Volume</th>
						</tr>
					  </thead>
					  <tbody>
						<?php
							$i = 0;
							foreach($db->query("SELECT id, Volume FROM sensorValues WHERE watertank_id = '".$_SESSION['tank_id']."' ") as $row) {
								echo'
									<tr>
									  <th scope="row">'.++$i.'</th>
									  <td>'.$row['id'].'</td>
									  <td id = "Volume" >'.$row['Volume'].'</td>
									</tr> ';
							}					
						?>
					  </tbody>
					</table>
				</div>
			</div>
			<!--third row-->
			<div class = "row d-grid mb-4 visually-hidden">
				<div class="w-100 text-start">
					<button id = "plot" class="btn">plot</button>
				</div>
			</div>
			<!--fourth row-->
			<div id="chart-container" class = "card shadow-sm row visually-hidden">
				<div class="card-title w-100 text-end" ><button type="button" class="btn-close mt-3 pe-5" aria-label="Close"></button></div>
				<div id="chart" class="col-lg-12"></div>
			</div>
		</div>
		<!--end of content section-->
		
		<!--start of utilities section-->
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
		<!--end of utilities section-->
		<script src="../assets/bootstrap.min.js"></script>
		<script src="../assets/all.min.js"></script>
		<script src="../scripts/statistics.js?v=<?php echo time() ?>"></script>
	</body>
</html>
