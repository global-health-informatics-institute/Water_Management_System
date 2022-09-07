<?php
session_start();
require_once "../resources/settings_service.php";
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "../assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="../assets/css/bootstrap.min.css">
		<link rel ="stylesheet" href="../assets/css/dataTables.dateTime.min.css">
		<link rel ="stylesheet" href="../assets/css/buttons.dataTables.min.css">
		<link rel ="stylesheet" href="../assets/css/all.min.css">
		<link rel ="stylesheet" href="../assets/css/jquery-ui.min.css">
		<link rel ="stylesheet" href="../assets/css/dataTables.bootstrap5.min.css">
		<link rel ="stylesheet" href="../assets/css/buttons.bootstrap5.min.css">
		<link rel ="stylesheet" href="../css/settings.css?v=<?php echo time() ?>">
		
		<!--Dependencies-->
		<script src="../assets/js/jquery.min.js"></script>
		<script src="../assets/js/jquery-ui.js"></script>
		<script src="../assets/js/moment.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/dataTables.dateTime.min.js"></script>
		<script src="../assets/js/dataTables.buttons.min.js"></script>
		<script src="../assets/js/dataTables.bootstrap5.min.js"></script>
		<script src="../assets/js/buttons.bootstrap5.min.js"></script>
		<script src="../assets/js/apexcharts.min.js"></script>
		
		<title>Settings</title>
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
		<!--Back button-->
		<div class="p-2">
			<div id="backbtn" title="Back"><i id="back" class="fas fa-backspace button-30">Back</i></div>
		</div>
		<div class="text-center place pb-3">
			<h2 class="card set p-2">Settings</h2>
		</div>
		
		<!--start of content section-->
		<div id="main-container" class= "container h-100">
			<div class="row">
				<!--first column-->
				<div class = "col-lg-6 pb-3">
				  <div class ="card p-3">
					  <div class = "text-start">
						  <h5>Water Pump Interval</h5>
						  <p class="text-muted">Change the water pump interval in seconds</p>
						  <form id="interval" class="form">
							  <div class ="row pb-3">
								  <div class="col-6 text-center">
									<label for="On" class="form-label">Water Pump On</label>
								  </div>
								  <div class="col-6">
									<input type="text" class="form-control" id="On" value="" >
								  </div>
							  </div>
							  <div class = "row">
								  <div class="col-6 text-center">
									<label for="Off" class="form-label">Water Pump Off</label>
								  </div>
								  <div class="col-6">
									<input type="text" class="form-control" id="Off" value="" >
								  </div>
							  </div>
							  <p id="upload-update1" class="visually-hidden text-danger text-center pt-2"></p>
							  <div id="int"  class="text-end visually-hidden pt-3">
								  <button id="submitInt" type="submit" class="button-30 p-2 me-3">Apply</button>
								  <button id="cancel" class="button-30 p-2">Cancel</button>
							  </div>
						  </form>
					  </div>
				  </div>
				</div>
				<!--second column-->
				<div class="col-lg-6 pb-3">
				  <div class="card p-3">
					  <div class = "text-start">
						  <h5>Background image</h5>
						  <p class="text-muted">Change background image</p>
						  <form id="background" class="form" enctype="multipart/form-data">
							  <div class="pb-3">
								  <label for="formFile" class="form-label">Click to choose file</label>
								  <input class="form-control" type="file" name = "image" accept =".png,.gif,.jpg,.webp" id="formFile">
							  </div>
							  <p id="upload-update" class="visually-hidden text-danger text-center pt-2"></p>
							  <div id="img" class="text-end visually-hidden pt-3 pb-4">
								  <button id="uploadImg" type="submit" class="button-30 p-2 me-3">Upload</button>
								  <button id="cancel2" class="button-30 p-2">Cancel</button>
							  </div>
							  <div class="progress-bar visually-hidden">
							  <div class="progress-bar-fill">
								  <span class="progress-bar-text">0%</span>
							  </div>
						  </div>
						  </form>
					  </div>
				  </div>
				</div>
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
		<script src="../assets/js/bootstrap.min.js"></script>
		<script src="../assets/js/all.min.js"></script>
		<script src="../scripts/settings.js?v=<?php echo time() ?>"></script>
	</body>
</html>
