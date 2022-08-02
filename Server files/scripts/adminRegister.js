//toggle button state
document.getElementById("register").addEventListener('click', event => setTimeout(() => event.target.disabled = true, 0));
setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 2000);

function close1(){
  $(document).ready(()=>{
    $(".btn-close").parent("div#e1").remove();
    $("#e3").remove();
    $("#e4").remove();
    $("#e5").remove();
    });
}
function close2(){
  $(document).ready(()=>{
    $(".btn-close").parent("div#e2").remove();
    $("#e3").remove();
    $("#e4").remove();
    $("#e5").remove();
    });
}

$(function(){
  
  $("a").click(function(){
    $("#myModal").removeClass("visually-hidden");
  });
  $("#register").click(function(){
    $("#myModal").removeClass("visually-hidden");
  });
  
  $("li#dash").find("a").addClass("active").css("background-color","#3375c4");
  $("li#home").find("a").removeClass("active");
  $("li#stats").find("a").removeClass("active");
  });

function close6(){
  $("#myModal").removeClass("visually-hidden");
  window.location = "userManagement.php";
}
