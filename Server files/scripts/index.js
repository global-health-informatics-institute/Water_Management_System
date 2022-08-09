// Firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// const { default: firebase } = require("@firebase/app-compat");
// Info on firebase settings: https://firebase.google.com/docs/web/learn-more#web-version-8
// Info on channel deployment: https://fireship.io/lessons/deploy-multiple-sites-to-firebase-hosting/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVYCrx9tpoFmKKmrOlT7v7vXyP6NB1vjY",
  authDomain: "notifier-e4301.firebaseapp.com",
  databaseURL: "https://notifier-e4301-default-rtdb.firebaseio.com",
  projectId: "notifier-e4301",
  storageBucket: "notifier-e4301.appspot.com",
  messagingSenderId: "443826028658",
  appId: "1:443826028658:web:3fd922a118ed54c7a702eb",
  measurementId: "G-CMLMHGFRSS"
};

// // Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const database = firebase.database();

var num_of_tanks = 2; //put number of tanks

var tank_id_0 = "2";
var tank_id_1 = "1";
var tank_id_2 = "0"; 
var tank_id_3 = "0"; 
var tank_id_4 = "0"; 

// Get current sensor readings when the page loads
window.addEventListener("load", function(){
  getReadings();
  getReadings2();
  getReadings3();
  getReadings4();
  getReadings5();  
});

//preloader
window.onbeforeunload = function() {
  $("#myModal").removeClass("visually-hidden");
}

setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 500);

//first tank variables
var warning1 = 0;
var warning2 = 0;
var pump1 = 0;
var pump2 = 0;
var valve2 = 0;
var valve1 = 0;
var theAlert = 1;
var mode = 0;
var msg = '';
var yVal = 15;
var datapoints = [];
var ydps = [];
var press = [];
var opMode = 0;
var tank1_volume = 0;
var tname1 = "";

//second tank variables
var warning1_1 = 0;
var warning2_1 = 0;
var pump1_1 = 0;
var pump2_1 = 0;
var valve2_1 = 0;
var valve1_1 = 0;
var theAlert_1 = 1;
var mode_1 = 0;
var msg_1 = '';
var yVal_1 = 15;
var datapoints_1 = [];
var ydps_1 = [];
var press_1 = [];
var opMode_1 = 0;
var tank2_volume = 0;
var tname2 = "";

//third tank variables
var warning1_2 = 0;
var warning2_2 = 0;
var pump1_2 = 0;
var pump2_2 = 0;
var valve2_2 = 0;
var valve1_2 = 0;
var theAlert_2 = 1;
var mode_2 = 0;
var msg_2 = '';
var yVal_2 = 15;
var datapoints_2 = [];
var ydps_2 = [];
var press_2 = [];
var opMode_2 = 0;
var tank3_volume = 0;
var tname3 = "";

//fourth tank variables
var warning1_3 = 0;
var warning2_3 = 0;
var pump1_3 = 0;
var pump2_3 = 0;
var valve2_3 = 0;
var valve1_3 = 0;
var theAlert_3 = 1;
var mode_3 = 0;
var msg_3 = '';
var yVal_3 = 15;
var datapoints_3 = [];
var ydps_3 = [];
var press_3 = [];
var opMode_3 = 0;
var tank4_volume = 0;
var tname4 = "";

//fifth tank variables
var warning1_4 = 0;
var warning2_4 = 0;
var pump1_4 = 0;
var pump2_4 = 0;
var valve2_4 = 0;
var valve1_4 = 0;
var theAlert_4 = 1;
var mode_4 = 0;
var msg_4 = '';
var yVal_4 = 15;
var datapoints_4 = [];
var ydps_4 = [];
var press_4 = [];
var opMode_4 = 0;
var tank5_volume = 0;
var tname5 = "";

//general variables
var toggleP = "";

//pressure gauge
 var options2 ={
  chart: {
    height: 450,
    type: "radialBar",
  },
  series: [],
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "30px",
          show: true,
          formatter: function (val) {
            return val + ' PSI'
          },
        }
      }
    }
  },
  fill: {
   colors: [function({ value, seriesIndex, w }) {
    if(value < 13) {
        return '#ff0000'
    } else if (value >= 13 && value < 20) {
        return '#fb9015'
    } else if(value >= 20 && value < 65) {
        return '#04fd00'
    } else{
      return '#ff0000'
    }
  }]
  },
  stroke: {
    lineCap: "butt"
  },
  labels: ["Pressure"]
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();



//Water Volume chart for tank 1
var options1 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 400,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
yaxis: {
    title:{
      text: "Litres",
      
      },
    labels:{
      formatter: function(val,index){
        return val.toFixed(1);
        }
      },
        min: 0,
        max: 0,
        tickAmount: 9,
        type: 'numeric',
},
xaxis:{
  type: "datetime",
  
  title:{
      text: "Timestamp",
      },
  },        
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
chart1.render();


//Water Volume chart for tank 2
var options3 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 400,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
yaxis: {
    title:{
      text: "Litres",
      
      },
    labels:{
      formatter: function(val,index){
        return val.toFixed(1);
        }
      },
            min: 0,
            max: 0,
            tickAmount: 9,
            type: 'numeric',
},
xaxis:{
  type: "datetime",
  
  title:{
      text: "Timestamp",
      },
  },        
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();


//Water Volume chart for tank 3
var options5 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 400,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
yaxis: {
    title:{
      text: "Litres",
      
      },
    labels:{
      formatter: function(val,index){
        return val.toFixed(1);
        }
      },
            min: 0,
            max: 0,
            tickAmount: 9,
            type: 'numeric',
},
xaxis:{
  type: "datetime",
  
  title:{
      text: "Timestamp",
      },
  },        
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
chart5.render();

//Water Volume chart for tank 4
var options6 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 400,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
yaxis: {
    title:{
      text: "Litres",
      
      },
    labels:{
      formatter: function(val,index){
        return val.toFixed(1);
        }
      },
            min: 0,
            max: 0,
            tickAmount: 9,
            type: 'numeric',
},
xaxis:{
  type: "datetime",
  
  title:{
      text: "Timestamp",
      },
  },        
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
chart6.render();


//Water Volume chart for tank 5
var options7 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 400,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
yaxis: {
    title:{
      text: "Litres",
      
      },
    labels:{
      formatter: function(val,index){
        return val.toFixed(1);
        }
      },
            min: 0,
            max: 0,
            tickAmount: 9,
            type: 'numeric',
},
xaxis:{
  type: "datetime",
  
  title:{
      text: "Timestamp",
      },
  },        
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart7 = new ApexCharts(document.querySelector("#chart7"), options7);
chart7.render();




