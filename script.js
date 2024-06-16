const bgImg = document.querySelector(".bgImgDefault");
const submitBtn = document.querySelector(".submitBtn");
const citySelect = document.querySelector("#city");
const cityName = document.querySelector(".cityName");
const localTimeContainer = document.querySelector(".localtimeContainer");
const currentDayTempImg = document.querySelector(".currentDayTempImg");
const currentDayTempText = document.querySelector(".currentDayTempText");
const currentDayMaxTempText = document.querySelector(".currentDayMaxTempText");
const currentDayMinTempText = document.querySelector(".currentDayMinTempText");
const day2TempImg = document.querySelector(".day2TempImg");

async function getTemp() {
  try {
    let weatherApi =
      "https://api.weatherapi.com/v1/forecast.json?key=b69280c1a0ad4c0a94b21722241405&days=3&q=";
    selectedOption = fetch(weatherApi + citySelect.value, {
      mode: "cors",
    })
      .then(function (response) {
        if (response.ok) {
          console.log("hi");
          return response.json();
        }
      })
      .then(function (response) {
        let localTime = response.location.localtime;
        let dayTime = response.current.is_day; // 0=night 1=day
        let currentDayTemp = response.current.temp_c;
        let maxTemp = response.forecast.forecastday[0].day.maxtemp_c;
        let minTemp = response.forecast.forecastday[0].day.mintemp_c;
        let day2Temp = response.forecast.forecastday[1].day.avgtemp_c;
        let day2TempIcon = response.forecast.forecastday[1].day.condition.icon;
        let day3Temp = response.forecast.forecastday[2].day.avgtemp_c;
        let day3TempIcon = response.forecast.forecastday[2].day.condition.icon;

        currentDayTempImg.src = "https:" + response.current.condition.icon;

        console.log("local time: ", localTime);
        localTimeContainer.append(localTime);

        currentDayTempText.append(response.current.temp_c + "C");
        // // let tempC = (Math.round(response.current.temp_c) * 100) / 100;
        // console.log(tempC);

        currentDayMaxTempText.append(
          "Max temp.: " + response.forecast.forecastday[0].day.maxtemp_c + "C"
        );
        console.log("max temp:", maxTemp);

        currentDayMinTempText.append(
          "Min temp.: " + response.forecast.forecastday[0].day.mintemp_c + "C"
        );
        console.log("min temp:", minTemp);

        console.log("tomorrows temp: ", day2Temp);
        console.log("day after tomorrow temp: ", day2Temp);
        let tempC = (Math.round(response.current.temp_c) * 100) / 100;
        console.log(tempC);
        let tempF = (Math.round((tempC * 9) / 5 + 32) * 100) / 100;
        console.log(tempF);
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
      });
  } catch (error) {
    alert("Unexpected error, try again");
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getTemp();
});

bgImg.classList.remove("bgImgCold");
bgImg.classList.remove("bgImgHot");
