//toggle button state
document.getElementById("register").addEventListener('click', event => setTimeout(() => event.target.disabled = true, 0));

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
  $("li#home").find("a").click(function(){
    window.localStorage.setItem("page",1);
  });
  
  if(window.localStorage.getItem("page") == 0){
    $("li#dash").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
  }
  
  if(window.localStorage.getItem("page") == null){
    $("li#home").find("a").addClass("active").css("background-color","#3375c4");
  }
  
  })
window.onhashchange = function() {
 window.localStorage.setItem("page",1);
}

function close6(){
  window.localStorage.setItem("page",1);
  window.location = "admin.php";
}
