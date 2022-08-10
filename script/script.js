var APIkey="9d46100dbb5cee1b2ea56f80f9d14898"
//var ocUrl="https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=alerts&appid={API key}"
//var geoUrl="http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}"


var testCity="Seattle"

function getGeo(){
    var geoUrl="http://api.openweathermap.org/geo/1.0/direct?q="+testCity+"&limit=1&appid="+APIkey
    fetch(geoUrl).then(function (response){
    return response.json()
    })
    .then(function(data){
        console.log(data)
        var lat=data[0].lat
        var lon=data[0].lon
        var name=data[0].name
    getWeather(lat,lon,name);
    })
}

getGeo()

function getWeather(lat,lon,name){
    var ocUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=alerts&appid=${APIkey}`
    fetch(ocUrl).then(function (response){
        return response.json()
        })
        .then(function(data){
            console.log(data)
            var card=$("<div>").addClass("card");
            var cardBody=$("<div>").addClass("card-body")
            var cardTitle=$("<h3>").addClass("card-title").text(name)
            var ulEl=$("<ul>").addClass("list-group list-group-flush")
            var tempLi=$("<li>").addClass("list-group-item").text("temp:"+data.current.temp)
            var humidityLi=$("<li>").addClass("list-group-item").text("humidity:"+data.current.humidity)
            $("#weatherMain").append(card.append(cardTitle,cardBody.append(ulEl.append(tempLi))))
        })
}


//make lis for all different data like , humidity, wind speed, and UVI
//for 5 day forecast do a for loop
//  <ul class="list-group list-group-flush">
/* <li class="list-group-item">An item</li>
<li class="list-group-item">A second item</li>
<li class="list-group-item">A third item</li>
</ul> */