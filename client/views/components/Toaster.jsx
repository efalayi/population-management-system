import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import toasterStyles from './styles/toasterStyles'

function SnackbarContentWrapper(props) {
  const { classes, className, message, onClose, variant, ...other } = props

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby={`${variant} snackbar`}
      message={(
        <span id={`${variant} snackbar`} className={classes.message}>
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.icon}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

SnackbarContentWrapper.defaultProps = {
  className: ''
}

SnackbarContentWrapper.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
}

function Toaster(props) {
  const { classes, open, handleClose, type, message } = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContentWrapper
        classes={classes}
        onClose={handleClose}
        variant={type}
        message={message}
      />
    </Snackbar>
  )
}

Toaster.defaultProps = {
  message: ''
}

Toaster.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string
}

export default withStyles(toasterStyles)(Toaster)
