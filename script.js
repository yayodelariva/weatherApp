const bgImg = document.querySelector(".bgImgDefault");
const submitBtn = document.querySelector(".submitBtn");
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

    console.log("Today is:", day);
    console.log("Tomorrow is:", nextday);
    console.log("Day after tomorrow is:", nextday2);

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
  let cityNameTitle = data.location.name;
  let countryNameTitle = data.location.country;
  cityName.textContent = cityNameTitle + ", " + countryNameTitle;

  let localTime = data.location.localtime;
  localTimeContainer.innerText = localTime;

  let dayTime = data.current.is_day;
  if (dayTime === 1) {
    bgImg.classList.remove("bgImgDefault");
    bgImg.classList.remove("bgImgCold");
    bgImg.classList.add("bgImgHot");
    console.log("ta calientito");
  } else if (dayTime === 0) {
    bgImg.classList.remove("bgImgDefault");
    bgImg.classList.remove("bgImgHot");
    bgImg.classList.add("bgImgCold");
    console.log("hace frio");
  }
  // Update current day's temperature and weather icon
  const currentDayTempImg = document.querySelector(".currentDayTempImg");
  currentDayTempImg.src = "https:" + data.current.condition.icon;

  const currentDayTempText = document.querySelector(".currentDayTempText");
  currentDayTempText.textContent = data.current.temp_c + "°C";

  const currentDayMaxTempText = document.querySelector(
    ".currentDayMaxTempText"
  );
  currentDayMaxTempText.textContent =
    "Max temp.: " + data.forecast.forecastday[0].day.maxtemp_c + "°C";

  const currentDayMinTempText = document.querySelector(
    ".currentDayMinTempText"
  );
  currentDayMinTempText.textContent =
    "Min temp.: " + data.forecast.forecastday[0].day.mintemp_c + "°C";

  // Update days names

  const day2Name = document.querySelector(".day2Name");
  day2Name.textContent = nextday;

  const day3Name = document.querySelector(".day3Name");
  day3Name.textContent = nextday2;

  // Update day2 and day3 temperatures and icons
  const day2TempImg = document.querySelector(".day2TempImg");
  day2TempImg.src = "https:" + data.forecast.forecastday[1].day.condition.icon;

  const day2TempText = document.querySelector(".day2TempText");
  day2TempText.textContent =
    "Avg temp.: " + data.forecast.forecastday[1].day.avgtemp_c + "°C";

  const day3TempImg = document.querySelector(".day3TempImg");
  day3TempImg.src = "https:" + data.forecast.forecastday[2].day.condition.icon;

  const day3TempText = document.querySelector(".day3TempText");
  day3TempText.textContent =
    "Avg temp.: " + data.forecast.forecastday[2].day.avgtemp_c + "°C";

  // Additional UI updates as needed
}

function clearVars() {
  currentDayMaxTempText.innerText = "";
  currentDayMinTempText.innerText = "";
  currentDayTempText.innerText = "";
  localTimeContainer.innerText = "";
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearVars();
  getTemp();
});

bgImg.classList.remove("bgImgCold");
bgImg.classList.remove("bgImgHot");
