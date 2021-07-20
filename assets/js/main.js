function getCity(city){
  let getCityApi =
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=be56721f2765afd4e946bf6cc853af53`;

fetch(getCityApi)
  .then((response) => {
    response.json().then((data) => {
      let long = data[0].lon;
      let lat = data[0].lat;
      console.log(long,lat)
      displayWeather(long,lat);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}


  function displayWeather(lon, lat) {
    let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=be56721f2765afd4e946bf6cc853af53`;

    fetch(weatherApi)
    .then((response) => {
      response.json().then((data) => {
       console.log(data)
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