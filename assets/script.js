var submitButton = document.getElementById("submit-button");
var weatherContainer = document.getElementById("weather-container");
var cityInput = document.getElementById("city-input");
var historyList = document.getElementById("history-list");
var todayData = document.getElementById("today-container");
var forecastData = document.getElementById("forecast-container");

var formSubmitHandler = function (event) {
    searchHistory();
    
    var city = cityInput.value.trim();
    
    if (city) {
        getApi(city);
        
        todayData.textContent = '';
        forecastData.textContent = '';
        cityInput.value = '';
    } else if (savedCity) {
        getApi(city);

        todayData.textContent = '';
        forecastData.textContent = '';
        cityInput.value = '';
    } 
    else {
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

var displayWeather = function (info) {
    console.log(info);
    console.log(info.city.name);
    console.log(info.list[0].main.temp);
    console.log((info.list).length);

    var listArray = info.list;

    console.log(listArray);

    var cityName = info.city.name;

    for (var i = 0; i < listArray.length; i++) {
        var cityDate = moment(listArray[i].dt_txt).format('l');
        var iconCode = listArray[i].weather[0].icon;
        var temperature = listArray[i].main.temp;
        var windSpeed = listArray[i].wind.speed;
        var humidity = listArray[i].main.humidity;

        if (i === 0) {
            var todayTitle = document.createElement('h2');
            todayTitle.textContent = cityName + " (" + cityDate + ") ";
            
            var todayIcon = document.createElement('img');
            todayIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            
            todayData.appendChild(todayTitle);
            todayTitle.appendChild(todayIcon);
            
            var todayTemp = document.createElement('p');
            todayTemp.textContent = "Temp: " + temperature + "°F";
            todayData.appendChild(todayTemp);

            var todayWind = document.createElement('p');
            todayWind.textContent = "Wind: " + windSpeed + " MPH";
            todayData.appendChild(todayWind);

            var todayHumid = document.createElement('p');
            todayHumid.textContent = "Humidity: " + humidity + "%";
            todayData.appendChild(todayHumid);
        } else {
            var forecastTitle = document.createElement('h2');
            forecastTitle.textContent = cityName + " (" + cityDate + ") ";
            
            var forecastIcon = document.createElement('img');
            forecastIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            
            forecastData.appendChild(forecastTitle);
            forecastTitle.appendChild(forecastIcon);
            
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = "Temp: " + temperature + "°F";
            forecastData.appendChild(forecastTemp);

            var forecastWind = document.createElement('p');
            forecastWind.textContent = "Wind: " + windSpeed + " MPH";
            forecastData.appendChild(forecastWind);

            var forecastHumid = document.createElement('p');
            forecastHumid.textContent = "Humidity: " + humidity + "%";
            forecastData.appendChild(forecastHumid);
        }
    }
}

var searchHistory = function () {
    var searchCity = cityInput.value;
    var searchItems = JSON.parse(searchCity);
    localStorage.setItem("searchItem", JSON.stringify(searchItems));
}

var renderHistory = function () {
    var savedCity = JSON.parse(localStorage.getItem("searchItem"));
    if (savedCity !== null) {
        for (var b = 0; b < savedCity.length; b++) {
        var historyButton = document.createElement('button');
        historyList.appendChild(historyButton);
        historyButton.classList = 'submit';
        historyButton.textContent = savedCity[b];
        
        historyButton.addEventListener("click", function (event) {
            event.preventDefault();
            searchHistory();
            renderHistory();
            formSubmitHandler();
        })};
    } else {
    return;
}};


submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    searchHistory();
    renderHistory();
    formSubmitHandler();
});

function init() {
    renderHistory();
}

init();
