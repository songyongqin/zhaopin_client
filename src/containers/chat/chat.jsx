import React, {Component} from 'react' 
import './index.scss'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg,readMsg} from '../../redux/actions'
const Item = List.Item 


class Chat extends Component { 

  constructor(props) {
    super(props)
    this.emojis = [
      '😀', '😃', '😁', '🤣', '🙂', '😂', '😜', '😴',
      '😀', '😃', '😁', '🤣', '🙂', '😂', '😜', '😴',
      '😀', '😃', '😁', '🤣', '🙂', '😂', '😜', '😴'
    ]
    this.emojis = this.emojis.map(emoji => ({text: emoji}))
  }

  state = {
    content: '',
    isShow: false
  }

  send = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if(content) {
      this.props.sendMsg(from, to, content)
      this.setState({
        content: ''
      })
    }
  }

  toggleShow = () => {
    const {isShow} = this.state
    this.setState({
      isShow: !isShow
    })
    if(isShow) {
      setTimeout(
        () => { window.dispatchEvent(new Event('resize')) 
      }, 0)
    }
  }
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate () { 
    // 更新显示列表 
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from,to)
  }

  render() { 
    const {user} = this.props
    //获得所有聊天记录
    const {chatMsgs, users} = this.props.chat
    //找出与自己有关的msgs
    const userid = user._id
    const target = this.props.match.params.userid
    const chatid = [userid,target].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatid)
    let header = ''
    if(users[target]) {
      header = require(`../../components/head-selector/headers/${users[target].header}.png`)
    }
    const {isShow} = this.state
    return ( 
      <div id='chat-page' style={{height:'100%'}}> 
        <NavBar 
          onLeftClick={() => this.props.history.goBack()}
          style={{position:"fixed",top:0,width:'100%',zIndex:2}}
          icon={<Icon type="left"/>}
        >{users[target]? users[target].username:''}</NavBar> 
        
        <List style={{marginBottom:44, marginTop: 45}}>
          {
            msgs.map(msg => {
              if(msg.from === target) {
                return <Item key={msg._id} thumb={header}>{msg.content}</Item>
              } else {
                return <Item key={msg._id} className='chat-me' extra='我' >{msg.content}</Item>
              }
            })
          }
        </List> 
        <div style={{position:'fixed', bottom:'0', width:'100%'}} > 
          <InputItem
            placeholder="请输入" 
            value = {this.state.content} 
            onChange = { val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span style={{marginRight:5}} onClick = {this.toggleShow}>☺</span>
                <span onClick = {this.send}>发送</span>
              </span>
            }
          /> 
          {
            isShow ? 
            <Grid
              data={this.emojis} 
              columnNum={8} 
              onClick={(item) => { this.setState({content: this.state.content + item.text}) }} 
            />
            :
            null
          }    
        </div>
      </div>
    ) 
  } 
}
export default connect(
  state => ({user:state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)