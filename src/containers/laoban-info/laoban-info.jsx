import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar,  TextareaItem, List, InputItem, Button } from 'antd-mobile'

import HeadSelector from '../../components/head-selector/head-selector'

class LaobanInfo extends Component {
  state = {
    header: '', //头像
    post: '', //职位
    info: '', //个人或者职位简介
    company: '', //公司名称
    salary: '' //薪资
  }
  handleChange = (type,val)=>{
    this.setState({
      [type]:val //type默认会当字符串处理，此出需要使用引用[type]
    })
  }
  setHeader = (header) => {
    this.setState({
      header: header
    })
  }
  save = () => {
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <NavBar>老板信息完善表</NavBar>
        <HeadSelector setHeader={this.setHeader} />
        <List>
          <InputItem onChange = {val => this.handleChange('post',val)} >招聘职位:</InputItem>
          <InputItem onChange = {val => this.handleChange('company',val)}>公司名称:</InputItem>
          <InputItem onChange = {val => this.handleChange('salary',val)}>职位薪资:</InputItem>
          <TextareaItem rows={3} onChange = {val => this.handleChange('info',val)} title="职位要求:" />
          <Button onClick={this.save} type = "primary">保存</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state => ({})
)(LaobanInfo)
