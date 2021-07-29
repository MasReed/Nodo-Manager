/* eslint-disable */
import { useState } from 'react'

import { userForms } from '../configurations/formConfigs'


const useForm = (fields = {}) => {
  const [form, setForm] = useState(fields)
  const [errors, setErrors] = useState({})

  console.log('useFormInternal', form)

  //
  const setField = (event, field, value) => {
    setForm({
      ...form,
      [field || event.target.id]: value || event.target.value,
    })
    // Remove any errors from the error object
    if (errors[field || event.target.id]) {
      setErrors({
        ...errors,
        [field || event.target.id]: null,
      })
    }
  }

  //
  const findFormErrors = () => {
    const { username, password } = form
    const newErrors = {}

    // username errors
    if (!username || username === '') {
      newErrors.username = userForms.username.isEmpty.errorMessage
    } else if (username.length > userForms.username.maxLength.value) {
      newErrors.username = userForms.username.maxLength.errorMessage
    } else if (username.length < userForms.username.minLength.value) {
      newErrors.username = userForms.username.minLength.errorMessage
    }

    // password errors
    if (!password || password === '') {
      newErrors.password = userForms.password.isEmpty.errorMessage
    } else if (password.length > userForms.password.maxLength.value) {
      newErrors.username = userForms.password.maxLength.errorMessage
    } else if (password.length < userForms.password.minLength.value) {
      newErrors.password = userForms.password.minLength.errorMessage
    }

    console.log('NEW ERRORS IN FIND ERRORS', newErrors)
    return newErrors
  }

  //
  const validateOnSubmit = (event) => {
    if (event) event.preventDefault()
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    return true
  }

  return [form, setField, errors, validateOnSubmit]
}

export default useForm
