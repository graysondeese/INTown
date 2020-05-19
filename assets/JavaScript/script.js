// Object for neighborhoods
var neighborhoods = [
  {
    title: "Barclay Downs",
    coords: { lat: 35.161352, lng: -80.838031 },
  },
  {
    title: "Belmont",
    coords: {lat: 35.228643, lng: -80.822258 },
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

// For submitBtn
function submitBtn() {
  var submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      passValue();
    });
  }
}

// Hide the cards by default
$(".card").hide()

//================Map=====================
// to hold the map
var map;
//function for map
function initMap() {
  // Disable default street stuff
  var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];
  
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 12,
    disableDefaultUI: true,
    styles: myStyles
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

var outdoorMarkers = []
var popularMarkers = []
var restaurantMarkers = []

//===== Function to display cars ======
function displayEventsCard() {
  $(".events-card").show()
}

function displayOutdoorCard() {
  $(".outdoor-areas-card").show()
}

function displayPopularCard() {
  $(".popular-card").show()
}

function displayRestaurantCard(){
  $(".restaurant-card").show()
}

// Check if restaurant box is checked
function restaurantCheck(){ 
  var restaurantCheck = document.getElementById("restaurants").checked
  if(restaurantCheck == true) {
    getRestaurants()
  } else {
    clearRestaurantMarkers()
  }
}
// Get restaurant data from API
function getRestaurants() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["restaurant"],
  }
  service.nearbySearch(request, handleResults)

  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var restaurantsCard = $("card-section-four");
        var rItemOne = $("#restaurant-item-one").text(results[0].name);
        $(restaurantsCard).append(rItemOne);
        var rItemTwo = $("#restaurant-item-two").text(results[1].name);
        $(restaurantsCard).append(rItemTwo);
        var rItemThree = $("#restaurant-item-three").text(results[2].name);
        $(restaurantsCard).append(rItemThree);
        var rItemFour = $("#restaurant-item-four").text(results[3].name);
        $(restaurantsCard).append(rItemFour);
        var rItemFive = $("#restaurant-item-five").text(results[4].name);
        $(restaurantsCard).append(rItemFive);
        var rItemSix = $("#restaurant-item-six").text(results[5].name);
        $(restaurantsCard).append(rItemSix);
        var rItemSeven = $("#restaurant-item-seven").text(results[6].name);
        $(restaurantsCard).append(rItemSeven);
        var rItemEight = $("#restaurant-item-eight").text(results[7].name);
        $(restaurantsCard).append(rItemEight);
        var rItemNine = $("#restaurant-item-nine").text(results[8].name);
        $(restaurantsCard).append(rItemNine);
        var rItemTen = $("#restaurant-item-ten").text(results[9].name);
        $(restaurantsCard).append(rItemTen);
      }
   }
  }
  
  function addMarker(results) {
    var marker = new google.maps.Marker({
      position: results.geometry.location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon : "https://img.icons8.com/ios-glyphs/30/000000/restaurant.png"
    })
    restaurantMarkers.push(marker)
  }
  
}

// Check if popular is checked
function popularCheck() {
  var popularCheck = document.getElementById("popular").checked
  if(popularCheck == true) {
    getPopular()
  }
}

