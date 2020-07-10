const admin = require('firebase-admin')
const db = admin.firestore()

async function createDatabaseWithUserInfo(user) {
    return db
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            creationTime: Date.now(),
            role: 'user',
            status: 'pending', //pending, approved, rejected
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}

async function updateDatabaseWithUserInfo(uid, obj) {
    return db
        .collection('users')
        .doc(uid)
        .update({
            name: obj.name,
            lastName: obj.lastName,
            restaurantName: obj.restaurantName,
            contactPhone: obj.contactPhone,
            address: obj.address,
            location: obj.location,
            logs: [],
            ruc: obj.ruc,
        })
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function updateDatabaseWithAdminInfo(uid, obj) {
    console.log(`UID: ${uid}`)
    console.log(`obj: ${obj}`)
    return db
        .collection('users')
        .doc(uid)
        .update({
            name: obj.name,
            lastName: obj.lastName,
            role: 'admin',
            status: 'approved',
        })
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnUserById(uid) {
    return db
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data()
            } else {
                console.log('Document no existe')
            }
        })
        .catch(error => {
            return error
        })
}
async function updateUserInfo(uid, userObj) {
    return db
        .collection('users')
        .doc(uid)
        .update(userObj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}

module.exports = {
    createDatabaseWithUserInfo,
    updateDatabaseWithUserInfo,
    updateDatabaseWithAdminInfo,
    returnUserById,
    updateUserInfo,
}
