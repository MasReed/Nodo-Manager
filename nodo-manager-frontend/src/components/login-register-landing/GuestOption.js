import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import { guestUserActionCreator } from '../../reducers/currentUserReducer'
import { toastAlertCreator } from '../../reducers/alertReducer'

const GuestOption = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleGuest = async () => {

    const alertObj = {
      type: 'Hi!',
      message: 'Continuing as guest...',
      variant: 'primary',
      show: true
    }

    await dispatch(toastAlertCreator(alertObj))
    dispatch(guestUserActionCreator())
    history.push('/menu')
  }

  return (
    <div className='m-auto p-0'>
      <h5>- OR -</h5>
      <hr className='mb-5' />
      <Button
        onClick={ handleGuest }
        className='btn-block'
        variant='outline-secondary'
      > > </Button>
      <hr className='mt-5' />
      <h5 className='px-5'>Continue As Guest</h5>
    </div>
  )
}

export default GuestOption
