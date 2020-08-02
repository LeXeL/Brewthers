const admin = require('firebase-admin')
const db = admin.firestore()

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

async function createOrder(order) {
    let lastId = await getLastId()
    return db
        .collection('order')
        .doc()
        .set({
            id: parseInt(lastId.lastId),
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
        .then(() => {
            addToLastId()
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateOrder(id, Obj) {
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
    return db
        .collection('order')
        .doc(id)
        .update({status: status})
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
    createOrder,
    updateOrder,
    deleteOrder,
    returnAllOrdersFromUserId,
    returnOrderById,
    changeOrderStatus,
}
