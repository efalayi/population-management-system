import React from 'react'
import PropTypes from 'prop-types'
import CardActions from '@material-ui/core/CardActions'
import DeleteLocation from '../modals/deleteLocation.jsx'
import UpdateLocation from '../modals/updateLocation.jsx'

function LocationCardActions(props) {
  const { classes, deleteLocationHandler, location, updateLocationHandler } = props

  return (
    <CardActions className={classes.cardActions}>
      <UpdateLocation
        location={location}
        updateLocationHandler={updateLocationHandler}
      />
      <DeleteLocation
        location={location}
        deleteLocationHandler={deleteLocationHandler}
      />
    </CardActions>
  )
}

LocationCardActions.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  deleteLocationHandler: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  updateLocationHandler: PropTypes.func.isRequired
}

export default LocationCardActions