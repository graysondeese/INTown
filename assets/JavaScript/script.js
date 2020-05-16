// ------------------ Page 1 ---------------------------
//stuff Jeff gave us
      /* var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var keyword = urlParams.get("keyword");
      //var sumbitBtn = $("#submit-btn");

      } */
      
//=============Radio button variables========================


var sumbitBtn = document.getElementById("submit-btn");

function submitButton (){
  var outdoorRadio = document.querySelector("#outdoor-areas");
  var restaurantsRadio = document.querySelector("#restaurants");
  var popularRadio = document.querySelector("#popular");
  var eventsRadio = document.querySelector("#events");

  if(outdoorRadio.checked == true || restaurantsRadio.checked == true || popularRadio.checked == true || eventsRadio.checked == true){
    alert("options are selected")
    loadResultsPage ();
  }else{
    alert("Please choose a Search Criteria.")
  }
  
}

function loadResultsPage(){


}






// // ------------------- Page 2 ------------------------------
var map;
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.7596, lng: -79.0193 },
    zoom: 8,
  });
}


