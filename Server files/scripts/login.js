$(function(){

//when the form is submitted
$("#form").submit(function(e){
  e.preventDefault();
  $.ajax({
    url:"resources/authenticate.php",
    method: "POST",
    data: {username: $("#floatingInput").val(), password: $("#floatingPassword").val()},
  beforeSend: function(e){
    //show spinner
    //disable login button
    $("#login").attr("disabled",true);
    $("#myModal").removeClass("visually-hidden");
    },
    success: function(result){
      //enables login button
       $("#login").attr("disabled",false);
       //once verified, the dashboard is shown when the window is reloaded
      if(result==1){
        window.location.reload(true);
        }
      else if(result==2){
        window.location.href = "http://192.168.0.139/admin.php";
      }
      else{
        //show the alert
        $("#myModal").addClass("visually-hidden");
        $(".alert").css("display","unset")
        }
      }
    });
  });

});

//used to close the error alert
function close1(){
  $(document).ready(()=>{
    $(".btn-close").parent("div.alert").hide();
    });
}


