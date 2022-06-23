<?php
//start the session
session_start();

//if the user is already logged in then redirect user
if(!isset($_SESSION['loggedin']) && $_SESSION['loggedin'] !== true){
	header("location: login.php");
	exit;
}
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Water Management System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel ="stylesheet" href="assets/bootstrap.min.css">
    <link rel ="stylesheet" href="assets/all.min.css">
    <link rel ="stylesheet" href="css/admin.css?v=<?php echo time() ?>">
    <script src="assets/gauges.min.js"></script>
    <script src="assets/apexcharts.min.js"></script>
    <script src="assets/jquery.min.js"></script>
  </head>
  <body>
    <!--Start of navbar-->
    <div class="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="admin.php">Water Management System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class=" offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: auto;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <a href="admin.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class ="offcanvas-body">
            <hr>
            <ul class="navbar-nav ms-auto nav-pills mb-auto">
              <li id = "home" class="nav-item">
                <a href="admin.php" class="nav-link" aria-current="page">
                  <i class="fas fa-home"></i>
                  Home
                </a>
              </li>
              <li id = "dash" class="nav-item">
                <a href="adminRegister.php" class="nav-link">
                  <i class="fas fa-user-plus"></i>
                  Add User
                </a>
              </li>
            </ul>
            <hr>
            <div class="dropdown">
              <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
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
    <!-- Start of content-->
    <div id="the_container" class="container-fluid">
      <ul class="nav nav-2">
        <li class="nav-item text-start me-2">
          <button id="mode" class="btn-nav button-30 me-2" onclick="handleClick5()">Auto-mode</button>
        </li>
        <li class="nav-item text-start">
          <button id="reset" class="button-30 me-2">Reset</button>
        </li>
        <li class="nav-item l2">
          <select class="form-select" id="select">
            <option>Choose Water Tank</option>
            <option value="1">GHII Well Tank</option>
            <option value="3">GHII Waterboard Tank</option>
            <option value="4">Some other tank</option>
          </select>
        </li>
      </ul>
      <div id="control" class= "row" style="display:none;">
        <!--Buttons-->
        <div id="b1" class = "col-lg-3 col-md-6">
          <p id="p1" class="labels">Water Pump</p>
          <button id="pump1" class="btn btn-ctrl button-30" onclick="handleClick1()">OFF</button></div>
        <div id="b2" class="col-lg-3 col-md-6">
          <p id="p2"class="labels">Pressure Pump</p>
          <button id="pump2" class="btn btn-ctrl button-30" onclick="handleClick2()">OFF</button></div>
        <div id="b3" class="col-lg-3 col-md-6">
          <p id="v1" class="labels">Well Tank Valve</p>
          <button id="valve1" class="btn btn-ctrl button-30" onclick="handleClick3()">OFF</button></div>
        <div id="b4" class="col-lg-3 col-md-6">
          <p id="v2" class="labels">Wb Tank Valve</p>
          <button id="valve2" class="btn btn-ctrl button-30" onclick="handleClick4()">OFF</button></div>
      </div>

      <!--Card Content-->
      <div id="content" class="row mt-2 text-center">
        
        <!--Water Pressure gauge-->
        <div id ="Gauge" class="col-lg-6">
          <div id="thecard" class="card shadow mt-5">
            <p class="card-title">Water Pressure</p>
            <div id="chart2"></div>
          </div>
        </div>
        
        <!--Water Tank Chart-->
        <div id="Chart" class="col-lg-6">
          <div id="thecard" class="card shadow mt-5">
            <p class="card-title">Water Volume</p>
            <div id="chart1"></div>
          </div>
        </div>
      
      </div>
    </div>
    <div class="toast-container position-fixed top-0 end-0 p-5 mt-5">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning" class="toast-body"></div>
      </div>
    </div>
    <!--Footer-->
    
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="assets/bootstrap.min.js"></script>
    <script src="assets/all.min.js"></script>
    <script src="scripts/admin.js?v=<?php echo time() ?>"></script>
  </body>
</html>
