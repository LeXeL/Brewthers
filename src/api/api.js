import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

//Auth
export const updateuserwithinfo = data =>
    Request.post('/updateUserWithInfo', data, {
        'Content-Type': 'application/json',
    })
export const getuserinformatiobyid = data =>
    Request.post('/getUserInformatioById', data, {
        'Content-Type': 'application/json',
    })
