// ---------- GLOBAL VARIABLES ----------
// variable to hold the navigator.geolocation coordinates
var userLocation;

// ========== URLS and QUERY TERMS ==========
// not sure what this one is used for yet. I think to create a map
var searchURL = "https://maps.googleapis.com/maps/api/js?";

// this invokes the distance-matrix Google API
var distanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    /*
    Geocoding is the process of converting addresses (like "1600 Amphitheatre Parkway, Mountain View, CA") into geographic coordinates (like latitude 37.423021 and longitude -122.083739), which you can use to place markers on a map, or position the map.
    */

    /*
    The process of doing the opposite, translating a location on the map into a human-readable address, is known as reverse geocoding.
    */

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
    
    //required
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
    var pagetoken = "&pagetoken=";


// object containing google api 




    geoCoding: {

        parameters: {
            // required address or components
            
            /*
            The street address that you want to geocode, in the format used by the national postal service of the country concerned. Additional address elements such as business names and unit, suite or floor numbers should be avoided.
            */
            
        }
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
// ================================================
var APIKey = "166a433c57516f51dfab1f7edaed8413";

$('#submitButton').on('click', function() {
    var zip = $("#zipCode").val();
    var queryURLBase = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + APIKey;
    console.log(queryURLBase);

    $.ajax({
        url: queryURLBase,
        method: 'GET'
    })

    .done(function(response) {

        console.log(queryURLBase);

        console.log(response);

        // Transfer content to HTML
        $('.city').html("<h1>" + response.name + " Weather</h1>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity);
        $(".temp").html("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });
});
// =========================================================
