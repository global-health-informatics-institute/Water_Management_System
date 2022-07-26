window.addEventListener("load", function(){
  //Check if there is a tank id in local storage
	if(window.localStorage.getItem("admin_tank_id")!==null)
	{
	  var tankID = window.localStorage.getItem('admin_tank_id');
	}else{var tankID = "3";}
  //send the current tank id to backend
  $.ajax({
	url:"../views/statistics.php",
	method: "POST",
	data: {tank_id: tankID},
	success: function(result){
	 if(result == 1){
	   console.log("OK!");
	}
	}
  });
  
});


$(function(){
	$("#plot").click(function(){
		$("#chart-container").removeClass("visually-hidden");
		$(this).addClass("visually-hidden");
	});
	$(".btn-close").click(function(){
		$("#chart-container").addClass("visually-hidden");
		$("#plot").removeClass("visually-hidden");	
	});
	$('#dataTable').DataTable();
	$("li#stats").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
    $("li#dash").find("a").removeClass("active");
    //show loading modal when link is clicked
    $("a.nav-link").click(function(){
      $("#myModal").removeClass("visually-hidden");
    });
});
