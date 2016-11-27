// ---------- GLOBAL VARIABLES ----------
// variable to hold the navigator.geolocation coordinates
var userLocation;

// variable for google api geocoding
var geocoder;

// variable for google api map
var map;

// variable for google api marker
var marker;

// variable for google service api
var service;

// variable for google infowindow
var infowindow;

// variable to hold the value of #mapZipCode text input field
var mapZipCode;

// variable to hold the city name from the reverse google geocode
var cityName;

// variable to hold the city based on the zipcode inputted by the user in #mapZipCode text input field
var googleMapsCity;

// variable to hold lat, lng coordinates of userInput
var latLng;

// variable to pass details from openTrailsAPI to google marker
var clickedTrail;

// ---------- LOCATORS ----------
//the submit button
var submitButton = $("#submitButton");
var availableTrails = $(".availableTrails");
var mapSearch = $("#mapZipCode");

// ---------- CLICKLISTENERS ----------

// clicklistener for the main submit button in the map section
submitButton.on("click", function(e) {
    e.preventDefault();

    var searchTerm = getMapSearchTerm();

    // if there is no input in text field, load a map of the user's current location
    if (searchTerm.length === 0) {
        initMap(userLocation);

        // if there is input in the text field, load a map showing the result of the user's text
        // include multiple marker's on the map for each location in sidebar
        // have the map center on the zipcode of the search, but have the map populated with markers    
    } else {
        // on button click run google geocode search
        searchAddress(searchTerm);
    }

});

// clicklistener for the trail names populated by openTrailsAPI
$(document).on("click", ".trail", getTrail);

// ========== FUNCTIONS ==========

// this function gets the name of the openAPI generated trail and passes it to a googleMapsTextSearch
// on button click, create marker for specific button clicked.
function getTrail() {

    // get id of element clicked. will correspond to trails array
    var trailId = $(this).attr("id");

    // shorthand to trails array specific trail
    var trail = trails.places[trailId];

    // create map using trails array
    map = createMap({ lat: trail.lat, lng: trail.lon }, 12);

    // create marker using trails array
    marker = new google.maps.Marker({
        position: { lat: trail.lat, lng: trail.lon },
        map: map,
        title: trail.name
    });

    // create content for infowindow
    var contentString = createInfoWindowContent(trail);

    // create infowindow
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // set clicklistener on marker to open infowindow on click
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

}

// GET LATITUDE AND LONGITUDE ON PAGE STARTUP
// this function uses HTML5 navigator.geolocation to generate a latlng
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
    }
}

// success function for navigator.geolocator
function getPositionSuccess(success) {
    userLocation = {
        lat: success.coords.latitude,
        lng: success.coords.longitude
    };

    alertify.success("Thank you for letting Ranger know your location.");

    // run initial search for parks around the user's location. based on geolocator
    searchAddress(userLocation);
}

// error function for navigator.geolocator
function getPositionError(error) {
    alertify.error("Please allow Ranger to know your location.");
    console.log(error);
}

// options for navigator.geolocation.getCurrentPosition
var getPositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

// performs search through Google API
function searchAddress(searchTerm) {

    // user Google geocode to find more complete address information from user's input
    geocoder = new google.maps.Geocoder();

    // if searchTerm is a string geoCode
    if (typeof searchTerm == "string") {

        geocoder.geocode({ address: searchTerm }, function(results, status) {
            //console.log("geocode string results", results);

            // if geocode was successful
            if (status == google.maps.GeocoderStatus.OK) {

                // local variables
                var position = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                // run openTrailsAPI()
                openTrailsAPI(position);

            }
            // if geocode was not successful, console log error and attempt
            else console.log("geocode was not successful.", status);
        });

    }

    // if searchTerm is an object, reverse geocode. Used primarily on startup of webpage
    if (typeof searchTerm == "object") {

        openTrailsAPI(searchTerm);

    }

    // if geocode was not successful, console log error and attempt
    else console.log("geocode was not successful.", status);
}

// this function creates a google map
function createMap(pos, zoom) {

    map = new google.maps.Map(document.getElementById("mapGoesHere"), {

        center: pos,
        zoom: zoom,
        scrollwheel: false,
        zoomControl: false

    });

    return map;
}

// this function creates a map at the user's current location
function initMap(position) {

    createMap(position, 10);

    var contentString = '<p id="firstHeading" class="firstHeading"><em>' + "You are here!" + '</em></p>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    createSoloMarker(userLocation, map, infowindow);
}

function createSoloMarker(pos, map, infowindow) {

    marker = new google.maps.Marker({
        position: pos,
        map: map
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

}

// get the search term in the map text input field
function getMapSearchTerm() {
    var searchTerm = mapSearch.val();
    mapSearch.val("");
    return searchTerm;
}

// build contentString for the infoWindow
function createInfoWindowContent(trailObject) {

    // contentString is the string that will be passed to the infowindow
    var contentString;

    // description is the description received from openTrailsAPI
    var description;

    // if name is present from openTrailsAPI add it to contentString
    if (trailObject.name) {
        var name = trailObject.name;
        name = "<h5><em>" + name + "</em></h5>";
        contentString = name;
    }

    // first search to see if the activities array is present in the return from the openTrailsAPI. This avoids undefined errors
    if (trailObject.activities[0]) {

        // if thumbnail image is present from openTrailsAPI add it to contentString
        if (trailObject.activities[0].thumbnail) {
            var picture = trailObject.activities[0].thumbnail;
            picture = "<img src='" + picture + "' alt='thumbnail' class='trailImage'><br>";
            contentString += picture;
        }

        // if activity_type is present from openTrailsAPI add it to contentString
        if (trailObject.activities[0].activity_type_name) {
            var activity_type = trailObject.activities[0].activity_type_name;
            activity_type = "<br><p class='activityType'><b>Type: </b>" + activity_type + "</p><br>";
            contentString += activity_type;
        }
    }

    // if activity_type is present from openTrailsAPI add it to contentString.
    if (trailObject.description) {
        description = trailObject.description;
        description = "<p><b>Description:</b></p><p class='trailDescription'>" + description + "</p><br>";
        contentString += description;
    } else if (trailObject.activities[0]) {
        if (trailObject.activities[0].description) {
            description = trailObject.activities[0].description;
            description = "<p><b>Description:</b></p><p class='trailDescription'>" + description + "</p><br>";
            contentString += description;
        }
    }

    // if directiosn is present from openTrailsAPI add it to the contentString
    if (trailObject.directions) {
        var directions = trailObject.directions;
        directions = "<p><b>Directions:</b></p><p class='trailDirections'>" + directions + "</p><br>";
        contentString += directions;
    }

    // add rating if present in the openTrailsAPI
    if (trailObject.activities[0]) {
        if (trailObject.activities[0].rating) {
            var rating = trailObject.activities[0].rating;
            rating = "<p class='trailRating'><b>Rating: </b>" + rating + "</p><br>";
            contentString += rating;
        }
    }

    return contentString;
}

// function to use on page start
function startUp() {
    getLocation();

}

// ---------- STARTUP CODE ----------
startUp();
