import React from 'react'
import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

const AlertBanner = () => {

  const alertObject = useSelector(state => state.alert)

  // Banner not displayed if there is no message
  if (!alertObject) {
    return null
  }

  if (!alertObject.type) {
    alertObject.type = 'A Message For You!'
  }

  if (alertObject && !alertObject.variant) {
    alertObject.variant = 'secondary'
  }

  return (
    <Alert className='sticky-top' variant={alertObject.variant} dismissible>
      <Container>
        <Alert.Heading>{alertObject.type}</Alert.Heading>
        <hr />
        <p>{alertObject.message}</p>
      </Container>
    </Alert>
  )
}

export default AlertBanner
