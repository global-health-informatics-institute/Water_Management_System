setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 2000);


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

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

$(function(){
    $("select").change(onSelect);
    
    if($("select#select").val()){
      //Check if there is a tank id in local storage
      if(window.localStorage.getItem("user_tank_id")!==null)
      {
        var tankID = window.localStorage.getItem('user_tank_id');
      }else{var tankID = "2";}
        
    }else{//Check if there is a tank id in local storage
      if(window.localStorage.getItem("admin_tank_id")!==null)
      {
        var tankID = window.localStorage.getItem('admin_tank_id');
      }else{var tankID = "2";}
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
	    $("#chart-container").removeClass("visually-hidden");
	    $(this).addClass("visually-hidden");
	    
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
