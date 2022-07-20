var cities = []
var InputSearchEl = document.querySelector("#input-search");
var cityEl = document.querySelector("#city");
var historySerchEl = document.querySelector("#history-search-btns");
var currentWeatherEl = document.querySelector("#current-weather");
var searchedCityEl = document.querySelector("#searched-city");
var weatherContainerEl = document.querySelector("#weather-container-now");
var fiveDaysEl = document.querySelector("#five-days");
var titleForecastFiveEl = document.querySelector("#forecast");
var displayFiveEl = document.querySelector("#display-fivedays")
const apiKey = "1767dcfe210ef96ad104c047ad61f1bb";



var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};


var cityWeather = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayWeather(data,city);
            });
        }else{
            alert("Error");
        }   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var displayWeather = function(weather, city){
    weatherContainerEl.textContent = "";
    searchedCityEl.textContent = city;

    var date = document.createElement("span");
    date.textContent = "(" + moment(weather.dt.value).add(0.1, "days").calendar() + ")";
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
    searchedCityEl.appendChild(temp);

    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item";
    searchedCityEl.appendChild(humidity);

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    getUv(lon,lat)
};

var getUv = function (lon,lat){
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayUv(data);
            });
        }else{
            alert("Error");
        };   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var displayUv = function (data){
    var uvIndex = document.createElement("div");
    uvIndex.textContent = "UV Index: ";
    uvIndex.classList = "list-group-item"

    uvValue = document.createElement("span");
    uvValue.textContent = data.value;

    // Display colors depending on the UV 

    if(data.value > 8){
        uvValue.classList = "severe alert alert-danger";
    } else if (data.value > 2){
        uvValue.classList = "moderate alert alert-warning"
    } else{
        uvValue.classList = "favorable alert alert-primary";
    };

    uvIndex.appendChild(uvValue);
    searchedCityEl.appendChild(uvIndex);
};

var getFiveDays = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayFiveDays(data,city);
            });
        }else{
            alert("Error");
        };   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var displayFiveDays = function(forecast){
    displayFiveEl.textContent = ""
    titleForecastFiveEl.textContent = "5-Days Forecast:";
    titleForecastFiveEl.classList = "p-3 mb-2 bg-dark text-white";
    
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
};

InputSearchEl.addEventListener("submit",formSubmitHandler);