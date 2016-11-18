var APIKey = "166a433c57516f51dfab1f7edaed8413";
console.log("test: "+ window.userLocation);

// var queryURLBase = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139

$("#weatherSubmitButton").on("click", function(event) {
    event.preventDefault();
    var zipOrCity = $("#weatherZipCode").val();

    if (zipOrCity == $.isNumeric()) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipOrCity + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
    } else {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + zipOrCity + "&units=imperial&appid=" + APIKey;
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
        $(".city").html("<h3>" + response.name + " </h3>");
        $(".wind").html("<p>Wind Speed: " + response.wind.speed + " MPH</p>");
        $(".humidity").html("<p>Humidity: " + response.main.humidity + " %</p>");
        $(".temp_max").html("<p>Max Temp: " + response.main.temp_max + " F</p>");
        $(".temp_min").html("<p>Min Temp: " + response.main.temp_min + " F</p>");
        $(".visibility").html("<p>Visibility: " + response.visibility + " mi</p>");
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp_max);
        console.log("Temperature (F): " + response.main.temp_min);


    });
});

$("#weatherForecastButton").on("click", function(event) {
    event.preventDefault();
    var zipOrCity = $("#weatherZipCode").val();

    if (zipOrCity == $.isNumeric()) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipOrCity + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
    } else {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + zipOrCity + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
    }
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {

        // console.log(queryURL);
        // console.log("response");
        console.log(response.city.name);
        // $(".city").html("<h3>" + response.city.name + " Weather</h3>");

        var results = response.list;
        $(".dailyForecast").empty();
        for (var i = 2; i < 24; i++) {

            var date = results[i].dt_txt;
            var convertedDate = moment(new Date(date));
            var day = moment(convertedDate).format("dddd");

            var forecast = $(".dailyForecast").append("<div class=\"dayForecast\" ><h4>" + day + "</h4><p>Wind: " + results[i].wind.speed +
                " MPH</p><p>Humidity: " + results[i].main.humidity +
                " %</p><p>Pressure: " + results[i].main.pressure +
                " PSI</p><p>Max Temp: " + results[i].main.temp_max +
                " F</p><p>Min Temp: " + results[i].main.temp_min + " F</p></div>");
            var p = $(".dailyForecast").append(forecast);
            i = i + 7;

        }
    });
});
