// const fetch = require('node-fetch');

// global.Headers = fetch.Headers;


// var myHeaders = new Headers();
// myHeaders.append("X-eBirdApiToken", keys.eBirdKey);

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };


//***fetch specific species based on current location (lat/lng) */
//one result, sample lat lng lat: 40.8547659 lng-73.940974
// fetch("https://api.ebird.org/v2/data/obs/geo/recent/rethaw?lat=40.8547659&lng=-73.940974&maxResults=50&dist=2", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//fetch based on location /obs/"region code"/recent
// fetch("https://api.ebird.org/v2/data/obs/KZ/recent", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// fetched based on latitude and longitude `recent?lat={lat}&lng={lng}`
// fetch("https://api.ebird.org/v2/data/obs/geo/recent?lat=40.8586581&lng=-73.9477381&sort=species", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


