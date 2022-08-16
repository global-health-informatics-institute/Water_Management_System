setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 500);


//Water volume chart
var options = {
  series: [{
  name: 'Water Level',
  data: []
}],
chart: {
height: 500,
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
      max: 0,
      tickAmount: 9,
      type: 'numeric',
},
xaxis:{
  type: "category",
  
  title:{
      text: "Timestamp",
      },
  },        
};
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var Time = "";
var Volume = "";
var date = "";
var dateTime = "";
var dataArr = [];
var tankID = "1"

$(function(){
    $("select").change(onSelect);
    if($("select#select").val()){
      //Check if there is a tank id in local storage
      if(window.localStorage.getItem("user_tank_id")!==null)
      {
        tankID = window.localStorage.getItem('user_tank_id');
      }else{tankID = "1";}
        
    }else{//Check if there is a tank id in local storage
      if(window.localStorage.getItem("admin_tank_id")!==null)
      {
        tankID = window.localStorage.getItem('admin_tank_id');
      }else{tankID = "1";}
    }
    
    
    //send the current tank id to backend
    $.ajax({
      url:"../views/statistics.php",
      method: "POST",
      data: {tank_id: tankID},
      success: function(result){
       if(result == 1){
         console.log("OK!");
         window.location.reload(true);
      }
      }
    });
    
    //plot the chart
    $("#plot").click(function(){
      dataArr =[];
      var table = $("#dataTable");
      table.find('tr').each(function(i,el){
        var $tds = $(this).find('td');
        date = $tds.eq(0).text();
        Time = $tds.eq(1).text();
        Volume = Number($tds.eq(2).text());
        dateTime = date+" "+Time;
        if(dateTime != " "){
          dataArr.push({
              x: dateTime,
              y: Volume
          });
        }
      });
      console.log(dataArr);
      chart.updateSeries([{
        name: 'Water Level',
        data: dataArr
      }]);
      getCapacity();
      $("#chart-container").fadeIn('slow', function() {
        $(this).removeClass("visually-hidden");
        $("#plot").addClass("visually-hidden");
        });
    });
    
    //close the plotted chart
    $(".btn-close").click(function(){
	    $("#chart-container").addClass("visually-hidden");
	    $("#plot").removeClass("visually-hidden");	
    });
    
    //renders the data table
    $('#dataTable').DataTable();
    
    //other functionalities
    $("li#stats").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
    $("li#dash").find("a").removeClass("active");
    
    //show loading modal when link is clicked
    $("a.nav-link").click(function(){
      $("#myModal").removeClass("visually-hidden");
    });
    
    //render the chart with the option value equal to tank_id
   $("select option").filter(function() {
      return $(this).val() == tankID;
    }).prop('selected', true);
    
});


//pick a tank whose chart should be rendered
function onSelect(){
  var theOption = $("select#select").val();
  if(theOption !== null){
    tankID = String(theOption);
    //stores tank_id in local storage
    window.localStorage.setItem("user_tank_id",tankID);
    //send the current tank id to backend
      $.ajax({
        url:"../views/statistics.php",
        method: "POST",
        data: {tank_id: tankID,select:1},
        success: function(result){
         if(result == 1){
           $("#myModal").removeClass("visually-hidden");
           window.location.reload(true);
        }
        }
      });
    }
}

function getCapacity(){
var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      //update the tank capacity
      var capacity = myObj.capacity;
      capacity = Number(capacity);
      chart.updateOptions({
        yaxis: {
          title:{
          text: "Litres",
          style: {
            fontSize: '16px',
            cssClass: 'apexcharts-yaxis-label',
            },
          },
          labels:{
          formatter: function(val,index){
            return val.toFixed(1);
            },
            style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-label',
            },
          },
          min: 0,
          max: capacity
        }
      });
    }
  };
  xhr.open("GET","/resources/getSensorValues.php?q="+tankID, true);
  xhr.send();
}
  
