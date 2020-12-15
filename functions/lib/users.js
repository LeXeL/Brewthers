const admin = require('firebase-admin')
const db = admin.firestore()
const email = require('../lib/emailHandler')

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
    let body = await email.templateHandler('User-01', obj)
    email.sendEmail(obj.email, 'Solicitud – MovingBeer 😎', body)
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
            cart: [],
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
async function createAdminUserInformation(obj) {
    try {
        admin
            .auth()
            .createUser({
                email: obj.email,
                password: obj.password,
            })
            .then(userRecord => {
                console.log('Successfully created new user:', userRecord.uid)
                db.collection('users')
                    .doc(userRecord.uid)
                    .set({
                        cart: [],
                        name: obj.name,
                        lastName: obj.lastName,
                        creationTime: Date.now(),
                        email: obj.email,
                        role: 'admin',
                        status: 'approved',
                        logs: [],
                    })
                    .then(() => {
                        console.log('Document successfully written!')
                        return 'Succesfull'
                    })
            })
            .catch(error => {
                console.log('Error creating new user:', error)
            })
    } catch (error) {
        console.log(error)
        return error
    }
}
async function createBreweryUserInformation(obj) {
    //TODO: enviar correo de bienvenida
    try {
        admin
            .auth()
            .createUser({
                email: obj.email,
                password: obj.password,
            })
            .then(userRecord => {
                console.log('Successfully created new user:', userRecord.uid)
                db.collection('users')
                    .doc(userRecord.uid)
                    .set({
                        brewingHouseName: obj.brewingHouseName,
                        cart: [],
                        creationTime: Date.now(),
                        name: obj.name,
                        lastName: obj.lastName,
                        ruc: obj.ruc,
                        email: obj.email,
                        contactPhone: obj.phone,
                        breweryId: obj.breweryId,
                        role: 'brewery',
                        status: obj.status,
                        logs: [],
                    })
                    .then(() => {
                        console.log('Document successfully written!')
                        return 'Succesfull'
                    })
            })
            .catch(error => {
                console.log('Error creating new user:', error)
            })
    } catch (error) {
        console.log(error)
        return error
    }
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
async function returnApprovedUser() {
    let users = []
    await db
        .collection('users')
        .where('role', '==', 'user')
        .where('status', '==', 'approved')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })

    return users
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
async function updateToAproveUser(uid, userObj) {
    let body = await email.templateHandler('User-02', userObj)
    email.sendEmail(
        userObj.email,
        'Su cuenta de MovingBeer ha sido aprobada 🙌🏼',
        body
    )

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
async function updateToRejectUser(uid, userObj) {
    let body = await email.templateHandler('User-03', userObj)
    email.sendEmail(
        userObj.email,
        'Su cuenta de MovingBeer ha sido rechazada 😭',
        body
    )
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
async function addToShoppingCart(uid, itemObj) {
    console.log(
        `el user: ${uid} esta agregando al carrito: ${itemObj.name} con una cantidad de ${itemObj.amount}`
    )
    return db
        .collection('users')
        .doc(uid)
        .update({cart: admin.firestore.FieldValue.arrayUnion(itemObj)})
        .then(() => {
            console.log('Document successfully added!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function removeFromShoppingCart(uid, itemObj) {
    return db
        .collection('users')
        .doc(uid)
        .update({cart: admin.firestore.FieldValue.arrayRemove(itemObj)})
        .then(() => {
            console.log('Document successfully removed!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function clearShoppingCart(uid) {
    return db
        .collection('users')
        .doc(uid)
        .update({cart: []})
        .then(() => {
            console.log('Document successfully cleared!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function updateShoppingCart(uid, itemObj, itemIndex) {
    console.log(itemObj)
    let userInformation = await returnUserById(uid)
    let itemInCart = userInformation.cart[itemIndex]
    itemInCart.amount = itemObj.amount
    return db
        .collection('users')
        .doc(uid)
        .update({cart: userInformation.cart})
        .then(() => {
            console.log('Document successfully added!')
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
    createAdminUserInformation,
    createBreweryUserInformation,
    returnUserById,
    returnApprovedUser,
    updateUserInfo,
    updateToAproveUser,
    updateToRejectUser,
    addToShoppingCart,
    removeFromShoppingCart,
    clearShoppingCart,
    updateShoppingCart,
}