// Get popular places data 
function getPopular() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["aquarium", "art-gallery", "shopping-mall", "tourist-attraction", "movie-theater", "stadium", "night-club"],
  }
  service.nearbySearch(request, handleResults)

  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var popularCard = $("card-section-three");
        var rItemOne = $("#popular-item-one").text(results[0].name);
        $(popularCard).append(rItemOne);
        var rItemTwo = $("#popular-item-two").text(results[1].name);
        $(popularCard).append(rItemTwo);
        var rItemThree = $("#popular-item-three").text(results[2].name);
        $(popularCard).append(rItemThree);
        var rItemFour = $("#popular-item-four").text(results[3].name);
        $(popularCard).append(rItemFour);
        var rItemFive = $("#popular-item-five").text(results[4].name);
        $(popularCard).append(rItemFive);
        var rItemSix = $("#popular-item-six").text(results[5].name);
        $(popularCard).append(rItemSix);
        var rItemSeven = $("#popular-item-seven").text(results[6].name);
        $(popularCard).append(rItemSeven);
        var rItemEight = $("#popular-item-eight").text(results[7].name);
        $(popularCard).append(rItemEight);
        var rItemNine = $("#popular-item-nine").text(results[8].name);
        $(popularCard).append(rItemNine);
        var rItemTen = $("#popular-item-ten").text(results[9].name);
        $(popularCard).append(rItemTen);
      }
   }
  }
  
  function addMarker(results) {
    var marker = new google.maps.Marker({
      position: results.geometry.location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: "https://img.icons8.com/color/48/000000/popular-topic.png"
    })
    popularMarkers.push(marker)
  }
}

// Check if popular is checked
function popularCheck() {
  var popularCheck = document.getElementById("popular").checked
  if(popularCheck == true) {
    getPopular()
  } else {
    clearPopularMarkers()
  }
}

//Check if restaurants is checked
function restaurantCheck() {
  var restaurantCheck = document.getElementById("restaurants").checked
  if(restaurantCheck == true) {
    getRestaurants()
  } else {
    clearRestaurantMarkers()
  }
}

// Check if outdoors is checked
function outdoorCheck() {
  var outdoorCheck = document.getElementById("outdoor-areas").checked
  if(outdoorCheck == true) {
    getOutdoor()
  } else {
    clearOutdoorMarkers()
  }
}

// Get outdoor areas data
function getOutdoor() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["park"],
  }
  service.nearbySearch(request, handleResults)
  
  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var outdoorCard = $("card-section-two");
        var rItemOne = $("#outdoor-item-one").text(results[0].name);
        $(outdoorCard).append(rItemOne);
        var rItemTwo = $("#outdoor-item-two").text(results[1].name);
        $(outdoorCard).append(rItemTwo);
        var rItemThree = $("#outdoor-item-three").text(results[2].name);
        $(outdoorCard).append(rItemThree);
        var rItemFour = $("#outdoor-item-four").text(results[3].name);
        $(outdoorCard).append(rItemFour);
        var rItemFive = $("#outdoor-item-five").text(results[4].name);
        $(outdoorCard).append(rItemFive);
        var rItemSix = $("#outdoor-item-six").text(results[5].name);
        $(outdoorCard).append(rItemSix);
        var rItemSeven = $("#outdoor-item-seven").text(results[6].name);
        $(outdoorCard).append(rItemSeven);
        var rItemEight = $("#outdoor-item-eight").text(results[7].name);
        $(outdoorCard).append(rItemEight);
        var rItemNine = $("#outdoor-item-nine").text(results[8].name);
        $(outdoorCard).append(rItemNine);
        var rItemTen = $("#outdoor-item-ten").text(results[9].name);
        $(outdoorCard).append(rItemTen);
      }
   }
  }
  
  var icon = {
    url: "https://img.icons8.com/pastel-glyph/64/000000/tree.png",
    scaledSize: new google.maps.Size(50,50),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0)
  }
  
  function addMarker(results) {
      var marker = new google.maps.Marker({
        position: results.geometry.location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon
    })
    outdoorMarkers.push(marker)
    }
}

function setMapOnAll(arr, map) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setMap(map);
  }
}

function clearOutdoorMarkers() {
  setMapOnAll(outdoorMarkers, null)
  outdoorMarkers = []
}

function clearPopularMarkers() {
  setMapOnAll(popularMarkers, null)
  popularMarkers = []
}

function clearRestaurantMarkers() {
  setMapOnAll(restaurantMarkers, null)
  restaurantMarkers = []
}

