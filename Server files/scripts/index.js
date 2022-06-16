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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

var num_of_tanks = 1;

// Get current sensor readings when the page loads
window.addEventListener("load", function(){
  getReadings();
  getReadings2();
  getReadings3();  
});

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
let xVal = new Date();
var opMode = 0;
var tank_id = "1"

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
let xVal_1 = new Date();
var opMode_1 = 0;
var tank_id_1 = "3";

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
let xVal_2 = new Date();
var opMode_2 = 0;
var tank_id_2 = "4";

if(window.localStorage.getItem("tank_id")!==null)
{
  var tank_id = window.localStorage.getItem('tank_id');
}else{var tank_id = "3";}




// Create Well Water Volume chart
var logs = [];//datalogs array.

var options1 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 320,
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
        return val.toFixed(2);
        }
      },
            min: 0,
            max: 20,
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

// Create Well Water Volume chart
var logs = [];//datalogs array.

var options3 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 320,
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
        return val.toFixed(2);
        }
      },
            min: 0,
            max: 20,
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

//pressure gauge
 var options4 ={
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

var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
chart4.render()

// Create Well Water Volume chart
var logs = [];//datalogs array.

var options5 = {
  series: [{
  name: 'Water Level',
  data: []
}],


  chart: {
  height: 320,
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
        return val.toFixed(2);
        }
      },
            min: 0,
            max: 20,
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

//pressure gauge
 var options6 ={
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

var chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
chart6.render()

//sends notification to mobile phone
function Notification(msg){
  let data = {"timestamp":Date.now(), "msg": msg}
  database.ref("message").push(data);
  
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
      
      if (ydps.length >  15 )
      {
        ydps.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart1.updateSeries([{
                name: 'Water Level',
                data: ydps
            }]);
      
      //update pressure gauge
      chart2.updateSeries([pressureV]);
     
      //command values updated
      warning1 = myObj.warning1;
      warning2 = myObj.warning2;
      pump1 = myObj.pump1;
      pump2 = myObj.pump2;
      valve1 = myObj.valve1;
      valve2 = myObj.valve2;
      mode = myObj.override;
      opMode = myObj.opCode;
    }
    
    
    //Checks if there any warnings
    if(warning1 == 1){
      if(theAlert==1){
        const toast = new bootstrap.Toast($("#liveToast"));
        $("#warning").html("Water level is too low!");
        toast.show();
        
        msg = "Water level is too low!";
        Notification(msg);
        }
        theAlert = 0;
    }
    else if(warning2 == 1){
      if(theAlert==1){
        const toast = new bootstrap.Toast($("#liveToast"))
        $("#warning").html("Water level is too high!");
        toast.show();
        
        msg = "Water level is too low!";
        Notification(msg);
            
           }
      theAlert = 0;
    }else{theAlert = 1}

  
  
  
  //Updates control button states
   if(pump1 == 1){
     $("#pump1").text("ON");
     $("#pump1").css("background-color","#10B981");
  }
   else{
     $("#pump1").text("OFF");
     $("#pump1").css("background-color","#EF4444");
   }
   
   if(pump2 == 1){
     $("#pump2").text("ON");
     $("#pump2").css("background-color","#10B981");
  }
  else{
     $("#pump2").text("OFF");
     $("#pump2").css("background-color","#EF4444");
  }
  
   if(valve1==1){
     $("#valve1").text("ON");
     $("#valve1").css("background-color","#10B981");
  }
  
  else{
     $("#valve1").text("OFF");
     $("#valve1").css("background-color","#EF4444");
  }
  
  if(valve2 == 1){
     $("#valve2").text("ON");
     $("#valve2").css("background-color","#10B981");
  }
  else{
     $("#valve2").text("OFF");
     $("#valve2").css("background-color","#EF4444");
  }
  
   if(mode == 1){
     $("#mode").text("Manual-mode");
     $("#mode").css("background-color","#10B981");
     $("#control").css("display","flex");
  }
  else{
     $("#mode").text("Auto-mode");
     $("#mode").css("background-color","#EF4444");
     $("#control").css("display","none");
  }
  if(opMode == "1"){
    $("#Gauge").addClass("visually-hidden");
    $("#b1").addClass("visually-hidden");
    $("#b2").addClass("visually-hidden");
    $("#v1").text("Outlet Valve");
    $("#v2").text("Inlet Valve");
  }
  if(opMode == "2"){
    $("#Gauge").addClass("visually-hidden");
    $("#b2").addClass("visually-hidden");
    $("#b4").addClass("visually-hidden");
    $("#p1").text("Water Pump");
    $("#v1").text("Outlet Valve");
  }
  if(opMode == "3"){
    $("#b4").addClass("visually-hidden");
    $("#v1").text("Outlet Valve");
  }
  
  };

  xhr.open("GET", "/getSensorValues.php?q="+tank_id, true);
  xhr.send();
}


// Function to get current readings on the webpage when it loads for the first time
function getReadings2() {
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
      yVal_1 = Number(volume);
      
      datapoints_1.push(xVal,yVal); //push points to temporal array 
      ydps_1.push(datapoints); // push to main array
      datapoints_1 =[]; // clear temporal array
      
      if (ydps_1.length >  15 )
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
      chart4.updateSeries([pressureV]);
     
      //command values updated
      warning1_1 = myObj.warning1;
      warning2_1 = myObj.warning2;
      pump1_1 = myObj.pump1;
      pump2_1 = myObj.pump2;
      valve1_1 = myObj.valve1;
      valve2_1 = myObj.valve2;
      mode_1 = myObj.override;
      opMode_1 = myObj.opCode;
    }
    
    
    //Checks if there any warnings
    if(warning1_1 == 1){
      if(theAlert_1==1){
        const toast = new bootstrap.Toast($("#liveToast"));
        $("#warning").html("Water level is too low!");
        toast.show();
        
        msg_1 = "Water level is too low!";
        Notification(msg_1);
        }
        theAlert = 0;
    }
    else if(warning2_1 == 1){
      if(theAlert_1==1){
        const toast = new bootstrap.Toast($("#liveToast"))
        $("#warning").html("Water level is too high!");
        toast.show();
        
        msg_1 = "Water level is too low!";
        Notification(msg_1);
            
           }
      theAlert_1 = 0;
    }else{theAlert_1 = 1}

  
  //Updates control button states
   if(pump1_1 == 1){
     $("#the_container2").find("#pump1").text("ON");
     $("#the_container2").find("#pump1").css("background-color","#10B981");
  }
   else{
     $("#the_container2").find("#pump1").text("OFF");
     $("#the_container2").find("#pump1").css("background-color","#EF4444");
   }
   
   if(pump2_1 == 1){
     $("#the_container2").find("#pump2").text("ON");
     $("#the_container2").find("#pump2").css("background-color","#10B981");
  }
  else{
     $("#the_container2").find("#pump2").text("OFF");
     $("#the_container2").find("#pump2").css("background-color","#EF4444");
  }
  
   if(valve1_1==1){
     $("#the_container2").find("#valve1").text("ON");
     $("#the_container2").find("#valve1").css("background-color","#10B981");
  }
  
  else{
     $("#the_container2").find("#valve1").text("OFF");
     $("#the_container2").find("#valve1").css("background-color","#EF4444");
  }
  
  if(valve2_1 == 1){
     $("#the_container2").find("#valve2").text("ON");
     $("#the_container2").find("#valve2").css("background-color","#10B981");
  }
  else{
     $("#the_container2").find("#valve2").text("OFF");
     $("#the_container2").find("#valve2").css("background-color","#EF4444");
  }
  
   if(mode_1 == 1){
     $("#the_container2").find("#mode").text("Manual-mode");
     $("#the_container2").find("#mode").css("background-color","#10B981");
     $("#the_container2").find("#control").css("display","flex");
  }
  else{
     $("#the_container2").find("#mode").text("Auto-mode");
     $("#the_container2").find("#mode").css("background-color","#EF4444");
     $("#the_container2").find("#control").css("display","none");
  }
  if(opMode_1 == "1"){
    $("#the_container2").find("#Gauge").addClass("visually-hidden");
    $("#the_container2").find("#b1").addClass("visually-hidden");
    $("#the_container2").find("#b2").addClass("visually-hidden");
    $("#the_container2").find("#v1").text("Outlet Valve");
    $("#the_container2").find("#v2").text("Inlet Valve");
  }
  if(opMode_1 == "2"){
    $("#the_container2").find("#Gauge").addClass("visually-hidden");
    $("#the_container2").find("#b2").addClass("visually-hidden");
    $("#the_container2").find("#b4").addClass("visually-hidden");
    $("#the_container2").find("#p1").text("Water Pump");
    $("#the_container2").find("#v1").text("Outlet Valve");
  }
  if(opMode_1 == "3"){
    $("#the_container2").find("#b4").addClass("visually-hidden");
    $("#the_container2").find("#v1").text("Outlet Valve");
  }
  
  };

  xhr.open("GET", "/getSensorValues.php?q="+tank_id_1, true);
  xhr.send();
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings3() {
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
      yVal_2 = Number(volume);
      
      datapoints_2.push(xVal,yVal); //push points to temporal array 
      ydps_2.push(datapoints); // push to main array
      datapoints_2 =[]; // clear temporal array
      
      if (ydps_2.length >  15 )
      {
        ydps_2.shift();				
      }
      //pressure value limit
      if(pressureV > 100){pressureV = 100;}
      //update water volume chart
      chart3.updateSeries([{
                name: 'Water Level',
                data: ydps_2
            }]);
      
      //update pressure gauge
      chart4.updateSeries([pressureV]);
     
      //command values updated
      warning1_2 = myObj.warning1;
      warning2_2 = myObj.warning2;
      pump1_2 = myObj.pump1;
      pump2_2 = myObj.pump2;
      valve1_2 = myObj.valve1;
      valve2_2 = myObj.valve2;
      mode_2 = myObj.override;
      opMode_2 = myObj.opCode;
    }
    
    
    //Checks if there any warnings
    if(warning1_2 == 1){
      if(theAlert_2==1){
        const toast = new bootstrap.Toast($("#liveToast"));
        $("#warning").html("Water level is too low!");
        toast.show();
        
        msg_2 = "Water level is too low!";
        Notification(msg_2);
        }
        theAlert = 0;
    }
    else if(warning2_2 == 1){
      if(theAlert_2==1){
        const toast = new bootstrap.Toast($("#liveToast"))
        $("#warning").html("Water level is too high!");
        toast.show();
        
        msg_2 = "Water level is too low!";
        Notification(msg_2);
            
           }
      theAlert_2 = 0;
    }else{theAlert_2 = 1}

  
  //Updates control button states
   if(pump1_2 == 1){
     $("#the_container3").find("#pump1").text("ON");
     $("#the_container3").find("#pump1").css("background-color","#10B981");
  }
   else{
     $("#the_container3").find("#pump1").text("OFF");
     $("#the_container3").find("#pump1").css("background-color","#EF4444");
   }
   
   if(pump2_2 == 1){
     $("#the_container3").find("#pump2").text("ON");
     $("#the_container3").find("#pump2").css("background-color","#10B981");
  }
  else{
     $("#the_container3").find("#pump2").text("OFF");
     $("#the_container3").find("#pump2").css("background-color","#EF4444");
  }
  
   if(valve1_2==1){
     $("#the_container3").find("#valve1").text("ON");
     $("#the_container3").find("#valve1").css("background-color","#10B981");
  }
  
  else{
     $("#the_container3").find("#valve1").text("OFF");
     $("#the_container3").find("#valve1").css("background-color","#EF4444");
  }
  
  if(valve2_2 == 1){
     $("#the_container3").find("#valve2").text("ON");
     $("#the_container3").find("#valve2").css("background-color","#10B981");
  }
  else{
     $("#the_container3").find("#valve2").text("OFF");
     $("#the_container3").find("#valve2").css("background-color","#EF4444");
  }
  
   if(mode_2 == 1){
     $("#the_container3").find("#mode").text("Manual-mode");
     $("#the_container3").find("#mode").css("background-color","#10B981");
     $("#the_container3").find("#control").css("display","flex");
  }
  else{
     $("#the_container3").find("#mode").text("Auto-mode");
     $("#the_container3").find("#mode").css("background-color","#EF4444");
     $("#the_container3").find("#control").css("display","none");
  }
  if(opMode_2 == "1"){
    $("#the_container3").find("#Gauge").addClass("visually-hidden");
    $("#the_container3").find("#b1").addClass("visually-hidden");
    $("#the_container3").find("#b2").addClass("visually-hidden");
    $("#the_container3").find("#v1").text("Outlet Valve");
    $("#the_container3").find("#v2").text("Inlet Valve");
  }
  if(opMode_2 == "2"){
    $("#the_container3").find("#Gauge").addClass("visually-hidden");
    $("#the_container3").find("#b2").addClass("visually-hidden");
    $("#the_container3").find("#b4").addClass("visually-hidden");
    $("#the_container3").find("#p1").text("Water Pump");
    $("#the_container3").find("#v1").text("Outlet Valve");
  }
  if(opMode_2 == "3"){
    $("#the_container3").find("#b4").addClass("visually-hidden");
    $("#the_container3").find("#v1").text("Outlet Valve");
  }
  
  };

  xhr.open("GET", "/getSensorValues.php?q="+tank_id_2, true);
  xhr.send();
}