//sends notification to mobile phone
function Notification(msg){
  let data = {"timestamp":Date.now(), "msg": msg}
  //database.ref("message").push(data);
  
  return;
}


// Function to get current readings on the webpage when it loads for the first time
function getReadings() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);

      //Variables created to hold new sensor values
      var pressure = myObj.pressure;
      let pressureV = Math.round(pressure* 100) / 100;
      var volume = myObj.volume;
      let xVal = new Date;
      xVal.setTime(xVal.getTime() - new Date().getTimezoneOffset()*60*1000);
      

      
      //gauge and chart values updated
      yVal = Number(volume);
      
      datapoints.push(xVal,yVal); //push points to temporal array 
      ydps.push(datapoints); // push to main array
      datapoints =[]; // clear temporal array
      
      if (ydps.length >  20 )
      {
        ydps.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart1.updateSeries([{
                name: 'Water Level',
                data: ydps
            }],true);
      
      //update pressure gauge
      chart2.updateSeries([pressureV],true);
     
      //command values updated
      warning1 = myObj.warning1;
      warning2 = myObj.warning2;
      pump1 = myObj.pump1;
      pump2 = myObj.pump2;
      valve1 = myObj.valve1;
      valve2 = myObj.valve2;
      mode = myObj.override;
      opMode = myObj.opCode;
      tname1 = myObj.tname;
      toggleP = myObj.toggleP;
      
      if(tank1_volume == 0){
        
        $("#the_container1").find("#tankName").text(tname1);
        
        var one = myObj.capacity;
        tank1_volume = Number(one);
        chart1.updateOptions({
          yaxis: {
            title:{
            text: "Litres",
            },
            labels:{
            formatter: function(val,index){
              return val.toFixed(1);
              }
            },
            min: 0,
            max: tank1_volume
          }
          });
      }
    }
    
    
    //Checks if there any warnings
    if(warning1 == 1){
      if(theAlert==1){
        const toast = new bootstrap.Toast($("#liveToast1"));
        $("#warning1").html("Water level is too low for "+tname1);
        toast.show();
        
        msg = "Water level is too low for "+tname1;
        Notification(msg);
        }
        theAlert = 0;
    }
    else if(warning2 == 1){
      if(theAlert==1){
        const toast = new bootstrap.Toast($("#liveToast1"))
        $("#warning1").html("Water level is too high for "+tname1);
        toast.show();
        
        msg = "Water level is too high for "+tname1;
        Notification(msg);
            
           }
      theAlert = 0;
    }else{theAlert = 1}

  
  
  
  //Updates control button states
   if(pump1 == 1){
     $("#the_container1").find("#pump1").text("ON");
     $("#the_container1").find("#pump1").css("background-color","rgba(16,185,129,0.5)");
  }
   else{
     $("#the_container1").find("#pump1").text("OFF");
     $("#the_container1").find("#pump1").css("background-color","rgba(255,255,255,0.5)");
   }
   
   if(pump2 == 1){
     $("#the_container1").find("#pump2").text("ON");
     $("#the_container1").find("#pump2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container1").find("#pump2").text("OFF");
     $("#the_container1").find("#pump2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(valve1==1){
     $("#the_container1").find("#valve1").text("ON");
     $("#the_container1").find("#valve1").css("background-color","rgba(16,185,129,0.5)");
  }
  
  else{
     $("#the_container1").find("#valve1").text("OFF");
     $("#the_container1").find("#valve1").css("background-color","rgba(255,255,255,0.5)");
  }
  
  if(valve2 == 1){
     $("#the_container1").find("#valve2").text("ON");
     $("#the_container1").find("#valve2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container1").find("#valve2").text("OFF");
     $("#the_container1").find("#valve2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(mode == 1){
     $("#the_container1").find("#mode").text("Manual-mode");
     $("#the_container1").find("#mode").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container1").find("#mode").text("Auto-mode");
     $("#the_container1").find("#mode").css("background-color","rgba(255,255,255,0.5)");
     
  }
  if(opMode == "1"){
    
    $("#the_container1").find("#b1").addClass("visually-hidden");
    $("#the_container1").find("#b2").addClass("visually-hidden");
    $("#the_container1").find("#v1").text("Outlet Valve");
    $("#the_container1").find("#v2").text("Inlet Valve");
  }
  if(opMode == "2"){
    $("#the_container1").find("#b2").addClass("visually-hidden");
    $("#the_container1").find("#b4").addClass("visually-hidden");
    $("#the_container1").find("#p1").text("Water Pump");
    $("#the_container1").find("#v1").text("Outlet Valve");
  }
  //inlet valve only
  if(opMode_1 == "4"){
    $("#the_container1").find("#b1").addClass("visually-hidden");
    $("#the_container1").find("#b2").addClass("visually-hidden");
    $("#the_container1").find("#b3").addClass("visually-hidden");
    $("#the_container1").find("#v2").text("Inlet Valve");
  }
  //inlet and water pump
   if(opMode_1 == "5"){
    $("#the_container1").find("#b2").addClass("visually-hidden");
    $("#the_container1").find("#b3").addClass("visually-hidden");
    $("#the_container1").find("#v2").text("Inlet Valve");
  }
  //inlet, outlet and pressure pump
   if(opMode_1 == "6"){
    $("#the_container1").find("#b1").addClass("visually-hidden");
    $("#the_container1").find("#v1").text("Outlet Valve");
    $("#the_container1").find("#v2").text("Inlet Valve");
  }
  if(toggleP == "1"){
    $("#the_container0").removeClass("visually-hidden");
  }else{
    $("#the_container0").addClass("visually-hidden");
  }
  
  };

  xhr.open("GET", "/resources/getSensorValues.php?q="+tank_id_0, true);
  xhr.send();
}


