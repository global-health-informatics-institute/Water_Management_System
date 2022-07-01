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
		<link rel ="stylesheet" href="assets/all.min.css">
		<link rel ="stylesheet" href="css/login.css?v=<?php echo time() ?>">
		<script src="assets/jquery.min.js"></script>
		<title>Login</title>
	</head>
	<body class="bg-light">
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="img-pos mt-5 mb-0" ><img class="user-img" src="assets/images/logo with text.png"/></div>
				<div class="card-title mt-2"><strong>Sign In</strong></div>
				<div class="alert alert-danger mx-5" style="display:none">invalid credentials<button type="button" class="btn-close ms-2" aria-label="Close" onclick="close1()"></div>
				<form id="form" class="h-100 mt-3" action ="" method="post">
					<div class="form-floating me-3 ms-3">
					  <input type="text" class="input-fields form-control" id="floatingInput" placeholder="Username" >
					  <label for="floatingInput"><i class="fas fa-user me-2"></i>Username</label>
					</div>
					<div class="form-floating me-3 ms-3">
					  <input type="password" class="input-fields form-control" id="floatingPassword" placeholder="Password">
					  <label for="floatingPassword"><i class="fas fa-key me-2"></i>Password</label>
					</div>
					<div class="form-group mb-2 ms-3 me-3 mt-5">
						<button id="login" class="btn login" type="submit">
						  <span class=" spinner spinner-border spinner-border-sm text-white visually-hidden" role="status" aria-hidden="true"></span>
						  <span class = "login-text">Login</span>
						</button>
					</div>
				</form>
				<div class="mb-2"> &copy 2022, GHII</div>
				</div>
			</div>
		</div>
		<script src="assets/bootstrap.min.js"></script>
		<script src="assets/all.min.js"></script>
		<script src="scripts/login.js?v=<?php echo time() ?>"></script>
	</body>
</html>
