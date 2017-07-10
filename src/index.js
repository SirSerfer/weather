import DarkSkyApi from 'dark-sky-api';


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

