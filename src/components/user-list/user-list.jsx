import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PropType from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile' 
const Header = Card.Header 
const Body = Card.Body

class UserList extends Component {
  static propType = {
    userList: PropType.array.isRequired
  }
  render() {
    return (
        <WingBlank style={{marginBottom:'50px', marginTop:'45px'}}> 
        <QueueAnim type='left' delay={100}>
          {
            this.props.userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/> 
                <Card  onClick = {() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header thumb={user.header ? require(`../head-selector/headers/${user.header}.png`) : null} extra={user.username} />
                  <Body> 
                    <div>职位: {user.post}</div> 
                    {user.company ? <div>公司: {user.company}</div> : null} 
                    {user.salary ? <div>月薪: {user.salary}</div> : null} 
                    <div>描述: {user.info}</div> 
                  </Body> 
                </Card> 
              </div> )
            )
          } 
        </QueueAnim>
        </WingBlank> 
    ) 
  } 
}
export default withRouter(UserList)

