import axios from 'axios'

let instance=axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true
})

export  function getrcode(data) {
    return instance({
        url:'/sendsms',
        data:data,
        method:'post'
    })
}

export function registerUser(data) {
    return instance({
        url:"/register",
        method:"post",
        data
    })
}