//Handles the pressure pump button
function handleClick1(){
  if(pump1 == 0){
    pump1 = 1;
  }
  else{
    pump1 = 0;
  }

  if(pump1){
     $("#pump1").text("ON");
     $("#pump1").css("background-color","#10B981");
  }
   else{
     $("#pump1").text("OFF");
     $("#pump1").css("background-color","#EF4444");
   }

  let pumpObj = {"pump1":pump1,"tank_id":tank_id,"opMode":opMode};
  var wellP = JSON.stringify(pumpObj);
  

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wellP);
}


//Handles the well pump button
function handleClick2(){
  if(pump2 == 0){
    pump2 = 1;
  }
  else{
    pump2 = 0;
  }
  
  if(pump2){
     $("#pump2").text("ON");
     $("#pump2").css("background-color","#10B981");
  }
  else{
     $("#pump2").text("OFF");
     $("#pump2").css("background-color","#EF4444");
  }

  let pumpObj = {"pump2":pump2,"tank_id":tank_id,"opMode":opMode};
  var pressP = JSON.stringify(pumpObj);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
      
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(pressP);

}


//Handles the well valve button
function handleClick3(){
  if(valve1 == 0){
    valve1 = 1;
  }
  else{
    valve1 = 0;
  }
  
  if(valve1){
     $("#valve1").text("ON");
     $("#valve1").css("background-color","#10B981");
  }
  
  else{
     $("#valve1").text("OFF");
     $("#valve1").css("background-color","#EF4444");
  }

  let pumpObj = {"valve1":valve1,"tank_id":tank_id,"opMode":opMode};
  var wellV = JSON.stringify(pumpObj);
  

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wellV);

}


