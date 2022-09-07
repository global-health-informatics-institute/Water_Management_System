setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 500);

var tankID = "1";

$(function(){
	//services upload cancel button
	$("#cancel2").click(function(e){
	  e.preventDefault();
	  $("#img").addClass("visually-hidden");
	});
	//services interval cancel button
	$("#cancel").click(function(e){
	  e.preventDefault();
	  $("#int").addClass("visually-hidden");
	});
	//when there is a change in input
	$('input#On').change(function() {
	  $("#int").removeClass("visually-hidden");
	});
	$('input#Off').change(function() {
	  $("#int").removeClass("visually-hidden");
	});
	//show upload button when input form  is clicked
	$("#formFile").click(function(){
	    $("#img").removeClass("visually-hidden");
	    
	    if($("#upload-update").hasClass("visually-hidden")){
	    }else{
	      $("#upload-update").addClass("visually-hidden");
	    }
	    
	});
	//get latest interval values
	$.ajax({
	    url:"../resources/settings_service.php",
	    method: "POST",
	    data: {toggle: "1"},
	    success: function(result){
		var myObj = JSON.parse(result);
		$("#On").val(myObj.Interval_on);
		$("#Off").val(myObj.Interval_off);
		if(!myObj.url.trim()){
			console.log("string is empty");
		}else{
			$("body").css("background-image", "url(../" + myObj.url+ ")");
		}
	    }
	    });

	//when the Interval form is submitted
	$("#interval").submit(function(e){
	  e.preventDefault();
	  $("#submitInt").attr("disabled",true);
	  $.ajax({
	    url:"../resources/settings_service.php",
	    method: "POST",
	    data: {On: $("#On").val(), Off: $("#Off").val()},
	    success: function(result){
	      $("#submitInt").attr("disabled",false);
	       //once verified, the dashboard is shown when the window is reloaded
	      if(result == 1){
		    $("#int").addClass("visually-hidden");
		    $("#upload-update1").removeClass("text-danger");
		    $("#upload-update1").addClass("text-info");
		    $("#upload-update1").removeClass("visually-hidden");
		    $("#upload-update1").html("Successfully changed On Interval");
		    }
		    else if(result==2){
		    $("#int").addClass("visually-hidden");
		    $("#upload-update1").removeClass("text-danger");
		    $("#upload-update1").addClass("text-info");
		    $("#upload-update1").removeClass("visually-hidden");
		    $("#upload-update1").html("Successfully changed Off Interval");
		    }
		    else if(result==3){
		    $("#int").addClass("visually-hidden");
		    $("#upload-update1").removeClass("text-danger");
		    $("#upload-update1").addClass("text-info");
		    $("#upload-update1").removeClass("visually-hidden");
		    $("#upload-update1").html("Successfully changed both Intervals");
		    }
	      else{
		    //show the alert
		    $("#int").addClass("visually-hidden");
		    if($("#upload-update1").hasClass("text-danger")){
		      $("#upload-update1").removeClass("visually-hidden");
		      $("#upload-update1").html(result);
		    }else{
		      $("#upload-update1").addClass("text-danger");
		      $("#upload-update1").removeClass("visually-hidden");
		      $("#upload-update1").html(result);
		    }
		  }
	      }
	    });
	  });

	 //when the background-image form is submitted
	$("#background").submit(function(e){
	  let formData = new FormData();
	  let image = $("#formFile")[0].files[0];
	  formData.append('image',image);
	  e.preventDefault();
	  $("#uploadImg").attr("disabled",true);
	  $.ajax({
		xhr: function(){
		  var xhr = new window.XMLHttpRequest();
		  xhr.upload.addEventListener('progress',function(e){
		    if(e.lengthComputable){
		      $(".progress-bar").removeClass("visually-hidden");
		      var percentage = Math.round((e.loaded/e.total)*100);
		      $(".progress-bar-fill").css('width',percentage +'%');
		      $(".progress-bar-text").html(percentage+'%');
		    }
		  });
		  return xhr;
		},
		url:"../resources/upload.php",
		method: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function(result){
		  $("#uploadImg").attr("disabled",false);
		   //once verified, the dashboard is shown when the window is reloaded
		  if(result==1){
			$("#img").addClass("visually-hidden");
			$(".progress-bar").addClass("visually-hidden");
			$("#upload-update").removeClass("text-danger");
			$("#upload-update").addClass("text-info");
			$("#upload-update").removeClass("visually-hidden");
			$("#upload-update").html("Your file was uploaded successfully.").delay(2000);
			window.location.reload(true);
			
			}
		  else{
			//show the alert
			$(".progress-bar").addClass("visually-hidden");
			$("#img").addClass("visually-hidden");
			$("#upload-update").removeClass("visually-hidden");
			$("#upload-update").html(result);
			}
		  }
		});
	  });

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
    

    //backbutton functionality
    $('#backbtn').click(function(){
		parent.history.back();
		return false;
	});
    
    
    //show loading modal when link is clicked
    $("a.nav-link").click(function(){
      $("#myModal").removeClass("visually-hidden");
    });
    
    //render the chart with the option value equal to tank_id
   $("select option").filter(function() {
      return $(this).val() == tankID;
    }).prop('selected', true);
    
});
