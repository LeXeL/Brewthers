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
