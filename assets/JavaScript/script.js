//get user neighborhood
function passValue() {
  var selectNeighborhood = document.getElementById("neighborhoods").value;
  localStorage.setItem("neighborhood", selectNeighborhood);
  return true;
}

// assigns the selected neighborhood to a variable
var userNeighborhood = localStorage.getItem("neighborhood");
console.log(userNeighborhood);

//function for map
var map;
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 8,
  });
}
