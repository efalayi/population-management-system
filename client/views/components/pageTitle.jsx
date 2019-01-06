import React from 'react'
import PropTyes from 'prop-types'
import Typography from '@material-ui/core/Typography'

function PageTitle(props) {
  const { title } = props
  return (
    <Typography className="page__title" gutterBottom variant="h5" component="h2" align="center">
      {title}
    </Typography>
  )
}

PageTitle.propTypes = {
  title: PropTyes.string.isRequired
}

export default PageTitle
