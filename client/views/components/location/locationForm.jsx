import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputField from '../InputField.jsx'
import formStyles from '../styles/formStyles'

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

function LocationForm(props) {
  const { formButtonName, classes, errors, location, handleInputFieldChange, handleSubmit, showFormButton } = props
  return (
    <form className={classes.formContainer} noValidate autoComplete="off">
      {
        locationClientFields.map(field => {
          const fieldName = field.name
          const hasError = fieldHasError(errors[fieldName])
          const errorText = hasError ? errors[fieldName] : ''
          return (
            <InputField
              key={fieldName}
              hasError={hasError}
              label={field.label}
              type={field.type}
              errorText={errorText}
              handleInputFieldChange={handleInputFieldChange}
              name={fieldName}
              value={location[fieldName]}
            />
          )
        })
      }
      {
        showFormButton && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            onClick={handleSubmit}
          >
            {formButtonName}
          </Button>
        )
      }
    </form>
  )
}

LocationForm.defaultProps = {
  formButtonName: '',
  handleSubmit: null,
  showFormButton: true
}

LocationForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  formButtonName: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputFieldChange: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  showFormButton: PropTypes.bool
}

export default withStyles(formStyles)(LocationForm)
