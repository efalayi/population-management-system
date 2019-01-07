import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../components/pageTitle.jsx'
import CreateLocationForm from '../components/createLocationForm.jsx'
import Toaster from '../components/Toaster.jsx'
import api from '../../api/api'

class CreateNewLocation extends PureComponent {
  constructor() {
    super()
    this.state = {
      location: {
        name: '',
        numberOfFemales: '',
        numberOfMales: '',
        subLocations: ''
      },
      errors: {
        name: '',
        numberOfFemales: '',
        numberOfMales: '',
        subLocations: ''
      },
      toasterProps: {
        open: false,
        type: 'success',
        message: ''
      }
    }
  }

  handleTextFieldChange = (event) => {
    const { location } = this.state
    this.setState({
      location: {
        ...location,
        [event.target.name]: event.target.value
      }
    })
  }

  createLocation = async (event) => {
    event.preventDefault()
    const { location } = this.state
    const { errors: serverErrors, createdLocation, message } = await api.createLocation(location)
    if (serverErrors) {
      this.setState(() => (
        {
          errors: serverErrors
        }
      ))
    } else {
      const toasterProps = createdLocation ? {
        type: 'success'
      }: {
        type: 'error'
      }
      toasterProps.message = message
      toasterProps.open = true
      this.setState(() => (
        {
          toasterProps
        }
      ))
    }
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

  render() {
    const { errors, location, toasterProps } = this.state
    return (
      <div>
        <PageTitle
          title="Create a Location"
        />
        <CreateLocationForm
          location={location}
          handleTextFieldChange={this.handleTextFieldChange}
          handleSubmit={this.createLocation}
          errors={errors}
        />
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

CreateNewLocation.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default CreateNewLocation