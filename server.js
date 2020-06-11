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
// let targetBird = [];


//Endpoint functions
//birds at target lat lng
async function fetchAllLocalObs(lat, lng) {
    await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}`, requestOptions)
         .then(res=>res.json())
         .then(sightings => sightings.forEach(bird => birds.push(bird)))
    //  console.log(birds, 'Here are all the birds!')
        return birds

}

//I need to test this endpoint
async function fetchLocalBird(speciesCode, lat, lng) {
    // console.log(speciesCode)
    const targetBird = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent/${speciesCode}?lat=${lat}&lng=${lng}`, requestOptions)
        .then(res=>res.json())
        .then(bird => {
            return bird
        })
    return targetBird
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

//fetch selected bird at lat lng
app.get('/api/birds/:speciesCode/:lat/:lng', async (req, res) => {
    // res.send('here is the species code: ', req.params)
    res.send(await fetchLocalBird(req.params.speciesCode, req.params.lat, req.params.lng))
})

//google api key retrieval
app.get('/api/googlekey', (req, res) => {
    res.send({answer: 'you hit the google key endpoint!', key: process.env.GOOGLE_MAPS_API_KEY})
})




//Request options for Ebird API
const requestOptions = {
    method: "GET",
    headers: {"X-eBirdApiToken": birdKey}
}

// Unnecessary?
let lat = 40.8547659
let lng = -73.940974

//Server listening confirmation
app.listen(port, () => console.log(`app is listening on port: ${port}`));