// Function to get current readings on the webpage when it loads for the first time
function getReadings2() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      if(Object.keys(myObj).length < 3){
        return;
        }

      //Variables created to hold new sensor values
      var pressure = myObj.pressure;
      let pressureV = Math.round(pressure* 100) / 100;
      var volume = myObj.volume;
      let xVal2 = new Date;
      xVal2.setTime(xVal2.getTime() - new Date().getTimezoneOffset()*60*1000);
    
      //gauge and chart values updated
      yVal_1 = Number(volume);
      
      datapoints_1.push(xVal2,yVal_1); //push points to temporal array 
      
      ydps_1.push(datapoints_1); // push to main array
     
      datapoints_1 =[]; // clear temporal array
      
      if (ydps_1.length >  20 )
      {
        ydps_1.shift();				
      }
      
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart3.updateSeries([{
                name: 'Water Level',
                data: ydps_1
            }]);
      
      //update pressure gauge
      //chart2.updateSeries([pressureV]);
      
      
      
      //command values updated
      warning1_1 = myObj.warning1;
      warning2_1 = myObj.warning2;
      pump1_1 = myObj.pump1;
      pump2_1 = myObj.pump2;
      valve1_1 = myObj.valve1;
      valve2_1 = myObj.valve2;
      mode_1 = myObj.override;
      opMode_1 = myObj.opCode;
      tname2 = myObj.tname;
      
      if(tank2_volume == 0){
        var tname = myObj.tname;
        $("#the_container2").find("#tankName").text(tname2);
        var two = myObj.capacity;
        tank2_volume = Number(two);
        chart3.updateOptions({
          yaxis: {
            title:{
            text: "Litres",
            },
            labels:{
            formatter: function(val,index){
              return val.toFixed(1);
              }
            },
            min: 0,
            max: tank2_volume
            }
          });
        }
      }
    
    
    //Checks if there any warnings
    if(warning1_1 == 1){
      if(theAlert_1==1){
        const toast = new bootstrap.Toast($("#liveToast2"));
        $("#warning2").html("Water level is too low for "+tname2);
        toast.show();
        
        msg_1 = "Water level is too low for "+tname2;
        Notification(msg_1);
        }
        theAlert_1 = 0;
    }
    else if(warning2_1 == 1){
      if(theAlert_1==1){
        const toast = new bootstrap.Toast($("#liveToast2"))
        $("#warning2").html("Water level is too high for "+tname2);
        toast.show();
        
        msg_1 = "Water level is too high for "+tname2;
        Notification(msg_1);
            
           }
      theAlert_1 = 0;
    }else{theAlert_1 = 1}

  
  //Updates control button states
   if(pump1_1 == 1){
     $("#the_container2").find("#pump1").text("ON");
     $("#the_container2").find("#pump1").css("background-color","rgba(16,185,129,0.5)");
  }
   else{
     $("#the_container2").find("#pump1").text("OFF");
     $("#the_container2").find("#pump1").css("background-color","rgba(255,255,255,0.5)");
   }
   
   if(pump2_1 == 1){
     $("#the_container2").find("#pump2").text("ON");
     $("#the_container2").find("#pump2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container2").find("#pump2").text("OFF");
     $("#the_container2").find("#pump2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(valve1_1==1){
     $("#the_container2").find("#valve1").text("ON");
     $("#the_container2").find("#valve1").css("background-color","rgba(16,185,129,0.5)");
  }
  
  else{
     $("#the_container2").find("#valve1").text("OFF");
     $("#the_container2").find("#valve1").css("background-color","rgba(255,255,255,0.5)");
  }
  
  if(valve2_1 == 1){
     $("#the_container2").find("#valve2").text("ON");
     $("#the_container2").find("#valve2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container2").find("#valve2").text("OFF");
     $("#the_container2").find("#valve2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(mode_1 == 1){
     $("#the_container2").find("#mode_2").text("Manual-mode");
     $("#the_container2").find("#mode_2").css("background-color","rgba(16,185,129,0.5)");
     $("#the_container2").find("#control_2").css("display","flex");
  }
  else{
     $("#the_container2").find("#mode_2").text("Auto-mode");
     $("#the_container2").find("#mode_2").css("background-color","rgba(255,255,255,0.5)");
     $("#the_container2").find("#control_2").css("display","none");
  }
  //inlet and outlet valve
  if(opMode_1 == "1"){
    $("#the_container2").find("#b1_1").addClass("visually-hidden");
    $("#the_container2").find("#b2_1").addClass("visually-hidden");
    $("#the_container2").find("#v1").text("Outlet Valve");
    $("#the_container2").find("#v2").text("Inlet Valve");
  }
  //Waterpump and outlet valve
  if(opMode_1 == "2"){
    $("#the_container2").find("#b2_1").addClass("visually-hidden");
    $("#the_container2").find("#b4_1").addClass("visually-hidden");
    $("#the_container2").find("#p1").text("Water Pump");
    $("#the_container2").find("#v1").text("Outlet Valve");
  }
  //inlet valve only
  if(opMode_1 == "4"){
    $("#the_container2").find("#b1_1").addClass("visually-hidden");
    $("#the_container2").find("#b2_1").addClass("visually-hidden");
    $("#the_container2").find("#b3_1").addClass("visually-hidden");
    $("#the_container2").find("#v2").text("Inlet Valve");
  }
  //inlet and water pump
   if(opMode_1 == "5"){
    $("#the_container2").find("#b2_1").addClass("visually-hidden");
    $("#the_container2").find("#b3_1").addClass("visually-hidden");
    $("#the_container2").find("#v2").text("Inlet Valve");
  }
  //inlet, outlet and pressure pump
   if(opMode_1 == "6"){
    $("#the_container2").find("#b1_1").addClass("visually-hidden");
    $("#the_container2").find("#v1").text("Outlet Valve");
    $("#the_container2").find("#v2").text("Inlet Valve");
  }
  
  if(toggleP == "1"){
    $("#the_container0").removeClass("visually-hidden");
  }
  
  };

  xhr.open("GET", "/resources/getSensorValues.php?q="+tank_id_1, true);
  xhr.send();
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings3() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      
      if(Object.keys(myObj).length < 3){
        return ;
        }

      //Variables created to hold new sensor values
      var pressure = myObj.pressure;
      let pressureV = Math.round(pressure* 100) / 100;
      var volume = myObj.volume;
      let xVal = new Date;
      xVal.setTime(xVal.getTime() - new Date().getTimezoneOffset()*60*1000);
      
      //gauge and chart values updated
      yVal_2 = Number(volume);
      
      datapoints_2.push(xVal,yVal_2); //push points to temporal array 
      ydps_2.push(datapoints_2); // push to main array
      datapoints_2 =[]; // clear temporal array
      
      if (ydps_2.length >  20 )
      {
        ydps_2.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart5.updateSeries([{
                name: 'Water Level',
                data: ydps_2
            }]);
      
     
      //command values updated
      warning1_2 = myObj.warning1;
      warning2_2 = myObj.warning2;
      pump1_2 = myObj.pump1;
      pump2_2 = myObj.pump2;
      valve1_2 = myObj.valve1;
      valve2_2 = myObj.valve2;
      mode_2 = myObj.override;
      opMode_2 = myObj.opCode;
      tname3 = myObj.tname;
      
      if(tank3_volume == 0){
        var tname = myObj.tname;
        $("#the_container3").find("#tankName").text(tname3);
        
        var three = myObj.capacity;
        tank3_volume = Number(three);
        chart5.updateOptions({
          yaxis: {
            title:{
            text: "Litres",
            },
            labels:{
            formatter: function(val,index){
              return val.toFixed(1);
              }
            },
            min: 0,
            max: tank3_volume
          }
          })
      }
    }
    
    
    //Checks if there any warnings
    if(warning1_2 == 1){
      if(theAlert_2==1){
        const toast = new bootstrap.Toast($("#liveToast3"));
        $("#warning3").html("Water level is too low for "+tname3);
        toast.show();
        
        msg_2 = "Water level is too low for "+tname3;
        Notification(msg_2);
        }
        theAlert_2 = 0;
    }
    else if(warning2_2 == 1){
      if(theAlert_2==1){
        const toast = new bootstrap.Toast($("#liveToast3"))
        $("#warning3").html("Water level is too high for "+tname3);
        toast.show();
        
        msg_2 = "Water level is too high for "+tname3;
        Notification(msg_2);
            
           }
      theAlert_2 = 0;
    }else{theAlert_2 = 1}

  
  //Updates control button states
   if(pump1_2 == 1){
     $("#the_container3").find("#pump1").text("ON");
     $("#the_container3").find("#pump1").css("background-color","rgba(16,185,129,0.5)");
  }
   else{
     $("#the_container3").find("#pump1").text("OFF");
     $("#the_container3").find("#pump1").css("background-color","rgba(255,255,255,0.5)");
   }
   
   if(pump2_2 == 1){
     $("#the_container3").find("#pump2").text("ON");
     $("#the_container3").find("#pump2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container3").find("#pump2").text("OFF");
     $("#the_container3").find("#pump2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(valve1_2==1){
     $("#the_container3").find("#valve1").text("ON");
     $("#the_container3").find("#valve1").css("background-color","rgba(16,185,129,0.5)");
  }
  
  else{
     $("#the_container3").find("#valve1").text("OFF");
     $("#the_container3").find("#valve1").css("background-color","rgba(255,255,255,0.5)");
  }
  
  if(valve2_2 == 1){
     $("#the_container3").find("#valve2").text("ON");
     $("#the_container3").find("#valve2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container3").find("#valve2").text("OFF");
     $("#the_container3").find("#valve2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(mode_2 == 1){
     $("#the_container3").find("#mode_3").text("Manual-mode");
     $("#the_container3").find("#mode_3").css("background-color","rgba(16,185,129,0.5)");
     $("#the_container3").find("#control_3").css("display","flex");
  }
  else{
     $("#the_container3").find("#mode_3").text("Auto-mode");
     $("#the_container3").find("#mode_3").css("background-color","rgba(255,255,255,0.5)");
     $("#the_container3").find("#control_3").css("display","none");
  }
  if(opMode_2 == "1"){
    $("#the_container3").find("#b1_2").addClass("visually-hidden");
    $("#the_container3").find("#b2_2").addClass("visually-hidden");
    $("#the_container3").find("#v1").text("Outlet Valve");
    $("#the_container3").find("#v2").text("Inlet Valve");
  }
  if(opMode_2 == "2"){
    $("#the_container3").find("#b2_2").addClass("visually-hidden");
    $("#the_container3").find("#b4_2").addClass("visually-hidden");
    $("#the_container3").find("#p1").text("Water Pump");
    $("#the_container3").find("#v1").text("Outlet Valve");
  }
  if(opMode_2 == "3"){
    $("#the_container3").find("#b4_2").addClass("visually-hidden");
    $("#the_container3").find("#v1").text("Outlet Valve");
  }
  //inlet valve only
  if(opMode_2 == "4"){
    $("#the_container3").find("#b1_2").addClass("visually-hidden");
    $("#the_container3").find("#b2_2").addClass("visually-hidden");
    $("#the_container3").find("#b3_2").addClass("visually-hidden");
    $("#the_container3").find("#v2").text("Inlet Valve");
  }
  //inlet and water pump
   if(opMode_2 == "5"){
    $("#the_container3").find("#b2_2").addClass("visually-hidden");
    $("#the_container3").find("#b3_2").addClass("visually-hidden");
    $("#the_container3").find("#v2").text("Inlet Valve");
  }
  //inlet, outlet and pressure pump
   if(opMode_2 == "6"){
    $("#the_container3").find("#b1_2").addClass("visually-hidden");
    $("#the_container3").find("#v1").text("Outlet Valve");
    $("#the_container3").find("#v2").text("Inlet Valve");
  }
  
  if(toggleP == "1"){
    $("#the_container0").removeClass("visually-hidden");
  }
  
  };

  xhr.open("GET", "/resources/getSensorValues.php?q="+tank_id_2, true);
  xhr.send();
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings4() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      
      if(Object.keys(myObj).length < 3){
        return ;
        }

      //Variables created to hold new sensor values
      var pressure = myObj.pressure;
      let pressureV = Math.round(pressure* 100) / 100;
      var volume = myObj.volume;
      let xVal = new Date;
      xVal.setTime(xVal.getTime() - new Date().getTimezoneOffset()*60*1000);
      
      //gauge and chart values updated
      yVal_3 = Number(volume);
      
      datapoints_3.push(xVal,yVal_3); //push points to temporal array 
      ydps_3.push(datapoints_3); // push to main array
      datapoints_3 =[]; // clear temporal array
      
      if (ydps_3.length >  20 )
      {
        ydps_3.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart6.updateSeries([{
                name: 'Water Level',
                data: ydps_3
            }]);
      
     
      //command values updated
      warning1_3 = myObj.warning1;
      warning2_3 = myObj.warning2;
      pump1_3 = myObj.pump1;
      pump2_3 = myObj.pump2;
      valve1_3 = myObj.valve1;
      valve2_3 = myObj.valve2;
      mode_3 = myObj.override;
      opMode_3 = myObj.opCode;
      tname4 = myObj.tname;
      
      if(tank4_volume == 0){
        var tname = myObj.tname;
        $("#the_container4").find("#tankName").text(tname4);
        
        var four = myObj.capacity;
        tank4_volume = Number(four);
        chart6.updateOptions({
          yaxis: {
            title:{
            text: "Litres",
            },
            labels:{
            formatter: function(val,index){
              return val.toFixed(1);
              }
            },
            min: 0,
            max: tank4_volume
          }
          })
      }
    }
    
    
    //Checks if there any warnings
    if(warning1_3 == 1){
      if(theAlert_3==1){
        const toast = new bootstrap.Toast($("#liveToast4"));
        $("#warning4").html("Water level is too low for "+tname4);
        toast.show();
        
        msg_3 = "Water level is too low for "+tname4;
        Notification(msg_3);
        }
        theAlert_3 = 0;
    }
    else if(warning2_3 == 1){
      if(theAlert_3==1){
        const toast = new bootstrap.Toast($("#liveToast4"))
        $("#warning4").html("Water level is too high for "+tname4);
        toast.show();
        
        msg_3 = "Water level is too high for "+tname4;
        Notification(msg_3);
            
           }
      theAlert_3 = 0;
    }else{theAlert_3 = 1}

  
  //Updates control button states
   if(pump1_3 == 1){
     $("#the_container4").find("#pump1").text("ON");
     $("#the_container4").find("#pump1").css("background-color","rgba(16,185,129,0.5)");
  }
   else{
     $("#the_container4").find("#pump1").text("OFF");
     $("#the_container4").find("#pump1").css("background-color","rgba(255,255,255,0.5)");
   }
   
   if(pump2_3 == 1){
     $("#the_container4").find("#pump2").text("ON");
     $("#the_container4").find("#pump2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container4").find("#pump2").text("OFF");
     $("#the_container4").find("#pump2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(valve1_3==1){
     $("#the_container4").find("#valve1").text("ON");
     $("#the_container4").find("#valve1").css("background-color","rgba(16,185,129,0.5)");
  }
  
  else{
     $("#the_container4").find("#valve1").text("OFF");
     $("#the_container4").find("#valve1").css("background-color","rgba(255,255,255,0.5)");
  }
  
  if(valve2_3 == 1){
     $("#the_container4").find("#valve2").text("ON");
     $("#the_container4").find("#valve2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container4").find("#valve2").text("OFF");
     $("#the_container4").find("#valve2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(mode_3 == 1){
     $("#the_container4").find("#mode_4").text("Manual-mode");
     $("#the_container4").find("#mode_4").css("background-color","rgba(16,185,129,0.5)");
     $("#the_container4").find("#control_4").css("display","flex");
  }
  else{
     $("#the_container4").find("#mode_4").text("Auto-mode");
     $("#the_container4").find("#mode_4").css("background-color","rgba(255,255,255,0.5)");
     $("#the_container4").find("#control_4").css("display","none");
  }
  if(opMode_3 == "1"){
    $("#the_container4").find("#b1_3").addClass("visually-hidden");
    $("#the_container4").find("#b2_3").addClass("visually-hidden");
    $("#the_container4").find("#v1").text("Outlet Valve");
    $("#the_container4").find("#v2").text("Inlet Valve");
  }
  if(opMode_3 == "2"){
    $("#the_container4").find("#b2_3").addClass("visually-hidden");
    $("#the_container4").find("#b4_3").addClass("visually-hidden");
    $("#the_container4").find("#p1").text("Water Pump");
    $("#the_container4").find("#v1").text("Outlet Valve");
  }
  if(opMode_3 == "3"){
    $("#the_container4").find("#b4_3").addClass("visually-hidden");
    $("#the_container4").find("#v1").text("Outlet Valve");
  }
  //inlet valve only
  if(opMode_3 == "4"){
    $("#the_container4").find("#b1_3").addClass("visually-hidden");
    $("#the_container4").find("#b2_3").addClass("visually-hidden");
    $("#the_container4").find("#b3_3").addClass("visually-hidden");
    $("#the_container4").find("#v2").text("Inlet Valve");
  }
  //inlet and water pump
   if(opMode_3 == "5"){
    $("#the_container4").find("#b2_3").addClass("visually-hidden");
    $("#the_container4").find("#b3_3").addClass("visually-hidden");
    $("#the_container4").find("#v2").text("Inlet Valve");
  }
  //inlet, outlet and pressure pump
   if(opMode_3 == "6"){
    $("#the_container4").find("#b1_3").addClass("visually-hidden");
    $("#the_container4").find("#v1").text("Outlet Valve");
    $("#the_container4").find("#v2").text("Inlet Valve");
  }
  
  if(toggleP == "1"){
    $("#the_container0").removeClass("visually-hidden");
  }
  
  };

  xhr.open("GET", "/resources/getSensorValues.php?q="+tank_id_3, true);
  xhr.send();
}


// Function to get current readings on the webpage when it loads for the first time
function getReadings5() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      
      if(Object.keys(myObj).length < 3){
        return ;
        }

      //Variables created to hold new sensor values
      var pressure = myObj.pressure;
      let pressureV = Math.round(pressure* 100) / 100;
      var volume = myObj.volume;
      let xVal = new Date;
      xVal.setTime(xVal.getTime() - new Date().getTimezoneOffset()*60*1000);
      
      //gauge and chart values updated
      yVal_4 = Number(volume);
      
      datapoints_4.push(xVal,yVal_4); //push points to temporal array 
      ydps_4.push(datapoints_4); // push to main array
      datapoints_4 =[]; // clear temporal array
      
      if (ydps_4.length >  20 )
      {
        ydps_4.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart7.updateSeries([{
                name: 'Water Level',
                data: ydps_2
            }]);
      
     
      //command values updated
      warning1_4 = myObj.warning1;
      warning2_4 = myObj.warning2;
      pump1_4 = myObj.pump1;
      pump2_4 = myObj.pump2;
      valve1_4 = myObj.valve1;
      valve2_4 = myObj.valve2;
      mode_4 = myObj.override;
      opMode_4 = myObj.opCode;
      tname5 = myObj.tname;
      
      if(tank5_volume == 0){
        var tname = myObj.tname;
        $("#the_container5").find("#tankName").text(tname5);
        
        var five = myObj.capacity;
        tank5_volume = Number(five);
        chart7.updateOptions({
          yaxis: {
            title:{
            text: "Litres",
            },
            labels:{
            formatter: function(val,index){
              return val.toFixed(1);
              }
            },
            min: 0,
            max: tank5_volume
          }
          })
      }
    }
    
    
    //Checks if there any warnings
    if(warning1_4 == 1){
      if(theAlert_4==1){
        const toast = new bootstrap.Toast($("#liveToast5"));
        $("#warning5").html("Water level is too low for "+tname5);
        toast.show();
        
        msg_4 = "Water level is too low for "+tname5;
        Notification(msg_4);
        }
        theAlert_4 = 0;
    }
    else if(warning2_4 == 1){
      if(theAlert_4==1){
        const toast = new bootstrap.Toast($("#liveToast5"))
        $("#warning5").html("Water level is too high for "+tname5);
        toast.show();
        
        msg_4= "Water level is too high for "+tname5;
        Notification(msg_4);
            
           }
      theAlert_4 = 0;
    }else{theAlert_4 = 1}

  
  //Updates control button states
   if(pump1_4 == 1){
     $("#the_container5").find("#pump1").text("ON");
     $("#the_container5").find("#pump1").css("background-color","rgba(16,185,129,0.5)");
  }
   else{
     $("#the_container5").find("#pump1").text("OFF");
     $("#the_container5").find("#pump1").css("background-color","rgba(255,255,255,0.5)");
   }
   
   if(pump2_4 == 1){
     $("#the_container5").find("#pump2").text("ON");
     $("#the_container5").find("#pump2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container5").find("#pump2").text("OFF");
     $("#the_container5").find("#pump2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(valve1_4==1){
     $("#the_container5").find("#valve1").text("ON");
     $("#the_container5").find("#valve1").css("background-color","rgba(16,185,129,0.5)");
  }
  
  else{
     $("#the_container5").find("#valve1").text("OFF");
     $("#the_container5").find("#valve1").css("background-color","rgba(255,255,255,0.5)");
  }
  
  if(valve2_4 == 1){
     $("#the_container5").find("#valve2").text("ON");
     $("#the_container5").find("#valve2").css("background-color","rgba(16,185,129,0.5)");
  }
  else{
     $("#the_container5").find("#valve2").text("OFF");
     $("#the_container5").find("#valve2").css("background-color","rgba(255,255,255,0.5)");
  }
  
   if(mode_4 == 1){
     $("#the_container5").find("#mode_4").text("Manual-mode");
     $("#the_container5").find("#mode_4").css("background-color","rgba(16,185,129,0.5)");
     $("#the_container5").find("#control_4").css("display","flex");
  }
  else{
     $("#the_container5").find("#mode_4").text("Auto-mode");
     $("#the_container5").find("#mode_4").css("background-color","rgba(255,255,255,0.5)");
     $("#the_container5").find("#control_4").css("display","none");
  }
  if(opMode_4 == "1"){
    $("#the_container5").find("#b1_4").addClass("visually-hidden");
    $("#the_container5").find("#b2_4").addClass("visually-hidden");
    $("#the_container5").find("#v1").text("Outlet Valve");
    $("#the_container5").find("#v2").text("Inlet Valve");
  }
  if(opMode_4 == "2"){
    $("#the_container5").find("#b2_4").addClass("visually-hidden");
    $("#the_container5").find("#b4_4").addClass("visually-hidden");
    $("#the_container5").find("#p1").text("Water Pump");
    $("#the_container5").find("#v1").text("Outlet Valve");
  }
  if(opMode_4 == "3"){
    $("#the_container5").find("#b4_4").addClass("visually-hidden");
    $("#the_container5").find("#v1").text("Outlet Valve");
  }
  //inlet valve only
  if(opMode_4 == "4"){
    $("#the_container5").find("#b1_4").addClass("visually-hidden");
    $("#the_container5").find("#b2_4").addClass("visually-hidden");
    $("#the_container5").find("#b3_4").addClass("visually-hidden");
    $("#the_container5").find("#v2").text("Inlet Valve");
  }
  //inlet and water pump
   if(opMode_4 == "5"){
    $("#the_container5").find("#b2_4").addClass("visually-hidden");
    $("#the_container5").find("#b3_4").addClass("visually-hidden");
    $("#the_container5").find("#v2").text("Inlet Valve");
  }
  //inlet, outlet and pressure pump
   if(opMode_4 == "6"){
    $("#the_container5").find("#b1_4").addClass("visually-hidden");
    $("#the_container5").find("#v1").text("Outlet Valve");
    $("#the_container5").find("#v2").text("Inlet Valve");
  }
  
  if(toggleP == "1"){
    $("#the_container0").removeClass("visually-hidden");
  }
  
  };

  xhr.open("GET", "/resources/getSensorValues.php?q="+tank_id_4, true);
  xhr.send();
}


$(function(){
  
   /*
   *CONTROLS FOR TANK 1
   */
  
  $("#the_container1").find("#pump1").click(function(){
      if(pump1 == 0){
        pump1 = 1;
      }
      else{
        pump1 = 0;
      }

      if(pump1){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
       else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
       }

      let pumpObj = {"pump1":pump1,"tank_id":tank_id_0,"opMode":opMode};
      var wellP = JSON.stringify(pumpObj);
      

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
         }
    }
      xhr.open("POST", "/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(wellP);
  });
  
  //Handles the pressure pump button
   $("#the_container1").find("#pump2").click(function(){
     if(pump2 == 0){
        pump2 = 1;
      }
      else{
        pump2 = 0;
      }
      
      if(pump2){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
      else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
      }

      let pumpObj = {"pump2":pump2,"tank_id":tank_id_0,"opMode":opMode};
      var pressP = JSON.stringify(pumpObj);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
          
         }
    }
      xhr.open("POST", "/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(pressP);
   });
   
   //Handles the well valve button
  $("#the_container1").find("#valve1").click(function(){
    if(valve1 == 0){
      valve1 = 1;
    }
    else{
      valve1 = 0;
    }
    
    if(valve1){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve1":valve1,"tank_id":tank_id_0,"opMode":opMode};
    var wellV = JSON.stringify(pumpObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wellV);
  });
  
  //Handles the waterboard valve button
  $("#the_container1").find("#valve2").click(function(){
    if(valve2 == 0){
      valve2 = 1;
    }else{
      valve2 = 0;
    }
    
    if(valve2){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve2":valve2,"tank_id":tank_id_0,"opMode":opMode};
    var wbV = JSON.stringify(pumpObj);
   

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wbV);
  });
  
  //handles mode button click
  $("#mode").click(function(){
    if(mode == 0){
    mode = 1;
    }
    else{
      mode = 0;
    }
    
    if(mode == 1){
       $(this).text("Manual-mode");
       $(this).css("background-color","rgba(16,185,129,0.5)");
       
    }
    else{
       $(this).text("Auto-mode");
       $(this).css("background-color","rgba(255,255,255,0.5)");
       
    }

    let modeObj = {"override":mode,"tank_id":tank_id_0,"opMode":opMode};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  /*reset for modal 1*/
  $("#staticBackdrop1").find("#reset").click(function(){
    console.log("Clicked");
    let modeObj = {"reset":1,"tank_id":tank_id_0,"opMode":opMode};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
  });
  
   /*
   *CONTROLS FOR TANK 2
   */
  
  $("#the_container2").find("#pump1").click(function(){
      if(pump1_1 == 0){
        pump1_1 = 1;
      }
      else{
        pump1_1 = 0;
      }

      if(pump1_1){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
       else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
       }

      let pumpObj = {"pump1":pump1_1,"tank_id":tank_id_1,"opMode":opMode_1};
      var wellP = JSON.stringify(pumpObj);
      

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
         }
    }
      xhr.open("POST", "/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(wellP);
  });
  
  //Handles the pressure pump button
   $("#the_container2").find("#pump2").click(function(){
     if(pump2_1 == 0){
        pump2_1 = 1;
      }
      else{
        pump2_1 = 0;
      }
      
      if(pump2_1){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
      else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
      }

      let pumpObj = {"pump2":pump2_1,"tank_id":tank_id_1,"opMode":opMode_1};
      var pressP = JSON.stringify(pumpObj);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
          
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(pressP);
   });
   
   //Handles the outlet valve button
  $("#the_container2").find("#valve1").click(function(){
    if(valve1_1 == 0){
      valve1_1 = 1;
    }
    else{
      valve1_1 = 0;
    }
    
    if(valve1_1){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve1":valve1_1,"tank_id":tank_id_1,"opMode":opMode_1};
    var wellV = JSON.stringify(pumpObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wellV);
  });
  
  //Handles the inlet valve button
  $("#the_container2").find("#valve2").click(function(){
    if(valve2_1 == 0){
      valve2_1 = 1;
    }else{
      valve2_1 = 0;
    }
    
    if(valve2_1){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve2":valve2_1,"tank_id":tank_id_1,"opMode":opMode_1};
    var wbV = JSON.stringify(pumpObj);
   

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wbV);
  });
  
  $("#mode_2").click(function(){
    if(mode_1 == 0){
    mode_1 = 1;
    }
    else{
      mode_1 = 0;
    }
    
    if(mode_1 == 1){
       $("#mode_2").text("Manual-mode");
       $("#mode_2").css("background-color","rgba(16,185,129,0.5)");
       
    }
    else{
       $("#mode_2").text("Auto-mode");
       $("#mode_2").css("background-color","rgba(255,255,255,0.5)");
       
    }

    let modeObj = {"override":mode_1,"tank_id":tank_id_1,"opMode":opMode_1};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  $("#staticBackdrop2").find("#reset").click(function(){

    let modeObj = {"reset":1,"tank_id":tank_id_1,"opMode":opMode_1};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  /*
   *CONTROLS FOR TANK 3
   */
  
  $("#the_container3").find("#pump1").click(function(){
      if(pump1_2 == 0){
        pump1_2 = 1;
      }
      else{
        pump1_2 = 0;
      }

      if(pump1_2){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
       else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
       }

      let pumpObj = {"pump1":pump1_2,"tank_id":tank_id_2,"opMode":opMode_2};
      var wellP = JSON.stringify(pumpObj);
      

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(wellP);
  });
  
  //Handles the pressure pump button
   $("#the_container3").find("#pump2").click(function(){
     if(pump2_2 == 0){
        pump2_2 = 1;
      }
      else{
        pump2_2 = 0;
      }
      
      if(pump2_2){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
      else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
      }

      let pumpObj = {"pump2":pump2_2,"tank_id":tank_id_2,"opMode":opMode_2};
      var pressP = JSON.stringify(pumpObj);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
          
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(pressP);
   });
   
   //Handles the well valve button
  $("#the_container3").find("#valve1").click(function(){
    if(valve1_2 == 0){
      valve1_2 = 1;
    }
    else{
      valve1_2 = 0;
    }
    
    if(valve1_2){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve1":valve1_2,"tank_id":tank_id_2,"opMode":opMode_2};
    var wellV = JSON.stringify(pumpObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wellV);
  });
  
  //Handles the waterboard valve button
  $("#the_container3").find("#valve2").click(function(){
    if(valve2_2 == 0){
      valve2_2 = 1;
    }else{
      valve2_2 = 0;
    }
    
    if(valve2_2){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve2":valve2_2,"tank_id":tank_id_2,"opMode":opMode_2};
    var wbV = JSON.stringify(pumpObj);
   

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wbV);
  });
  
  $("#mode_3").click(function(){
    if(mode_2 == 0){
    mode_2 = 1;
    }
    else{
      mode_2 = 0;
    }
    
    if(mode_2 == 1){
       $("#mode_3").text("Manual-mode");
       $("#mode_3").css("background-color","rgba(16,185,129,0.5)");
       
    }
    else{
       $("#mode_3").text("Auto-mode");
       $("#mode_3").css("background-color","rgba(255,255,255,0.5)");
       
    }

    let modeObj = {"override":mode_2,"tank_id":tank_id_2,"opMode":opMode_2};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  $("#staticBackdrop3").find("#reset").click(function(){

    let modeObj = {"reset":1,"tank_id":tank_id_2,"opMode":opMode_2};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  /*
   *CONTROLS FOR TANK 4
   */
  
  $("#the_container4").find("#pump1").click(function(){
      if(pump1_3 == 0){
        pump1_3 = 1;
      }
      else{
        pump1_3 = 0;
      }

      if(pump1_3){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
       else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
       }

      let pumpObj = {"pump1":pump1_3,"tank_id":tank_id_3,"opMode":opMode_3};
      var wellP = JSON.stringify(pumpObj);
      

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(wellP);
  });
  
  //Handles the pressure pump button
   $("#the_container4").find("#pump2").click(function(){
     if(pump2_3 == 0){
        pump2_3 = 1;
      }
      else{
        pump2_3 = 0;
      }
      
      if(pump2_3){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
      else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
      }

      let pumpObj = {"pump2":pump2_3,"tank_id":tank_id_3,"opMode":opMode_3};
      var pressP = JSON.stringify(pumpObj);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
          
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(pressP);
   });
   
   //Handles the well valve button
  $("#the_container4").find("#valve1").click(function(){
    if(valve1_3 == 0){
      valve1_3 = 1;
    }
    else{
      valve1_3 = 0;
    }
    
    if(valve1_3){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve1":valve1_3,"tank_id":tank_id_3,"opMode":opMode_3};
    var wellV = JSON.stringify(pumpObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wellV);
  });
  
  //Handles the waterboard valve button
  $("#the_container4").find("#valve2").click(function(){
    if(valve2_3 == 0){
      valve2_3 = 1;
    }else{
      valve2_3 = 0;
    }
    
    if(valve2_3){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve2":valve2_3,"tank_id":tank_id_3,"opMode":opMode_3};
    var wbV = JSON.stringify(pumpObj);
   

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wbV);
  });
  
  $("#mode_4").click(function(){
    if(mode_3 == 0){
    mode_3 = 1;
    }
    else{
      mode_3 = 0;
    }
    
    if(mode_3 == 1){
       $("#mode_4").text("Manual-mode");
       $("#mode_4").css("background-color","rgba(16,185,129,0.5)");
       
    }
    else{
       $("#mode_4").text("Auto-mode");
       $("#mode_4").css("background-color","rgba(255,255,255,0.5)");
       
    }

    let modeObj = {"override":mode_3,"tank_id":tank_id_3,"opMode":opMode_3};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  $("#staticBackdrop4").find("#reset").click(function(){

    let modeObj = {"reset":1,"tank_id":tank_id_3,"opMode":opMode_3};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  /*
   *CONTROLS FOR TANK 5
   */
  
  $("#the_container5").find("#pump1").click(function(){
      if(pump1_4 == 0){
        pump1_4 = 1;
      }
      else{
        pump1_4 = 0;
      }

      if(pump1_4){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
       else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
       }

      let pumpObj = {"pump1":pump1_4,"tank_id":tank_id_4,"opMode":opMode_4};
      var wellP = JSON.stringify(pumpObj);
      

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(wellP);
  });
  
  //Handles the pressure pump button
   $("#the_container5").find("#pump2").click(function(){
     if(pump2_4 == 0){
        pump2_4 = 1;
      }
      else{
        pump2_4 = 0;
      }
      
      if(pump2_4){
         $(this).text("ON");
         $(this).css("background-color","rgba(16,185,129,0.5)");
      }
      else{
         $(this).text("OFF");
         $(this).css("background-color","rgba(255,255,255,0.5)");
      }

      let pumpObj = {"pump2":pump2_4,"tank_id":tank_id_4,"opMode":opMode_4};
      var pressP = JSON.stringify(pumpObj);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.status === 200){
          
         }
    }
      xhr.open("POST", "/resources/editSensorValues.php", true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(pressP);
   });
   
   //Handles the well valve button
  $("#the_container5").find("#valve1").click(function(){
    if(valve1_4 == 0){
      valve1_4 = 1;
    }
    else{
      valve1_4 = 0;
    }
    
    if(valve1_4){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve1":valve1_4,"tank_id":tank_id_4,"opMode":opMode_4};
    var wellV = JSON.stringify(pumpObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wellV);
  });
  
  //Handles the waterboard valve button
  $("#the_container5").find("#valve2").click(function(){
    if(valve2_4 == 0){
      valve2_4 = 1;
    }else{
      valve2_4 = 0;
    }
    
    if(valve2_4){
       $(this).text("ON");
       $(this).css("background-color","rgba(16,185,129,0.5)");
    }
    else{
       $(this).text("OFF");
       $(this).css("background-color","rgba(255,255,255,0.5)");
    }

    let pumpObj = {"valve2":valve2_4,"tank_id":tank_id_4,"opMode":opMode_4};
    var wbV = JSON.stringify(pumpObj);
   

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
         
       }
  }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(wbV);
  });
  
  $("#mode_5").click(function(){
    if(mode_4 == 0){
    mode_4 = 1;
    }
    else{
      mode_4 = 0;
    }
    
    if(mode_4 == 1){
       $("#mode_5").text("Manual-mode");
       $("#mode_5").css("background-color","rgba(16,185,129,0.5)rgba(16,185,129,0.5)");
       
    }
    else{
       $("#mode_5").text("Auto-mode");
       $("#mode_5").css("background-color","rgba(255,255,255,0.5)");
       
    }

    let modeObj = {"override":mode_4,"tank_id":tank_id_4,"opMode":opMode_4};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  $("#staticBackdrop5").find("#reset").click(function(){

    let modeObj = {"reset":1,"tank_id":tank_id_4,"opMode":opMode_4};
    var md = JSON.stringify(modeObj);
    

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status === 200){
        
       }
    }
    xhr.open("POST", "/resources/editSensorValues.php", true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(md);
    
  });
  
  
  
  /*Modal Logic*/
  $("#the_container1").find("#modalToggle").click(function(){
    $("#staticBackdrop1").find(".modal-body").html("Are you sure you want to reset the "+tname1+" microcontroller?");
  });
  $("#the_container2").find("#modalToggle").click(function(){
    $("#staticBackdrop2").find(".modal-body").html("Are you sure you want to reset the "+tname2+" microcontroller?");
  });
  $("#the_container3").find("#modalToggle").click(function(){
    $("#staticBackdrop3").find(".modal-body").html("Are you sure you want to reset the "+tname3+" microcontroller?");
  });
  $("#the_container4").find("#modalToggle").click(function(){
    $("#staticBackdrop4").find(".modal-body").html("Are you sure you want to reset the "+tname4+" microcontroller?");
  });
  $("#the_container5").find("#modalToggle").click(function(){
    $("#staticBackdrop5").find(".modal-body").html("Are you sure you want to reset the "+tname5+" microcontroller?");
  });
  
  $( "#liveToast1" ).draggable();
  $( "#liveToast2" ).draggable();
  $( "#liveToast3" ).draggable();
  $( "#liveToast4" ).draggable();
  $( "#liveToast5" ).draggable();
  
  $("li#home").find("a").addClass("active").css("background-color","#3375c4");
  $("li#stats").find("a").removeClass("active");
});

if(num_of_tanks == 2){
  
  $(function(){
    $("#the_container3").addClass("visually-hidden");
    $("#the_container4").addClass("visually-hidden");
    $("#the_container5").addClass("visually-hidden");
    $("#the_container2").addClass("mb-5");
    setInterval( function(){
    getReadings();
    getReadings2();
    },2000);
    });
    
}else if(num_of_tanks == 3){
  $("#the_container4").addClass("visually-hidden");
  $("#the_container5").addClass("visually-hidden");
  $("#the_container3").addClass("mb-5");
  setInterval(function(){
    getReadings();
    getReadings2();
    getReadings3();
    }, 2000);
    
}else if(num_of_tanks == 4){
  $("#the_container5").addClass("visually-hidden");
  $("#the_container4").addClass("mb-5");
  setInterval(function(){
    getReadings();
    getReadings2();
    getReadings3();
    getReadings4();
    }, 2000);

}else if(num_of_tanks == 5){
  setInterval(function(){
    getReadings();
    getReadings2();
    getReadings3();
    getReadings4();
    getReadings5();
    }, 2000);
    
}else{setInterval(getReadings,2000);
  $("#the_container1").addClass("mb-5");
  $("#the_container2").addClass("visually-hidden");
  $("#the_container3").addClass("visually-hidden");
  $("#the_container4").addClass("visually-hidden");
  $("#the_container5").addClass("visually-hidden");
  }

