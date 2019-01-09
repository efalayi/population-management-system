import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Location from '../components/location/locationCard.jsx'
import AppLoader from '../components/appLoader.jsx'
import PageTitle from '../components/pageTitle.jsx'
import Toaster from '../components/Toaster.jsx'
import api from '../../api/api'
import '../../scss/pages/allLocations.scss'

class AllLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      isLoading: true,
      toasterProps: {
        open: false,
        type: 'success',
        message: ''
      }
    }
  }

  componentDidMount() {
    this.getLocations()
  }

  closeToaster = () => {
    this.setState((prevState) => (
      {
        toasterProps: Object.assign({}, prevState.toasterProps, {
          open: false
        })
      }
    ))
  }

  deleteLocation = async (locationId) => {
    const { deletedLocation, message } = await api.deleteLocation(locationId)
    const toasterProps = deletedLocation ? {
      type: 'success'
    } : {
      type: 'error'
    }
    toasterProps.message = message
    toasterProps.open = true
    this.setState(() => (
      {
        toasterProps
      }
    ))
    this.getLocations()
  }

  getLocations = async () => {
    const payload = await api.getLocations()
    this.setState(() => (
      {
        locations: payload.locations,
        isLoading: false
      }
    ))
  }

  updateLocation = async (locationId, previousLocationData, locationUpdate) => {
    const { location: updatedLocation, message, errors: updateErrors } = await api.updateLocation(locationId, previousLocationData, locationUpdate)
    const toasterProps = updatedLocation ? {
      type: 'success'
    } : {
        type: 'error'
      }
    toasterProps.message = message
    toasterProps.open = true
    this.setState(() => (
      {
        toasterProps
      }
    ))
    
    if (updateErrors) {
      return updateErrors
    } else {
      this.getLocations()
    }
  }

  renderLocations = () => {
    const { locations } = this.state
    if (locations.length === 0) {
      return (
        <div>
          No Locations Found
        </div>
      )
    }
    return (
      <div className="locations">
        {
          locations.map(location => {
            return (
              <Location
                key={location.id}
                location={location}
                deleteLocationHandler={this.deleteLocation}
                updateLocationHandler={this.updateLocation}
              />
            )
          })
        }
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { isLoading, toasterProps } = this.state
    if (isLoading) {
      return <AppLoader classes={classes} />
    }
    return (
      <div className="page__container">
        <PageTitle
          title="All Locations"
        />
        { this.renderLocations() }
        <Toaster
          open={toasterProps.open}
          type={toasterProps.type}
          message={toasterProps.message}
          handleClose={this.closeToaster}
        />
      </div>
    )
  }
}

AllLocations.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default AllLocations
