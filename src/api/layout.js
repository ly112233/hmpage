import instance from './requst'
// import {getLocal} from '@/utils/local.js'

function grtUserInfo() {
    return instance({
        url: '/info',
        // headers: { token: getLocal() }
    })
}

function logout() {
    return instance({
        url:'/logout'
    })
}

export { grtUserInfo,logout }