// ------------------ Page 1 ---------------------------

      /* var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var keyword = urlParams.get("keyword");
      //var sumbitBtn = $("#submit-btn");

      } */
      
//=============Radio button variables========================
var outdoorRadio = document.querySelector("#outdoor-areas");
var restaurantsRadio = document.querySelector("#restaurants");
var popularRadio = document.querySelector("#popular");
var eventsRadio = document.querySelector("#events");


/* outdoorRadio.addEventListener("click", function(event) {
  console.log("outdoor clicked")
})
restaurantsRadio.addEventListener("click", function (event){
  console.log("rest clicked")
})
popularRadio.addEventListener("click", function(event){
  console.log("popular clicked")
})

eventsRadio.addEventListener("click", function(event){
 console.log("events clicked");
}) */


function getRadioVal(form, name)   {
  var radioVal;
  //get list of radio buttons with specified name
  var radios = form.elements[name];
  //loop through list of radio buttons
  for (var i = 0, len=radios.length; i < len; i++);
  //are there any radios checked?
    if(radios[i].checked){ 
  //if yes, hold value in radioVal variable
    radioVal = radios[i].value; 
  //and break out of loop
    break;
  }
  //return value of checked radio or undefined if none checked
  return radioVal;
}

//getting value of selected radio button in radioForm 
var radioVal = getRadioVal(document.getElementById("radioForm"), "do-stuff");
alert (radioVal);

//refering to radioform to which onsubmit is attatched
document.getElementById("radioForm").onsubmit = function () {
  //do-stuff is the name of the radio button group
  var radioVal = getRadioVal(this, "do-stuff");

  alert(radioVal)
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
