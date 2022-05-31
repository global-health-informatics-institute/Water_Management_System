<?php
//start the session
session_start();

//if the user is already logged in then redirect user
if(!isset($_SESSION["userid"]) && $_SESSION["userid"] !== true){
	header("location: login.php");
	exit;
}
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Water Management System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel ="stylesheet" href="styler.css?v=3">
    <link rel ="stylesheet" href="bootstrap.min.css">
    <script src="gauges.min.js"></script>
    <script src="canvasjs.min.js"></script>
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
              <button id="mode" class="btn-nav me-2" onclick="handleClick4()">Auto-mode</button>
            </li>
            <li class="nav-item">
              <a href="logout.php" id="logout" class ="btn btn-secondary me-2 h-auto" role="button">Logout</a>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>


    <!-- Start of content-->
    <div class="container-fluid">
      <div id="control" class= "row" style="display:none;">
        <!--Buttons-->
        <div class = "col-lg-4 col-md-6">
          <p class="labels">Pressure Pump</p>
          <button id="pump1" class="btn btn-ctrl" onclick="handleClick1()">OFF</button></div
        >
        <div class="col-lg-4 col-md-6">
          <p class="labels">Well Pump</p>
          <button id="pump2" class="btn btn-ctrl" onclick="handleClick2()">OFF</button></div
        >
        <div class="col-lg-4 col-md-6">
          <p class="labels">Well Tank Valve</p>
          <button id="valve1" class="btn btn-ctrl" onclick="handleClick3()">OFF</button></div
        >
      </div>

      <!--Card Content-->
      <div class="row mt-2 text-center">
        <!--Water Pressure gauge-->
        <div class="col-lg-12">
          <div id="thecard" class="card shadow mt-5">
            <p class="card-title">Water Pressure</p>
            <canvas class="canvas"  id="gauge-pressure"></canvas>
          </div>
        </div>
        
        <!--Water Well Tank gauge-->
        <div class="col-lg-12">
          <div id="thecard" class="card shadow mt-5">
            <div id="chartContainer"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="bootstrap.min.js"></script>
    <script src="script.js?v=4"></script>
  </body>
</html>

