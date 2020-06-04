const functions = require('firebase-functions')
const admin = require('firebase-admin')

const cors = require('cors')({
    origin: true,
})

admin.initializeApp()

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send('Hello from Firebase!')
// })

//Create User on the database
exports.createUserOnDatabase = functions.auth.user().onCreate(user => {
    try {
        db.collection('users')
            .doc(user.uid)
            .set({
                email: user.email,
                creationTime: user.metadata.creationTime,
                roll: 'user',
            })
            .then(function() {
                console.log('Document successfully written!')
            })
            .catch(function(error) {
                console.error('Error writing document: ', error)
            })
        return
    } catch (err) {
        console.log(err)
        return
    }
})

exports.updateUserWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let obj = req.body.obj
            db.collection('users')
                .doc(req.body.uid)
                .set({
                    name: obj.name,
                    lastName: obj.lastName,
                    restaurantName: obj.restaurantName,
                    contactPhone: obj.contactPhone,
                })
                .then(function() {
                    console.log('Document successfully written!')
                })
                .catch(function(error) {
                    console.error('Error writing document: ', error)
                })
            res.status(200).send({status: 'updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
