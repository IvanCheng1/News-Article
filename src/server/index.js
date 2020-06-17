const dotenv = require('dotenv')
dotenv.config()

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const PORT = process.env.PORT || 8080

var aylien = require("aylien_textapi")

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
        // res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})