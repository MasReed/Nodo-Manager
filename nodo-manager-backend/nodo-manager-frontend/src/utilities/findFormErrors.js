import { itemForms, orderForms, userForms } from '../configurations/formConfigs'

const findFormErrors = (form, currentUser, setFormProps) => {
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

  Object.keys(form).forEach((property) => {
    switch (property) {
    // itemAvailability errors
    case 'itemAvailability':
      if (!itemAvailability || itemAvailability === '') {
        newErrors.itemAvailability = itemForms.itemAvailability.isEmpty.errorMessage
      }
      break

    // itemCategory errors
    case 'itemCategory':
      if (!itemCategory || itemCategory === '') {
        newErrors.itemCategory = itemForms.itemCategory.isEmpty.errorMessage
      } else if (itemCategory.length > itemForms.itemCategory.maxLength.value) {
        newErrors.itemCategory = itemForms.itemCategory.maxLength.value
      }
      break

    // itemDescription errors
    case 'itemDescription':
      if (itemDescription.length > itemForms.itemDescription.maxLength) {
        newErrors.itemDescription = itemForms.itemDescription.maxLength.errorMessage
      }
      break

    // itemIngredients errors
    case 'itemIngredients':
      if (itemIngredients.length > itemForms.itemIngredients.maxLength) {
        newErrors.itemIngredients = itemForms.itemIngredients.maxLength.errorMessage
      }
      break

    // itemName errors
    case 'itemName':
      if (!itemName || itemName === '') {
        newErrors.itemName = itemForms.itemName.isEmpty.errorMessage
      } else if (itemName.length > itemForms.itemName.maxLength) {
        newErrors.itemName = itemForms.itemName.maxLength.errorMessage
      }
      break

    // itemPrice errors
    case 'itemPrice':
      if (!itemPrice || itemPrice === '') {
        newErrors.itemPrice = itemForms.itemPrice.isEmpty.errorMessage
      } else if (typeof itemPrice !== 'number') {
        if (Number.isNaN(Number(itemPrice))) {
          newErrors.itemPrice = itemForms.itemPrice.isNaN.errorMessage
        } else {
          setFormProps('itemPrice', Number(itemPrice))

          if (itemPrice < 0) {
            newErrors.itemPrice = itemForms.itemPrice.isNegative.errorMessage
          }
        }
      } else if (itemPrice < 0) {
        newErrors.itemPrice = itemForms.itemPrice.isNegative.errorMessage
      } else if (itemPrice.length > itemForms.itemPrice.maxLength.value) {
        newErrors.itemPrice = itemForms.itemPrice.maxLength.errorMessage
      }
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
  return newErrors
}

export default findFormErrors
