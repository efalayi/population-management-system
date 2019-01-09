import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import '../../../../scss/components/modal.scss'

function ModalTitle(props) {
  const { title, closeModal } = props
  return (
    <DialogTitle id="modal-title" disableTypography onClick={closeModal}>
      <Typography variant="h6">{title}</Typography>
      <IconButton aria-label="Close Modal">
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  )
}

ModalTitle.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ModalTitle
