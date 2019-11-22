/** 
 * 包含多个action creator
 * 同步action
 * 异步action
*/
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadChatMsg} from '../api/index'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USERLIST, RECEIVE_MSG_LIST, RECEIVE_MSG} from './action-types'
import io from 'socket.io-client'

const  authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const  errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const  receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const  resetUser = (msg) => ({type: RESET_USER, data: msg})

const receiveUserList = (userList) => ({type: RECEIVE_USERLIST, data:userList})
const receiveMsgList = ({chatMsgs, users}) => ({type: RECEIVE_MSG_LIST,data:{chatMsgs, users}})


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
      getMsgList(dispatch)
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
      getMsgList(dispatch)
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
      getMsgList(dispatch)
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    console.log(result)
    if(result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

function initIO(){
  if(!io.socket) {
    io.socket = io('ws://localhost:3000')
    io.socket.on('receiveMsg',(data) => {
      console.log('浏览器端接收到消息',data)
    })
  }
}

async function getMsgList(dispatch) { 
  initIO() 
  const response = await reqChatMsgList() 
  const result = response.data 
  if(result.code===0) { 
    console.log(result.data)
    const {chatMsgs, users} = result.data 
    dispatch(receiveMsgList({chatMsgs, users}))
  }
}

export const sendMsg = (from, to, content) => {
  return dispatch => {
    io.socket.emit('sendMsg',{from, to, content})
  }
}
