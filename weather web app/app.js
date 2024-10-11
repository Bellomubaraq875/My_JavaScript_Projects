const apiKey = "c95d025d2e5c0244c85c966037f552c9";
const apiUrl  = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch (apiUrl + city +`&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp)  + "ᵒc";
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    if(data.weather[0].main == 'Clouds '){
        weatherIcon.src ='image'
    }
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
})

checkWeather();