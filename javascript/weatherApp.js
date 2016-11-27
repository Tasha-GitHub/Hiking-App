// ==========================================       WEATHERUNDERGROUND API      =====================================================

//APIKey for weatherUnderground
var APIKey = "1e1c93d157bd7be6";

//Gets users current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
        // $(".locationWeather").text("Please enable location to get Weather");
    }
}

function showPosition(position) {
    $(document).ready(function() {
        //------------------------------------------GET LOCATION NAME FROM LAT AND LONG------------------------------------------------------
        var queryURLBase = "https://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + position.coords.latitude + "," + position.coords.longitude + ".json";

        //Ajax call to get user location
        $.ajax({
                url: queryURLBase,
                method: 'GET',
                data: {}, // Additional parameters here
                dataType: 'json',
                success: function(data) {},

            })
            .done(function(response) {

                // console.log(response);
                // console.log("LAT LONG CITY: " + response.location.city);
                // console.log(response.location.city);

                // -------------------------------------------------------- Gets Current Weather for the location ------------------------------------------------ 
                var queryURLT = "https://api.wunderground.com/api/" + APIKey + "/conditions/q/" + response.location.state + "/" + response.location.city + ".json";

                //get weather of the place found by lat and long
                $.ajax({
                    url: queryURLT,
                    method: 'GET',
                    data: {}, // Additional parameters here
                    dataType: 'json',
                    success: function(data) {},

                })

                .done(function(response) {
                    // console.log("URL current city: " + queryURLT);
                    // console.log("current city JSON: " + response);
                    // console.log(response.forecast.simpleforecast.forecastday[i].high.fahrenheit, response.forecast.simpleforecast.forecastday[i].low.fahrenheit);

                    //display weather conditions
                    var forecast = $(".locationWeather").append("<div class=\"todayForecast\" ><p id=\"cityName\" font-size = 24px>" + response.current_observation.display_location.full +
                        "</p><p>" + response.current_observation.observation_time +
                        "</p><p><img  src=" + response.current_observation.icon_url +
                        "></p><p>" + response.current_observation.weather +
                        "</p><p id=\"temp\">" + response.current_observation.temperature_string + "<p>Feels like " + response.current_observation.feelslike_string +
                        "</p><p>Wind " + response.current_observation.wind_string + "</p></div>");

                    var p = $(".locationWeather").append(forecast);

                    $("#cityName").css("font-size", "28px");
                    $("#temp").css("font-size", "24px");
                    $(".locationWeather").css("line-height", "25px");
                    $("#weatherIcon").css("width", "70px");
                    $("#weatherIcon").css("height", "70px");


                });


                //-------------------------------5 day forecast for current Position ----------------------------------------------------------------
                var queryURLF = "https://api.wunderground.com/api/" + APIKey + "/forecast10day/q/" + response.location.city + "/zmw:94125.1.99999.json";

                $.ajax({
                    url: queryURLF,
                    method: 'GET',
                    data: {}, // Additional parameters here
                    dataType: 'json',
                    success: function(data) {},

                })

                .done(function(response) {
                    // console.log("URL current city Forecast:" + queryURLF);
                    // console.log("current city JSON Forecast: " + response.forecast);
                    $(".locationForecast").empty();
                    var avgtempforecast = [];
                    for (var i = 0; i < 5; i++) {
                        // console.log(response.forecast.simpleforecast.forecastday[i].high.fahrenheit, response.forecast.simpleforecast.forecastday[i].low.fahrenheit);
                        var a = [];
                        a[i] = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
                        avgtempforecast[i] = a[i] / 2;

                        // console.log("AVG TEMP : " + avgtempforecast[i]);
                        // console.log("a: " + a[i]);

                        var forecast = $(".locationForecast").append("<div class=\"todayForecast\" ><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                            "</h5><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                            "</b></h6><h4>" + avgtempforecast[i] +
                            "<sup>o</sup>F</h4><img id =\"weatherIcon\"  src=" + response.forecast.simpleforecast.forecastday[i].icon_url +
                            "><h6>" + response.forecast.simpleforecast.forecastday[i].conditions +
                            " </h6><p>Humid " + response.forecast.simpleforecast.forecastday[i].avehumidity +
                            " %</p><p>H: " + response.forecast.simpleforecast.forecastday[i].high.fahrenheit +
                            " <sup>o</sup>F</p>" + " " + "<p>L: " + response.forecast.simpleforecast.forecastday[i].low.fahrenheit + " <sup>o</sup>F</p></div>");
                        var p = $(".locationForecast").append(forecast);
                    }
                });
            });
    });

}
// ----------------------------------------------------END OF ShowPosition()----------------------------------------------------------------

getLocation();

//-----------------------------------------------------------------------------------------------------------------------//
//                                               5 day Forecast Based on User search  
//-----------------------------------------------------------------------------------------------------------------------//
$("#weatherForecastButton").on("click", function(event) {
    //prevents the occurence of default action
    event.preventDefault();
    //removes the previous data to display new data
    $(".locationForecast").remove();
    //hides the warning 
    $(".inputWarning").hide();
    //gets user input value
    var zipOrCity = $("#weatherZipCode").val();
    //formulate the query base on user input
    var queryURL = "https://api.wunderground.com/api/" + APIKey + "/forecast10day/q/" + zipOrCity + ".json";
    //ajax call to fetch data
    $.ajax({
            url: queryURL,
            method: 'GET',
            data: {}, // Additional parameters here
            dataType: 'json'
        })
        .done(function(response) {
            $(".dailyForecast").empty();
            // console.log(queryURL);

            // if the user input does not match any city
            if (response.response.results) {
                // console.log("Its a state");
                $(".inputWarning").show();
                // console.log(response.response.results[0].city, response.response.results[0].state);
            }

            if (response.response.error) {
                // console.log("ERROR: " + error);
                // console.log(response.response.error.description);
                $(".inputWarning").show();
            }

            //gets average weather 
            var avgtempforecast = [];
            for (var i = 0; i < 5; i++) {
                var a = [];
                a[i] = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
                avgtempforecast[i] = a[i] / 2;
                // console.log("AVG TEMP : "+ avgtempforecast[i]);
                // console.log("a: "+ a[i]);

                //create a div and display data
                var forecast = $(".dailyForecast").append("<div class=\"todayForecast\" ><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                    "</h5><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                    "</b></h6><h4>" + avgtempforecast[i] +
                    "<sup>o</sup>F</h4><img id =\"weatherIcon\" src=" + response.forecast.simpleforecast.forecastday[i].icon_url +
                    "><h6>" + response.forecast.simpleforecast.forecastday[i].conditions +
                    " </h6><p>Humid " + response.forecast.simpleforecast.forecastday[i].avehumidity +
                    "  %</p><p>H: " + response.forecast.simpleforecast.forecastday[i].high.fahrenheit +
                    " <sup>o</sup>F</p>" + " " + "<p>L: " + response.forecast.simpleforecast.forecastday[i].low.fahrenheit + " <sup>o</sup>F</p></div>");
                var p = $(".dailyForecast").append(forecast);
            }

        });

});


// =============================================================END OF WeatherApp.js =======================================================================================================

