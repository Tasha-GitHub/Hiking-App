//----------------------------------------------------------//
//                  open trails API controls                //
//----------------------------------------------------------//

// variable to build the ajax query
var queryURL;

// variable to hold the google map for the query results
var locationsMap;

// global variable to hold the response from the ajax call. global to be accessed by other javascript files.
var trails;

function openTrailsAPI(city) {
    //console.log(city.lat, city.lng);

    // test whether the request to openTrailsAPI is a city name (string) or latlng (object)
    // if request is city name or something else from the search box
    if (typeof city == "string") {
        queryURL = 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]=' + city + "&radius=25";
    }

    // if request is latlng object
    if (typeof city == "object") {
        queryURL = "https://trailapi-trailapi.p.mashape.com/?lat=" + city.lat + "&limit=25&lon=" + city.lng + "&radius=25";
    }

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

        // create map for markers 
        locationsMap = createMap({ lat: response.places[0].lat, lng: response.places[0].lon }, 10);

        //cleans up div and delets old entries 
        $(".availableTrails").empty();
        for (var i = 0; i < 10; i++) {
            //helps for-loop continue to run even if name of park does not exist
            if (response.places[i].name === undefined) {

            } else {
                //takes park name and inserts into div 
                var park = response.places[i].name;
                $(".availableTrails").append("<div class=\"trail\" data-name=\"" + park + "\" data-city=\"" + response.places[i].city + "\" data-state=\"" + response.places[i].state + "\"id=\"" + i + "\">" + "<p class=\"hvr-grow\">" + park + "</p></div>");

                // create markers
                var marker = new google.maps.Marker({
                    position: { lat: response.places[i].lat, lng: response.places[i].lon },
                    map: locationsMap,
                    title: response.places[i].name

                });

                // create infowindow
                var infowindow = new google.maps.InfoWindow;

                // create content for infowindow
                var content = createInfoWindows(response.places[i]);

                // create clicklistener for infowindow
                google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(locationsMap, marker);
                    };
                })(marker, content, infowindow));

                // stop loop if results ends before 10
                if (response.places[i + 1] === undefined) break;

            }

        }

        // save ajax response as global variable for access from other javascript code
        trails = response;

    });

};

// build contentString for the infoWindow
function createInfoWindows(park) {

    // contentString is the string that will be passed to the infowindow
    var contentString;

    // description is the description received from openTrailsAPI
    var description;

    // if name is present from openTrailsAPI add it to contentString
    if (park.name) {
        var name = park.name;
        var header = 
            
        name = "<br><p>" + name + "</p><br></div>";
        contentString = name;
    }

    return contentString;
}
