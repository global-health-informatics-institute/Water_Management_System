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
    <link rel ="stylesheet" href="css/index.css?v=<?php echo time() ?>">
    <script src="assets/gauges.min.js"></script>
    <script src="assets/apexcharts.min.js"></script>
    <script src="assets/jquery.min.js"></script>
  </head>
  <body>
    <!--Start of navbar-->
    <div class="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.php">Water Management System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class=" offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: auto;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <a href="index.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class ="offcanvas-body">
            <hr>
            <ul class="navbar-nav ms-auto nav-pills mb-auto">
              <li id = "home" class="nav-item">
                <a href="index.php" class="nav-link" aria-current="page">
                  <i class="fas fa-home"></i>
                  Home
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
    <div class="container-fluid row theRow">
      
      <!--Card for tank 1-->
      <div id="the_container1" class="card col-lg-12 p-2 mt-5">
        <!--Toggle and select-->
        <ul class="nav nav-2">
          <li class="nav-item text-start">
            <button id="mode" class="btn-nav button-30 me-2">Auto-mode</button>
          </li>
          <li class="nav-item text-start">
            <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Reset</button>
          </li>
        </ul>
        <div id="control_1" class= "row" style="display:none;">
          <!--Buttons-->
          <div id="b1" class = "col-lg-3 col-md-6">
            <p id="p1" class="labels">Water Pump</p>
            <button id="pump1" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b2" class="col-lg-3 col-md-6">
            <p id="p2"class="labels">Pressure Pump</p>
            <button id="pump2" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b3" class="col-lg-3 col-md-6">
            <p id="v1" class="labels">Well Tank Valve</p>
            <button id="valve1" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b4" class="col-lg-3 col-md-6">
            <p id="v2" class="labels">Wb Tank Valve</p>
            <button id="valve2" class="btn btn-ctrl button-30">OFF</button></div>
        </div>

         <!--Card Content-->
        <div id="content" class="row mt-2 text-center">
          
          <!--Water Pressure gauge-->
          <div id ="Gauge" class="col-lg-3 col-md-4 ">
            <div id="thecard" class="mt-5">
              <p id="pressure" class="card-title">Water Pressure</p>
              <div id="chart2"></div>
            </div>
          </div>
          
          <!--Water Tank Chart-->
          <div id = "Chart" class="col-lg-9 col-md-8 ">
            <div id="thecard" class="shadow mt-5 mb-5">
              <p id="volume" class="card-title">Water Volume</p>
              <div id="chart1"></div>
            </div>
          </div>
        
        </div>
      </div>
      
      
      <!--Card for tank 2-->
      <div id="the_container2" class="card col-lg-12 p-2 mt-5">
        <!--Toggle and select-->
        <ul class="nav nav-2">
          <li class="nav-item text-start">
            <button id="mode_2" class="btn-nav button-30 me-2">Auto-mode</button>
          </li>
          <li class="nav-item text-start">
            <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Reset</button>
          </li>
        </ul>
        <div id="control_2" class= "row" style="display:none;">
          <!--Buttons-->
          <div id="b1_1" class = "col-lg-3 col-md-6">
            <p id="p1" class="labels">Water Pump</p>
            <button id="pump1" class="btn btn-ctrl button-30" >OFF</button></div>
          <div id="b2_1" class="col-lg-3 col-md-6">
            <p id="p2"class="labels">Pressure Pump</p>
            <button id="pump2" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b3_1" class="col-lg-3 col-md-6">
            <p id="v1" class="labels">Well Tank Valve</p>
            <button id="valve1" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b4_1" class="col-lg-3 col-md-6">
            <p id="v2" class="labels">Wb Tank Valve</p>
            <button id="valve2" class="btn btn-ctrl button-30">OFF</button></div>
        </div>

         <!--Card Content-->
        <div id="content" class="row mt-2 text-center">
          
          <!--Water Pressure gauge-->
          <div id ="Gauge" class="col-lg-4 col-md-5 ">
            <div id="thecard" class="mt-5">
              <p id="pressure" class="card-title">Water Pressure</p>
              <div id="chart4"></div>
            </div>
          </div>
          
          <!--Water Tank Chart-->
          <div id = "Chart" class="col-lg-8 col-md-7 ">
            <div id="thecard" class="shadow mt-5 mb-5">
              <p id="volume" class="card-title">Water Volume</p>
              <div id="chart3"></div>
            </div>
          </div>
        
        </div>
      </div>
      
      
      <!--Card for tank 3-->
      <div id="the_container3" class="card col-lg-12 shadow-lg p-2 mt-5">
        <!--Toggle and select-->
        <ul class="nav nav-2">
          <li class="nav-item text-start">
            <button id="mode_3" class="btn-nav button-30 me-2">Auto-mode</button>
          </li>
          <li class="nav-item text-start">
            <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">Reset</button>
          </li>
        </ul>
        
        <div id="control_3" class= "row" style="display:none;">
          <!--Buttons-->
          <div id="b1_2" class = "col-lg-3 col-md-6">
            <p id="p1" class="labels">Water Pump</p>
            <button id="pump1" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b2_2" class="col-lg-3 col-md-6">
            <p id="p2"class="labels">Pressure Pump</p>
            <button id="pump2" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b3_3" class="col-lg-3 col-md-6">
            <p id="v1" class="labels">Well Tank Valve</p>
            <button id="valve1" class="btn btn-ctrl button-30">OFF</button></div>
          <div id="b4_4" class="col-lg-3 col-md-6">
            <p id="v2" class="labels">Wb Tank Valve</p>
            <button id="valve2" class="btn btn-ctrl button-30">OFF</button></div>
        </div>

         <!--Card Content-->
        <div id="content" class="row mt-2 text-center">
          
          <!--Water Pressure gauge-->
          <div id ="Gauge" class="col-lg-3 col-md-4">
            <div id="thecard" class="mt-5">
              <p id="pressure" class="card-title">Water Pressure</p>
              <div id="chart6"></div>
            </div>
          </div>
          
          <!--Water Tank Chart-->
          <div id = "Chart" class="col-lg-9 col-md-4">
            <div id="thecard" class="shadow mt-5 mb-5">
              <p id="volume" class="card-title">Water Volume</p>
              <div id="chart5"></div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
    
    <!-- Modals -->
    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"><img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn button-31" data-bs-dismiss="modal">Close</button>
            <button id="reset" type="button" class="btn button-32" data-bs-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"><img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn button-31" data-bs-dismiss="modal">Close</button>
            <button id="reset" type="button" class="btn button-32" data-bs-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"><img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn button-31" data-bs-dismiss="modal">Close</button>
            <button id="reset" type="button" class="btn button-32" data-bs-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- toasts -->
    <div class="toast-container position-fixed top-0 end-0 p-5 mt-5">
      <div id="liveToast1" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning1" class="toast-body"></div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-50 end-0 p-5 mt-5">
      <div id="liveToast2" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning2" class="toast-body"></div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-50 end-0 p-5 mt-5">
      <div id="liveToast3" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning3" class="toast-body"></div>
      </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="assets/bootstrap.min.js"></script>
    <script src="assets/all.min.js"></script>
    <script src="scripts/index.js?v=<?php echo time() ?>"></script>
  </body>
</html>

