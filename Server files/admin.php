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
    <link rel ="stylesheet" href="css/admin.css?v=<?php echo time() ?>">
    <script src="assets/gauges.min.js"></script>
    <script src="assets/apexcharts.min.js"></script>
    <script src="assets/jquery.min.js"></script>
  </head>
  <body>
    <!--Start of navbar-->
    <div class="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Water Management System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="nav w-100">
            <li class="nav-item">
              <p class = "nav-text me-2" >Hello, <?=$_SESSION['name']?>!</p>
            </li>
            <li class="nav-item">
              <a href="adminRegister.php" id="logout" class ="ms-2 h-auto"><img class="adduser-img me-1" src="assets/images/add-user-add-svgrepo-com.svg"/>Register user</a>
            </li>
            <li class="nav-item">
              <a href="logout.php" id="logout" class ="me-2 h-auto"><img class="logout-img me-1 color-white" src="assets/images/logout-svgrepo-com.svg"/>Logout</a>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>


    <!-- Start of content-->
    <div class="container-fluid">
      <div class="nav-item  text-start">
        <button id="mode" class="btn-nav me-2" onclick="handleClick5()">Auto-mode</button>
      </div>
      <div id="control" class= "row" style="display:none;">
        <!--Buttons-->
        <div class = "col-lg-3 col-md-6">
          <p class="labels">Water Pump</p>
          <button id="pump1" class="btn btn-ctrl" onclick="handleClick1()">OFF</button></div
        >
        <div class="col-lg-3 col-md-6">
          <p class="labels">Pressure Pump</p>
          <button id="pump2" class="btn btn-ctrl" onclick="handleClick2()">OFF</button></div
        >
        <div class="col-lg-3 col-md-6">
          <p class="labels">Well Tank Valve</p>
          <button id="valve1" class="btn btn-ctrl" onclick="handleClick3()">OFF</button></div
        >
        <div class="col-lg-3 col-md-6">
          <p class="labels">Wb Tank Valve</p>
          <button id="valve2" class="btn btn-ctrl" onclick="handleClick4()">OFF</button></div
        >
      </div>

      <!--Card Content-->
      <div class="row mt-2 text-center">
        
        <!--Water Pressure gauge-->
        <div class="col-lg-6">
          <div id="thecard" class="card shadow mt-5 p-4">
            <p class="card-title">Water Pressure</p>
            <div id="chart2"></div>
          </div>
        </div>
        
        <!--Water Well Tank gauge-->
        <div class="col-lg-6">
          <div id="thecard" class="card shadow mt-5 p-4">
            <p class="card-title">Water Volume</p>
            <div id="chart1"></div>
          </div>
        </div>
      
      </div>
    </div>
    
    <!--Footer-->
    <?php include ("inc/footer.php")?>
    
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="assets/bootstrap.min.js"></script>
    <script src="scripts/admin.js?v=<?php echo time() ?>"></script>
  </body>
</html>
