const admin = require('firebase-admin')
const db = admin.firestore()

async function createProduct(product) {
    console.log(product)
    return db
        .collection('product')
        .doc()
        .set({
            name: product.name,
            style: product.style,
            type: product.type,
            brewery: product.brewery,
            abv: product.abv,
            ibu: product.ibu,
            description: product.description,
            photoLocation: product.photoLocation,
            price: product.price,
            inventory: 0,
            status: 'active', //active, inactive
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateProduct(id, Obj) {
    return db
        .collection('product')
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
async function deleteProduct(id) {
    return db
        .collection('product')
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
async function returnAllProducts() {
    let products = []
    await db
        .collection('product')
        .where('status', '==', 'active')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                products.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return products
}
async function returnProductById(id) {
    return db
        .collection('product')
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

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    returnAllProducts,
    returnProductById,
}
