import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ModalTitle from './shared/modalTitle.jsx'
import LocationForm from '../location/locationForm.jsx'
import locationHelper from '../../../helpers/locationHelper'

class UpdateLocation extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      open: false,
      locationName: props.location.name,
      locationUpdate: locationHelper
        .convertSubLocationsArrayToString(props.location),
      errors: {
        name: '',
        numberOfFemales: '',
        numberOfMales: '',
        subLocations: ''
      }
    }
  }

  openModal = () => {
    this.setState(() => ({
      open: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      open: false
    }))
  }

  handleInputFieldChange = (event) => {
    const { locationUpdate } = this.state
    this.setState({
      locationUpdate: {
        ...locationUpdate,
        [event.target.name]: event.target.value
      }
    })
  }

  updateLocation = async () => {
    const { updateLocationHandler, location } = this.props
    const { locationUpdate } = this.state
    const previousLocationData = locationHelper
      .convertSubLocationsArrayToString(location)
    const locationId = location.id
    const updateErrors = await updateLocationHandler(locationId, previousLocationData, locationUpdate)

    if (updateErrors) {
      this.setState(() => ({
        errors: updateErrors
      }))
    } else {
      this.closeModal()
    }
  }

  render() {
    const { errors, locationName, locationUpdate, open  } = this.state
    return (
      <div>
        <Button
          onClick={this.openModal}
          size='small'
          color='primary'
        >
          Update
        </Button>
        <Dialog open={open} onClose={this.closeModal} aria-labelledby="form-dialog-title">
          <ModalTitle
            title={`Update ${locationName}`}
            closeModal={this.closeModal}
          />
          <DialogContent>
            <LocationForm
              location={locationUpdate}
              handleInputFieldChange={this.handleInputFieldChange}
              handleSubmit={this.createLocation}
              errors={errors}
              formButtonName="Create"
              showFormButton={false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.updateLocation} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

UpdateLocation.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  updateLocationHandler: PropTypes.func.isRequired
}

export default UpdateLocation
