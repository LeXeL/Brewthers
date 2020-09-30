import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

//USERS
export const updateuserwithinfo = data =>
    Request.post('/updateUserWithInfo', data, {
        'Content-Type': 'application/json',
    })
export const createuserondatabase = data =>
    Request.post('/createUserOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const getuserinformationbyid = data =>
    Request.post('/getUserInformationById', data, {
        'Content-Type': 'application/json',
    })
export const updateuserinformation = data =>
    Request.post('/updateUserInformation', data, {
        'Content-Type': 'application/json',
    })
export const updateToAproveUser = data =>
    Request.post('/updateToAproveUser', data, {
        'Content-Type': 'application/json',
    })
export const updateToRejectUser = data =>
    Request.post('/updateToRejectUser', data, {
        'Content-Type': 'application/json',
    })
export const updateadmininformation = data =>
    Request.post('/updateAdminWithInfo', data, {
        'Content-Type': 'application/json',
    })
export const addToShoppingCart = data =>
    Request.post('/addToShoppingCart', data, {
        'Content-Type': 'application/json',
    })
export const removeFromShoppingCart = data =>
    Request.post('/removeFromShoppingCart', data, {
        'Content-Type': 'application/json',
    })
export const clearShoppingCart = data =>
    Request.post('/clearShoppingCart', data, {
        'Content-Type': 'application/json',
    })
export const returnApprovedUser = data =>
    Request.post('/returnApprovedUser', data, {
        'Content-Type': 'application/json',
    })
export const updateShoppingCart = data =>
    Request.post('/updateShoppingCart', data, {
        'Content-Type': 'application/json',
    })

//BREWERY
export const createBreweryOnDatabase = data =>
    Request.post('/createBreweryOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const updateBreweryInformation = data =>
    Request.post('/updateBreweryInformation', data, {
        'Content-Type': 'application/json',
    })
export const deleteBreweryInformation = data =>
    Request.post('/deleteBreweryInformation', data, {
        'Content-Type': 'application/json',
    })
export const returnAllBrewerys = data =>
    Request.post('/returnAllBrewerys', data, {
        'Content-Type': 'application/json',
    })

//PRODUCT
export const createProductOnDatabase = data =>
    Request.post('/createProductOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const updateProductInformation = data =>
    Request.post('/updateProductInformation', data, {
        'Content-Type': 'application/json',
    })
export const deleteProductInformation = data =>
    Request.post('/deleteProductInformation', data, {
        'Content-Type': 'application/json',
    })
export const returnAllProducts = data =>
    Request.post('/returnAllProducts', data, {
        'Content-Type': 'application/json',
    })
export const getProductInformationById = data =>
    Request.post('/getProductInformationById', data, {
        'Content-Type': 'application/json',
    })

//ORDER
export const createOrdersOnDatabase = data =>
    Request.post('/createOrdersOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const updateOrdersInformation = data =>
    Request.post('/updateOrdersInformation', data, {
        'Content-Type': 'application/json',
    })
export const deleteOrdersInformation = data =>
    Request.post('/deleteOrdersInformation', data, {
        'Content-Type': 'application/json',
    })
export const returnAllOrdersFromUserId = data =>
    Request.post('/returnAllOrdersFromUserId', data, {
        'Content-Type': 'application/json',
    })
export const returnOrderById = data =>
    Request.post('/returnOrderById', data, {
        'Content-Type': 'application/json',
    })
export const changeOrderStatus = data =>
    Request.post('/changeOrderStatus', data, {
        'Content-Type': 'application/json',
    })
export const addToShoppingCartInOrder = data =>
    Request.post('/addToShoppingCartInOrder', data, {
        'Content-Type': 'application/json',
    })
export const removeFromShoppingCartInOrder = data =>
    Request.post('/removeFromShoppingCartInOrder', data, {
        'Content-Type': 'application/json',
    })
export const updateShoppingCartInOrder = data =>
    Request.post('/updateShoppingCartInOrder', data, {
        'Content-Type': 'application/json',
    })

//BLOG
export const createDraftBlogInDataBase = data =>
    Request.post('/createDraftBlogInDataBase', data, {
        'Content-Type': 'application/json',
    })
export const createPublicBlogInDataBase = data =>
    Request.post('/createPublicBlogInDataBase', data, {
        'Content-Type': 'application/json',
    })
export const getBlogById = data =>
    Request.post('/getBlogById', data, {
        'Content-Type': 'application/json',
    })
export const updateBlog = data =>
    Request.post('/updateBlog', data, {
        'Content-Type': 'application/json',
    })
export const updateDeletedBlog = data =>
    Request.post('/updateDeletedBlog', data, {
        'Content-Type': 'application/json',
    })
export const returnPublicBlogs = data =>
    Request.post('/returnPublicBlogs', data, {
        'Content-Type': 'application/json',
    })
export const addToNewsletter = data =>
    Request.post('/addToNewsletter', data, {
        'Content-Type': 'application/json',
    })
