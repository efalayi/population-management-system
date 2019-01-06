import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import AppContainer from './containers/AppContainer'
import AppHeader from './components/appHeader.jsx'
import AppSidebar from './components/appSideBar.jsx'
import routes from '../routes'
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
      <BrowserRouter basename='/'>
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
          <Switch>
            {
              routes.map((route) => (
                <AppContainer
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  open={open}
                />
              ))
            }
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Root
