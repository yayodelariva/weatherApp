const bgImg = document.querySelector(".bgImgDefault");
const submitBtn = document.querySelector(".submitBtn");
const tempSlider = document.querySelector("#tempSlider");
const citySelect = document.querySelector("#city");
const localTimeContainer = document.querySelector(".localtimeContainer");
const currentDayTempImg = document.querySelector(".currentDayTempImg");
const currentDayTempText = document.querySelector(".currentDayTempText");
const currentDayMaxTempText = document.querySelector(".currentDayMaxTempText");
const currentDayMinTempText = document.querySelector(".currentDayMinTempText");
const day2Name = document.querySelector(".day2Name");
const day2TempImg = document.querySelector(".day2TempImg");
const day2TempText = document.querySelector(".day2TempText");

const day3Name = document.querySelector(".day3Name");
const day3TempImg = document.querySelector(".day3TempImg");
const day3TempText = document.querySelector(".day3TempText");

const day4Name = document.querySelector(".day4Name");
const day4TempImg = document.querySelector(".day4TempImg");
const day4TempText = document.querySelector(".day4TempText");

let weatherData = null; // To store the fetched weather data

async function getTemp() {
  try {
    let weatherApi =
      "https://api.weatherapi.com/v1/forecast.json?key=b69280c1a0ad4c0a94b21722241405&days=3&q=";
    const response = await fetch(weatherApi + citySelect.value, {
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    weatherData = data; // Store the data for later use

    const localTime = data.location.localtime;
    const localDate = new Date(localTime); // Convert localtime string to Date object
    const weekday = localDate.getDay(); // Get day of the week (0-6)

    switch (weekday) {
      case 0:
        day = "Sunday";
        nextday = "Monday";
        nextday2 = "Tuesday";
        break;
      case 1:
        day = "Monday";
        nextday = "Tuesday";
        nextday2 = "Wednesday";
        break;
      case 2:
        day = "Tuesday";
        nextday = "Wednesday";
        nextday2 = "Thursday";
        break;
      case 3:
        day = "Wednesday";
        nextday = "Thursday";
        nextday2 = "Friday";
        break;
      case 4:
        day = "Thursday";
        nextday = "Friday";
        nextday2 = "Saturday";
        break;
      case 5:
        day = "Friday";
        nextday = "Saturday";
        nextday2 = "Sunday";
        break;
      case 6:
        day = "Saturday";
        nextday = "Sunday";
        nextday2 = "Monday";
        break;
    }

    // Update UI with the fetched data
    updateUI(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateUI(data) {
  const infoWrapper = document.querySelector(".infoWrapper");
  const forecastWrapper = document.querySelector(".forecastWrapper");
  infoWrapper.style.display = "flex";
  forecastWrapper.style.display = "flex";

  const cityName = document.querySelector(".cityName");
  const regionAndCountry = document.querySelector(".regionAndCountry");
  let cityNameTitle = data.location.name;
  let regionNameTitle = data.location.region;
  let countryNameTitle = data.location.country;
  cityName.textContent = cityNameTitle;
  regionAndCountry.textContent = regionNameTitle + ", " + countryNameTitle;

  let localTime = data.location.localtime;
  localTimeContainer.innerText = localTime;

  let dayTime = data.current.is_day;
  if (dayTime === 1) {
    bgImg.classList.remove("bgImgDefault");
    bgImg.classList.remove("bgImgCold");
    bgImg.classList.add("bgImgHot");
  } else if (dayTime === 0) {
    bgImg.classList.remove("bgImgDefault");
    bgImg.classList.remove("bgImgHot");
    bgImg.classList.add("bgImgCold");
  }
  // Update current day's temperature and weather icon
  currentDayTempImg.src = "https:" + data.current.condition.icon;
  day2Name.textContent = nextday;
  day3Name.textContent = nextday2;
  day2TempImg.src = "https:" + data.forecast.forecastday[1].day.condition.icon;
  day3TempImg.src = "https:" + data.forecast.forecastday[2].day.condition.icon;
  toggleTemp(data); // Update the current day's temperature based on the slider
}

function clearVars() {
  currentDayMaxTempText.innerText = "";
  currentDayMinTempText.innerText = "";
  currentDayTempText.innerText = "";
  localTimeContainer.innerText = "";
}

function toggleTemp(data) {
  if (!data) return;
  if (tempSlider.checked) {
    currentDayTempText.textContent = data.current.temp_f + "°F";
    currentDayMaxTempText.textContent =
      "Max temp.: " + data.forecast.forecastday[0].day.maxtemp_f + "°F";
    currentDayMinTempText.textContent =
      "Min temp.: " + data.forecast.forecastday[0].day.mintemp_f + "°F";
    day2TempText.textContent =
      "Avg temp.: " + data.forecast.forecastday[1].day.avgtemp_f + "°F";
    day3TempText.textContent =
      "Avg temp.: " + data.forecast.forecastday[2].day.avgtemp_f + "°F";
  } else {
    currentDayTempText.textContent = data.current.temp_c + "°C";
    currentDayMaxTempText.textContent =
      "Max temp.: " + data.forecast.forecastday[0].day.maxtemp_c + "°C";
    currentDayMinTempText.textContent =
      "Min temp.: " + data.forecast.forecastday[0].day.mintemp_c + "°C";
    day2TempText.textContent =
      "Avg temp.: " + data.forecast.forecastday[1].day.avgtemp_c + "°C";
    day3TempText.textContent =
      "Avg temp.: " + data.forecast.forecastday[2].day.avgtemp_c + "°C";
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearVars();
  getTemp();
});

tempSlider.addEventListener("change", () => {
  toggleTemp(weatherData);
});

bgImg.classList.remove("bgImgCold");
bgImg.classList.remove("bgImgHot");
