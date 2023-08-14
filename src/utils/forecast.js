const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=37ed93830aed4fe290c92055230908&q=${latitude},${longitude}&aqi=no`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const weatherData = {
        temperature: response.body.current.temp_c,
        condition: response.body.current.condition.text,
        humidity: response.body.current.humidity,
        uvIndex: response.body.current.uv,
        wind:response.body.current.wind_kph,
        icon:response.body.current.condition.icon
      };

      callback(undefined, weatherData);
    }
  });
};

module.exports = forecast;
