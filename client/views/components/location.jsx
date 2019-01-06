import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import cardStyles from './styles/cardStyles'

function Location(props) {
  const { classes, name, numberOfFemales, numberOfMales, subLocations, totalResidents } = props
  const hasSubLocations = subLocations.length > 0

  function renderSubLocations() {
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

  return (
    <Card className="location">
      <CardHeader
        className="location__header"
        title={name}
        subheader={`Total Residents: ${totalResidents}`}
      />
      <CardContent className={`${classes.cardContent} location__description`}>
        <div className="gender--breakdown">
          <div>
            <strong>F:</strong>
            <span>{numberOfFemales}</span>
          </div>
          <div>
            <strong>M:</strong>
            <span>{numberOfMales}</span>
          </div>
        </div>
        {renderSubLocations()}
      </CardContent>
    </Card>
  )
}

Location.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  numberOfFemales: PropTypes.number.isRequired,
  numberOfMales: PropTypes.number.isRequired,
  subLocations: PropTypes.array.isRequired,
  totalResidents: PropTypes.number.isRequired
}

export default withStyles(cardStyles)(Location)
