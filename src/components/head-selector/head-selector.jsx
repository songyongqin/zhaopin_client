import React, { Component } from 'react'
import {List, Grid} from 'antd-mobile'
export default class HeadSelector extends Component {
  
  constructor(props) {
    super(props)
    this.headList = []
    for(let i=0;i<20;i++) {
      let text = '头像' + i
      this.headList.push({text,icon:require(`./headers/头像${i+1}.png`)})
    }
  }
  render() {
    const gridHeader = '请选择头像'
    return (
      <List renderHeader={() => gridHeader}>
        <Grid data = {this.headList} columnNum = {5} />
      </List>
    )
  }
}