//==========Events/Ticketmaster API===============
function ticketMasterFunc() {
  console.log("hello");

  var ticketMasterKey = "inHlvBLTGUTbsQyVFJkNPakSwfAWIMCa";
  var ticketMasterURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?city=charlotte&apikey=" +
    ticketMasterKey;

  $.ajax({
    url: ticketMasterURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
   
    
    var itemOne = $("<a>").attr("href", response._embedded.events[0].url).text(response._embedded.events[0].name);
    var itemTwo = $("<a>").attr("href", response._embedded.events[1].url).text(response._embedded.events[1].name);
    var itemThree = $("<a>").attr("href", response._embedded.events[2].url).text(response._embedded.events[2].name);
    var itemFour = $("<a>").attr("href", response._embedded.events[3].url).text(response._embedded.events[3].name);
    var itemFive = $("<a>").attr("href", response._embedded.events[4].url).text(response._embedded.events[4].name);
    var itemSix = $("<a>").attr("href", response._embedded.events[5].url).text(response._embedded.events[5].name);
    var itemSeven = $("<a>").attr("href", response._embedded.events[6].url).text(response._embedded.events[6].name);
    var itemEight = $("<a>").attr("href", response._embedded.events[7].url).text(response._embedded.events[7].name);
    var itemNine = $("<a>").attr("href", response._embedded.events[8].url).text(response._embedded.events[8].name);
    var itemTen = $("<a>").attr("href", response._embedded.events[9].url).text(response._embedded.events[9].name);


    $("#event-item-one").append(itemOne);
    $("#event-item-two").append(itemTwo);
    $("#event-item-three").append(itemThree);
    $("#event-item-four").append(itemFour); 
    $("#event-item-five").append(itemFive); 
    $("#event-item-six").append(itemSix); 
    $("#event-item-seven").append(itemSeven); 
    $("#event-item-eight").append(itemEight); 
    $("#event-item-nine").append(itemNine); 
    $("#event-item-ten").append(itemTen); 
  });
}
ticketMasterFunc();

