// Object for neighborhoods
var neighborhoods = [
  {
    title: "Barclay Downs",
    coords: { lat: 35.1627482, lng: -80.8541635 },
  },
  {
    title: "Uptown",
    coords: { lat: 35.2058895, lng: -80.8602408 },
  },
  {
    title: "South End",
    coords: { lat: 35.2125569, lng: -80.867532 },
  },
  {
    title: "North Davidson",
    coords: { lat: 35.2482123, lng: -80.8106876 },
  },
  {
    title: "Plaza Midwood",
    coords: { lat: 35.2261962, lng: -80.8123889 },
  },
  {
    title: "Dilworth",
    coords: { lat: 35.2058895, lng: -80.8602408 },
  },
  {
    title: "Cotswold",
    coords: { lat: 35.1827687, lng: -80.8039828 },
  },
  {
    title: "Oakhurst",
    coords: { lat: 35.1923152, lng: -80.7866842 },
  },
  {
    title: "Myers Park",
    coords: { lat: 35.182864, lng: -80.8449514 },
  },
  {
    title: "Montford",
    coords: { lat: 35.1684221, lng: -80.8581215 },
  },
  {
    title: "Eastover",
    coords: { lat: 35.1936622, lng: -80.8283562 },
  },
  {
    title: "Elizabeth",
    coords: { lat: 35.2121982, lng: -80.8299537 },
  },
  {
    title: "Chantilly",
    coords: { lat: 35.2115244, lng: -80.8170717 },
  },
  {
    title: "First Ward",
    coords: { lat: 35.2260366, lng: -80.8444644 },
  },
  {
    title: "Fourth Ward",
    coords: { lat: 35.2346569, lng: -80.8539655 },
  },
  {
    title: "Greenville",
    coords: { lat: 35.2428535, lng: -80.8522108 },
  },
];

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
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood");
  console.log(neighborhood);
  var neighborhoodCoords;

  // Iterate through the object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      neighborhoodCoords = neighborhoods[i].coords;
      console.log(neighborhoodCoords);
    }
  }

  neighborhoodMarker(neighborhoodCoords);

  function neighborhoodMarker() {
    var marker = new google.maps.Marker({
      position: neighborhoodCoords,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    map.panTo(neighborhoodCoords);
    map.setZoom(15);
  }
}
