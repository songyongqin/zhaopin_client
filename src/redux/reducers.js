/**
 * 包含n个reducer 函数，根据老的state,和指定的action返回新的state
 */

import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USERLIST} from './action-types'
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

export default combineReducers({
	user,
	userList
})