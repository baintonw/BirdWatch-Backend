require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');

//keys
const birdKey = process.env.EBIRD_API_KEY

const app = express();
const port = 3000;

app.use(cors());
//test root route
app.get('/', (req, res) => {
    res.send('Welcome to the Bird Watch server!')
})


//Fetch recent nearby observations
const requestOptions = {
    method: "GET",
    headers: {"X-eBirdApiToken": birdKey}
}
let birds = [];
 async function fetchBirds() {
    
        const result = await fetch("https://api.ebird.org/v2/data/obs/geo/recent?lat=40.8547659&lng=-73.940974", requestOptions)
        const jsonData = await result.json()
        
            // .then(res=>res.json())
            // .then(data => data)
        return jsonData

}

    // .then(json => console.log(json))

    console.log(fetchBirds())


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


// app.listen(port, () => console.log(`app is listening on port: ${port}`));