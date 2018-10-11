import axios from 'axios'
// import config from '../config/apiConfig'

// const commonPath = 'http://103.235.104.177:9000/'
const commonPath = 'http://localhost:9000/'

export function getService (serviceName) {
    const getUrl = commonPath + serviceName
    return axios.get(getUrl)
        .then(resp => {
            return resp.data
        })
}

export function postService (serviceName, payload) {
    const postUrl = commonPath + serviceName
    return axios.post(postUrl, payload)
        .then(resp => {
            return resp.data
        })
}

