const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=85bbf3c473e18fd7a81e8ec0a5387974";
const API_UNITS = "&units=metric";

async function getWather(e) {
  if (input != null && input.value) {
    const city = input.value;
    const URL = API_LINK + city + API_KEY + API_UNITS;
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        const weath = Object.assign({}, ...res.data.weather);
        const humi = res.data.main.humidity;
        const temp = res.data.main.temp;
        cityChange(city, temp, humi, weath);
        changePicture(weath);
      }
    } catch (error) {
      cityChange(null, null, null, null, error);
    }
  }
}

const cityChange = (city, temp, humi, weath, error) => {
  if (error) {
    warning.textContent = "Podaj prawidłową nazwę miasta";
    cityName.textContent = "";
    temperature.textContent = "";
    weather.textContent = "";
    humidity.textContent = "";
    photo.setAttribute("src", "./img/unknown.png");
    return;
  } else {
    weather.textContent = weath.main;
    cityName.textContent = city;
    temperature.textContent = Math.ceil(temp * 10) / 10 + "  C°";
    humidity.textContent = humi + "%";
    warning.textContent = "";
    input.value = "";
  }
};

const changePicture = (weath) => {
  if (weath.id >= 801 && weath.id <= 804) {
    photo.setAttribute("src", "./img/cloud.png");
  } else if (weath.id >= 200 && weath.id <= 232) {
    photo.setAttribute("src", "./img/thunderstorm.png");
  } else if (weath.id >= 500 && weath.id <= 531) {
    photo.setAttribute("src", "./img/rain.png");
  } else if (weath.id === 800) {
    photo.setAttribute("src", "./img/sun.png");
  } else if (weath.id >= 600 && weath.id <= 622) {
    photo.setAttribute("src", "./img/ice.png");
  } else if (weath.id >= 300 && weath.id <= 321) {
    photo.setAttribute("src", "./img/drizzle.png");
  } else if (weath.id >= 701 && weath.id <= 781) {
    photo.setAttribute("src", "./img/fog.png");
  } else {
    photo.setAttribute("src", "./img/unknown.png");
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWather();
  }
});
button.addEventListener("click", getWather);
