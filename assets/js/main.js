let weatherAPI =
  "http://api.openweathermap.org/geo/1.0/direct?q=Calgary&appid=be56721f2765afd4e946bf6cc853af53";

fetch(weatherAPI)
  .then((response) => {
    response.json().then((mydata) => {
      console.log(mydata);
    });
  })
  .catch((err) => {
    console.log(err);
  });
