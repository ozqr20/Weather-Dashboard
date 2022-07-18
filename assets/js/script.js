var cities = []
var InputSearchEl = document.querySelector("#input-search");
var cityEl = document.querySelector("#city");
var historySerchEl = document.querySelector("#history-search-btns");
var currentWeatherEl = document.querySelector("#current-weather");
var searchedCityEl = document.querySelector("#search-city");
var weatherContainerEl = document.querySelector("#weather-container");
var fiveDaysEl = document.querySelector("#five-days");
var forecastEl = document.querySelector("#forecast");
var displayFiveEl = document.querySelector("#display-fivedays")

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

var cityWeather = function(city){
    const apiKey = "1767dcfe210ef96ad104c047ad61f1bb";
    var apiUrl =  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1767dcfe210ef96ad104c047ad61f1bb"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            getWeather(data,city)
        });
    });
};

var getWeather = function(weather, city){
    currentWeatherEl.textContent = "";
    InputSearchEl.textContent = city;
}
