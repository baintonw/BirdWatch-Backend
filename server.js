require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Bird Watch server!')
})
console.log(process.env.GOOGLE_MAPS_API_KEY)
app.listen(port, () => console.log(`app is listening on port: ${port}`));