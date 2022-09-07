<?php
//start the session
session_start();
require_once "resources/index_service.php";

?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel = "icon" type="image/png" href = "assets/images/ghii_logo.png">
    <link rel ="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel ="stylesheet" href="assets/css/all.min.css">
    <link rel ="stylesheet" href="assets/css/jquery-ui.min.css">
    <link rel ="stylesheet" href="css/index.css?v=<?php echo time() ?>">
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
			  <span>Loading... </span>
			  <div class="spinner-grow" style="animation-delay: calc(-0.45s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.3s / var(--d,1));" role="status">
			  </div>
			  <div class="spinner-grow" style="animation-delay: calc(-0.15s / var(--d,1));" role="status">
			  </div>
		  </div>
		</div>
    <!--Start of navbar-->
    <div class="navbar navbar-expand-lg navbar-dark shadow mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.php" title="Water management system"><img src="assets/images/ghii_logo.png" alt="" width="32" height="32" class="me-2">Water Management System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>
        <div class=" offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <a href="index.php" class="offcanvas-title fs-4 align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" id="offcanvasExampleLabel">WATER MANAGEMENT SYSTEM</a>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class ="offcanvas-body">
            <hr>
            <ul class="navbar-nav ms-auto nav-pills mb-auto">
              <li id = "home" class="nav-item">
                <a href="index.php" class="nav-link" aria-current="page" title="Overview">
                  <i class="fas fa-home ms-2"></i>
                  Overview
                </a>
              </li>
              <li id = "stats" class="nav-item">
                <a href="views/statistics.php" class="nav-link" aria-current="page" title="Statistics">
                  <i class="fas fa-chart-line ms-2"></i>
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
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end text-small shadow pt-2" aria-labelledby="dropdownUser1">
                <li id ="settings" title="Settings"><a class="dropdown-item" href="views/settings.php">Settings</a></li>
                <hr>
                <li id ="signout" title="sign out"><a class="dropdown-item" href="logout.php">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start of content-->
    <div class="container-fluid h-100">
      <div class="row theRow">
        <!--Card for pressure gauge-->
        <div id="the_container0" class="col-lg-4 pt-5 visually-hidden">
          <!--Water Pressure gauge-->
          <div id ="Gauge" >
            <div id="chart2" class="card"></div>
          </div>
        </div>
        
        <div id = "first" class=" pt-5 col-lg-8">
          <!--Card for tank 1-->
          <div id="the_container1" class="card p-2">
            <div id = "tankName" class="card-title"></div>
            
            <div class= "row collapse text-center" id="collapse1">
              <!--Buttons-->
              <div id="b1" class = "col-lg-3 col-md-6">
                <p id="p1" class="labels">Water Pump</p>
                <button id="pump1" class="btn button-30">OFF</button></div>
              <div id="b2" class="col-lg-3 col-md-6">
                <p id="p2"class="labels">Pressure Pump</p>
                <button id="pump2" class="btn  button-30">OFF</button></div>
              <div id="b3" class="col-lg-3 col-md-6">
                <p id="v1" class="labels">Well Tank Valve</p>
                <button id="valve1" class="btn  button-30">OFF</button></div>
              <div id="b4" class="col-lg-3 col-md-6">
                <p id="v2" class="labels">Wb Tank Valve</p>
                <button id="valve2" class="btn  button-30">OFF</button></div>
            </div>

             <!--Card Content-->
            <div id="content" class="row text-center">

              <!--Water Tank Chart-->
              <div id = "Chart" class="col-lg-12 ">
                <div id="thecard">
                  <div id="chart1"></div>
                </div>
              </div>
            
            </div>
            <!--Toggle and select-->
            <ul class="nav nav-2">
              <li class="nav-item text-start">
                <button id="mode" class="button-30 me-2" title="Mode" data-bs-toggle="collapse" href="#collapse1" role="button" aria-expanded="false" aria-controls="collapse1">Auto-mode</button>
              </li>
              <li class="nav-item text-start visually-hidden">
                <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" title="Reset">Reset</button>
              </li>
            </ul>
          </div>
        </div>
        
        <!--Card for tank 2-->
        <div class="col-lg-6 pt-5">
          <div id="the_container2" class="card p-2">
            <div id = "tankName" class="card-title"></div>
            
            <div class= "row collapse text-center" id="collapse2">
              <!--Buttons-->
              <div id="b1_1" class = "col-lg-3 col-md-6">
                <p id="p1" class="labels">Water Pump</p>
                <button id="pump1" class="btn  button-30" >OFF</button></div>
              <div id="b2_1" class="col-lg-3 col-md-6">
                <p id="p2"class="labels">Pressure Pump</p>
                <button id="pump2" class="btn  button-30">OFF</button></div>
              <div id="b3_1" class="col-lg-3 col-md-6">
                <p id="v1" class="labels">Well Tank Valve</p>
                <button id="valve1" class="btn  button-30">OFF</button></div>
              <div id="b4_1" class="col-lg-3 col-md-6">
                <p id="v2" class="labels">Wb Tank Valve</p>
                <button id="valve2" class="btn  button-30">OFF</button></div>
            </div>

             <!--Card Content-->
            <div id="content" class="row text-center">
              
              <!--Water Tank Chart-->
              <div id = "Chart" class="col-lg-12 ">
                <div id="thecard">
                  <div id="chart3"></div>
                </div>
              </div>
            
            </div>
            <!--Toggle and select-->
            <ul class="nav nav-2">
              <li class="nav-item text-start">
                <button id="mode_2" class="button-30 me-2" title="Mode" data-bs-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapse2">Auto-mode</button>
              </li>
              <li class="nav-item text-start visually-hidden">
                <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" title="Reset">Reset</button>
              </li>
            </ul>
          </div>
        </div>
        
        <!--Card for tank 3-->
        <div class="col-lg-6 pt-5">
          <div id="the_container3" class="card p-2">
            <div id = "tankName" class="card-title"></div>
            
            <div class= "row collapse text-center" id="collapse3">
              <!--Buttons-->
              <div id="b1_2" class = "col-lg-3 col-md-6">
                <p id="p1" class="labels">Water Pump</p>
                <button id="pump1" class="btn  button-30">OFF</button></div>
              <div id="b2_2" class="col-lg-3 col-md-6">
                <p id="p2"class="labels">Pressure Pump</p>
                <button id="pump2" class="btn  button-30">OFF</button></div>
              <div id="b3_2" class="col-lg-3 col-md-6">
                <p id="v1" class="labels">Well Tank Valve</p>
                <button id="valve1" class="btn  button-30">OFF</button></div>
              <div id="b4_2" class="col-lg-3 col-md-6">
                <p id="v2" class="labels">Wb Tank Valve</p>
                <button id="valve2" class="btn  button-30">OFF</button></div>
            </div>

             <!--Card Content-->
            <div id="content" class=" row text-center">
              
              <!--Water Tank Chart-->
              <div id = "Chart" class="col-lg-12">
                <div id="thecard">
                  <div id="chart5"></div>
                </div>
              </div>
            
            </div>
            <!--Toggle and select-->
            <ul class="nav nav-2">
              <li class="nav-item text-start">
                <button id="mode_3" class="button-30 me-2" title="Mode" data-bs-toggle="collapse" href="#collapse3" role="button" aria-expanded="false" aria-controls="collapse3">Auto-mode</button>
              </li>
              <li class="nav-item text-start visually-hidden">
                <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" title="Reset">Reset</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 pt-5">
          <!--Card for tank 4-->
          <div id="the_container4" class="card shadow-lg p-2">
            <div id = "tankName" class="card-title"></div>
            
            <div class= "row collapse text-center" id="collapse4">
              <!--Buttons-->
              <div id="b1_3" class = "col-lg-3 col-md-6">
                <p id="p1" class="labels">Water Pump</p>
                <button id="pump1" class="btn  button-30">OFF</button></div>
              <div id="b2_3" class="col-lg-3 col-md-6">
                <p id="p2"class="labels">Pressure Pump</p>
                <button id="pump2" class="btn  button-30">OFF</button></div>
              <div id="b3_3" class="col-lg-3 col-md-6">
                <p id="v1" class="labels">Well Tank Valve</p>
                <button id="valve1" class="btn  button-30">OFF</button></div>
              <div id="b4_3" class="col-lg-3 col-md-6">
                <p id="v2" class="labels">Wb Tank Valve</p>
                <button id="valve2" class="btn  button-30">OFF</button></div>
            </div>

             <!--Card Content-->
            <div id="content" class=" row text-center">
              
              <!--Water Tank Chart-->
              <div id = "Chart" class="col-lg-12 mb-2">
                <div id="thecard">
                  <div id="chart6"></div>
                </div>
              </div>
            
            </div>
            <!--Toggle and select-->
            <ul class="nav nav-2">
              <li class="nav-item text-start">
                <button id="mode_4" class="button-30 me-2" title="Mode" data-bs-toggle="collapse" href="#collapse4" role="button" aria-expanded="false" aria-controls="collapse4">Auto-mode</button>
              </li>
              <li class="nav-item text-start visually-hidden">
                <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" title="Reset">Reset</button>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-6 pt-5">
          <!--Card for tank 5-->
          <div id="the_container5" class="card shadow-lg p-2 ">
            <div id = "tankName" class="card-title"></div>
            
            <div class= "row collapse text-center" id="collapse5">
              <!--Buttons-->
              <div id="b1_4" class = "col-lg-3 col-md-6">
                <p id="p1" class="labels">Water Pump</p>
                <button id="pump1" class="btn  button-30">OFF</button></div>
              <div id="b2_4" class="col-lg-3 col-md-6">
                <p id="p2"class="labels">Pressure Pump</p>
                <button id="pump2" class="btn  button-30">OFF</button></div>
              <div id="b3_4" class="col-lg-3 col-md-6">
                <p id="v1" class="labels">Well Tank Valve</p>
                <button id="valve1" class="btn  button-30">OFF</button></div>
              <div id="b4_4" class="col-lg-3 col-md-6">
                <p id="v2" class="labels">Wb Tank Valve</p>
                <button id="valve2" class="btn  button-30">OFF</button></div>
            </div>

             <!--Card Content-->
            <div id="content" class=" row text-center">
              
              <!--Water Tank Chart-->
              <div id = "Chart" class="col-lg-6 pb-2">
                <div id="thecard">
                  <div id="chart7"></div>
                </div>
              </div>
            
            </div>
            <!--Toggle and select-->
            <ul class="nav nav-2">
              <li class="nav-item text-start">
                <button id="mode_5" class="button-30 me-2" title="Mode" data-bs-toggle="collapse" href="#collapse5" role="button" aria-expanded="false" aria-controls="collapse5">Auto-mode</button>
              </li>
              <li class="nav-item text-start visually-hidden">
                <button id="modalToggle" class="button-30 me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" title="Reset">Reset</button>
              </li>
            </ul>
          </div>
        </div>
        <div class=" col-lg-12 pb-2"></div>
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
            <button type="button" class="button-31" data-bs-dismiss="modal">Close</button>
            <button id="reset" type="button" class="button-32" data-bs-dismiss="modal">Yes</button>
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
    
    <div class="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
    
    <div class="modal fade" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
    <div class="toast-container position-fixed top-0 end-0 p-5 pt-5">
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
    <div class="toast-container position-fixed bottom-50 end-0 p-5 pt-5">
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
    <div class="toast-container position-fixed bottom-50 end-0 p-5 pt-5">
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
    <div class="toast-container position-fixed bottom-50 end-0 p-5 pt-5">
      <div id="liveToast4" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning3" class="toast-body"></div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-50 end-0 p-5 pt-5">
      <div id="liveToast5" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="assets/images/triangle-exclamation-solid.svg" class="toast-img rounded me-2" alt="img">
          <strong class="me-auto toast-label">Warning!</strong>
          <small>Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id = "warning3" class="toast-body"></div>
      </div>
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
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/all.min.js"></script>
    <script src="assets/js/jquery-ui.js"></script>
    <script src="scripts/index.js?v=<?php echo time() ?>"></script>
  </body>
</html>

