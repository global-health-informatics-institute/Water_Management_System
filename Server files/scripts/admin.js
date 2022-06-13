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
var tank_id = "1";
var datapoints = [];
var ydps = [];
var press = [];
let xVal = Date.now();
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
      let xVal = Date.now();
      
      
      
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
    if(warning1==1){
      if(theAlert==1){
        msg = 'Water volume in Well Tank is too Low!';
        Notification(msg);
        alert(msg);
      }
       theAlert = 0;
    }else if(warning2==1){
       if(theAlert==1){
         msg = 'Well Tank is full!';
         Notification(msg);
         alert(msg);
       }
	theAlert = 0;
    }else{theAlert = 1}
  
  
  
  
  //Updates control button states
   if(pump1 == 1){
    document.getElementById('pump1').style.backgroundColor="#10B981";
    document.getElementById('pump1').innerHTML = document.getElementById('pump1').innerHTML.replace("OFF","ON");
   }
   else{
    document.getElementById('pump1').style.backgroundColor="#EF4444";
    document.getElementById('pump1').innerHTML = document.getElementById('pump1').innerHTML.replace("ON","OFF");
   }
   
   if(pump2 == 1){
    document.getElementById('pump2').style.backgroundColor="#10B981";
    document.getElementById('pump2').innerHTML = document.getElementById('pump2').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('pump2').style.backgroundColor="#EF4444";
    document.getElementById('pump2').innerHTML = document.getElementById('pump2').innerHTML.replace("ON","OFF");
  }
  
   if(valve1==1){
    document.getElementById('valve1').style.backgroundColor="#10B981";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("OFF","ON");
  }
  
  else{
    document.getElementById('valve1').style.backgroundColor="#EF4444";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("ON","OFF");
  }
  
  if(valve2 == 1){
    document.getElementById('valve2').style.backgroundColor="#10B981";
    document.getElementById('valve2').innerHTML = document.getElementById('valve2').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('valve2').style.backgroundColor="#EF4444";
    document.getElementById('valve2').innerHTML = document.getElementById('valve2').innerHTML.replace("ON","OFF");
  }
  
   if(mode == 1){
    document.getElementById('mode').style.backgroundColor="#10B981";
    document.getElementById('mode').innerHTML = document.getElementById('mode').innerHTML.replace("Auto-mode","Manual-mode");
    document.getElementById('control').style.display="flex";

  }
  else{
    document.getElementById('mode').style.backgroundColor="#EF4444";
    document.getElementById('mode').innerHTML = document.getElementById('mode').innerHTML.replace("Manual-mode","Auto-mode");
    document.getElementById('control').style.display="none";
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
    document.getElementById('pump1').style.backgroundColor="#10B981";
    document.getElementById('pump1').innerHTML = document.getElementById('pump1').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('pump1').style.backgroundColor="#EF4444";
    document.getElementById('pump1').innerHTML = document.getElementById('pump1').innerHTML.replace("ON","OFF");
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
    document.getElementById('pump2').style.backgroundColor="#10B981";
    document.getElementById('pump2').innerHTML = document.getElementById('pump2').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('pump2').style.backgroundColor="#EF4444";
    document.getElementById('pump2').innerHTML = document.getElementById('pump2').innerHTML.replace("ON","OFF");
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
    document.getElementById('valve1').style.backgroundColor="#10B981";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('valve1').style.backgroundColor="#EF4444";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("ON","OFF");
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
    document.getElementById('valve2').style.backgroundColor="#10B981";
    document.getElementById('valve2').innerHTML = document.getElementById('valve2').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('valve2').style.backgroundColor="#EF4444";
    document.getElementById('valve2').innerHTML = document.getElementById('valve2').innerHTML.replace("ON","OFF");
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
  if(mode){
    document.getElementById('mode').style.backgroundColor="#10B981";
    document.getElementById('mode').innerHTML = document.getElementById('mode').innerHTML.replace("Auto-mode","Manual-mode");
    document.getElementById('control').style.display="flex";
  }
  else{
    document.getElementById('mode').style.backgroundColor="#EF4444";
    document.getElementById('mode').innerHTML = document.getElementById('mode').innerHTML.replace("Manual-mode","Auto-mode");
    document.getElementById('control').style.display="none";
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

 


setInterval(getReadings, 2000);

