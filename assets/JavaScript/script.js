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

//=============Submit button and checkboxes========================

function submitButton() {
  var urlParams = "?";

  for (i = 0; i < urlArray.length; i++) {
    var checkBox = document.querySelector("#" + urlArray[i]);
    //console.log(checkBox);
    if (checkBox.checked == true) {
      //adding string that got the id
      urlParams += urlArray[i] + "=true&";
    }
  }
  console.log(urlParams);
  //combining route of file with params--building URL
  window.location = "./assets/results.html" + urlParams;
  //console.log(location.href);
}

var submitBtn = document.getElementById("submit-btn");
if (submitBtn) {
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    submitButton();
    passValue();
  });
}

//selects card container on results page and determines which radio button was selected and should be displayed.
var cardContainer = document.getElementById("card-container");
if (cardContainer) {
  //loops through url array
  for (i = 0; i < urlArray.length; i++) {
    var param = urlArray[i];
    var paramIsTrue = checkIfParamIsTrue(param);
    if (paramIsTrue) {
    } else {
      //getElbyclassname grabs items from an array
      var cardWithClass = document.getElementsByClassName(param);
      //displays whichever options were selected
      cardWithClass[0].style.display = "none";
    }

    console.log(param, paramIsTrue);
  }
}
//================Map=====================
// to hold the map
var map;
//function for map
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 12,
    disableDefaultUI: true,
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
    getPlaces()
  }
}

// Get data from API
function getPlaces() {
  // Get neighborhood from local storage
  var neighborhood = localStorage.getItem("neighborhood")
  console.log(neighborhood)
  
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
      console.log(neighborhoodCoords);
    }
  }

  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "2000",
    type: ["restaurant", "bar"],
  }
  console.log("anything")
  service.nearbySearch(request, handleResults)
}

function handleResults(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    for(var i=0; i < results.length; i++) {
      console.log(results[i])
    }
  }
}


//==========Events/Ticketmaster API===============
function ticketMasterFunc() {
  var ticketMasterKey = "inHlvBLTGUTbsQyVFJkNPakSwfAWIMCa";
  var ticketMasterURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?city=charlotte&apikey=" +
    ticketMasterKey;

  $.ajax({
    url: ticketMasterURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var itemOne = $("#event-item-one").text(response._embedded.events[0].name)
    var itemTwo = $("#event-item-two").text(response._embedded.events[1].name);
    var itemThree = $("#event-item-three").text(response._embedded.events[2].name);
    var itemFour = $("#event-item-four").text(response._embedded.events[3].name);
    var itemFive = $("#event-item-five").text(response._embedded.events[4].name);
    var itemSix = $("#event-item-six").text(response._embedded.events[5].name);
    var itemSeven = $("#event-item-seven").text(response._embedded.events[6].name);
    var itemEight = $("#event-item-eight").text(response._embedded.events[7].name);
    var itemNine = $("#event-item-nine").text(response._embedded.events[8].name);
    var itemTen = $("#event-item-ten").text(response._embedded.events[9].name);

    

    $(eventsCard).append(itemOne);
    $(eventsCard).append(itemTwo);
    $(eventsCard).append(itemThree);
    $(eventsCard).append(itemFour); 
    $(eventsCard).append(itemFive); 
    $(eventsCard).append(itemSix); 
    $(eventsCard).append(itemSeven); 
    $(eventsCard).append(itemEight); 
    $(eventsCard).append(itemNine); 
    $(eventsCard).append(itemTen); 
  });
}
ticketMasterFunc();


