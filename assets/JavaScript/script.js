// Object for neighborhoods
var neighborhoods = [
  {
    title: "Barclay Downs",
    coords: { lat: 35.161352, lng: -80.838031 },
  },
  {
    title: "South End",
    coords: { lat: 35.2125569, lng: -80.8588 },
  },
  {
    title: "North Davidson",
    coords: { lat: 35.2482123, lng: -80.8018 },
  },
  {
    title: "Plaza Midwood",
    coords: { lat: 35.2239, lng: -80.8018 },
  },
  {
    title: "Dilworth",
    coords: { lat: 35.2058895, lng: -80.8516 },
  },
  {
    title: "Cotswold",
    coords: { lat: 35.1849, lng: -80.7907 },
  },
  {
    title: "Oakhurst",
    coords: { lat: 35.1914, lng: -80.7771 },
  },
  {
    title: "Myers Park",
    coords: { lat: 35.1797, lng: -80.8262 },
  },
  {
    title: "Montford",
    coords: { lat: 35.1744, lng: -80.8502 },
  },
  {
    title: "Eastover",
    coords: { lat: 35.1924, lng: -80.8184 },
  },
  {
    title: "Elizabeth",
    coords: { lat: 35.2142, lng: -80.8184 },
  },
  {
    title: "Chantilly",
    coords: { lat: 35.2115244, lng: -80.8087 },
  },
  {
    title: "First Ward",
    coords: { lat: 35.2264, lng: -80.835 },
  },
  {
    title: "Fourth Ward",
    coords: { lat: 35.231, lng: -80.8419 },
  },
  {
    title: "Greenville",
    coords: { lat: 35.2419, lng: -80.8422 },
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
    console.log(checkBox)
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
    passValue()
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
    // add marker
    var marker = new google.maps.Marker({
      position: neighborhoodCoords,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    // zoom and pan to marker
    map.panTo(neighborhoodCoords);
    map.setZoom(15);
  }
}
