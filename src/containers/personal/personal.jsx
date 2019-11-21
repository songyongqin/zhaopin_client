import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile' 
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'


const alert = Modal.alert;
const Item = List.Item 
const Brief = Item.Brief 



class Personal extends React.Component {

  handleSignout = () => {
    alert('退出', '确认退出登录吗?', [
      { text: '取消'},
      { text: '确认', onPress: () => {
        //去除cookie中userid
        Cookies.remove('userid')
        //重置redux中的user
        this.props.resetUser()
      }},
    ])
  }

  render() {
    const {header, post, info, username, salary, company} = this.props.user
    return (
      <div style={{marginTop:'45px'}}> 
        <Result img={<img src={require(`../../components/head-selector/headers/${header}.png`)} style={{width: 50}} alt="header"/>} title={username} message= {company} />
          <List renderHeader={() => '相关信息'}> 
            <Item multipleLine> 
              <Brief>职位: {post}</Brief> 
              <Brief>简介: {info}</Brief>
              {
                salary ? <Brief>薪资: {salary}</Brief> : null
              }
               
            </Item> 
          </List> 
          <WhiteSpace/> 
          <List> 
            <Button type='warning' onClick={this.handleSignout}>退出登录</Button> 
          </List> 
      </div> 
    ) 
  } 
}
export default connect(
  state => ({user:state.user}),
  {resetUser}
)(Personal)