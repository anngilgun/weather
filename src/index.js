let now = new Date();
let monday = document.querySelector(".dayhour");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thirsday",
  "Friday",
  "Satuday",
];
let day = days[now.getDay()];
let time = now.getHours();
let min = now.getMinutes();
monday.innerHTML = `${day}, ${time}:${min}`;

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` <li class="list-group-item">
          <ul>
            <li class="em2">
              <img
                src=""http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png""
                alt=""
                width="42"
              />
            </li>
            <li class="TEMP">
              <span id="max">${Math.round(
                forecastDay.temp.max
              )}°</span><span id="min">${Math.round(
        forecastDay.temp.min
      )}°</span>
            </li>
            <li class="MON">${formatDay(forecastDay.dt)}</li>
          </ul>
        </li>

      
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cities = document.querySelector("#city");
  cities.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#form");
form.addEventListener("submit", search);

function temp(event) {
  event.preventDefault();
  event.target.innerHTML = "60° F";
}
let tempChange = document.querySelector("h1");
tempChange.addEventListener("click", temp);

//hw5final
function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function cityPut(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  searchCity(city);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let cities = document.querySelector("#city");
  h1.innerHTML = `${temperature}°c`;
  cities.innerHTML = response.data.name;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let iconElement = document.querySelector("#em1");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
let forms = document.querySelector("#form");
forms.addEventListener("submit", cityPut);

//currentcity

function showWeather(response) {
  let cities = document.querySelector("#city");
  cities.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let weaather = `${temperature}°C `;
  h1.innerHTML = weaather;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let iconElement = document.querySelector("#em1");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function displayPosition(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${url}`).then(showWeather);
}
navigator.geolocation.getCurrentPosition(displayPosition);
