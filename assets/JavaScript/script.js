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

// to hold the map
var map;
//function for map
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 12,
  });

  // Object for neighborhoods
  var neighborhoods = [
    {
      title: "Barclay Downs",
      coords: { lat: 35.1627, lng: -80.8541 },
    },
  ];

  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood");
  console.log(neighborhood);
  var neighborhoodCoords;

  // Iterate through the object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected title
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      neighborhoodCoords = neighborhoods[i].coords;
      console.log(neighborhoodCoords);
    }
  }

  panToNeighborhood(neighborhoodCoords);

  function panToNeighborhood() {
    var marker = new google.maps.Marker({
      position: neighborhoodCoords,
      map: map,
      animation: google.maps.Animation.DROP,
    });
  }
}
