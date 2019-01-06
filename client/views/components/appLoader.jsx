import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

function AppLoader(props) {
  const { classes } = props
  return (
    <CircularProgress className={classes.progress} />
  )
}

AppLoader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default AppLoader