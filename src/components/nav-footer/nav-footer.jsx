import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { createPortal } from 'react-dom'

import PropType from 'prop-types'

const Item = TabBar.Item
class NavFooter extends Component {
  static propType = {
    navList: PropType.func.isRequired
  }
  node = window.document.createElement('div')
  componentDidMount() {
    window.document.body.appendChild(this.node)
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node)
  }
  render() {
    const {pathname} = this.props.location
    let {navList} = this.props
    navList = navList.filter(nav => nav.hide !== true)
    return (
      createPortal(
        <div style={{ position:'fixed', bottom:0, zIndex:10, width:'100%' }}>
          <TabBar>
            { navList.map((nav) => 
              <Item
              key = {nav.path}
              title={nav.title} 
              icon={{uri:require(`./imgs/${nav.icon}.png`)}}
              selectedIcon = {{uri:require(`./imgs/${nav.icon}-selected.png`)}}
              selected = {pathname === nav.path}
              onPress = {() => {this.props.history.replace(nav.path)}} />
            )}
          </TabBar>
        </div> ,this.node
      )
      // <TabBar>
      //   { navList.map((nav) => 
      //     <Item
      //     key = {nav.path}
      //     title={nav.title} 
      //     icon={{uri:require(`./imgs/${nav.icon}.png`)}}
      //     selectedIcon = {{uri:require(`./imgs/${nav.icon}-selected.png`)}}
      //     selected = {pathname === nav.path}
      //     onPress = {() => {this.props.history.replace(nav.path)}} />
      //   )}
      // </TabBar>
    )
  }
}
export default withRouter(NavFooter)
