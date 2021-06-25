import React from 'react'
import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const AlertBanner = () => {

  // const alertObject = useSelector(state => state.alertObject)
  const alertObject = { message: 'hi' }

  if (!alertObject.message) {
    return null
  }

  if (!alertObject.variant) {
    alertObject.variant = 'secondary'
  }

  return (
    <Alert variant={alertObject.variant}>
      <Alert.Heading>{alertObject.type}</Alert.Heading>
      <hr />
      <p>{alertObject.message}</p>
    </Alert>
  )
}

export default AlertBanner
