import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Location from '../components/location.jsx'
import AppLoader from '../components/appLoader.jsx'
import PageTitle from '../components/pageTitle.jsx'
import api from '../../api/api'
import '../../scss/pages/allLocations.scss'

class AllLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      isLoading: true
    }
  }

  componentDidMount() {
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

  render() {
    const { classes } = this.props
    const { isLoading, locations } = this.state
    if (isLoading) {
      return <AppLoader classes={classes} />
    }
    return (
      <div>
        <PageTitle
          title="All Locations"
        />
        <div className="locations">

          {
            locations.map(location => {
              return (
                <Location
                  key={location.id}
                  name={location.name}
                  numberOfFemales={location.numberOfFemales}
                  numberOfMales={location.numberOfMales}
                  subLocations={location.subLocations}
                  totalResidents={location.totalResidents}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

AllLocations.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default AllLocations
