const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector("#weatherIcon");
const temp = document.getElementById("temp");
const loc = document.getElementById("loc");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const wind = document.getElementById("wind");
const error_m = document.getElementById("error_message");
const greet = document.getElementById("greet");
const outputElement = document.querySelector(".output");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          greet.style.display = "none";
          outputElement.style.display = "none";
          error_m.style.display = "block";
          error_m.textContent = "Please, enter valid location";
        } else {
          weatherForm.style.marginBottom = "2rem";
          error_m.style.display = "none";
          weatherIcon.src = data.forecast.icon;
          outputElement.style.display = "flex";
          greet.style.display = "none";
          loc.textContent = data.location;
          temp.textContent = `${data.forecast.temperature}°C`;
          uv.textContent = `UV-index : ${data.forecast.uvIndex}`;
          wind.textContent = `Wind (kph) : ${data.forecast.wind}`;
          humidity.textContent = `Humidity : ${data.forecast.humidity}`;
          condition.textContent = data.forecast.condition;
        }
      });
    }
  );
});
