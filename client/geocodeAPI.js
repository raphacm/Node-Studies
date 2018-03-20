const request = require('request');
const GOOGLE_API_KEY = '[YOUR_GOOGLE_GEOCODE_API_KEY]';

const geocodeAddress = (address, callback) => {

  const encodeAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${GOOGLE_API_KEY}`,
    json: true
  },
    (error, response, body) => {
      if(error) {
        callback('Unable to connect to Google server');
      } else if (body.status === 'ZERO_RESULTS') {
          callback('Address not found');
      } else {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
}

module.exports = {
  geocodeAddress
}
