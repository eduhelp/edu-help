import axios from 'axios'
// import config from '../config/apiConfig'

export function getService (serviceName) {
    //const getUrl = config.users.commonPath + serviceName
    const getUrl = 'http://localhost:9000/' + serviceName
    return axios.get(getUrl)
        .then(resp => {
            return resp.data
        })
}

export function postService (serviceName, payload) {
    //const getUrl = config.users.commonPath + serviceName
    const postUrl = 'http://localhost:9000/' + serviceName
    return axios.post(postUrl, payload)
        .then(resp => {
            return resp.data
        })
}

