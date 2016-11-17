var city = "austin";
var queryURL = 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]='+city;
var park;
var url;

$.ajax({
    url: queryURL, // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) { console.dir((data.source)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "xLa3MQj6eHmshOkWRkpAEiiNTzl0p1n6HbpjsnOvwImXNqnMfQ"); // Enter here your Mashape key
    }
}).done(function(response){
    	console.log(response.places[2].activities);
    	for(var i = 1; i<=5; i++){
    	park = response.places[i].name;
    	$(".availableTrails").append("<div class=\"trail\" data-name=\""+park+"\">"+"<p>"+park+"</p></div>");
    	}
    });

