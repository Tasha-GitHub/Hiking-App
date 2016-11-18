var APIKey = "166a433c57516f51dfab1f7edaed8413";


var x = document.getElementById("dayForecast");
// var latitute = "";
// var longitude = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // latitute = position.coords.latitude;
        // longitude = position.coords.longitude;

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);

    $(document).ready(function() {
        var queryURLBase = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=" + APIKey;
        console.log("today: " + queryURLBase);

        $.ajax({
                url: queryURLBase,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                var forecast = $(".locationWeather").append("<div class=\"dayForecast\" ><h4>" + response.name + "</h4><p>Wind: " + response.wind.speed +
                    " MPH</p><p>Humidity: " + response.main.humidity +
                    " %</p><p>Pressure: " + response.main.pressure +
                    " PSI</p><p>Max Temp: " + response.main.temp_max +
                    " F</p><p>Min Temp: " + response.main.temp_min + " F</p></div>");
                var p = $(".locationWeather").append(forecast);

            });

        var queryURLBase = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=" + APIKey;
        console.log("forecast: " + queryURLBase);

        $.ajax({
                url: queryURLBase,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                var results = response.list;
                $(".dailyForecast").empty();
                for (var i = 2; i < 24; i++) {

                    var date = results[i].dt_txt;
                    var convertedDate = moment(new Date(date));
                    var day = moment(convertedDate).format("dddd");

                    var forecast = $(".locationForecast").append("<div class=\"dayForecast\" ><h4>" + day + "</h4><p>Wind: " + results[i].wind.speed +
                        " MPH</p><p>Humidity: " + results[i].main.humidity +
                        " %</p><p>Pressure: " + results[i].main.pressure +
                        " PSI</p><p>Max Temp: " + results[i].main.temp_max +
                        " F</p><p>Min Temp: " + results[i].main.temp_min + " F</p></div>");
                    var p = $(".locationForecast").append(forecast);
                    i = i + 7;

                }

            });
    });

}

getLocation();



// var queryURLBase = "http://api.openweathermap.org/data/2.5/weather?lat=" + 35 + "&lon=" + +"&units=imperial&appid=" + APIKey;

$("#weatherSubmitButton").on("click", function(event) {
    $(".locationWeather").remove();
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
    $(".locationForecast").remove();
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
