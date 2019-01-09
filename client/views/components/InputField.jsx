import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import inpuFieldStyles from './styles/inputFieldStyles'

function InputField(props) {
  const { classes, errorText, hasError, handleInputFieldChange, label, name, type, value } = props
  return (
    <TextField
      id="outlined-full-width"
      error={hasError}
      label={label}
      type={type}
      helperText={errorText}
      fullWidth
      className={classNames(classes.inputField, classes.dense)}
      margin="dense"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleInputFieldChange}
      name={name}
      value={value}
    />
  )
}

InputField.defaultProps = {
  errorText: '',
  hasError: false,
  type: 'text',
  value: ''
}

InputField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  errorText: PropTypes.string,
  hasError: PropTypes.bool,
  handleInputFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}


export default withStyles(inpuFieldStyles)(InputField)
