//----------------------------------------------------------//
//                  open trails API controls                //
//----------------------------------------------------------//

var city;
//var city = "austin";
var queryURL;
var park;
var parkLoc;
var url;
var locationsMap;
//make response variable as globale 

var trails;


function openTrailsAPI(city) {
    console.log("the city is " + city)
        //city = googleMapsCity;
    queryURL = 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]=' + city;

    //ajax call 
    $.ajax({
        url: queryURL, // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {},
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "xLa3MQj6eHmshOkWRkpAEiiNTzl0p1n6HbpjsnOvwImXNqnMfQ"); // Mashape key
        }
    }).done(function(response) {
        console.log("openTrailsAPI trails", response);

        // create map for markers 
        locationsMap = createMap({ lat: response.places[0].lat, lng: response.places[0].lon }, 10);

        //cleans up div and delets old entries 
        $(".availableTrails").empty();
        for (var i = 0; i < 10; i++) {
            //helps for-loop continue to run even if name of park does not exist
            if (response.places[i].name === undefined) {
                console.log("no name")

            } else {
                //takes park name and inserts into div 
                park = response.places[i].name;
                $(".availableTrails").append("<div class=\"trail\" data-name=\"" + park + "\" id=\"" + "item-" + i + "\">" + "<p class=\"hvr-grow\">" + park + "</p></div>");
                console.log(response.places[i].name);

                // create infowindows
                var infoWindow = createInfoWindows(response.places[i]);

                // create markers
                var marker = new google.maps.Marker({
                    position: { lat: response.places[i].lat, lng: response.places[i].lon },
                    map: locationsMap,
                    title: response.places[i].name

                });

                marker.addListener('click', function() {
                    infoWindow.open(locationsMap, marker);
                });


                // stop loop if results ends before 10
                if (response.places[i + 1] === undefined) break;

            }

        }

        // generate map around all results


        // generate infowindows for all results

        // generate markers for all results


        trails = response;


    });


};
//note to self, city must be stingified before it is fed into the open trials function in order to work
//openTrailsAPI("austin");

// build contentString for the infoWindow
function createInfoWindows(park) {

    // contentString is the string that will be passed to the infowindow
    var contentString;

    // description is the description received from openTrailsAPI
    var description;

    // if name is present from openTrailsAPI add it to contentString
    if (park.name) {
        var name = park.name;
        name = "<h5><em>" + name + "</em></h5>";
        contentString += name;
    }

    // first search to see if the activities array is present in the return from the openTrailsAPI. This avoids undefined errors
    if (park.activities[0]) {

        // if thumbnail image is present from openTrailsAPI add it to contentString
        if (park.activities[0].thumbnail) {
            var picture = park.activities[0].thumbnail;
            picture = "<img src='" + picture + "' alt='thumbnail' class='trailImage'><br>";
            contentString += picture;
        }

        // if activity_type is present from openTrailsAPI add it to contentString
        if (park.activities[0].activity_type_name) {
            var activity_type = park.activities[0].activity_type_name;
            activity_type = "<br><p class='activityType'><b>Type: </b>" + activity_type + "</p><br>";
            contentString += activity_type;
        }
    }

    // if activity_type is present from openTrailsAPI add it to contentString.
    if (park.description) {
        console.log(park.description);
        description = park.description;
        description = "<p><b>Description:</b></p><p class='trailDescription'>" + description + "</p><br>";
        contentString += description;
    } else if (park.activities[0]) {
        if (park.activities[0].description) {
            description = park.activities[0].description;
            description = "<p><b>Description:</b></p><p class='trailDescription'>" + description + "</p><br>";
            contentString += description;
        }
    }

    // if directiosn is present from openTrailsAPI add it to the contentString
    if (park.directions) {
        var directions = park.directions;
        directions = "<p><b>Directions:</b></p><p class='trailDirections'>" + directions + "</p><br>";
        contentString += directions;
    }

    // add rating if present in the openTrailsAPI
    if (park.activities[0]) {
        if (park.activities[0].rating) {
            var rating = park.activities[0].rating;
            rating = "<p class='trailRating'><b>Rating: </b>" + rating + "</p><br>";
            contentString += rating;
        }
    }

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    return infowindow;
}
