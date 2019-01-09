import React from 'react'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

function renderSubLocations(location) {
  const { subLocations } = location
  const hasSubLocations = subLocations.length > 0
  const renderSubLocations = hasSubLocations ? (
    <div>
      {
        subLocations.map(subLocation => (
          <span
            key={subLocation.id}
          >
            {subLocation.name}
          </span>
        ))
      }
    </div>
  ) : (<span>None</span>)
  return (
    <div>
      <Typography variant="subtitle1" color="textSecondary">
        Sub Locations
      </Typography>
      {renderSubLocations}
    </div>
  )
}

function LocationCardContent(props) {
  const { classes, location } = props
  return (
    <CardContent className={`${classes.cardContent} location__card__description`}>
      <div className="gender--breakdown">
        <div>
          <strong>F:</strong>
          <span>{location.numberOfFemales}</span>
        </div>
        <div>
          <strong>M:</strong>
          <span>{location.numberOfMales}</span>
        </div>
      </div>
      {renderSubLocations(location)}
    </CardContent>
  )
}

LocationCardContent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default LocationCardContent
