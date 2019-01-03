import React, { Component } from 'react'
import AppContainer from './containers/AppContainer'
import AppHeader from './components/appHeader.jsx'
import AppSidebar from './components/appSideBar.jsx'
import '../scss/index.scss'

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  openAppSideBar = () => {
    this.setState({ open: true })
  }

  closeAppSideBar = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state

    return (
      <div className="root">
        <AppHeader
          controlSidebar
          position="fixed"
          title="Population Management System"
          iconlabel="Open Sidebar"
          open={open}
          openSidebar={this.openAppSideBar}
        />
        <AppSidebar
          closeSidebar={this.closeAppSideBar}
          open={open}
        />
        <AppContainer open={open} />
      </div>
    )
  }
}

export default Root
