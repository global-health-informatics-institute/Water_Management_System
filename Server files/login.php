<?php
require_once "session.php";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="assets/bootstrap.min.css">
		<link rel ="stylesheet" href="assets/bootstrap-icons.css">
		<link rel ="stylesheet" href="css/login.css?v=<?php echo time() ?>">
		<script src="assets/jquery.min.js"></script>
		<title>Login</title>
	</head>
	<body class="bg-light">
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="img-pos mt-5 mb-0" ><img class="user-img" src="assets/images/logo with text.png"/></div>
				<div class="card-title mt-2">Sign In</div>
				<div class="alert alert-danger mx-5" style="display:none">invalid credentials<button type="button" class="btn-close ms-2" aria-label="Close" onclick="close1()"></div>
				<form id="form" class="h-100 mt-3" action ="" method="post">
					<div class="form-group text-center ms-2 me-2">
						<input class="username" type = "text" id = "username" placeholder="username" class="form-control" required/>
					</div>
					<div class="form-group text-center ms-2 me-2">
						<input class="password" type = "password" id = "password" placeholder="password" class="form-control" required/>
					</div>
					<div class="form-group mb-2">
						<button id="login" class="btn" type="submit">
						  <span class=" spinner spinner-border spinner-border-sm text-white visually-hidden" role="status" aria-hidden="true"></span>
						  <span class="text-white">Login</span>
						</button>
					</div>
				</form>
				<div class="mb-2"> &copy 2022, GHII</div>
				</div>
			</div>
		</div>
		<script src="assets/bootstrap.min.js"></script>
		<script src="scripts/login.js?v=<?php echo time() ?>"></script>
	</body>
</html>
