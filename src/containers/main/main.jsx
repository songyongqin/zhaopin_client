import React, { Component } from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import './main.scss'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import NotFound from '../../components/not-found/not-found'
import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'

class Main extends Component {

	navList = [{ path: '/laoban',component: Laoban, title: '大神列表', icon: 'dashen', text: '大神'},
	{ path: '/dashen', component: Dashen, title: '老板列表', icon: 'laoban', text: '老板'},
	{ path: '/message', component: Message, title: '消息列表', icon: 'message', text: '消息'},
	{ path: '/personal', component: Personal, title: '用户中心', icon: 'personal', text: '个人'}]

	componentDidMount() {
		//如果cookie中存在userid并且redux中的user没有_id，发送请求给后台
		let userid = Cookies.get('userid')
		const {user} = this.props
		if(userid && !user._id) {
			this.props.getUser()
		}
	}
	render() {
		//查看cookie中是否有userid
		let userid = Cookies.get('userid')
		//如果cookie中没有userid，去登录页面
		if(!userid) {
			return <Redirect to='/login' />
		}
		//如果cookie中有userid，读取redux中user状态
		const {user} = this.props
		//如果user中没有_id 先返回Null  //，用它去发请求，看看redux中是否有_id,
		if(!user._id) {
			return null
		}
		//如果有_id，显示对应的界面
		//如果请求根路径，根据user的type和header来计算路径
		const path = this.props.location.pathname
		if(path === '/') {
			let path = getRedirectTo(user.type, user.header)
			return <Redirect to = {path} />
		}
		const {navList} = this
		let currentPath = this.props.location.pathname
		let currentNav = navList.find(nav => nav.path === currentPath)
		const {type} = this.props.user
		if(type === 'dashen') {
			navList[0].hide = true
		}else{
			navList[1].hide = true
		}
		const {unReadCount} = this.props
		return (
			<div style={{height:'100%'}}>
					{currentNav ? <NavBar className = 'nav-bar'>{currentNav.title}</NavBar> : null}
					<Switch>
						{navList.map((nav,index) => 
							<Route path={nav.path} component = {nav.component} key = {index}/>
						)}
						<Route path='/laoban_info' component = {LaobanInfo} />
						<Route path='/dashen_info' component = {DashenInfo} />
						<Route path='/chat/:userid' component = {Chat} />
						<Route component = {NotFound} />
					</Switch>
					{currentNav ? <NavFooter navList = {navList} unReadCount={unReadCount} /> : null}
			</div>
		)
	}
}

export default connect(
	state => ({user:state.user,unReadCount: state.chat.unReadCount}),
	{getUser}
)(Main)
