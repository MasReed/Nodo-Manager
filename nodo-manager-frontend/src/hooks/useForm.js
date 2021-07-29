/* eslint-disable */

// Form validation built on work from:
// https://github.com/AlecGrey/demo-form-for-blog

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { itemForms, orderForms, userForms } from '../configurations/formConfigs'

const useForm = (fields = {}) => {
  const currentUser = useSelector((state) => state.currentUser)

  const [form, setForm] = useState(fields)
  const [errors, setErrors] = useState({})

  console.log('useFormInternal', form)

  //
  const setFormProps = (field, value) => {
    // Given single object with key/value pairs, 'maps' to property/value pairs
    if (typeof field === 'object' && field !== null && !value) {
      const tempForm = {}

      Object.entries(field).map(([fieldKey, fieldValue]) => {
        tempForm[fieldKey] = fieldValue
        return null
      })

      setForm({ ...form, ...tempForm })

    // Given array of properties and single value will set all properties to
    // that one value
    } else if (Array.isArray(field) && value) {
      const tempForm = {}

      field.map((property) => {
        tempForm[property] = value
        return null
      })

      setForm({ ...form, ...tempForm })

    // Given field, value normally
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

    console.log('FORM IN FIND ERR', form)

    Object.keys(form).forEach((property) => {
      switch (property) {

      // itemAvailability errors
      case 'itemAvailability':
        break

      // itemCategory errors
      case 'itemCategory':
        break

      // itemDescription errors
      case 'itemDescription':
        break

      // itemIngredients errors
      case 'itemIngredients':
        break

      // itemName errors
      case 'itemName':
        break

      // itemPrice errors
      case 'itemPrice':
        break

      // orderCategory errors
      case 'orderCategory':
        if (!orderCategory) {
          newErrors.orderCategory = orderForms.orderCategory.errorMessage
        }
        break

      // orderName errors
      case 'orderName':
        if (!orderName || orderName === '') {
          newErrors.orderName = orderForms.orderName.isEmpty.errorMessage
        } else if (orderName.length < orderForms.orderName.minLength.value) {
          newErrors.orderName = orderForms.orderName.minLength.errorMessage
        } else if (orderName.length > orderForms.orderName.maxLength.value) {
          newErrors.orderName = orderForms.orderName.maxLength.errorMessage
        }
        break

      // orderNotes errors
      case 'orderNotes':
        if (orderNotes.length > orderForms.orderNotes.maxLength.value) {
          newErrors.orderNotes = orderForms.orderNotes.maxLength.errorMessage
        }
        break

      // email errors
      case 'email':
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

      // passcopy errors
      case 'passcopy':
        if (!passcopy || passcopy === '') {
          newErrors.passcopy = userForms.passcopy.isEmpty.errorMessage
        } else if (passcopy !== password) {
          newErrors.passcopy = userForms.passcopy.mismatched.errorMessage
        }
        break

      // password errors
      case 'password':
        if (!password || password === '') {
          newErrors.password = userForms.password.isEmpty.errorMessage
        } else if (password.length > userForms.password.maxLength.value) {
          newErrors.username = userForms.password.maxLength.errorMessage
        } else if (password.length < userForms.password.minLength.value) {
          newErrors.password = userForms.password.minLength.errorMessage
        }
        break

      // roleName errors
      case 'roleName':
        if (!roleName) {
          newErrors.roleName = userForms.roleName.isEmpty.errorMessage
        } else if (roleName === 'admin'
        && !currentUser.role.encompassedRoles.includes('admin')) {
          newErrors.roleName = userForms.roleName.reqAdmin.errorMessage
        } else if (roleName === 'manager'
        && !currentUser.role.encompassedRoles.includes('manager')) {
          newErrors.roleName = userForms.roleName.reqManager.errorMessage
        } else if (roleName === 'employee'
        && !currentUser.role.encompassedRoles.includes('manager')) {
          newErrors.roleName = userForms.roleName.reqManager.errorMessage
        }
        break

      // username errors
      case 'username':
        if (!username || username === '') {
          newErrors.username = userForms.username.isEmpty.errorMessage
        } else if (username.length > userForms.username.maxLength.value) {
          newErrors.username = userForms.username.maxLength.errorMessage
        } else if (username.length < userForms.username.minLength.value) {
          newErrors.username = userForms.username.minLength.errorMessage
        }
        break

      // usersName errors
      case 'usersName':
        if (!usersName || usersName === '') {
          newErrors.usersName = userForms.usersName.isEmpty.errorMessage
        } else if (usersName.length > userForms.usersName.maxLength.value) {
          newErrors.usersName = userForms.usersName.maxLength.errorMessage
        }
        break

      default:
        break
      }
    })

    console.log('NEW ERRORS IN FIND ERRORS', newErrors)

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
