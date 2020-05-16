// ------------------ Page 1 ---------------------------
var urlArray = ["outdoor-areas", "restaurants", "popular", "events"];
//takes a word, checks if its true returns true or false
function checkIfParamIsTrue(word) {
  var queryString = window.location.search;
  console.log(queryString);
  var urlParams = new URLSearchParams(queryString);
  console.log(urlParams);
  var keyword = urlParams.get(word);
  return keyword === "true";
  
}


//=============Submit button========================

function submitButton() {
  /* var outdoorRadio = document.querySelector("#outdoor-areas");
  var restaurantsRadio = document.querySelector("#restaurants");
  var popularRadio = document.querySelector("#popular");
  var eventsRadio = document.querySelector("#events"); */

  var urlParams = "?";

  for (i = 0; i < urlArray.length; i++) {
    var checkBox = document.querySelector("#" + urlArray[i]);
    if (checkBox.checked == true) {
      //adding string that got the id 
      urlParams += urlArray[i] + "=true&";
    }
  }
  console.log(urlParams);
  //combining route of file with params
  window.location = "./assets/results.html" + urlParams;
  console.log(location.href);
 
}

var submitBtn = document.getElementById("submit-btn");
if (submitBtn) {
  sumbitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    submitButton();
    
  });
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


//selects card container on results page and determines which radio button was selected and should be displayed.
var cardContainer = document.getElementById("card-container");
if (cardContainer) {
  for (i = 0; i < urlArray.length; i++) {
    var param = urlArray[i]
    var paramIsTrue = checkIfParamIsTrue(param);
    if(paramIsTrue){
      var cardWithClass = document.getElementsByClassName(param)
      cardWithClass[0].style.display = "none";
    }
    
    console.log(param, paramIsTrue)
}

  
}
