function updateWeather(response) {
  let currtentTemperature = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let currentCondition = document.querySelector("#weather-condition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let currentTime = document.querySelector("#weather-app-time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  currtentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentCondition.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWindSpeed.innerHTML = `${response.data.wind.speed}Km/h`;
  currentTime.innerHTML = formatDate(date);
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

searchCity("Viseu");
