// ========== Begin google maps code ==========

// ---------- GLOBAL VARIABLES ----------
// variable to hold the navigator.geolocation coordinates
var userLocation;
var geoCoder;
var map;
var marker;
var service;
var infoWindow;
var mapZipCode;

// variable for the city based on the zipcode
var googleMapsCity;

// ========== URLS and QUERY TERMS ==========
// not sure what this one is used for yet. I think to create a map
var searchURL = "https://maps.googleapis.com/maps/api/js?";

// this invokes the distance-matrix Google API
var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

// this url invokes the geocoding Google API
var geocodingURL = "https://maps.googleapis.com/maps/api/geocode/json?";

//this url is for google text searches
var textURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

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

var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&place_id=ChIJBeV_R9xMW4YRq9GzR-xx_q8&key=AIzaSyCNpDZ-opNGQ_O4Tj5Fh9JaymUItYJ60b8";

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

    searchAddress();


});

$(".locationInput").on("submit", function(e) {
    e.preventDefault();
    console.log(".locationInput");

    return false;
});


// clicklistener for the trail names
$(document).on("click", ".trail", getTrail);

// ---------- FUNCTIONS ----------

// function to use HTML5's navigator.geolocation interface to find current coordinates and create map

// this function gets the name of the trail clicked on
function getTrail() {
    var trailName = $(this).data("name");
    console.log(trailName);
    googleMapsTextSearch(trailName);
}

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

    mapZipCode = $("#mapZipCode").val().trim();
    //var streetBox = $("#inputstreet").val().trim();
    //var cityBox = $("#inputcity").val().trim();
    //var stateBox = $("#inputstate").val().trim();
    //var zipBox = $("#inputzipcode").val().trim();

    addressInput = mapZipCode;

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: addressInput }, function(results, status) {
        console.log(results);

        if (status == google.maps.GeocoderStatus.OK) {

            var myResult = results[0].formatted_address;
            var pos = myResult.indexOf(",");
            googleMapsCity = myResult.substr(0, pos).toLowerCase();
        }
    });

}

function nearbyParksSearch() {

    var request = {
        location: userLocation,
        // defines the distance in meters
        radius: "1000",
        types: [mapZipCode]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

}

function callback(results, status) {
    console.log(results);
    var locations = [];

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var location = [results[i].name, results[i].geometry.location.lat(), results[i].geometry.location.lng()];
            locations.push(location);
            //console.log(place);
        }

        createMarker(locations);
    }
}

function createMarker(results) {
    //console.log(results);

var pos = {lat: results[0][1], lng: results[0][2] };

    map = new google.maps.Map(document.getElementById("mapGoesHere"), {
        center: pos,
        zoom: 15
    });

    for (var i = 0; i < results.length; i++) {

        var pos = {lat: results[i][1], lng: results[i][2] };
        console.log(pos);
        var name = results[i][0];
        console.log(name);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading">' + name + '</h4' +
            '<div id="bodyContent">' +
            '<p><b>' + name + '</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
            '(last visited June 22, 2009).</p>' +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker = new google.maps.Marker({
            position: pos,
            map: map
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }
}

// this function is supposed to create a map
function initMap() {
    map = new google.maps.Map(document.getElementById('mapGoesHere'), {
        // center the map on the user's coordinates
        center: userLocation,
        // the level of zoom for the map. lower is further away. higher is closer to street level
        zoom: 10
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

function googleMapsTextSearch(searchTerm) {

    var request = {
        query: searchTerm
    }

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);


}

// function to use on page start
function startUp() {
    getLocation();
    //createSideBar();
}

// ---------- STARTUP CODE ----------
startUp();
