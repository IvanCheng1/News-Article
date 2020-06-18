const dotenv = require('dotenv')
dotenv.config()

var aylien = require('aylien_textapi')
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000
const cors = require('cors')

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

const app = express()
app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
    console.log('get')
})

app.post('/api', function(req, res) {
    // console.log(req.body.data)

    textapi.sentiment({
        'url': req.body.data
    }, function(error, response) {
        if (error === null) {
            console.log(response)
            res.send(response)
        } else {
            console.log(error)
            res.send(error)
        }
    });
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})