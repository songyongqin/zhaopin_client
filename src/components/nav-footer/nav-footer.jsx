import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

import PropType from 'prop-types'

const Item = TabBar.Item
class NavFooter extends Component {
  static propType = {
    navList: PropType.func.isRequired
  }
  render() {
    const {pathname} = this.props.location
    return (
      <div>
        <TabBar>
          { this.props.navList.map((nav) => 
            <Item
            key = {nav.path}
            title={nav.title} 
            icon={{uri:require(`./imgs/${nav.icon}.png`)}}
            selectedIcon = {{uri:require(`./imgs/${nav.icon}-selected.png`)}}
            selected = {pathname === nav.path}
            onPress = {() => {this.props.history.replace(nav.path)}} />
          )}
        </TabBar>
      </div>
    )
  }
}
export default withRouter(NavFooter)
