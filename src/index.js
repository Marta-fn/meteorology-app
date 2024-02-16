function updateWeather(response) {
  let currtentTemperature = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;
  currtentTemperature.innerHTML = Math.round(response.data.temperature.current);
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

searchCity("Lisbon");
