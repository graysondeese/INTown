console.log("link");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var keyword = urlParams.get("keyword");
console.log(keyword);