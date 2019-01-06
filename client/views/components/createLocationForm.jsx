import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import formStyles from './styles/formStyles'

const locationClientFields = [
  {
    name: 'name',
    label: 'Location Name',
    type: 'text'
  },
  {
    name: 'subLocations',
    label: 'Sub Locations',
    type: 'text'
  },
  {
    name: 'numberOfFemales',
    label: 'Number of Females',
    type: 'number'
  },
  {
    name: 'numberOfMales',
    label: 'Number of Males',
    type: 'number'
  }
]

const fieldHasError = (error) => {
  if (error == '' || error == undefined) {
    return false
  }
  return true
}

function CreateLocationForm(props) {
  const { classes, errors, location, handleTextFieldChange, handleSubmit } = props
  return (
    <form className={classes.container} noValidate autoComplete="off">
      {
        locationClientFields.map(field => {
          const fieldName = field.name
          const hasError = fieldHasError(errors[fieldName])
          const errorText = hasError ? errors[fieldName] : ''
          return (
            <TextField
              key={fieldName}
              id="outlined-full-width"
              error={hasError}
              label={field.label}
              type={field.type}
              helperText={errorText}
              fullWidth
              className={classNames(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleTextFieldChange}
              name={fieldName}
              value={location[fieldName]}
            />
          )
        })
      }
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        size="large"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </form>
  )
}

CreateLocationForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
}

export default withStyles(formStyles)(CreateLocationForm)
