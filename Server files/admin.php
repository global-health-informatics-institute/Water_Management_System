<?php
//start the session
session_start();
//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: login.php");
	exit;
}

if($_SESSION['name'] !== "admin"){
		header("location: index.php");
    exit;
}

$error = "";
$user = "admin";
$password = "password";
$database = "WMS";
$table = "sensorValues";
$tank_id = "";

//connect to database
$db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);

?>


<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel = "icon" type="image/png" href = "assets/images/ghii_logo.png"> 
    <link rel ="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel ="stylesheet" href="assets/css/jquery-ui.min.css">
    <link rel ="stylesheet" href="assets/css/all.min.css">
    <link rel ="stylesheet" href="css/admin.css?v=<?php echo time() ?>">
    <script src="assets/js/gauges.min.js"></script>
    <script src="assets/js/apexcharts.min.js"></script>
    <script src="assets/js/jquery.min.js"></script>
    <title>Water Management System</title>
  </head>
  <body>
    <!--Preloader-->
    <div id="preloader" class="modala">
		  <!-- Modal content -->
		  <div class="modala-content d-flex">
        <span >Loading... </span>
			  <div class="spinner-grow" style="animation-delay: calc(-0.45s / var(--d,1));" role="status">
			  </div>
			  <div  class="spinner-grow" style="animation-delay: calc(-0.3s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.15s / var(--d,1));" role="status">
			  </div>
		  </div>
		</div>
    <!--Start of navbar-->
    <div class="navbar navbar-expand-lg navbar-dark shadow-lg mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="admin.php" title="Water management system"><img src="assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class="offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white" style="width: auto;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <a href="admin.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class ="offcanvas-body">
            <hr>
            <ul class="navbar-nav ms-auto nav-pills mb-auto">
              <li id = "home" class="nav-item">
                <a href="admin.php" class="nav-link" aria-current="page" title="Overview">
                  <i class="fas fa-home nav-icon"></i>
                  Overview
                </a>
              </li>
              <li id = "dash" class="nav-item">
                <a href="views/userManagement.php" class="nav-link" title="Manage users">
                  <i class="fas fa-user nav-icon"></i>
                  User Management
                </a>
              </li>
              <li id = "stats" class="nav-item">
                <a href="views/statistics.php" class="nav-link" title="Statistics">
                  <i class="fas fa-chart-line nav-icon"></i>
                  Statistics
                </a>
              </li>
            </ul>
            <hr>
            <div class="dropdown" title="Profile">
              <div class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="assets/images/user-svgrepo-com.svg" alt="" width="32" height="32" class="rounded-circle me-2">
                 <?=$_SESSION['name']?>
              </div>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end text-small shadow mt-2" aria-labelledby="dropdownUser1">
                <li id ="settings" title="Settings"><a class="dropdown-item" href="#">Settings</a></li>
                <hr>
                <li id ="signout" title="sign out"><a class="dropdown-item" href="logout.php">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start of content-->
    <div id="the_container" class="container-fluid">
      <ul class="nav nav-2">
        <li class="nav-item text-start me-2">
          <button id="mode" class="button-30 me-2" onclick="handleClick5()" title="Mode" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Auto-mode</button>
        </li>
        <li class="nav-item text-start visually-hidden">
          <button id = "modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" title="Reset">Reset</button>
        </li>
        <li id = "selection" class="nav-item l2" title="Select water tank">
          <select class="form-select" id="select">
            <option selected value="default">Choose Water Tank</option>
            <?php
              foreach($db->query("SELECT watertank_id, name FROM water_tanks") as $row){
                echo'<option  value="'.$row['watertank_id'].'">'.$row['name'].'</option>';
              }
            ?>
          </select>
        </li>
      </ul>
      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel"><img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">Confirmation</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="button-30" data-bs-dismiss="modal">Close</button>
              <button id="reset" type="button" class="button-30" data-bs-dismiss="modal">Yes</button>
            </div>
          </div>
        </div>
      </div>
      <div class= "row collapse text-center" id="collapseExample">
        <!--Buttons-->
        <div id="b1" class = "col-lg-3 col-md-6">
          <p id="p1" class="labels">Water Pump</p>
          <button id="pump1" class="btn  button-31" onclick="handleClick1()">OFF</button></div>
        <div id="b2" class="col-lg-3 col-md-6">
          <p id="p2"class="labels">Pressure Pump</p>
          <button id="pump2" class="btn button-31" onclick="handleClick2()">OFF</button></div>
        <div id="b3" class="col-lg-3 col-md-6">
          <p id="v1" class="labels">Well Tank Valve</p>
          <button id="valve1" class="btn button-31" onclick="handleClick3()">OFF</button></div>
        <div id="b4" class="col-lg-3 col-md-6">
          <p id="v2" class="labels">Wb Tank Valve</p>
          <button id="valve2" class="btn button-31" onclick="handleClick4()">OFF</button></div>
      </div>

      <!--Card Content-->
      <div id="content" class="row mt-2 text-center">
        
        <!--Water Pressure gauge-->
        <div id ="Gauge" class="col-lg-4 visually-hidden">
          <div id="thecard" class="mt-5">
            <div id="chart2"></div>
          </div>
        </div>
        
        <!--Water Tank Chart-->
        <div id="Chart" class="col-lg-12 mb-2">
          <div id="thecard2" class="card shadow mt-5">
            <div id="chart1"></div>
          </div>
        </div>
      
      </div>
    </div>
    <div class="toast-container position-fixed top-0 end-0 p-5 mt-5">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label warning">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning" class="toast-body"></div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-50 end-0 p-5 mt-5">
      <div id="liveToast2" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label success">Success!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "success" class="toast-body"></div>
      </div>
    </div>
    <!--Footer-->
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
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="scripts/admin.js?v=<?php echo time() ?>"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery-ui.js"></script>
    <script src="assets/js/all.min.js"></script>
  </body>
</html>
