const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const cors = require('cors')({
    origin: true,
})

const auth = require('./lib/auth')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send('Hello from Firebase!')
// })

//Create User on the database
exports.createUserOnDatabase = functions.auth.user().onCreate(async user => {
    try {
        await auth.createDatabaseWithUserInfo(user)
    } catch (err) {
        console.log(err)
    }
})

exports.updateUserWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await auth.updateDatabaseWithUserInfo(req.body.uid, req.body.obj)
            res.status(200).send({status: 'Updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.getUserInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await auth.returnUserById(req.body.uid)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
