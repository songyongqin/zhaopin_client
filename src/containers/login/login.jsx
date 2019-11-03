import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import { NavBar,  WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    login = () => {
        this.props.login(this.state)
    }
    render() {
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
                        <Button type="primary" onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
