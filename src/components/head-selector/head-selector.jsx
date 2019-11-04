import React, { Component } from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeadSelector extends Component {
  
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.headList = []
    for(let i=0;i<20;i++) {
      let text = '头像' + (i+1)
      this.headList.push({text,icon:require(`./headers/头像${i+1}.png`)})
    }
  }

  state = {
    icon: null
  }

  headChange = ({icon,text})=> {
    this.setState({
      icon: icon
    })
    this.props.setHeader(text)
  }

  render() {
    const {icon} = this.state
    const gridHeader = !icon ? '请选择头像' : (
      <div>
        <span>已选择头像</span>
        <img src={icon} alt="头像"/>
      </div>
    )
    return (
      <List renderHeader={() => gridHeader}>
        <Grid data = {this.headList} columnNum = {5} onClick = {obj => this.headChange(obj)} />
      </List>
    )
  }
}

