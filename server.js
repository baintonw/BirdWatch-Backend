require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');

//keys
const birdKey = process.env.EBIRD_API_KEY

const app = express();
const port = 3000;

app.use(cors());



let birds = [];
let targetBird = [];


//Endpoint functions
//birds at target lat lng
async function fetchAllLocalObs(lat, lng) {
    await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}`, requestOptions)
         .then(res=>res.json())
         .then(sightings => sightings.forEach(bird => birds.push(bird)))
    //  console.log(birds, 'Here are all the birds!')
        return birds

}

async function fetchLocalBird(speciesCode, lat, lng) {
    // console.log(speciesCode)
    await fetch(`https://api.ebird.org/v2/data/obs/geo/recent/${speciesCode}?lat=${lat}&lng=${lng}`, requestOptions)
        .then(res=>res.json())
        .then(bird => targetBird.push(bird))
        return targetBird[0]
}


//Routes

//root
app.get('/', (req, res) => {
    res.send([{body: 'Welcome to the Bird Watch server!'}])
})

//test birds route
app.get('/api/birds', (req, res) => {
    res.send(['Hey you hit the birds enpoint! Good work!'])
})

//fetch birds at lat lng
app.get('/api/birds/:lat/:lng', async (req, res) => {
    // res.send('latitude: ' + req.params.lat + ' ' + 'longitude: ' + req.params.lng)
    res.send(await fetchAllLocalObs(req.params.lat, req.params.lng))
})

//////////////////NEEDS WORK/////////////////////
//fetch selected bird at lat lng
app.get('/api/birds/:speciesCode/:lat/:lng', async (req, res) => {
    // res.send('here is the species code: ', req.params)
    res.send(await fetchLocalBird(req.params.speciesCode, req.params.lat, req.params.lng))
})

//google api key retrieval
app.get('/api/googlekey', (req, res) => {
    res.send({answer: 'you hit the google key endpoint!', key: process.env.GOOGLE_MAPS_API_KEY})
})




//Fetch recent nearby observations
const requestOptions = {
    method: "GET",
    headers: {"X-eBirdApiToken": birdKey}
}

let lat = 40.8547659
let lng = -73.940974


// fetchAllLocalObs(lat, lng);

    // .then(json => console.log(json))

    // console.log(fetchBirds())


// var myHeaders = new Headers();
// myHeaders.append("X-eBirdApiToken", process.env.eBirdKey);
// console.log(process.env.EBIRD_API_KEY)

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// const birds = fetch("https://api.ebird.org/v2/data/obs/geo/recent?lat={{lat}}&lng={{lng}}&sort=species", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// fetchBirds() {
//     fetch("https://api.ebird.org/v2/data/obs/geo/recent/rethaw?lat=40.8547659&lng=-73.940974&maxResults=50&dist=2", {
//     method: "GET",
//     // headers: {"X-eBirdApiToken": //APIKEY}
//   })
//     .then(response => response.json())


app.listen(port, () => console.log(`app is listening on port: ${port}`));