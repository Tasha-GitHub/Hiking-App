// ========== Begin google maps code ==========

// ---------- GLOBAL VARIABLES ----------
// variable to hold the navigator.geolocation coordinates
var userLocation;
var geoCoder;
var map;
var marker;
var service;
var infoWindow;

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
var availableTrails = $(".availableTrails");

// ---------- CLICKLISTENERS ----------

submitButton.on("click", function(e) {
    e.preventDefault();

    nearbyParksSearch();


});

$(".locationInput").on("submit", function(e) {
    e.preventDefault();
    console.log(".locationInput");

    return false;
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

function searchAddress() {

    var mapZipCode = $("#mapZipCode").val().trim();
    var streetBox = $("#inputstreet").val().trim();
    var cityBox = $("#inputcity").val().trim();
    var stateBox = $("#inputstate").val().trim();
    var zipBox = $("#inputzipcode").val().trim();

    addressInput = mapZipCode + streetBox + cityBox + stateBox + zipBox;

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: addressInput }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            var myResult = results[0].geometry.location;

            createMarker(myResult);

            map.setCenter(myResult);

            map.setZoom(17);
        }
    });

}

function nearbyParksSearch() {

    map = new google.maps.Map(document.getElementById("mapGoesHere"), {
        center: userLocation,
        zoom: 15
    });

    var request = {
        location: userLocation,
        radius: "5000",
        types: ["school"]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    //console.log(request);

}

function callback(results, status) {
    //console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i].place_id;
            createMarker(results[i]);
        }
    }
}

function createMarker(latlng) {
    console.log(latlng);

    if (marker != undefined && marker != '') {
        marker.setMap(null);
        marker = '';
    }

    marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
}

// this function is supposed to create a map
function initMap() {
    map = new google.maps.Map(document.getElementById('mapGoesHere'), {
        // center the map on the user's coordinates
        center: userLocation,
        // the level of zoom for the map. lower is further away. higher is closer to street level
        zoom: 12
    });

    createMarker(userLocation);
}

function createSideBar() {

    var createArray = ["street", "city", "state", "zipcode"];

    for (var i = 0; i < createArray.length; i++) {
        var form = $("<form>");
        availableTrails.append(form);

        var div = $("<div>");
        div.addClass('input-field');
        form.append(div);

        //var iClass = $("<i class='material-icons prefix'>search</i>");
        //div.append(iClass);

        var inputText = $("<input>");
        inputText.attr('type', 'text');
        inputText.attr('id', 'input' + createArray[i]);
        inputText.attr('placeholder', createArray[i]);
        inputText.addClass('validate locationInput');
        inputText.css('color', 'white');
        div.append(inputText);

        var label = $("<label>");
        label.attr("for", "input" + createArray[i]);
        div.append(label);

        div.append("<br>");
    }

}

// function to use on page start
function startUp() {
    getLocation();
    //createSideBar();
}

// ---------- STARTUP CODE ----------
startUp();
