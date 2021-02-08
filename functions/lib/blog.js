const admin = require('firebase-admin')
const db = admin.firestore()
const email = require('../lib/emailHandler')

async function addToNewsletter(userEmail) {
    return db
        .collection('general')
        .doc('newsletter')
        .update({
            users: admin.firestore.FieldValue.arrayUnion({
                email: userEmail,
                status: 'active',
            }), //active, inactive
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
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
            publish: false,
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
            publish: false,
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
    console.log({id, Obj})
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
async function updateDeletedBlog(id, Obj) {
    Obj.status = 'deleted'
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
async function returnPublicBlogs() {
    let blogs = []
    await db
        .collection('blog')
        .where('status', '==', 'public')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                blogs.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return blogs
}
async function returnActiveEmailsInNewsletter() {
    let users = []
    await db
        .collection('general')
        .doc('newsletter')
        .get()
        .then(doc => {
            if (doc.exists) {
                users = doc.data()
            } else {
                console.log('Document no existe')
            }
        })
        .catch(error => {
            console.log(error)
        })
    return users.users
        .filter(user => user.status === 'active')
        .map(user => user.email)
}
async function notifyNewsletterUsersAboutNewPublicPost(id, post) {
    const users = await returnActiveEmailsInNewsletter()
    post.publish = true
    await updatePublicBlog(id, post)
    users.forEach(async user => {
        let body = await email.templateHandler('Blog-01', post)
        email.sendEmail(
            user.toString(),
            `Hey que xopa! Tenemos un nuevo post 🍻`,
            body
        )
    })
}
module.exports = {
    addToNewsletter,
    createDraftBlog,
    createPublictBlog,
    returnBlogById,
    updateDraftBlog,
    updatePublicBlog,
    updateDeletedBlog,
    returnPublicBlogs,
    notifyNewsletterUsersAboutNewPublicPost,
}
