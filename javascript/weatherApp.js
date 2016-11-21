var APIKey = "1e1c93d157bd7be6";

var x = document.getElementById("dayForecast");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $(document).ready(function() {
        //======================GET LOCATION NAME FROM LAT AND LONG================================================================
        var queryURLBase = "https://api.wunderground.com/api/" + APIKey + "/geolookup/q/" + position.coords.latitude + "," + position.coords.longitude + ".json";

        $.ajax({
                url: queryURLBase,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                console.log("LAT LONG CITY: " + response.location.city);
                city = response.location.city;
                // ================================================================================
                var c = $("#cityName").text(response.location.city);
                // ================================================================================

                console.log(response.location.city);
                var queryURLT = "https://api.wunderground.com/api/" + APIKey + "/forecast/q/" + response.location.city + "zmw:94125.1.99999.json";

                //get weather of the place found by lat and long

                $.ajax({
                    url: queryURLT,
                    method: 'GET'
                })

                .done(function(response) {
                    console.log("URL current city: " + queryURLT);
                    console.log("current city JSON: " + response);
                    $(".locationWeather").empty();


                    var avgtemp;
                    for (var i = 0; i < 1; i++) {
                        //calculate avg temperature
                        a = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
                        avgtemp = a / 2;
                        console.log(response.forecast.simpleforecast.forecastday[i].high.fahrenheit, response.forecast.simpleforecast.forecastday[i].low.fahrenheit);

                        //display weather conditions

                        var forecast = $(".locationWeather").append("<div class=\"todayForecast\" ><p><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                            "</h5></p><p><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                            "</b></h6></p><p><h4>" + avgtemp +
                            "<sup>o</sup>F</h4></p><p><h6>" + response.forecast.txt_forecast.forecastday[i].fcttext +
                            " </h6></p></div>");

                        var p = $(".locationWeather").append(forecast);


                        $("#demo").append("<img id =\"weatherIcon\" width =40px heigth= 50px src=" + response.forecast.simpleforecast.forecastday[i].icon_url + ">");


                    }
                });


                // ====================================Forecast from lat and long ============================================================================


                var queryURLF = "https://api.wunderground.com/api/" + APIKey + "/forecast10day/q/" + response.location.city + "zmw:94125.1.99999.json";

                $.ajax({
                    url: queryURLF,
                    method: 'GET'
                })

                .done(function(response) {
                    console.log("URL current city Forecast:" + queryURLF);
                    console.log("current city JSON Forecast: " + response.forecast);
                    $(".locationForecast").empty();

                    var avgtempforecast = [];

                    for (var i = 0; i < 5; i++) {
                        console.log(response.forecast.simpleforecast.forecastday[i].high.fahrenheit, response.forecast.simpleforecast.forecastday[i].low.fahrenheit);
                        var a = [];
                        a[i] = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
                        avgtempforecast[i] = a[i] / 2;

                        console.log("AVG TEMP : " + avgtempforecast[i]);
                        console.log("a: " + a[i]);

                        var forecast = $(".locationForecast").append("<div class=\"todayForecast\" ><p><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                            "</h5></p><p><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                            "</b></h6></p><p><h4>" + avgtempforecast[i] +
                            "<sup>o</sup>F</h4></p><img id =\"weatherIcon\" width =30px heigth= 40px src=" + response.forecast.simpleforecast.forecastday[i].icon_url +
                            "><p><h6>" + response.forecast.simpleforecast.forecastday[i].conditions +
                            " </h6></p><p>Humid " + response.forecast.simpleforecast.forecastday[i].avehumidity +
                            " %</p><p>H: " + response.forecast.simpleforecast.forecastday[i].high.fahrenheit +
                            " <sup>o</sup>F</p>" + " " + "<p>L: " + response.forecast.simpleforecast.forecastday[i].low.fahrenheit + " <sup>o</sup>F</p></div>");
                        var p = $(".locationForecast").append(forecast);


                    }
                });
            });
    });

}
getLocation();

// ================================================weather of different location===================================
$("#weatherSubmitButton").on("click", function(event) {
    //remove the location based weather before displaying the search query weather
    $(".locationWeather").remove();
    //     $
    event.preventDefault();
    var zipOrCity = $("#weatherZipCode").val();


    var queryURLB = "https://api.wunderground.com/api/" + APIKey + "/forecast/q/" + zipOrCity + "zmw:94125.1.99999.json";
    console.log(queryURLB);


    $.ajax({
        url: queryURLB,
        method: 'GET'
    })

    .done(function(response) {
        console.log(queryURLB);
        console.log(response);
        $(".todaysWeather").empty();

        var avgtemp;
        for (var i = 0; i < 1; i++) {
            //calculate avg temperature
            var a = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
            avgtemp = a / 2;
            console.log(response.forecast.simpleforecast.forecastday[i].high.fahrenheit, response.forecast.simpleforecast.forecastday[i].low.fahrenheit);

            //display weather conditions
            var forecast = $(".todaysWeather").append("<div class=\"todayForecast\" ><p><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                "</h5></p><p><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                "</b></h6></p><p><h4>" + avgtemp +
                "<sup>o</sup>F</h4></p><p><h6>" + response.forecast.txt_forecast.forecastday[i].fcttext +
                " </h6></p></div>");
            var p = $(".todaysWeather").append(forecast);

            $("#demo").append("<img id =\"weatherIcon\" width =40px heigth= 50px src=" + response.forecast.simpleforecast.forecastday[i].icon_url + ">");
        }
    });
});


$("#weatherForecastButton").on("click", function(event) {
    $(".locationForecast").remove();
    event.preventDefault();
    var zipOrCity = $("#weatherZipCode").val();
        var queryURL = "https://api.wunderground.com/api/" + APIKey + "/forecast10day/q/" + zipOrCity + "zmw:94125.1.99999.json";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {
        console.log(queryURL);
        console.log("CURRENT: " + response);

        $(".dailyForecast").empty();
        var avgtempforecast = [];
        for (var i = 0; i < 5; i++) {
            var a = [];
            a[i] = (parseInt(response.forecast.simpleforecast.forecastday[i].high.fahrenheit) + parseInt(response.forecast.simpleforecast.forecastday[i].low.fahrenheit));
            avgtempforecast[i] = a[i] / 2;

            // console.log("AVG TEMP : "+ avgtempforecast[i]);
            // console.log("a: "+ a[i]);

            var forecast = $(".dailyForecast").append("<div class=\"todayForecast\" ><p><h5>" + response.forecast.simpleforecast.forecastday[i].date.weekday +
                "</h5></p><p><h6><b>" + response.forecast.simpleforecast.forecastday[i].date.monthname + " " + response.forecast.simpleforecast.forecastday[i].date.day +
                "</b></h6></p><p><h4>" + avgtempforecast[i] +
                "<sup>o</sup>F</h4></p><img id =\"weatherIcon\" width =30px heigth= 40px src=" + response.forecast.simpleforecast.forecastday[i].icon_url +
                "><p><h6>" + response.forecast.simpleforecast.forecastday[i].conditions +
                " </h6></p><p>Humid " + response.forecast.simpleforecast.forecastday[i].avehumidity +
                "  %</p><p>H: " + response.forecast.simpleforecast.forecastday[i].high.fahrenheit +
                " <sup>o</sup>F</p>" + " " + "<p>L: " + response.forecast.simpleforecast.forecastday[i].low.fahrenheit + " <sup>o</sup>F</p></div>");
            var p = $(".dailyForecast").append(forecast);

        }
    });



});
