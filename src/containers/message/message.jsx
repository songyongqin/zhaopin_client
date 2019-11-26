import React, { Component } from 'react'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import { List, Badge } from 'antd-mobile'
const Item = List.Item 
const Brief = Item.Brief

class Message extends Component {

  getMsg = () => {
    const {user} = this.props
    const userid = user._id
    //获取所有评论，分组，取最后一条
    const {chatMsgs} = this.props.chat
    let lastMsgObjs = {}
    chatMsgs.forEach(msg => {
      if(!msg.read && userid===msg.to) {
        // 指定 msg 上的未读数量为 1 
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }
      if(!lastMsgObjs[msg.chat_id]) {//如果没有
        lastMsgObjs[msg.chat_id] = msg
      } else {
        const unReadCount = msg.unReadCount + lastMsgObjs[msg.chat_id].unReadCount
        if(msg.create_time > lastMsgObjs[msg.chat_id].create_time) {
          lastMsgObjs[msg.chat_id] = msg
        }
        lastMsgObjs[msg.chat_id].unReadCount = unReadCount
      }
    })
    //得到最后一条评论的数组
    const lastMsgs = Object.values(lastMsgObjs)
    //对数组降序排列
    lastMsgs.sort((msg1,msg2) => {
      return msg2.create_time - msg1.create_time
    })
    return lastMsgs
  }
  render() {
    const lastMsgs = this.getMsg()
    const {users} = this.props.chat
    return (
      <List style = {{marginTop: 50, marginBottom: 50}}>
        <QueueAnim type='right' delay={100}>
          {
            lastMsgs.map(msg => {
              const userid = this.props.user._id
              const targetId = msg.from === userid ? msg.to : msg.from
              const header = users[targetId].header
              const username = users[targetId].username
              const avatarImg = require(`../../components/head-selector/headers/${header}.png`)
              return (
                <Item
                  key={msg._id}
                  onClick={() => this.props.history.push(`/chat/${targetId}`)}
                  extra={<Badge text={msg.unReadCount}/>}
                  thumb={avatarImg}
                  arrow='horizontal'
                >
                  {msg.content}
                  <Brief>{username}</Brief>
                </Item>
              )
            })
          }
        </QueueAnim>
      </List>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)
