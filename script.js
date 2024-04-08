let input = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let resultCont = document.getElementById("result");
let currentTemp = document.getElementById("temp");
let feelsLike = document.getElementById("feelsLike");
let icon = document.getElementById("icon");
let iconText = document.getElementById("text");
let uv = document.getElementById("uvIndex");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let dew = document.getElementById("dewpoint");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibilty");
let msg = document.getElementById("errorMsg");

const apiKey = `260d98c9714f422abaf203451242603`;


searchBtn.addEventListener('click', () => {
  let inputValue = input.value;
  console.log(inputValue);
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputValue}`;

  if(!inputValue){
    msg.style.display = 'block';
    msg.innerHTML = 'Please enter a location'
  }else{
    fetchAndDisplay(url);
  }
})

function fetchAndDisplay(url){
  fetch(url)
  .then(response => {
    if(!response.ok){
      console.log("There was an error")
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    resultCont.style.opacity = '.6';
    msg.style.display = 'none';

    currentTemp.innerHTML = data.current.temp_c + '<sup>&deg;</sup>';
    feelsLike.innerHTML = 'Feels like ' + data.current.feelslike_c + '<sup>&deg;</sup>';
    icon.src = data.forecast.forecastday[0].day.condition.icon;
    iconText.textContent = data.forecast.forecastday[0].day.condition.text;

    uv.innerHTML = 'UV index' + '<br>'+ data.current.uv;
    humidity.innerHTML = 'Humidity' + '<br>' + data.current.humidity + '%';
    wind.innerHTML = 'Wind' + '<br>' + data.current.wind_kph + 'km/h';
    dew.innerHTML = 'Dew point' + '<br>' + data.forecast.forecastday[0].day.mintemp_c ;
    pressure.innerHTML = 'Pressure' + '<br>' + data.current.pressure_mb + ' mb';
    visibility.innerHTML = 'Visibility' + '<br>' + data.current.vis_km + ' km'
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}





