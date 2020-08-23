const admin = require('firebase-admin')
const db = admin.firestore()
const email = require('../lib/emailHandler')
const product = require('../lib/product')
const users = require('../lib/users')

async function addToLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .update({lastId: admin.firestore.FieldValue.increment(1)})
}
async function getLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .get()
        .then(doc => {
            return doc.data()
        })
}
async function substractAmout(id) {
    let order = await returnOrderById(id)
    order.cart.forEach(element => {
        product.substractInventoryFromProduct(element.id, element.amount)
    })
}
async function reCalculateTotalAndAmount(id) {
    let order = await returnOrderById(id)
    let total = 0
    let amount = 0
    order.cart.forEach(element => {
        total += parseFloat(element.price) * element.amount
        amount += element.amount
    })
    updateOrder(id, {
        total: parseFloat(total) + parseFloat(order.itbms),
        amount: amount,
    })
}

async function createOrder(order) {
    let lastId = await getLastId()
    order.id = parseInt(lastId.lastId)

    return db
        .collection('order')
        .doc()
        .set({
            id: order.id,
            restaurantId: order.restaurantId,
            cart: order.cart,
            paymentProof: order.paymentProof ? order.paymentProof : [],
            total: order.total,
            itbms: order.itbms,
            logs: order.logs ? [Date.now(), order.logs] : [Date.now()],
            paymentMethod: order.paymentMethod,
            amount: order.amount,
            status: 'review', //review, preparation, onroute, delivered, completed, cancel
        })
        .then(async () => {
            addToLastId()
            let restaurantInfo = await users.returnUserById(order.restaurantId)
            order.restaurantId = restaurantInfo
            let body = await email.templateHandler('Order-01', order)
            email.sendEmail(
                order.restaurantId.email,
                'Hemos recibido tu orden 🍻',
                body
            )
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateOrder(id, Obj) {
    if (Obj.logs && Obj.logs[Obj.logs.length - 1].action === 'Cancel Order') {
        let order = await returnOrderById(id)
        let restaurantInfo = await users.returnUserById(order.restaurantId)
        order.restaurantId = restaurantInfo
        order.logs = Obj.logs
        let body = await email.templateHandler('Order-04', order)
        email.sendEmail(
            order.restaurantId.email,
            'Tu orden ha sido rechazada ❌',
            body
        )
    }
    return db
        .collection('order')
        .doc(id)
        .update(Obj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function deleteOrder(id) {
    return db
        .collection('order')
        .doc(id)
        .delete()
        .then(() => {
            console.log('Document successfully deleted!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllOrdersFromUserId(id) {
    let orders = []
    await db
        .collection('order')
        .where('restaurantId', '==', id)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                orders.push({...doc.data(), firebaseId: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return orders
}
async function returnOrderById(id) {
    return db
        .collection('order')
        .doc(id)
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
async function changeOrderStatus(id, status) {
    console.log(`Request to change order: ${id} to the new status ${status}`)
    var that = status
    return db
        .collection('order')
        .doc(id)
        .update({status: status})
        .then(async () => {
            console.log('Document successfully written!')
            if (that === 'preparation') {
                substractAmout(id)
                let order = await returnOrderById(id)
                let restaurantInfo = await users.returnUserById(
                    order.restaurantId
                )
                order.restaurantId = restaurantInfo
                let body = await email.templateHandler('Order-02', order)
                email.sendEmail(
                    order.restaurantId.email,
                    'Tu orden de Brewthers esta en preparacion 📦',
                    body
                )
            }
            if (that === 'onroute') {
                let order = await returnOrderById(id)
                let restaurantInfo = await users.returnUserById(
                    order.restaurantId
                )
                order.restaurantId = restaurantInfo
                let body = await email.templateHandler('Order-03', order)
                email.sendEmail(
                    order.restaurantId.email,
                    'Tu orden de Brewthers esta en camino 🚚',
                    body
                )
            }

            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}

async function addToShoppingCartInOrder(uid, itemObj) {
    return db
        .collection('order')
        .doc(uid)
        .update({cart: admin.firestore.FieldValue.arrayUnion(itemObj)})
        .then(() => {
            console.log('Document successfully added!')
            reCalculateTotalAndAmount(uid)
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function removeFromShoppingCartInOrder(uid, itemObj) {
    let workingOrder = await returnOrderById(uid)
    return db
        .collection('order')
        .doc(uid)
        .update({
            cart: workingOrder.cart.filter(order => {
                if (order.id !== itemObj.id) {
                    return order
                }
            }),
        })
        .then(() => {
            console.log('Document successfully removed!')
            reCalculateTotalAndAmount(uid)
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    returnAllOrdersFromUserId,
    returnOrderById,
    changeOrderStatus,
    addToShoppingCartInOrder,
    removeFromShoppingCartInOrder,
}
