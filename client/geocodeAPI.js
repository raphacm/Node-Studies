const request = require('request');
const GOOGLE_API_KEY = '[YOUR_GOOGLE_GEOCODE_API_KEY]';

const geocodeAddress = (address) => {
  const encodeAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${GOOGLE_API_KEY}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to Google servers!');
        } else if (body.status === "ZERO_RESULTS") {
          reject('Address not found. Check if the address typed is correct!')
        } else {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
}

module.exports = {
  geocodeAddress
}
