import axios from 'axios'
let baseUrl
if (process.env.NODE_ENV == 'production') {
    baseUrl = 'https://us-central1-brewthers-91a52.cloudfunctions.net'
} else {
    baseUrl = 'http://localhost:5000/brewthers-91a52/us-central1'
}
export default class Request {
    static post(url, data, headers) {
        return Request.httpCall('post', url, data, headers)
    }
    static put(url, data, headers) {
        return Request.httpCall('put', url, data, headers)
    }
    static get(url, headers) {
        return Request.httpCall('get', url, null, headers)
    }
    static delete(url, data, headers) {
        return Request.httpCall('delete', url, data, headers)
    }

    static httpCall(method, url, data, headers) {
        let config = {
            method: method,
            baseURL: baseUrl,
            url: url,
            data: data,
            headers: headers,
        }

        if (method === 'get' || data === null) {
            delete config.data
        }

        if (!headers) {
            delete config.headers
        }

        return axios(config)
    }
}
