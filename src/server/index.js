const dotenv = require('dotenv')
dotenv.config()

var aylien = require('aylien_textapi')
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const PORT = process.env.PORT || 8080
const cors = require('cors')

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

const app = express()
app.use(express.static('dist'))
app.use(cors());
console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('./dist/index.html')
})

app.get('/api', function(req, res) {
    // console.log(req.query.input)
    textapi.sentiment({
        'url': req.query.input
    }, function(error, response) {
        if (error === null) {
            console.log(response)
            res.send(response)
        } else {
            console.log(error)
        }
    });
})

app.get('/test', function(req, res) {
    console.log(`HERE`)
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})