const api_key = "48e090516c0243185b9736328bd8872e";
const searchInput=document.querySelector("[data-searchInput]");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const info=document.querySelector(".user-info-container");
const city=searchInput.value;
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    try{
      const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
      const data=await response.json();
      console.log(data);
      if (!data.sys) {
        throw data;
      }
      renderWeatherInfo(data);
      info.classList.add("active");
      loadingScreen.classList.remove("active"); 
    }
    catch(error){
      console.log("Error occured in fetching data",error.message);
    }   
}

function renderWeatherInfo(weatherInfo) {
    //firstly,we have to fetch element
  
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
    const feel = document.querySelector("[data-weatherFeel]");
  
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp}°C`;
  
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
    feel.innerText = `Feels Like : ${weatherInfo?.main?.feels_like}°C`;
  }

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let cityName = searchInput.value;
    console.log(cityName);
    if (cityName === "") return;
    else fetchSearchWeatherInfo(cityName);
  });
