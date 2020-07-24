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
            console.log(doc.data())
            return doc.data().lastId
        })
}

async function createOrder(order) {
    return db
        .collection('order')
        .doc()
        .set({
            id: parseInt(getLastId()),
            restaurantId: order.restaurantId,
            cart: order.cart,
            paymentProof: order.paymentProof ? order.paymentProof : [],
            total: order.total,
            itbms: order.itbms,
            logs: [Date.now()],
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
async function returnAllOrders() {
    let orders = []
    await db
        .collection('order')
        .where('status', '==', 'active')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                orders.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return orders
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    returnAllOrders,
}
