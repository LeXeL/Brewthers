const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Create User on the database
exports.createUserOnDatabase = functions.auth.user().onCreate(user => {
    console.log(`Called on user: ${JSON.stringify(user)}`)
})
