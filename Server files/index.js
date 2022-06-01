// Get current sensor readings when the page loads
window.addEventListener("load", getReadings);
var warning1 = 0;
var warning2 = 0;
var pump1 = 0;
var pump2 = 0;
var valve1 = 0;
var valve2 = 0;
var theAlert = 1;
var mode = 0;
var msg = '';

// Create Well Water Volume chart
var dps = []; //dataPoints. 
var logs = [];//datalogs array.

var chart = new CanvasJS.Chart("chartContainer",{
  theme: "light2",
  title :{
    text: "Well Tank"
  },
  axisX: {						
    title: "Timestamp"
  },
  axisY: {						
    title: "Volume(L)"
  },
  data: [{
    type: "area",
    xValueType: "dateTime",
    dataPoints : dps
  }]
});

chart.render();
var yVal = 15;

// Create Pressure Gauge
var gaugePressure = new RadialGauge({
  renderTo: "gauge-pressure",
  width: 300,
  height: 300,
  units: "PSI",
  minValue: 0,
  maxValue: 105,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks:[
    "0",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80",
    "85",
    "90",
    "95",
    "100",
    "105",
  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights:[
    {
      from: 0,
      to: 10,
      color: "#ff0000",
    },
    {
      from: 10,
      to: 60,
      color: "#03ac13",
    },
    {
      from: 60,
      to: 65,
      color: "#fc6a03",
    },
    {
      from: 65,
      to: 105,
      color: "#ff0000",
    },
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
}).draw();

//sends notification to mobile phone
function Notification(msg){
    fetch('https://api.mynotifier.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: '0ae931fe-012e-4416-a222-f9d5132fdaba', // Input your own api key here.
      message: msg, // The message you want to send to yourself/team.
    }),
  })
  
}

// Function to get current readings on the webpage when it loads for the first time
function getReadings() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);

      //Variables created to hold new sensor values
      var press = myObj.pressure;
      var welltank = myObj.wellTank;
      var timestamp = myObj.stamp;
      let xVal = Date.now();
      
      //gauge and chart values updated
      gaugePressure.value = press;
      yVal = Number(welltank);
      dps.push({x: xVal,y: yVal});
      logs.push({x:xVal,y: yVal});
      
      if (dps.length >  10 )
      {
        dps.shift();				
      }

      chart.render();
     
      //command values updated
      warning1 = myObj.warning1;
      warning2 = myObj.warning2;
      pump1 = myObj.pump1;
      pump2 = myObj.pump2;
      valve1 = myObj.valve1;
      valve2 = myObj.valve2;
      mode = myObj.override;
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

  xhr.open("GET", "/getSensorValues.php", true);
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

  let pumpObj = {"pump1":pump1};
  var wellP = JSON.stringify(pumpObj);
  console.log(wellP);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!")
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

  let pumpObj = {"pump2":pump2};
  var wbP = JSON.stringify(pumpObj);
  console.log(wbP);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!")
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wbP);

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
    document.getElementById('valve1').style.backgroundColor="#10B981";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("OFF","ON");
  }
  else{
    document.getElementById('valve1').style.backgroundColor="#EF4444";
    document.getElementById('valve1').innerHTML = document.getElementById('valve1').innerHTML.replace("ON","OFF");
  }

  let pumpObj = {"valve1":valve1};
  var wellV = JSON.stringify(pumpObj);
  console.log(wellV);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.status === 200){
       console.log("Post successful!")
     }
}
  xhr.open("POST", "/editSensorValues.php", true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(wellV);

}

//Handles the Mode Button
function handleClick4(){
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

  let modeObj = {"override":mode};
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

