/** 
 * redux最核心的管理状态模块
*/
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import combineReducers from './reducers'

//向外暴露store对象
export default  createStore(combineReducers,composeWithDevTools(applyMiddleware(thunk)))

