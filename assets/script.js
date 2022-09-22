var submitButton = document.getElementById("submit-button");
var weatherContainer = document.getElementById("weather-container");
var cityInput = document.getElementById("city-input");
var historyList = document.querySelector("btn-group-vertical");
var todayData = document.getElementById("today-data");
var forecastData = document.getElementById("forecast-data");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
        getApi(city);

        weatherContainer.textContent = '';
        cityInput.value = '';
    } else {
        alert("Please enter a city name.")
    }
}

function getApi(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=fc16f87174dc7bfe353eec13a82879dc&units=imperial';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather API.");
        })
};

var displayWeather = function(info) {
    console.log(info);
    console.log(info.city.name);
    console.log(info.list[0].main.temp);
    console.log((info.list).length);

    var listArray = info.list;

    console.log(listArray);

    var cityName = info.city.name;
    
    for (var i = 0; i < listArray.length; i++) {
        var cityDate = moment(listArray[i].dt).format("l");
        var icon = listArray[i].weather[0].icon
        var temperature = listArray[i].main.temp;
        var windSpeed = listArray[i].wind.speed;
        var humidity = listArray[i].main.humidity;

        if (i === 0) {
            var todayTitle = document.createElement('h2');
            todayTitle.textContent = cityName + " (" + cityDate + ") " + icon;
            todayData.appendChild(todayTitle);

            var todayTemp = document.createElement('span');
            todayTemp.textContent = "Temp: " + temperature + "°F";
            todayTitle.appendChild(todayTemp);

            var todayWind = document.createElement('span');
            todayWind.textContent = "Wind: " + windSpeed + " MPH";
            todayTemp.appendChild(todayWind);

            var todayHumid = document.createElement('span');
            todayHumid.textContent = "Humidity: " + humidity + "%";
            todayWind.appendChild(todayHumid);
        }
    }
}

submitButton.addEventListener("click", formSubmitHandler);