// ========== Begin google maps code ==========

// ---------- GLOBAL VARIABLES ----------
// variable to hold the navigator.geolocation coordinates
var userLocation;

// ========== URLS and QUERY TERMS ==========
// not sure what this one is used for yet. I think to create a map
var searchURL = "https://maps.googleapis.com/maps/api/js?";

// this invokes the distance-matrix Google API
var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

// this url invokes the geocoding Google API
var geocodingURL = "https://maps.googleapis.com/maps/api/geocode/json?";

// address is required
var addressTag = "&address=";
var componentsTag = "&components=";
var boundsTag = "&bounds=";
var languageTag = "&language=";
var regionTag = "&region=";
var latlngTag = "&latlng";
var place_idTag = "&place_id";
var result_typeTag = "&result_type";
var location_typeTag = "&location_type";

var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

// locationTag is required for placesURL search
var locationTag = "&location=";
// one or the other
var radiusTag = "&radius=";
var rankbyDistanceTag = "&rankby=distance";
//optional
var keywordTag = "&keyword=";
// &language=
var minpriceTag = "&minprice=";
var maxpriceTag = "&maxprice=";
var nameTag = "&name=";
var opennowTag = "&opennow=";
var rankbyTag = "&rankby=";
var typeTag = "&type=";
var pagetokenTag = "&pagetoken=";

// commmon tags to each google api
var keyTag = "&key=AIzaSyCNpDZ-opNGQ_O4Tj5Fh9JaymUItYJ60b8";
var callbackTag = "&callback="; // initMap

// ---------- LOCATORS ----------
//the submit button
var submitButton = $("#submitButton");

// ---------- CLICKLISTENERS ----------

submitButton.on("click", function(e) {
    e.preventDefault();

    // run request to Google Nearby places api on button click
    nearbyPlaces();

    // run map with user's coordinates
    initMap();
})

// ---------- FUNCTIONS ----------

// function to use HTML5's navigator.geolocation interface to find current coordinates and create map
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // save the user's location in a global variable
            userLocation = pos;
            console.log(pos);
        });
    }
}

function nearbyPlaces() {

    $.ajax({
        url: placesURL + keyTag + locationTag + userLocation.lat + "," + userLocation.lng,
        type: 'GET',
        dataType: 'json'

    })
    .done(function(placesObject) {
        console.log(placesObject);
    });
    
}

// attempt at making a CORS request


// this function is supposed to create a map
function initMap() {
    map = new google.maps.Map(document.getElementById('mapGoesHere'), {
        // center the map on the user's coordinates
        center: userLocation,
        // the level of zoom for the map. lower is further away. higher is closer to street level
        zoom: 12
    });

    // marker puts an icon on the map
    var marker = new google.maps.Marker({
        // position places the marker at the designated place
        position: userLocation,
        map: map
    });
}

// function to use on page start
function startUp() {
    getLocation();
}

// ---------- STARTUP CODE ----------
startUp();



