const axios = require('axios');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const geocodeAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`

  return axios.get(url)
    .then(response => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw 'Address not found or incorrect!';
      }

      return {
        address: response.data.results[0].formatted_address,
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng,
      }
    })
    .catch(error => {
      if (error.code) {
        console.log({error_detail: 'Error Server Connection'});
      } else {
        console.log({error_detail: error})
      }
    });
}

module.exports = {
  geocodeAddress
}
