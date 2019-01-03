import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import appStyles from '../appStyles'

// eslint-disable-next-line react/prefer-stateless-function
class AppContainer extends Component {
  render() {
    const { classes, open } = this.props
    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: open,
      })}
      >
        <div>App Container</div>
      </main>
    )
  }
}


AppContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired
}

export default withStyles(appStyles, { withTheme: true })(AppContainer)
