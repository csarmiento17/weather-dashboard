let weather = document.querySelector("#future-forecast");
let city = document.querySelector(".city");
let dailyIcon = document.querySelector("#daily-img");
let temperature = document.querySelector(".temperature");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let uv = document.querySelector(".uv");

populateButtonHistory();

//This function gets the longtitue and latitude
function getCity(city) {
  let getCityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=be56721f2765afd4e946bf6cc853af53`;
  if (!getCityApi) {
    console.log("No city");
  } else {
    fetch(getCityApi)
      .then((response) => {
        response.json().then((data) => {
          let long = data[0].lon;
          let lat = data[0].lat;
          displayWeather(long, lat, city);
        });
      })
      .catch((err) => {
        console.log("City does not exist");
      });
  }
}

// This function displays data in Daily and 5-Day forecast
function displayWeather(lon, lat, selectedCity) {

  let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=be56721f2765afd4e946bf6cc853af53`;
  city.textContent = '';
  fetch(weatherApi)
    .then((response) => {
      response.json().then((data) => {
        let weatherIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
        let convertDate = new Date(data.current.dt * 1000);
        let date = convertDate.getDate();
        let month = convertDate.getMonth();
        let year = convertDate.getFullYear();
        let newDate = month + "/" + date + "/" + year;
        $(".city").append(`${selectedCity} (${newDate}) <img width="80px" height="80px"src=${weatherIcon}></img>`);
      
        saveWeatherHistory(selectedCity);

        temperature.innerHTML = `Temperature: ${data.current.temp}  &#186F`
        wind.textContent = `Wind: ${data.current.wind_speed} MPH`;
        humidity.textContent = `Humidity: ${data.current.humidity} %`;
        uv.textContent = `UV index: ${data.current.uvi}`;

        if (data.current.uvi <= 2) {
          $(".uv").addClass("favorable");
          $(".uv").removeClass("moderate");
          $(".uv").removeClass("severe");
        } else if (data.current.uvi <= 5) {
          $(".uv").addClass("moderate");
          $(".uv").removeClass("favorable");
          $(".uv").removeClass("severe");
        } else {
          $(".uv").addClass("severe");
          $(".uv").removeClass("moderate");
          $(".uv").removeClass("favorable");
        }

       
        for (i = 1; i <= 5; i++) {
          let dailyIcon = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
          let futuredate = document.getElementById(`daily${i}`);
          let convertDate = new Date(data.daily[i].dt * 1000);
          let date = convertDate.getDate();
          let month = convertDate.getMonth();
          let year = convertDate.getFullYear();
          let newDate = month + "/" + date + "/" + year;
          futuredate.innerHTML = `<h4>${newDate}</h4>
          <p><img width="40px" height="40px" src=${dailyIcon}></img></p>
          <p>Temp: ${data.daily[i].temp.day} &#186F</p>
          <p>Wind: ${data.daily[i].wind_speed} MPH</p>
          <p>Humidity: ${data.daily[i].humidity} %</p>
          `;

          weather.appendChild(futuredate);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Triggers when the Search button is clicked.
function searchHandler() {
  let city = document.getElementById("search").value;

  getCity(city);
  $("#cityHistory").empty();

}

// Save city to local storage
function saveWeatherHistory(city) {
  $("#cityHistory").empty();
  let currCity = city;

  let existingData = localStorage.getItem("cities");
  let existing = existingData ? JSON.parse(existingData) : [];
  let newData = { city: currCity };

  existing.push(newData);
  document.getElementById("search").value = "";

  localStorage.setItem("cities", JSON.stringify(existing));

  populateButtonHistory(city);
}

function populateButtonHistory(city) {
  let cities = localStorage.getItem("cities");
  data = cities ? JSON.parse(cities) : [];

  //for(c in data){
  for (let x = 0; x < data.length; x++) {
    let btnCity = document.createElement("button");
    btnCity.setAttribute("data", data[x].city);
    btnCity.textContent = data[x].city;
    $("#cityHistory").append(btnCity);
  }
}

$("#cityHistory").on("click", function () {
  getCity(event.target.textContent);
});
