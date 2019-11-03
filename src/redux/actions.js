/** 
 * 包含多个action creator
 * 同步action
 * 异步action
*/
import {reqRegister, reqLogin} from '../api/index'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'

const  authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const  errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

export const  register =  (user) => {
  const {username,password,repassword} = user
  if(!username) {
    return errorMsg('用户名不能为空')
  }
  if(password !== repassword) {
    return errorMsg('两次密码不一致')
  }
  return async dispatch => {
    const res = await reqRegister(user)
    const data = res.data
    if(data.code === 0) {
      //成功回调
      dispatch(authSuccess(data.data))
    }else {
      //失败回调
      dispatch(errorMsg(data.msg))
    }
  }
}

export const  login = (user) => {
  const {username,password} = user
  if(!username) {
    return errorMsg('用户名不能为空')
  }
  if(!password) {
    return errorMsg('密码不能为空')
  }
  return async dispatch => {
    const res = await reqLogin(user)
    const data = res.data
    if(data.code === 0) {
      //成功回调
      dispatch(authSuccess(data.data))
    }else {
      //失败回调
      dispatch(errorMsg(data.msg))
    }
  }
}