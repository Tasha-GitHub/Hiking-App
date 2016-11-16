// ---------- GLOBAL VARIABLES ----------

// variable to hold the navigator.geolocation coordinates
var userLocation;

// object containing google api 
var googleAPI = {
    urls: {
        search: "https://maps.googleapis.com/maps/api/js?"
    },
    apiKey: "&key=AIzaSyCNpDZ-opNGQ_O4Tj5Fh9JaymUItYJ60b8",
    callback: "&callback=", // initMap
}

// ---------- LOCATORS ----------
//the submit button
var submitButton = $("#submitButton");

// ---------- CLICKLISTENERS ----------
//https://maps.googleapis.com/maps/api/js?key=AIzaSyCNpDZ-opNGQ_O4Tj5Fh9JaymUItYJ60b8&callback=initMap"

submitButton.on("click", function(e) {
	e.preventDefault();

	getLocation();
	initMap();

	

})


/*$.ajax({
        url: googleAPI.urls.search + googleAPI.apiKey + googleAPI.callback + "initMap",
        type: "GET",
        dataType: "json",
    })
    .done(function(object) {
        console.log(object);
    });*/

// ---------- FUNCTIONS ----------

// function to use HTML5's navigator.geolocation interface
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            userLocation = pos;
            console.log(pos);
        });
    }
}

// this function is supposed to create a map
function initMap() {
    map = new google.maps.Map(document.getElementById('mapGoesHere'), {
        center: userLocation,
        zoom: 8
    });
}

// function to use on page start
function startUp() {
    getLocation();
}

// ---------- STARTUP CODE ----------
startUp();

/*
<!-- this script runs a function whenever it is loaded -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNpDZ-opNGQ_O4Tj5Fh9JaymUItYJ60b8&callback=initMap"
    async defer></script>*/
