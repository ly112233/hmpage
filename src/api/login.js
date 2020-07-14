import instance from './requst'

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

// 登录接口
export function getLogin(data) {
  return instance({
    url:'/login',
    method:'post',
    data
  })
}
