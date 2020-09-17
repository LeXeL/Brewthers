const admin = require('firebase-admin')
const db = admin.firestore()

async function createDraftBlog(blogInfo) {
    return db
        .collection('blog')
        .doc()
        .set({
            bannerLocation: blogInfo.bannerLocation,
            status: 'draft', //public, draft, deleted
            title: blogInfo.title,
            body: blogInfo.body,
            createdTime: blogInfo.createdTime,
            by: blogInfo.by,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function createPublictBlog(blogInfo) {
    return db
        .collection('blog')
        .doc()
        .set({
            bannerLocation: blogInfo.bannerLocation,
            status: 'public', //public, draft, deleted
            title: blogInfo.title,
            body: blogInfo.body,
            createdTime: blogInfo.createdTime,
            by: blogInfo.by,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function returnBlogById(id) {
    return db
        .collection('blog')
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
async function updateDraftBlog(id, Obj) {
    Obj.status = 'draft'
    return db
        .collection('blog')
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
async function updatePublicBlog(id, Obj) {
    Obj.status = 'public'
    return db
        .collection('blog')
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
module.exports = {
    createDraftBlog,
    createPublictBlog,
    returnBlogById,
    updateDraftBlog,
    updatePublicBlog,
}