// Search box description function //
var descriptions = [
  {
    neighborhood: 'Barclay Downs',
    description: 'Barclay Downs is a neighborhood in Charlotte, North Carolina with a population of 4,891. Living in Barclay Downs offers residents an urban suburban mix feel and most residents own their homes. In Barclay Downs there are a lot of restaurants, coffee shops, and parks. Many young professionals live in this neighborhood and residents tend to lean conservative. The public schools in Barclay Downs are highly rated.'
  },
  {
    neighborhood: 'Belmont',
    description: 'Located north of Uptown Charlotte – just outside of the I-277 loop, the Belmont Community is a thriving neighborhood with friendly neighbors and quaint bungalows that offer wrap-around front porches and skyline views of Center City.'
  },
  {
    neighborhood: 'Cotswold',
    description: 'The Cotswold neighborhood of Charlotte, North Carolina, United States, most likely taking its name from the large shopping center, Cotswold Village Shops, is located at the intersection of Randolph and Sharon Amity Roads. Originally known as Cotswold Mall, it was one of Charlotte\'s first suburban malls.'
  },
  {
    neighborhood: 'Dilworth',
    description: 'Tree-lined streets run through Dilworth, a quaint area with a laid-back, global restaurant scene. Kenilworth Commons and Park Square retail plazas have specialty food and clothes shops, while interior design stores and boutiques dot the area. Freedom Park is popular for its lake and walking trails, and the Discovery Place Nature museum nearby is home to animals and a planetarium.'
  },
  {
    neighborhood: 'Eastover',
    description: 'Eastover is a town in North Carolina with a population of 3,697. Eastover is in Cumberland County. Living in Eastover offers residents a suburban rural mix feel and most residents own their homes. Many retirees live in Eastover and residents tend to have moderate political views. The public schools in Eastover are highly rated.'
  },
  {
    neighborhood: 'Elizabeth',
    description: 'Elizabeth is a relaxed, mostly residential area with bakeries, ice-cream shops and neighborhood bars, plus lively dining options including popular Latin and upscale American restaurants. A streetcar line runs from Uptown along Elizabeth Avenue, where the Visulite Theatre features touring and local indie bands. Independence Park contains picnic areas, a rose garden, walking trails and a reflecting pool.'
  },
  {
    neighborhood: 'First Ward',
    description: 'Part of Uptown Charlotte, First Ward contains the bustling 7th Street Public Market with its specialty food shops, and the Levine Museum of the New South, highlighting post-Civil War Southern history. The Blumenthal Performing Arts center stages symphony, opera and theater, while outdoor concerts are hosted at First Ward Park. The city\'s NBA basketball team plays at the Spectrum Center.'
  },
  {
    neighborhood: 'Fourth Ward',
    description: 'Uptown’s Fourth Ward has charming, walkable streets with cozy restaurants, casual brewpubs and burger spots. The AvidXchange Music Factory complex contains low-key bars and a comedy club, as well as the Fillmore music venue, host to big-name bands. Interactive educational exhibits and an IMAX theater are highlights at the Discovery Place Science museum, while Fourth Ward Park offers peaceful gardens and pathways.'
  },
  {
    neighborhood: 'Greenville',
    description: 'Greenville is a neighborhood in Charlotte, North Carolina with a population of 738. Greenville is in Mecklenburg County. Living in Greenville offers residents a sparse urban feel and most residents own their homes. In Greenville there are a lot of bars, restaurants, coffee shops, and parks.'
  },
  {
    neighborhood: 'Montford',
    description: 'Back in the 1950s, Montford was primarily a residential area known for hosting the city\'s first open-air shopping center. Half a century later, folks still visit Montford for that shopping center — but the neighborhood is now also known as one of Charlotte\'s go-to dining and nightlife destinations.'
  },
  {
    neighborhood: 'North Davidson',
    description: 'NoDa, short for North Davidson, is the city’s arts and entertainment district. It\'s known for its eclectic galleries and music venues, including the Neighborhood Theatre, host to big-name acts, and intimate spots like the Evening Muse. Artisan gift shops, jewelry stores and tattoo parlors dot North Davidson Street. Local eats include Southern fare, Cajun cuisine and pizza, and there are a number of hip dive bars.'
  },
  {
    neighborhood: 'Oakhurst',
    description: 'Oakhurst is a neighborhood in Charlotte, North Carolina with a population of 2,506. Oakhurst is in Mecklenburg County and is one of the best places to live in North Carolina. Living in Oakhurst offers residents a dense suburban feel and most residents rent their homes. In Oakhurst there are a lot of bars and restaurants. Many young professionals live in Oakhurst and residents tend to lean liberal. The public schools in Oakhurst are above average.'
  },
  {
    neighborhood: 'Plaza Midwood',
    description: 'Plaza Midwood is a trendy, laid-back neighborhood known for its nightlife, with plenty of low-key dive bars and intimate music venues like Snug Harbor. There’s also a vibrant restaurant scene featuring comfort food eateries, barbecue joints, gastropubs and several popular ice-cream shops. Stores sell everything from consignment and vintage clothing to records and locally made artisan goods and jewelry.'
  },
  {
    neighborhood: 'South End',
    description: 'The lively South End is known for its vibrant nightlife, with a number of craft breweries and laid-back pubs, plus buzzy restaurants serving elevated American and global cuisines. In an 1800s mill building, the Atherton Mill and Market has chic artisan shops, while the surrounding area is home to a number of fine art galleries. The Charlotte Rail Trail is popular with runners and cyclists.'
  },
  {
    neighborhood: 'Myers Park',
    description: 'Myers Park is an affluent area with high-end boutiques, gourmet grocery stores and chic restaurants, especially on Selwyn Avenue. An international art collection is on display at Mint Museum Randolph, and the Discovery Place Nature museum has live animal exhibits. The Booty Loop cycling trail runs through the heart of the neighborhood, and the Wing Haven Garden and Bird Sanctuary features rose and herb gardens.'
  }
];

$('#neighborhoods').on('change', function (event) {
  for (var i = 0; i < descriptions.length; i++) {
    var value = event.target.value;
    if (value === descriptions[i].neighborhood) {
      $('#description-text').text(descriptions[i].description);
    }
  }
});