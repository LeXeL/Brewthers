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
export const returnAllOrders = data =>
    Request.post('/returnAllOrders', data, {
        'Content-Type': 'application/json',
    })
