function updateWeather(response) {
  let currtentTemperature = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let currentCondition = document.querySelector("#weather-condition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let currentTime = document.querySelector("#weather-app-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-app-icon");

  cityElement.innerHTML = response.data.city;
  currtentTemperature.innerHTML = Math.round(response.data.temperature.current);
  let condition = response.data.condition.description;
  currentCondition.innerHTML =
    condition.charAt(0).toUpperCase() + condition.slice(1);
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWindSpeed.innerHTML = `${response.data.wind.speed}Km/h`;
  currentTime.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather icon">`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8066f7209f55a447d5b43ta1a1a01obb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit="metric"`;
  axios.get(apiUrl).then(updateWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
      <div class="weather-forecast-date">
          ${day}
        </div>
        <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="weather-icon"
          class="weather-forecast-icon">
        <div class="weather-forecast-temperatures">
          <strong>
          12º
          </strong>
           9º
        </div>
        </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Viseu");
displayForecast();
