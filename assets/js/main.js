let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let uv = document.querySelector(".uv");

function getCity(city){
  let getCityApi =
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=be56721f2765afd4e946bf6cc853af53`;

  if(!getCityApi){
    console.log('No city');
  }else{
    fetch(getCityApi)
      .then((response) => {
        response.json().then((data) => {
          let long = data[0].lon;
          let lat = data[0].lat;

          displayWeather(long,lat,city);
        });
      })

  .catch((err) => {
    console.log('City does not exist');
  });
}
}


  function displayWeather(lon, lat, selectedCity) {
    let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=be56721f2765afd4e946bf6cc853af53`;

    fetch(weatherApi)
    .then((response) => {
      response.json().then((data) => {
        console.log(data);
        let convertDate = new Date(data.current.dt * 1000);
        let date = convertDate.getDate();
        let month = convertDate.getMonth();
        let year = convertDate.getFullYear();
        let newDate = month+"/"+date+"/"+year;
       city.innerHTML = `${selectedCity} (${newDate}) ${data.current.weather[0].icon}`;
       temperature.innerHTML = "Temperature: " + data.current.temp +" &#186F";
       wind.textContent = `Wind: ${data.current.wind_speed} MPH`;
       humidity.textContent = `Humidity: ${data.current.humidity} %`;
       uv.textContent = `UV index ${data.current.uvi}`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

 function searchHandler(){
    let city = document.getElementById('search').value;
    getCity(city);
    
  }