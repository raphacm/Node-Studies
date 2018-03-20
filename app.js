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

geocode.geocodeAddress(argv.a)
  .then(coordinates => {
    return forecast.getWeather(coordinates);
  })
  .then(result => console.log(result))
  .catch(e => console.error(e));
