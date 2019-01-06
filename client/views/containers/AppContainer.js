import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import appStyles from '../appStyles'

class AppContainer extends React.PureComponent {
  render() {
    const { classes, open, path, exact, component, theme } = this.props
    const CurrentPage = component

    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: open,
      })}
      >
        <Route
          path={path}
          exact={exact}
          render={props => (
            <CurrentPage {...props} classes={classes} theme={theme} />
          )
          }
        />
      </main>
    )
  }
}


AppContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  theme: PropTypes.shape({}).isRequired
}

export default withStyles(appStyles, { withTheme: true })(withRouter(AppContainer))
