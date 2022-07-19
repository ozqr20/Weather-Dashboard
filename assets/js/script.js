var cities = []
var InputSearchEl = document.querySelector("#input-search");
var cityEl = document.querySelector("#city");
var historySerchEl = document.querySelector("#history-search-btns");
var currentWeatherEl = document.querySelector("#current-weather");
var searchedCityEl = document.querySelector("#searched-city");
var weatherContainerEl = document.querySelector("#weather-container-now");
var fiveDaysEl = document.querySelector("#five-days");
var forecastEl = document.querySelector("#forecast");
var displayFiveEl = document.querySelector("#display-fivedays")

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}


var cityWeather = function(city){
    var apiKey = "1767dcfe210ef96ad104c047ad61f1bb";
    var apiUrl =  ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey);

    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                getWeather(data,city);
            });
        }else{
            alert("Error");
        }   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var getWeather = function(weather, city){
    weatherContainerEl.textContent = "";
    searchedCityEl.textContent = city;

    var date = document.createElement("span");
    date.textContent = "(" + moment(weather.dt.value).add(1, "days").calendar() + ")";
    searchedCityEl.appendChild(date);

    var icon = document.createElement("img");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    searchedCityEl.appendChild(icon);

    var wind = document.createElement("span");
    wind.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    wind.classList = "list-group-item";
    searchedCityEl.appendChild(wind);

    var temp = document.createElement("span");
    temp.textContent = "Temperature: " + weather.main.temp + "ºF";
    temp.classList = "list-group-item";
    //temp = Math.round(temp((-273.15*1.8)+32));
    searchedCityEl.appendChild(temp);

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item";
    searchedCityEl.appendChild(humidity);

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    //getUv(lon,lat)
} 

var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityEl.value.trim();
    if(city){
        cityWeather(city);
    } else {
        alert("Enter a city");
    }
    saveSearch();
} 

InputSearchEl.addEventListener("submit",formSubmitHandler);
//cityWeather("Chicago")