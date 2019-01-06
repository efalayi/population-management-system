import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'

const AppRouter = () => {
  return (
    <Switch>
      {
        routes.map((route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )
        })
      }
    </Switch>
  )
}


export default AppRouter