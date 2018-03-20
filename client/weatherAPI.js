const axios = require('axios');
const FORECAST_API_KEY = process.env.FORECAST_API_KEY;

const getWeather = (coordinates) => {
  if (!coordinates) throw 'Coordinates must be informed to get weather forecast!';
  const {latitude, longitude, address} = coordinates;

  const url = `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${latitude},${longitude}?units=auto&lang=pt`

  return axios.get(url)
    .then(response => ({
      location: address,
      temperature: `${response.data.currently.temperature}ºC`,
      apparentTemperature: `${response.data.currently.apparentTemperature}ºC`,
      precipType: response.data.currently.precipType,
      summary: response.data.currently.summary
    }))
    .catch(error => {
      if (error.code) {
        console.log({error_detail: 'Error Server Connection'});
      } else {
        console.log({error_detail: error})
      }
    });;
}

module.exports = {
  getWeather
}
