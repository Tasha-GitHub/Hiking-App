
var APIKey = "166a433c57516f51dfab1f7edaed8413";

$("#weatherSubmitButton").on("click", function(event) {
    event.preventDefault();
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
        $(".city").html("<h3>" + response.name + " Weather</h3>");
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

$("#weatherForecastButton").on("click", function(event) {
    event.preventDefault();
    var zip = $("#zipCode").val();
    if (zip == $.isNumeric()) {

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
    } else {

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + zip + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
    }
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {

        // console.log(queryURL);
        console.log("response");
        console.log(response.city.name);
        $(".city").html("<h3>" + response.city.name + " Weather</h3>");

        var results = response.list;
        $(".dailyForecast").empty();
        for (var i = 2; i < 40; i++) {
            var date = results[i].dt_txt;
            var forecast = $(".dailyForecast").append("<div class=\"dayForecast\" ><h6>Date: " + results[i].dt_txt + "</h6><p>Wind Speed: " + results[i].wind.speed +
                "</p><p>Humidity: " + results[i].main.humidity +
                "</p><p>Pressure: " + results[i].main.pressure +
                "</p><p>Max Temperature: " + results[i].main.temp_max +
                "</p><p>Min Temperature: " + results[i].main.temp_min + "</p></div>");
            var p = $(".dailyForecast").append(forecast);


            i = i + 7;

        }
    });
});
