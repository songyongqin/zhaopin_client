/** 
 * 包含多个action creator
 * 同步action
 * 异步action
*/
import {reqRegister, reqLogin, reqUpdateUser, reqUser} from '../api/index'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from './action-types'

const  authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const  errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const  receiveUser = (user) => ({type: RECEIVE_USER, data: user})
const  resetUser = (msg) => ({type: RESET_USER, data: msg})


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
      console.log(data.data)
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
    const result = res.data
    if(result.code === 0) {
      console.log(result.data)
      //成功回调
      dispatch(authSuccess(result.data))
    }else {
      //失败回调
      dispatch(errorMsg(result.msg))
    }
  }
}

export const update = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code === 0) { //更新成功
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if(result.code === 0) { //更新成功
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}