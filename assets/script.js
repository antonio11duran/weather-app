var submitButton = document.getElementById("submit-button");
var weatherContainer = document.querySelector("weather-container");
var cityInput = document.getElementById("city-input");

function getApi(event) {
    event.preventDefault();

    var city = cityInput.value.trim();
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

submitButton.addEventListener("click", getApi);