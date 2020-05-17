var neighborhoodCoords;
//passes selected neighborhood to results.html
function passValue() {
  var selectNeighborhood = document.getElementById("neighborhoods").value;
  localStorage.setItem("neighborhood", selectNeighborhood);
  return true;
}

// check url
var urlArray = ["outdoor-areas", "restaurants", "popular", "events"];
//takes a word, checks if its true returns true or false
function checkIfParamIsTrue(word) {
  var queryString = window.location.search;
  //console.log(queryString);
  var urlParams = new URLSearchParams(queryString);
  //console.log(urlParams);
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
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    submitButton();
  });
}

//function for map
var map;
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.223, lng: -80 },
    zoom: 12,
  });
}

//selects card container on results page and determines which radio button was selected and should be displayed.
var cardContainer = document.getElementById("card-container");
if (cardContainer) {
  for (i = 0; i < urlArray.length; i++) {
    var param = urlArray[i];
    var paramIsTrue = checkIfParamIsTrue(param);
    if (paramIsTrue) {
    } else {
      //getElbyclassname grabs items from an array
      var cardWithClass = document.getElementsByClassName(param);
      cardWithClass[0].style.display = "none";
    }

    console.log(param, paramIsTrue);
  }
}

// function to get selected neighborhood coordinates
function getCoordinates() {
  // assigns the selected neighborhood to a variable
  var userNeighborhood = localStorage.getItem("neighborhood");
  console.log(userNeighborhood);

  // api URL
  var queryURL =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    userNeighborhood +
    "&inputtype=textquery&fields=geometry&key=AIzaSyDqbk395bdiYQHD1PnoJDsWlcGBqUHw-1o";

  // call API
  $.ajax({
    url: queryURL,
    method: "GET",
    // console log response and save the coordinates to a variable
  }).then(function (response) {
    // console.log(response); <-- checking response
    neighborhoodCoords = response.candidates[0].geometry.location;
    // console.log(neighborhoodCoords);<-- testing for coords
  });
}

getCoordinates();
