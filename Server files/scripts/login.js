
//when the form is submitted
$("#form").submit(function(e){
  e.preventDefault();
  $.ajax({
    url:"authenticate.php",
    method: "POST",
    data: {username: $("#username").val(), password: $("#password").val()},
  beforeSend: function(e){
    //show spinner
    $(".spinner").removeClass("visually-hidden");
    //disable login button
    $("#login").attr("disabled",true);
    },
    success: function(result){
      //disables login button
       $("#login").attr("disabled",false);
       //hides spinner
       $(".spinner").addClass("visually-hidden");
       //once verified, the dashboard is shown when the window is reloaded
      if(result==1){
        window.location.reload(true);
        }
        else{
          //show the alert
          $(".alert").css("display","unset")
          }
      }
    });
  });
  
//used to close the error alert
function close1(){
  $(document).ready(()=>{
    $(".btn-close").parent("div.alert").hide();
    });
}


