const admin = require('firebase-admin')
const db = admin.firestore()

async function createBrewery(brewer) {
    return db
        .collection('brewery')
        .doc()
        .set({
            name: brewer.name,
            photoLocation: brewer.photoLocation,
            status: 'active', //active, inactive
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateBrewery(id, Obj) {
    return db
        .collection('brewery')
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
async function deleteBrewery(id) {
    return db
        .collection('brewery')
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
async function returnAllBrewerys() {
    let brewery = []
    await db
        .collection('brewery')
        .where('status', '==', 'active')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                brewery.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return brewery
}

module.exports = {
    createBrewery,
    updateBrewery,
    deleteBrewery,
    returnAllBrewerys,
}
