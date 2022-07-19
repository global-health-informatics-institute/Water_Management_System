/*$("#delete").click(function(e){
  e.preventDefault();
  $.ajax({
    url:"userManagement.php",
    method: "POST",
    data: {username: $("#floatingInput").val()},
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
*/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

//deletes user
function deleteUser(e){
  if(confirm('Are you sure?')) {
   var answer = $(e).parent().parent().find("#username").html();  
    $.ajax({
      url:"userManagement.php",
      method: "POST",
      data: {username: answer},
      success: function(result){
       if(result == 1){
        window.location.reload(true);  
      }
      }
    });   
  }
}

//Changes the active link in navbar
$(function(){
  
    $("li#dash").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
  
});
