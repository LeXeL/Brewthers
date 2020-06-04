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
