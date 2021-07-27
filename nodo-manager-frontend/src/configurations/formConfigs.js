// Easy form customization, alphabetical within group

//
const items = {

  itemAvailability: {
    isEmpty: { errorMessage: 'Choose an availability.' },
  },

  itemCategory: {
    isEmpty: { errorMessage: 'An item category is required.' },
    maxLength: { value: 50, errorMessage: 'Category is too long.' },
  },

  itemDescription: {
    maxLength: { value: 150, errorMessage: 'Description is too long!' },
  },

  itemIngredients: {
    maxLength: {
      value: 250,
      errorMessage: 'Ingredients list has too many characters.',
    },
  },

  itemName: {
    isEmpty: { errorMessage: 'An item name is required.' },
    maxLength: { value: 50, errorMessage: 'Item name is too long' },
  },

  itemPrice: {
    isEmpty: { errorMessage: 'A price is required.' },
    isNaN: { errorMessage: 'Price must be a number.' },
    isNegative: { errorMessage: 'Price cannot be negative.' },
    maxLength: { value: 10, errorMessage: 'Price is too large.' },
  },
}

//
const orders = {
  orderCategory: {
    isEmpty: { errorMessage: 'A Category is required.' },
  },

  orderName: {
    isEmpty: { errorMessage: 'An Order Name is required.' },
    minLength: { value: 3, errorMessage: 'Order Name is too short' },
    maxLength: { value: 30, errorMessage: 'Order Name is too long' },
  },

  orderNotes: {
    maxLength: { value: 150, errorMessage: 'Order Notes are too long' },
  },
}

//
const users = {
  email: {
    isEmpty: { errorMessage: 'Enter an email!' },
    noAtSymbol: { errorMessage: 'Email must include \'@\'' },
    minLength: { value: 5, errorMessage: 'Email is too short' },
    maxLength: { value: 50, errorMessage: 'Email is too long' },
  },

  passcopy: {
    isEmpty: { errorMessage: 'Reenter your password!' },
    mismatched: { errorMessage: 'Passwords do not match!' },
  },

  password: {
    isEmpty: { errorMessage: 'Enter a password!' },
    minLength: { value: 5, errorMessage: 'Password is too short' },
    maxLength: { value: 50, errorMessage: 'Password is too long' },
  },

  roleName: {
    isEmpty: { errorMessage: 'A role must be selected.' },
    reqAdmin: { errorMessage: 'Requires Admin privileges.' },
    reqManager: { errorMessage: 'Requires Manager privileges.' },
    reqEmployee: { errorMessage: 'Requires Employee privileges.' },
  },

  username: {
    isEmpty: { errorMessage: 'Enter a username!' },
    minLength: { value: 2, errorMessage: 'Username is too short' },
    maxLength: { value: 30, errorMessage: 'Username is too long' },
  },

  usersName: {
    isEmpty: { errorMessage: 'A Name is required.' },
    maxLength: { value: 50, errorMessage: 'Name is too long' },
  },
}

const formGroups = {
  items,
  orders,
  users,
}

module.exports = formGroups
