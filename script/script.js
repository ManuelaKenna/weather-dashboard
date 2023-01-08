var APIkey = "9d46100dbb5cee1b2ea56f80f9d14898"

// var currentCity = "Seattle"
// var search = searchInput.value.trim();


var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function(event)  {
    event.preventDefault();
    console.log("button clicked");
    var searchInput = document.querySelector('#search-input').value
    console.log(searchInput);
    getGeo(searchInput)
})

function getGeo(currentCity) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + currentCity + "&limit=1&appid=" + APIkey
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




// function handleFormSubmit() {
//     preventDefault();
//     if (searchInput.value == "" || search.value == "") {
//         $("#alert").text("Please select a city");
//         return;
//     } else {
//         $("#alert").empty();
//     };

// }

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
            // response.weather[0].icon
            createForecastCards(data.daily)
        })
}

function createForecastCards (dailyWeather) {
    console.log(dailyWeather)
    for (var i = 1; i < 6; i++) {
        var formattedDate = new Date(dailyWeather[i].dt*1000).toDateString().split(' ')[0]
        console.log(formattedDate)
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body")
        var cardTitle = $("<h3>").addClass("card-title").text(formattedDate)
        var ulEl = $("<ul>").addClass("list-group list-group-flush")
        var tempLi = $("<li>").addClass("list-group-item").text("Temp: " + dailyWeather[i].temp.day)
        var humidityLi = $("<li>").addClass("list-group-item").text("Humidity: " + dailyWeather[i].humidity)
        var windspeedLi = $("<li>").addClass("list-group-item").text("Wind Speed: " + dailyWeather[i].wind_speed)
        var uviLi = $("<li>").addClass("list-group-item").text("UVI: " + dailyWeather[i].uvi)
        $("#forecast-box").append(card.append(cardBody.append(cardTitle, ulEl.append(tempLi, humidityLi, uviLi, windspeedLi))))
    }
}

