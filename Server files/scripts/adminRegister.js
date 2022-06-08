//toggle button state
document.getElementById("register").addEventListener('click', event => setTimeout(() => event.target.disabled = true, 0));

function close1(){
  console.log("close1");
  $(document).ready(()=>{
    $(".btn-close").parent("div#e1").remove();
    });
}
function close2(){
  console.log("close2");
  $(document).ready(()=>{
    $(".btn-close").parent("div#e2").remove();
    });
}
function close3(){
  console.log("close3");
  $(document).ready(()=>{
    $(".btn-close").parent("div#e3").remove();
    });
}
function close4(){
  console.log("close4");
  $(document).ready(()=>{
    $(".btn-close").parent("div#e4").remove();
    });
}
function close5(){
  console.log("close4");
  $(document).ready(()=>{
    $(".btn-close").parent("div#e5").remove();
    });
}

function close6(){
  window.history.back();
  
  }
