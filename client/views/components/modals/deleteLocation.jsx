import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import ModalTitle from './shared/modalTitle.jsx'
import locationHelper from '../../../helpers/locationHelper'

class DeleteLocation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedLocation: locationHelper
        .convertSubLocationsArrayToString(props.location)
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

  deleteLocation = async () => {
    const { selectedLocation:{ id: locationId } } = this.state
    const { deleteLocationHandler } = this.props
    await deleteLocationHandler(locationId)
    this.closeModal()
  }
 
  render() {
    const { selectedLocation, open } = this.state
    return (
      <div>
        <Button
          onClick={this.openModal}
          size='small'
          color='secondary'
        >
          Delete
        </Button>
        <Dialog open={open} onClose={this.closeModal} aria-labelledby="form-dialog-title">
          <ModalTitle
            title={`Delete ${selectedLocation.name}?`}
            closeModal={this.closeModal}
          />
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this location?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteLocation} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

DeleteLocation.propTypes = {
  location: PropTypes.shape({}).isRequired,
  deleteLocationHandler: PropTypes.func.isRequired
}

export default DeleteLocation
