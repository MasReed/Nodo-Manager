// Form validation built on work from:
// https://github.com/AlecGrey/demo-form-for-blog
import { useState } from 'react'
import { useSelector } from 'react-redux'
import findFormErrors from '../utilities/findFormErrors'

const useForm = (fields = {}) => {
  const currentUser = useSelector((state) => state.currentUser)

  const [form, setForm] = useState(fields)
  const [errors, setErrors] = useState({})

  const initialState = fields // Used to resetForm

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

  const resetForm = () => {
    // Reset all form fields to the initial state passed in when the useForm
    // hook is called.
    setFormProps(initialState)
  }

  //
  const isValidated = (event) => {
    if (event) event.preventDefault()

    const newErrors = findFormErrors(form, currentUser, setFormProps)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    return true
  }

  return [form, setFormProps, errors, isValidated, resetForm]
}

export default useForm
