const yargs = require('yargs');
const dotenv = require('dotenv').config();
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

geocode.geocodeAddress(argv.a)
  .then(location => forecast.getWeather(location))
  .then(response => console.log(response))
  .catch(error => console.log(error));
