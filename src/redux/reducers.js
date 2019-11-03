/**
 * 包含n个reducer 函数，根据老的state,和指定的action返回新的state
 */

import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'

const initUser = {
	username: '',
	type: '',
	msg:'',
	redirectTo: ''
}
// const reqLogin = (state = initUser,action) => {
// 	switch(action.type) {
// 		case AUTH_SUCCESS :
// 			return {...action.data}
// 		case ERROR_MSG :
// 				return {...state, msg: action.data}	
// 		default:
// 				return state
// 	}
// }

const user = (state = initUser,action) => {
	switch(action.type) {
		case AUTH_SUCCESS :
			return {...state, ...action.data,redirectTo:'/'}
		case ERROR_MSG :
				return {...state, msg: action.data}	
		default:
				return state
	}
}


export default combineReducers({
	user
})