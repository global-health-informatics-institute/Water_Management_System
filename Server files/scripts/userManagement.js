setTimeout(function() {
  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
  });
}, 500);
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
          var answer = $(e).parent().parent().parent().find("#username").html();
          console.log(answer);
          //delete user
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

function editUser(e){
  $("#dialog-form").removeClass("visually-hidden");
  $( "#dialog-form" ).dialog({
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Edit": addUser,
        Cancel: function() {
          $(this).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        //allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = $("#dialog-form").find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
  var ID = $(e).parent().parent().parent().find("#theId").html();
  var form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      //allFields = $( [] ).add( name ).add( email ),
      tips = $( ".validateTips" );
    
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      if (valid) {
        $.ajax({
          url:"../views/userManagement.php",
          method: "POST",
          data: {uname: $("#name").val(), email: $("#email").val(), id:ID},
        beforeSend: function(e){
          $("#dialog-form").dialog( "close" );
          $("#myModal").removeClass("visually-hidden");
          },
          success: function(result){
            //once verified, the dashboard is shown when the window is reloaded
            if(result==1){
              window.location.reload(true);
              }
              else if(result == 2){
              window.location.reload(true);
              }
            else{
              //show the alert
              $("#myModal").addClass("visually-hidden");
              $("#badge").html(result);
              $("#badge").addClass("alert-danger");
              $("#badge").addClass("text-center");
              $("#badge").removeClass("visually-hidden");
              $("#dialog-form").dialog( "open" );
              }
            }
          });
      }
      return valid;
    }
    $("#dialog-form").on('keypress', function(e){
       if (e.which == 13) {
           addUser();
        }
    });
}

//Changes the active link in navbar
$(function(){
	
	//get background image
	$.ajax({
		url:"../resources/userManagement_service.php",
		method: "POST",
		data: {toggle: "1"},
		success: function(result){
		var myObj = JSON.parse(result);
		if(!myObj.url.trim()){
			console.log("string is empty");
		}else{
			$("body").css("background-image", "url(../" + myObj.url+ ")");
		}
		}
	});
  
    $("li#dash").find("a").addClass("active").css("background-color","#3375c4");
    $("li#home").find("a").removeClass("active");
    $("li#stats").find("a").removeClass("active");
    $("#thecard2").draggable();
    $("#thecard2").resizable();
    
    //show loading modal when link is clicked
    $("a").click(function(){
      $("#myModal").removeClass("visually-hidden");
    });
    //show tooltips on whole document
    $("#document").tooltip();
    $("#usersT").DataTable();
    
});
