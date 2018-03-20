const request = require('request');
const FORECAST_API_KEY = '[YOUR_FORECAST.IO_API_KEY]';

const getWeather = (coordinates) => {
  const {latitude, longitude, address} = coordinates;

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${latitude},${longitude}?units=auto&lang=pt`,
      json: true
    },
    (error, result, body) => {
        if (error) {
          reject('Unable to connect to Forecast server!');
        } else if (result.statusCode !== 200) {
          reject('Location is invalid')
        } else {
          resolve({
            location: address,
            temperature: `${body.currently.temperature}ºC`,
            apparentTemperature: `${body.currently.apparentTemperature}ºC`,
            precipType: body.currently.precipType,
            summary: body.currently.summary
          })
        }
    });
  });
}

module.exports = {
  getWeather
}
