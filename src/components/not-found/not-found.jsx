import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'

class NotFound extends Component {
  render() {
    return (
      <div>
        NotFound
        <Button onClick = {()=>{this.props.history.replace('/')}} type='primary'>返回首页</Button>
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(NotFound)
