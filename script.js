const api = {
    key: "09fbf1e405f770a44343df04622df110",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    if(weather_el.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('clear.jpg')"

    } else if(weather_el.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('clouds.jpeg')"

    } else if(weather_el.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('thunderstorm.jpg')"

  } else if(weather_el.textContent == 'Fog' || weather_el.textContent == 'Mist'){
    document.body.style.backgroundImage = "url('fog.jpg')"
} else if(weather_el.textContent == 'Rain'){
    document.body.style.backgroundImage = "url('rain.jpg')"
}
  
  else {
    // document.body.style.backgroundImage = none;
    document.body.style.backgroundColor = "black";
  }
}

  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }