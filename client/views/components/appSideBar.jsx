import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import appStyles from '../appStyles'
import routes from '../../routes'

function AppSideBar(props) {
  const { classes, closeSidebar, open, theme } = props
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={closeSidebar}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map((route, index) => (
          <Link
            key={route.name}
            to={{
              pathname: `${route.path}`
            }} 
          >
            <ListItem button>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={route.sidebarText} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

AppSideBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  closeSidebar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  theme: PropTypes.shape({}).isRequired
}

export default withStyles(appStyles, { withTheme: true })(AppSideBar)
