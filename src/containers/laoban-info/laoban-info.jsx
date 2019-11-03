import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar,  TextareaItem, WhiteSpace, List, InputItem, Button } from 'antd-mobile'

import HeadSelector from '../../components/head-selector/head-selector'

class LaobanInfo extends Component {
  handleChange = ()=>{

  }
  render() {
    return (
      <div>
        <NavBar>老板信息完善表</NavBar>
        <HeadSelector></HeadSelector>
        <List>
          <InputItem onChange = {val => this.handleChange('username',val)} >招聘职位:</InputItem>
          <WhiteSpace/>
          <InputItem onChange = {val => this.handleChange('password',val)}>公司名称:</InputItem>
          <WhiteSpace/>
          <InputItem onChange = {val => this.handleChange('password',val)}>职位薪资:</InputItem>
          <WhiteSpace/>
          <TextareaItem rows={3} onChange = {val => this.handleChange('password',val)} title="职位要求:" />
          <WhiteSpace/>
          <Button onClick={this.login} type = "primary">保存</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state => ({})
)(LaobanInfo)
