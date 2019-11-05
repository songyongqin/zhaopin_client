import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar,  WingBlank, WhiteSpace, List, InputItem, Radio, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const Item = List.Item
class Register extends Component {
	state = {
			username: '',
			password: '',
			repassword: '',
			type: 'dashen'
	}
	handleChange = (name,val) => {
			this.setState({
					[name]:val
			})
	}
	radioChange = (type,name) => {
			this.setState({
					[type]:name
			})
	}
	regiser = () => {
			this.props.register(this.state)
	}
	toLogin = () => {
		this.props.history.replace('/login')
	}
	render() {
		const {type} = this.state
		const {msg,redirectTo} = this.props.user
		if(redirectTo) {
			return <Redirect to={redirectTo} />
		}
		return (
			<div>
					<NavBar>安天直聘</NavBar>
					<Logo></Logo>
					<WingBlank>
						<List>
							{msg ? <div className="error-msg">{msg}</div> : null}
							<InputItem onChange = {val => this.handleChange('username',val)} >用户名:</InputItem>
							<WhiteSpace/>
							<InputItem type="password" onChange = {val => this.handleChange('password',val)}>密码:</InputItem>
							<WhiteSpace/>
							<InputItem type="password" onChange = {val => this.handleChange('repassword',val)}>确认密码:</InputItem>
							<Item>
									<span>用户类型</span>&nbsp;&nbsp;
									<Radio checked = {type === 'laoban'} onChange = {()=>this.radioChange('type','laoban')}>老板</Radio>&nbsp;&nbsp;
									<Radio checked = {type === 'dashen'} onChange = {()=>this.radioChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;
							</Item>
							<WhiteSpace/>
							<Button type="primary" onClick={this.regiser}>注册</Button>
							<WhiteSpace/>
							<Button onClick={this.toLogin}>已有账户</Button>
						</List>
					</WingBlank>
			</div>
		)
	}
}
export default connect(
    state => ({user:state.user}),
    {register}
)(Register)
