const yargs = require('yargs');
const geocode = require('./client/geocodeAPI');
const forecast = require('./client/weatherAPI');

const argv = yargs
.options({
  address: {
    demand: true,
    alias: 'a',
    describe: 'Addres to fetch',
    string: true
  }
})
.help('help', 'Show help')
.argv;

geocode.geocodeAddress(argv.address, (error, response) => {
  if (error) {
    console.log(error);
  } else {
    console.log(response.address);
    forecast.getWeather(response.latitude, response.longitude, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(response, undefined, 2));
      }
    });
  }
});
