const functions = require('firebase-functions')
const express = require('express')

const app = express()
app.get('/test', (request, response) => {
    response.send("Hello")
})

exports.app = functions.https.onRequest(app)
