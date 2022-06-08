//toggle button state
//document.getElementById("login").addEventListener('click', event => setTimeout(() => event.target.disabled = true, 0));
$("#form").submit(function(e){
  e.preventDefault();
  $.ajax({
    url:"authenticate.php",
    method: "POST",
    data: {username: $("#username").val(), password: $("#password").val()},
  beforeSend: function(e){
    $(".spinner").removeClass("visually-hidden");
    $("#login").attr("disabled",true);
    },
    success: function(result){
       $("#login").attr("disabled",false);
       $(".spinner").addClass("visually-hidden");
      if(result==1){
        window.location.reload(true);
        }
        else{
          $(".alert").css("display","unset")
          }
      }
    });
  });
  

function close1(){
  console.log("close");
  $(document).ready(()=>{
    $(".btn-close").parent("div.alert").hide();
    });
}



