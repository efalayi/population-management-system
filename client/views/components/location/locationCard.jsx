import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import LocationCardActions from './locationCardActions.jsx'
import LocationCardContent from './locationCardContent.jsx'
import LocationCardHeader from './locationCardHeader.jsx'
import cardStyles from '../styles/cardStyles'

function LocationCard(props) {
  const { classes, deleteLocationHandler, location, updateLocationHandler } = props

  return (
    <Card className="location__card">
      <LocationCardHeader
        location={location}
      />
      <LocationCardContent
        classes={classes}
        location={location}
      />
      <LocationCardActions
        location={location}
        classes={classes}
        deleteLocationHandler={deleteLocationHandler}
        updateLocationHandler={updateLocationHandler}
      />
    </Card>
  )
}

LocationCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  deleteLocationHandler: PropTypes.func.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    numberOfFemales: PropTypes.number.isRequired,
    numberOfMales: PropTypes.number.isRequired,
    subLocations: PropTypes.array.isRequired,
    totalResidents: PropTypes.number.isRequired
  }).isRequired,
  updateLocationHandler: PropTypes.func.isRequired
}

export default withStyles(cardStyles)(LocationCard)
