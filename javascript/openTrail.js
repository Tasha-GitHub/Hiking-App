
//----------------------------------------------------------//
//                  open trails API controls                //
//----------------------------------------------------------//

var city;
//var city = "austin";
var queryURL;
var park;
var url;


function openTrailsAPI(){
    console.log("the city is"+ city)
    city = googleMapsCity;
    queryURL = 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]='+ city;

    //need to add click event to trigger api call
    $.ajax({
        url: queryURL, // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {},
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "xLa3MQj6eHmshOkWRkpAEiiNTzl0p1n6HbpjsnOvwImXNqnMfQ"); // Enter here your Mashape key
        }
    }).done(function(response){
        	//console.log(response.places[2].activities);
        	for(var i = 1; i<=5; i++){
        	park = response.places[i].name;
        	$(".availableTrails").append("<div class=\"trail\" data-name=\""+park+"\" id=\""+"item-"+i+"\">"+"<p>"+park+"</p></div>");
        	}
        });


};

//----------------------------------------------------------//
//           index.html scroll controls                     //
//----------------------------------------------------------//


$("#map").on("click", scrollMapWin);

function scrollMapWin(event) {
    event.preventDefault();

    window.scrollTo(0, 1300);
    
}


$("#forecast").on("click", scrollForecastWin);

function scrollForecastWin(event) {
    event.preventDefault();

    window.scrollTo(0, 650);
    
}