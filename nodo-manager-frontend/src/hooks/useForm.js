/* eslint-disable */

// Form validation built on work from:
// https://github.com/AlecGrey/demo-form-for-blog

import { useState } from 'react'
import { userForms } from '../configurations/formConfigs'

const useForm = (fields = {}) => {
  const [form, setForm] = useState(fields)
  const [errors, setErrors] = useState({})

  // console.log('useFormInternal', form)

  //
  const setFormProps = (field, value) => {
    // Given single object with key/value pairs, 'maps' to property/value pairs
    if (typeof field ==='object' && field !== null && !value) {
      let tempForm = {}

      for (const [fieldKey, fieldValue] of Object.entries(field)) {
        tempForm[fieldKey] = fieldValue
      }
      setForm({...form, ...tempForm})

    // Given array of properties and single value will set all properties to
    // that one value
    } else if (Array.isArray(field) && value) {
      let tempForm = {}
      
      for (const property of field) {
        tempForm[property] = value
      }
      setForm({...form, ...tempForm})

    } else {
      setForm({
        ...form,
        [field]: value,
      })
      // Remove any errors from the error object
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: null,
        })
      }
    }
  }

  //
  const findFormErrors = () => {
    // TODO: abstract into utilities file
    const {
      itemAvailability,
      itemCategory,
      itemDescription,
      itemIngredients,
      itemName,
      itemPrice,
      orderCategory,
      orderName,
      orderNotes,
      email,
      passcopy,
      password,
      roleName,
      username,
      usersName,
    } = form

    const newErrors = {}

    // console.log('FORM IN FIND ERR', form)

    Object.keys(form).forEach((property) => {
      switch (property) {
      case 'itemAvailability':
        break
      case 'itemCategory':
        break
      case 'itemDescription':
        break
      case 'itemIngredients':
        break
      case 'itemName':
        break
      case 'itemPrice':
        break
      case 'orderCategory':
        break
      case 'orderName':
        break
      case 'orderNotes':
        break
      case 'email':
        // email errors
        if (!email || email === '') {
          newErrors.email = userForms.email.isEmpty.errorMessage
        } else if (!email.includes('@')) {
          newErrors.email = userForms.email.noAtSymbol.errorMessage
        } else if (email.length < userForms.email.minLength.value) {
          newErrors.email = userForms.email.minLength.errorMessage
        } else if (email.length > userForms.email.maxLength.value) {
          newErrors.email = userForms.email.maxLength.errorMessage
        }
        break

      case 'passcopy':
        // passcopy errors
        if (!passcopy || passcopy === '') {
          newErrors.passcopy = userForms.passcopy.isEmpty.errorMessage
        } else if (passcopy !== password) {
          newErrors.passcopy = userForms.passcopy.mismatched.errorMessage
        }
        break

      case 'password':
        // password errors
        if (!password || password === '') {
          newErrors.password = userForms.password.isEmpty.errorMessage
        } else if (password.length > userForms.password.maxLength.value) {
          newErrors.username = userForms.password.maxLength.errorMessage
        } else if (password.length < userForms.password.minLength.value) {
          newErrors.password = userForms.password.minLength.errorMessage
        }
        break

      case 'roleName':
        break
      case 'username':
        // username errors
        if (!username || username === '') {
          newErrors.username = userForms.username.isEmpty.errorMessage
        } else if (username.length > userForms.username.maxLength.value) {
          newErrors.username = userForms.username.maxLength.errorMessage
        } else if (username.length < userForms.username.minLength.value) {
          newErrors.username = userForms.username.minLength.errorMessage
        }
        break
      case 'usersName':
        break

      default:
        break
      }
    })

    // console.log('NEW ERRORS IN FIND ERRORS', newErrors)

    return newErrors
  }

  //
  const isValidated = (event) => {
    if (event) event.preventDefault()

    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    return true
  }

  return [form, setFormProps, errors, isValidated]
}

export default useForm
