

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//deletes user
function deleteUser(e){
  $( "#dialog-confirm" ).removeClass("visually-hidden");
  //prompt user when they click delete icon
  $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        Delete: function() {
          var answer = $(e).parent().parent().find("#username").html();
          console.log(answer);
          //delete user
          $("#myModal").removeClass("visually-hidden");
          $.ajax({
            url:"../views/userManagement.php",
            method: "POST",
            data: {username: answer},
            beforeSend: function(e){
            //close old dialogue
            $("#dialog-confirm").dialog( "close" );
            //show spinner
            $("#myModal").removeClass("visually-hidden");
            },
            success: function(result){
             if(result == 1){
               //hide spinner
               $("#myModal").addClass("visually-hidden");
               $("#dialog-message").removeClass("visually-hidden");
               $( "#dialog-message" ).dialog({
                modal: true,
                buttons: {
                  Ok: function() {
                    $(this).dialog( "close" );
                    $("#myModal").removeClass("visually-hidden");
                    window.location.reload(true);
                  }
                }
              });
            }
            }
          });
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
    
}

//Changes the active link in navbar
$(function(){
    $("li#dash").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
    $("#thecard2").draggable();
    $("#thecard2").resizable();
    $(".trash").hover(function(){
      $(this).addClass("fas");
      $(this).removeClass("fal");
    },function(){
      $(this).addClass("fal");
      $(this).removeClass("fas");
    });
    $("a").click(function(){
      $("#myModal").removeClass("visually-hidden");
    });
    $("#document").tooltip();
    
});
