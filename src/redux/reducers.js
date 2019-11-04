/**
 * 包含n个reducer 函数，根据老的state,和指定的action返回新的state
 */

import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'
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
			const {type,header} = action.data
			return {...state, ...action.data,redirectTo: getRedirectTo(type,header)}
		case ERROR_MSG :
				return {...state, msg: action.data}	
		default:
				return state
	}
}


export default combineReducers({
	user
})