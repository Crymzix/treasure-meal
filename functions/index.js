const functions = require('firebase-functions')
const admin = require('firebase-admin')
const credentials = require('./service-account-credentials.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const router = express.Router()
const restaurants = require('./routes/restaurants')
router.use('/restaurants', verify)
router.use(restaurants)

const auth = require('./routes/auth')(admin)
router.post('/register', auth.register)
router.post('/forgot-password', auth.forgotPassword)

app.use('/api/v1', router)

async function verify(request, response, next) {
    const authHeader = request.headers.authorization
    if (authHeader && authHeader.split(' ').length === 2 && authHeader[0] === 'Bearer') {
        try {
            const idToken = authHeader[1]
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            request.userId = decodedToken.uid
            return next()
        } catch (e) {
            response.status(401)
            response.send('Not authorized.')
        }
    } else {
        response.status(401)
        response.send('Invalid authentication header.')
    }
    return null
}

exports.app = functions.https.onRequest(app)
