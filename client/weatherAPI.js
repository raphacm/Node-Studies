const request = require('request');
const FORECAST_API_KEY = '[YOUR_FORECAST.IO_API_KEY]';

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${lat},${lng}`,
    json: true
  },
  (error, response, body) => {
    if(error) {
      callback('Unable to connect to Google server');
    } else if (response.statusCode === 400) {
        callback('Forecast Not found');
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports = {
  getWeather
}
