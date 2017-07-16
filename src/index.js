import DarkSkyApi from 'dark-sky-api';
import Chart from 'chart.js';

DarkSkyApi.apiKey = '21e22ddd92fa2e53acb69b4a9391cedc';
DarkSkyApi.units = 'si'; // default 'us'
DarkSkyApi.language = 'ru';


DarkSkyApi.loadCurrent()
  .then(result => {
    document.getElementsByClassName("weather")[0].innerHTML = result.summary;
    document.getElementsByClassName("temp")[0].innerHTML = `${Math.round(result.temperature)}°`;
    document.getElementsByClassName("humidity")[0].innerHTML = `Влажность: ${Math.round(result.humidity*100)}%`;
    document.getElementsByClassName("main-img")[0].style.backgroundImage = `url(../img/animated/${result.icon}.svg)`;
  });

let date = new Date();

let options = {
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
};



DarkSkyApi.loadForecast()
  .then(result => {
    for(let i = 0; i < 4; i++) {
      date.setTime(result.daily.data[i+1].dateTime._i);
      document.getElementsByClassName("day")[i].innerHTML = date.toLocaleString("ru", options);
      document.getElementsByClassName("img")[i].style.backgroundImage = `url(../img/animated/${result.daily.data[i+1].icon}.svg)`;
      document.getElementsByClassName("day-weather")[i].innerHTML = `<b>${Math.round(result.daily.data[i+1].temperatureMax)}°</b>       ${Math.round(result.daily.data[i+1].temperatureMin)}°`;
    }
});

// new Chart(document.getElementById("line-chart"), {
//   type: 'line',
//   data: {
//     labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//     datasets: [{ 
//         data: [86,114,106,106,1000,111,500,221,783,2478],
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: true
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'World population per region (in millions)'
//     }
//   }
// });

// AIzaSyCC1Xutodrcal3u-x_KHhUh6kk0OAeeu30


DarkSkyApi.loadPosition()
  .then(pos => {
    let latitude = pos.latitude;
    let longitude = pos.longitude;
    console.log(latitude + " " + longitude);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCC1Xutodrcal3u-x_KHhUh6kk0OAeeu30`;
    fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        document.getElementsByClassName("city")[0].innerHTML = data.results[3].formatted_address;
        console.log(data.results[3].formatted_address);
      });
  });



