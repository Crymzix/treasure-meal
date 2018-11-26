const express = require('express')
const router = express.Router()

router.get('/restaurants', (request, response) => {
    response.send('Restaurants')
})

module.exports = router