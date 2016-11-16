
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// http://api.openweathermap.org/data/2.5/weather?q=austin&units=imperial&appid=166a433c57516f51dfab1f7edaed8413

$('#weatherSubmitButton').on('click', function() {
    var zip = $("#weatherZipCode").val();

    if(zip == $.isNumeric()){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
}
else{
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
}
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {

        console.log(queryURL);

        console.log(response);

        // Transfer content to HTML
        $('.city').html("<h1>" + response.name + " Weather</h1>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity);
        $(".temp_max").html("Maximum Temperature: " + response.main.temp_max);
        $(".temp_min").html("Minimum Temperature: " + response.main.temp_min);
        $(".visibility").html("Visibility: " + response.visibility);
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp_max);
        console.log("Temperature (F): " + response.main.temp_min);
        

    });
});