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



// Get current sensor readings when the page loads
window.addEventListener("load", getReadings);
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
var tank_id = "3";
var datapoints = [];
var ydps = [];
var press = [];
let xVal = new Date();
var opMode = 0;


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


//sends notification to mobile phone
function Notification(msg){
  let data = {"timestamp":Date.now(), "msg": msg}
  database.ref("message").push(data);
  console.log("message sent");
  
  return;
}



// Function to get current readings on the webpage when it loads for the first time
function getReadings() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);

      //Variables created to hold new sensor values
      var pressureV = myObj.pressure;
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
      opMode = myObj.opMode;
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
  };

  xhr.open("GET", "/getSensorValues.php?q="+tank_id, true);
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
  console.log(wellP);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!");
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
  console.log(pressP);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!");
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(pressP);

}


//Handles the well valve button
function handleClick3(){
  console.log("Valve 1 value",valve1);
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
  console.log(wellV);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!");
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wellV);

}

//Handles the waterboard valve button
function handleClick4(){
  console.log("Valve 2 value",valve2);
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
  console.log(wbV);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!")
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
  console.log(md);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!")
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
          //may want to use $.trim in here
          return $(this).text() == text;
        }).prop('selected', true);
  }
  if (tank_id == "3"){
    let text = 'GHII Water Tank';
      $("select option").filter(function() {
          //may want to use $.trim in here
          return $(this).text() == text;
        }).prop('selected', true);
    }
  });


//pick a selection
function onSelect(){
  var theOption = $("select#select").val();
  console.log(theOption);
  if((theOption == 1) || (theOption == 3)){
    tank_id = String(theOption);
  }
  //this means with the select option, you can render the tank you want  
}



setInterval(getReadings, 2000);