//Handles the waterboard valve button
function handleClick4(){
 
  if(valve2 == 0){
    valve2 = 1;
  }else{
    valve2 = 0;
  }
  
  if(valve2){
     $("#valve2").text("ON");
     $("#valve2").css("background-color","#10B981");
  }
  else{
     $("#valve2").text("OFF");
     $("#valve2").css("background-color","#EF4444");
  }

  let pumpObj = {"valve2":valve2,"tank_id":tank_id,"opMode":opMode};
  var wbV = JSON.stringify(pumpObj);
 

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wbV);

}


//Handles the Mode Button
function handleClick5(){
  if(mode == 0){
    mode = 1;
  }
  else{
    mode = 0;
  }
  
  if(mode == 1){
     $("#mode").text("Manual-mode");
     $("#mode").css("background-color","#10B981");
     $("#control").css("display","flex");
  }
  else{
     $("#mode").text("Auto-mode");
     $("#mode").css("background-color","#EF4444");
     $("#control").css("display","none");
  }

  let modeObj = {"override":mode,"tank_id":tank_id,"opMode":opMode};
  var md = JSON.stringify(modeObj);
  

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
      
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(md);
}

//listens for any changes to the select attribute
$(function(){
  $("select").change(onSelect);
  if (tank_id == "1"){
    let text = 'GHII Well Tank';
      $("select option").filter(function() {
          return $(this).text() == text;
        }).prop('selected', true);
  }
  if (tank_id == "3"){
    let text = 'GHII Waterboard Tank';
      $("select option").filter(function() {
          return $(this).text() == text;
        }).prop('selected', true);
    }
  });


//pick a selection
function onSelect(){
  var theOption = $("select#select").val();
  if((theOption == 1) || (theOption == 3)){
    tank_id = String(theOption);
    //stores tank_id in local storage
    window.localStorage.setItem("tank_id",tank_id);
    //reloads window
    window.location.reload();
  }
  //this means with the select option, you can render the tank you want  
}


if(num_of_tanks == 2){
  setInterval(function(){
    getReadings();
    getReadings2();
    }, 2000);
}else if(num_of_tanks == 3){
  setInterval(function(){
    getReadings();
    getReadings2();
    getReadings3();
    }, 2000);
    
}else{setInterval(getReadings,2000);}

