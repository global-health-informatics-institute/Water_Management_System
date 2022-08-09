<?php
require_once "resources/session.php";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel = "icon" type="image/png" href = "assets/images/ghii_logo.png">
		<link rel ="stylesheet" href="assets/css/bootstrap.min.css">
		<link rel ="stylesheet" href="assets/css/bootstrap-icons.css">
		<link rel ="stylesheet" href="assets/css/all.min.css">
		<link rel ="stylesheet" href="css/login.css?v=<?php echo time() ?>">
		<script src="assets/js/jquery.min.js"></script>
		<title>Login</title>
	</head>
	<body class="bg-light">
		<div id="main-container" class= "container d-grid h-100">
			<div id="thecard2" class="card shadow col-md-5">
				<div class="img-pos mt-4 mb-0" ><img class="user-img" src="assets/images/logo with text.png"/></div>
				<div class="card-title mt-2 mb-4"><strong>Sign In</strong></div>
				<div class="alert alert-danger mx-5" style="display:none">invalid credentials<button type="button" class="btn-close ms-2" aria-label="Close" onclick="close1()"></div>
				<form id="form" class="h-100 mt-3" action ="" method="post">
					<div class="form-floating me-3 ms-3">
					  <input type="text" class="input-fields form-control" id="floatingInput" placeholder="Username" required>
					  <label for="floatingInput"><i class="fas fa-user me-2"></i>Username</label>
					</div>
					<div class="form-floating me-3 ms-3">
					  <input type="password" class="input-fields form-control" id="floatingPassword" placeholder="Password" required>
					  <label for="floatingPassword"><i class="fas fa-key me-2"></i>Password</label>
					</div>
					<div class="form-group mb-2 ms-3 me-3 mt-4">
						<button id="login" class="btn login" type="submit">
						  <span class=" spinner spinner-border spinner-border-sm text-white visually-hidden" role="status" aria-hidden="true"></span>
						  <span class = "login-text">Login</span>
						</button>
					</div>
				</form>
				<div class="mb-3 mt-2"><a href="http://ghii.org" class="org-link text-muted"><small>GHII, &copy 2022 </small></a></div>
			</div>
		</div>
		<!--Waves Container-->
		<div>
			<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
			<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
			</defs>
			<g class="parallax">
			<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
			<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
			<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
			<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
			</g>
			</svg>
		</div>
		<!--Waves end-->
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
		<script src="assets/js/bootstrap.min.js"></script>
		<script src="assets/js/all.min.js"></script>
		<script src="scripts/login.js?v=<?php echo time() ?>"></script>
	</body>
</html>
