var APIkey = "9d46100dbb5cee1b2ea56f80f9d14898"

var currentCity = "Seattle"

function getGeo() {
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + currentCity + "&limit=1&appid=" + APIkey
    fetch(geoUrl).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            var name = data[0].name
            getWeather(lat, lon, name);
        })
}

getGeo()

//make lis for all the different weather information in the categories
function getWeather(lat, lon, name) {
    var ocUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=alerts&appid=${APIkey}`
    fetch(ocUrl).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data)
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body")
            var cardTitle = $("<h3>").addClass("card-title").text(name)
            var ulEl = $("<ul>").addClass("list-group list-group-flush")
            var tempLi = $("<li>").addClass("list-group-item").text("Temp: " + data.current.temp)
            var humidityLi = $("<li>").addClass("list-group-item").text("Humidity: " + data.current.humidity)
            var windspeedLi = $("<li>").addClass("list-group-item").text("Wind Speed: " + data.current.wind_speed)
            var uviLi = $("<li>").addClass("list-group-item").text("UVI: " + data.current.uvi)
            $("#weatherMain").append(card.append(cardTitle, cardBody.append(ulEl.append(tempLi, humidityLi, windspeedLi, uviLi))))
            response.weather[0].icon
        })
}

// make list of previously searched cities
var searchHistoryList = function (cityName) {
    $('.past-search:contains("' + cityName + '")').remove();
    var searchHistory = $("<p>");
    searchHistory.addClass("past-search");
    searchHistory.text(cityName);
    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchHistory);
    var searchHistoryContainerEl = $("#search-history-container");
    searchHistoryContainerEl.append(searchEntryContainer);
    if (savedSearches.length > 0) {
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    $("#search-input").val("");

};

// load saved search history entries into search history container
var loadSearchHistory = function () {
    var savedSearchHistory = localStorage.getItem("savedSearches");

    // return false if there is no previous saved searches
    if (!savedSearchHistory) {
        return false;
    }
    savedSearchHistory = JSON.parse(savedSearchHistory);
    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};


var fiveDayForecastSection = function (cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);

                    // add 5 day forecast title
                    var futureForecastTitle = $("#future-forecast-title");
                    futureForecastTitle.text("5-Day Forecast:")
                    for (var i = 1; i <= 5; i++) {
                        var futureCard = $(".future-card");
                        futureCard.addClass("future-card-details");
                        var futureDate = $("#future-date-" + i);
                        date = moment().add(i, "d").format("M/D/YYYY");
                        futureDate.text(date);

                        // add icon to 5 day forecast
                        var futureIcon = $("#future-icon-" + i);
                        futureIcon.addClass("future-icon");
                        var futureIconCode = response.daily[i].weather[0].icon;
                        futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

                        // add temp to 5 day forecast
                        var futureTemp = $("#future-temp-" + i);
                        futureTemp.text("Temp: " + response.daily[i].temp.day + " \u00B0F");

                        // add humidity to 5 day forecast
                        var futureHumidity = $("#future-humidity-" + i);
                        futureHumidity.text("Humidity: " + response.daily[i].humidity + "%");
                    }
                })
        })
};


"weather"[
    {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10n"
    }
]

