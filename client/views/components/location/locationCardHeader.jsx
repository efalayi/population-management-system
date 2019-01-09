import React from 'react'
import PropTypes from 'prop-types'
import CardHeader from '@material-ui/core/CardHeader'

function LocationCardHeader(props) {
  const { location } = props
  return (
    <CardHeader
      className="location__card__header"
      title={location.name}
      subheader={`Total Residents: ${location.totalResidents}`}
    />
  )
}

LocationCardHeader.propTypes = {
  location: PropTypes.shape({}).isRequired
}

export default LocationCardHeader
