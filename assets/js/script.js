
var apiKey = "5698c3d81b02fc82364ca7e2b95d97f7"
var submit = document.querySelector('#user-form');
var currentDay = $("#currentDay");
var date = moment().format("  MMM D, YYYY");


var getWeather = function (event) {

  console.log(event)
  console.log(event.target)
  event.preventDefault();
  // format the api url
  var inputCity = document.querySelector('.form-input').value;
  localStorage.setItem("City", inputCity);
  console.log(inputCity);
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputCity + '&appid=5698c3d81b02fc82364ca7e2b95d97f7&units=imperial';
  console.log(apiUrl);
  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      console.log(lat)
      var lon = data.city.coord.lon;
      console.log(lon)

      //call current and future forcast from one api given lat and lon 

      // format the api url
      var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=111d9e5d2c96a072a650679033926bdf&units=imperial';
      console.log(apiUrl);
      // make a request to the url
      fetch(apiUrl2)
        .then(function (response) {
          return response.json()
        })
        .then(function (data2) {
          var temp = data2.current.temp;
          var wind = data2.current.wind_speed;
          var humidity = data2.current.humidity;
          var uv = data2.current.uvi;

          var i = 0;
          for (var i = 0; i < 5; i++) {
            console.log(i)
            var temp1 = data2.daily[i].temp.day;
            var wind1 = data2.daily[i].wind_speed;
            var humidity1 = data2.daily[i].humidity;
            var uv1 = data2.daily[i].uvi;
            console.log(temp1, wind1, humidity1, uv1)

            var card = document.createElement("div");
  card.classList = "cards";
  document.getElementById("fiveDay").append(card);
  // create a span element to hold restaurant name
  var newDate = document.createElement("p");
  //const copiedDate = moment(date);
  //newDate.push({ date: copiedDate.add(i, "days").format("MMM D, YYYY") });
  //var cardDate = moment().format("  MMM D, YYYY").add(1,'d');
  newDate.textContent = date;
card.appendChild(newDate);

  var newUl1 = document.createElement("ul");
          card.appendChild(newUl1)

          var tLi1 = document.createElement("li");
          tLi1.textContent = "Temperature: " + temp1;
          newUl1.appendChild(tLi1)
          var wLi1 = document.createElement("li");
          wLi1.textContent = "Wind Speed: " + wind1;
          newUl1.appendChild(wLi1)
          var hLi1 = document.createElement("li");
          hLi1.textContent = "Humidity: " + humidity1;
          newUl1.appendChild(hLi1)
          var uLi1 = document.createElement("li");
          uLi1.textContent = "UV Index: " + uv1;
          newUl1.appendChild(uLi1)

  //console.log(restaurant_name)
  // append to card
  

  //var price = document.createElement("span");
  //price.textContent = price_range;
  //console.log(price_range);
  //newEl.appendChild(price);
          }

          console.log(data2);

          // create current forecast
          var current = document.createElement("div");
          current.classList = "current";
          document.getElementById("current-forcast").appendChild(current);
          // create a span element to hold city name and date
          var nameDate = document.createElement("h3")
          current.appendChild(nameDate)
          var cityName = document.querySelector("#city").value + "-";
          console.log(cityName)
          // append city name and date to element
          nameDate.append(cityName + date);

          var newUl = document.createElement("ul");
          current.appendChild(newUl)

          var tLi = document.createElement("li");
          tLi.textContent = "Temperature: " + temp;
          newUl.appendChild(tLi)
          var wLi = document.createElement("li");
          wLi.textContent = "Wind Speed: " + wind;
          newUl.appendChild(wLi)
          var hLi = document.createElement("li");
          hLi.textContent = "Humidity: " + humidity;
          newUl.appendChild(hLi)
          var uLi = document.createElement("li");
          uLi.textContent = "UV Index: " + uv;
          newUl.appendChild(uLi)

          // create 5 day cards
        })
        .catch(function (error) {
          console.log(error);
        });

    })
    .catch(function (error) {
      console.log(error);
    });


};


submit.addEventListener('submit', getWeather)
