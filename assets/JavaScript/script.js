console.log("link");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var keyword = urlParams.get("keyword");
console.log(keyword);
// ------------------ Page 1 ---------------------------

      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var keyword = urlParams.get("keyword");
      console.log(keyword);















// // ------------------- Page 2 ------------------------------
var map;
function initMap() {
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 8,
  });
}
