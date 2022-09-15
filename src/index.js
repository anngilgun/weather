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
monday.innerHTML = `${day}, ${time}:00`;

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
}
function displayPosition(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${url}`).then(showWeather);
}
navigator.geolocation.getCurrentPosition(displayPosition);
