import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar,  TextareaItem, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import HeadSelector from '../../components/head-selector/head-selector'

class DashenInfo extends Component {
  handleChange = ()=>{

  }
  render() {
    return (
      <div>
        <NavBar>大神信息完善表</NavBar>
        <HeadSelector></HeadSelector>
        <List>
          <InputItem onChange = {val => this.handleChange('username',val)} >求职岗位:</InputItem>
          <WhiteSpace/>
          <TextareaItem rows={3} onChange = {val => this.handleChange('password',val)} title="个人介绍:" />
          <WhiteSpace/>
          <Button onClick={this.login} type = "primary">保存</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state => ({})
)(DashenInfo)
