module.exports = (admin) => {
    return {
        register: async (request, response) => {
            const credentials = request.body
            if (!credentials.email) {
                response.status(401)
                response.send('Missing email.')
            }
            if (!credentials.password) {
                response.status(401)
                response.send('Missing password.')
            }
            if (!credentials.displayName) {
                response.status(401)
                response.send('Missing display name.')
            }
            try {
                const userRecord = await admin.auth().createUser({
                    email: credentials.email,
                    password: credentials.password,
                    displayName: credentials.displayName,
                    disabled: false,
                    emailVerified: false
                })
                response.json({
                    userId: userRecord.uid
                })
            } catch(e) {
                response.status(404)
                response.send('Error creating user.')
            }
        },
        forgotPassword: (request, response) => {
            response.send('Forget Password')
        }
    }
}