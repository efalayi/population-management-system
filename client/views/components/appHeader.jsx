import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import appStyles from '../appStyles'

const getAppHeaderProps = (controlSidebar, classes, open) => {
  const appHeaderProps = controlSidebar ? {
    headerClassName: classNames(classes.appBar, {
      [classes.appBarShift]: open,
    }),
    iconButtonClassName: classNames(classes.menuButton, open && classes.hide)
  } : {
      headerClassName: '',
      iconButtonClassName: classes.menuButton
  }

  return appHeaderProps
}

function AppHeader(props) {
  const { classes, controlSidebar, iconlabel,open, openSidebar, position, title } = props
  const headerProps = getAppHeaderProps(controlSidebar, classes, open)
  return (
    <AppBar position={position} className={headerProps.headerClassName}>
      <Toolbar>
        <IconButton
          className={headerProps.iconButtonClassName}
          color="inherit"
          aria-label={iconlabel}
          onClick={openSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  )
}

AppHeader.defaultProps = {
  controlSidebar: false,
  iconlabel: '',
  open: false,
  openSidebar: null,
  position: 'static',
  title: 'App Header Name'
}

AppHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  controlSidebar: PropTypes.bool,
  iconlabel: PropTypes.string,
  open: PropTypes.bool,
  openSidebar: PropTypes.func,
  position: PropTypes.string,
  title: PropTypes.string
}

export default withStyles(appStyles)(AppHeader)
