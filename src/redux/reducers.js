/**
 * 包含n个reducer 函数，根据老的state,和指定的action返回新的state
 */

import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USERLIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-types'
import {getRedirectTo} from '../utils/index'

const initUser = {
	username: '',
	type: '',
	msg:'',
	redirectTo: '',
}
const user = (state = initUser,action) => {
	switch(action.type) {
		case AUTH_SUCCESS :
				const redirectTo = getRedirectTo(action.data.type, action.data.header)
				return {...action.data, redirectTo}
		case ERROR_MSG :
				return {...state, msg: action.data}
		case RECEIVE_USER :
			return action.data
		case RESET_USER :
			return {...initUser, msg: action.data}			
		default:
				return state
	}
}

const initUserList = []
const userList = (state = initUserList, action) => {
	switch(action.type) {
		case RECEIVE_USERLIST:
			return action.data
		default:
			return state
	}
}

const initChat = {
	users:{},
	chatMsgs:[],
	unReadCount: 0
}

const chat = (state = initChat, action) => {
	switch(action.type){
		case RECEIVE_MSG_LIST:
			const {chatMsgs, users, userid} = action.data
			return {
				chatMsgs,
				users,
				unReadCount: chatMsgs.reduce((propTotal, msg) => {
					return propTotal + (!msg.read && msg.to === userid ? 1 :0)
				},0)
			}
		case RECEIVE_MSG: 
			const {chatMsg} = action.data
			return {
				users:state.users,
				chatMsgs: [...state.chatMsgs, chatMsg],
				unReadCount: state.unReadCount + ((!chatMsg.read && chatMsg.to === action.data.userid) ? 1 :0)
			}
		case MSG_READ:
			const {from, to, count} = action.data

			return {
				users:state.users,
				chatMsgs: state.chatMsgs.map(msg => {
					if(msg.from === from && msg.to === to && !msg.read){
						return {...msg, read:true}
					} else {
						return msg
					}
				}),
				unReadCount: state.unReadCount - count
			}	
		default:
			return state
	}
}

export default combineReducers({
	user,
	userList,
	chat
})