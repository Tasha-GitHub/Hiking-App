
//----------------------------------------------------------//
//                  open trails API controls                //
//----------------------------------------------------------//

var city;
//var city = "austin";
var queryURL;
var park;
var url;
//make response variable as globale 

var trails;


function openTrailsAPI(city){
    console.log("the city is "+ city)
    //city = googleMapsCity;
    queryURL = 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]='+ city;

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
    }).done(function(response){
        	console.log("openTrailsAPI trails", response);
            //cleans up div and delets old entries 
            $(".availableTrails").empty();
        	for(var i = 0; i < 10; i++){
                //helps for-loop continue to run even if name of park does not exist
                if(response.places[i].name === undefined){
                    console.log("no name")

                } else {
                    //takes park name and inserts into div 
                    park = response.places[i].name;
                    $(".availableTrails").append("<div class=\"trail\" data-name=\""+park+"\" id=\""+"item-"+i+"\">"+"<p class=\"hvr-grow\">"+park+"</p></div>");
                    if (response.places[i+1] === undefined) break;
                    console.log(response.places[i].name)
                }
        	   
        	}

            trails = response;


        });


};
//note to self, city must be stingified before it is fed into the open trials function
//openTrailsAPI("austin");

