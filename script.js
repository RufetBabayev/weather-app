//selectors
const formInput = document.querySelector("#formInput");
const searchInput = document.querySelector("#searchInput");
const btnCelcius = document.querySelector("#btnCelcius");
const btnFranheyt = document.querySelector("#btnFranheyt");
const city = document.querySelector("#city");
const week = document.querySelector("#week");
const month = document.querySelector("#month");
const day = document.querySelector("#day");
const year = document.querySelector("#year");
const time = document.querySelector("#time");
const weatherIcon = document.querySelector("#weatherIcon");
const temp = document.querySelector("#temp");
const tempFeel = document.querySelector("#tempFeel");
const wind = document.querySelector("#wind");
const visiblty = document.querySelector("#visiblty");
const sunrise = document.querySelector("#sunrise");
const humidity = document.querySelector("#humidity");
const cloudiness = document.querySelector("#cloudiness");
const cloudType = document.querySelector("#cloudType");
const weatherCondition = document.querySelector("#weatherCondition");
const sunset = document.querySelector("#sunset");
const rain = document.querySelector("#rain");
const spinner = document.querySelector("#spinner");
const dataContainer = document.querySelector("#dataContainer");

//api tools

const key = "b4a99d8cd64c6760b1205f6c5d4cef8c";
const url = "https://api.openweathermap.org/data/2.5/";

// ${url}weather?q=${cityName}&appid=${key}&lang=en`

function getIcon(icon) {
  const iconObj = {
    "01d": "https://cdn-icons-png.flaticon.com/512/169/169367.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
  };

  return iconObj[icon];
}

let inputCity = "";

async function getData(cityName) {
  dataContainer.classList.replace("block", "hidden");
  spinner.classList.replace("hidden", "flex");

  const fetchData = await fetch(
    `${url}weather?q=${cityName}&appid=${key}&lang=en`
  );

  if (fetchData && fetchData.status === 200) {
    let res = await fetchData.json();
    setTimeout(() => {
      spinner.classList.replace("flex", "hidden");
      dataContainer.classList.replace("hidden", "block");
    }, 2000);
    createUi(res);
  }
}

function kelvinToCelcius(currentTemp) {
  const celc = currentTemp - 272.15;
  return celc.toFixed(0);
}

function createUi(cityData) {
  const regexJustHour = /\b(\d{2}:\d{2})\b/;
  console.log(cityData);
  const toCelcius = kelvinToCelcius(cityData.main.temp);
  const cityShortName = cityData.sys.country;
  city.textContent = cityData.name + "," + cityShortName;
  temp.textContent = toCelcius + "°C ";
  humidity.textContent = cityData.main.humidity + "%";
  cloudType.textContent = cityData.weather[0].description;
  weatherCondition.textContent = cityData.weather[0].main;
  tempFeel.textContent = kelvinToCelcius(cityData.main.feels_like) + "°C ";
  weatherIcon.src = getIcon(cityData.weather[0].icon);
  sunrise.textContent = epochToDate(cityData.sys.sunrise).match(
    regexJustHour
  )[1];

  function btnF() {
    temp.textContent = kelvinToCelcius(cityData.main.temp) * 34 + "°F";
    tempFeel.textContent = kelvinToCelcius(cityData.main.temp) * 34 + "°F";
  }
  btnFranheyt.addEventListener("click", () => btnF());

  function btnC() {
    temp.textContent = toCelcius + "°C ";
    tempFeel.textContent = kelvinToCelcius(cityData.main.feels_like) + "°C ";
  }
  btnCelcius.addEventListener("click", () => btnC());
}

function epochToDate(epochTime) {
  const date = new Date(epochTime * 1000);
  return date.toLocaleString(); // You can also use date.toUTCString() or date.toISOString()
}

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(inputCity);
});

searchInput.addEventListener("change", (e) => (inputCity = e.target.value));

// const test = async () => {
//   const fetcss = fetch("https://api.unsplash.com/search/photos?query=book", {
//     method: "GET",
//     headers: {
//       Authorization: "Client-ID B1git8vkm0euthpuUNHe7YJ91om8Xzwtvh7h_IK8hNA",
//     },
//   });
// };

// test();
