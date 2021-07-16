// Truncates strings with number of characters beyond maxLength and adds an
// ellipses

const truncateString = (str, maxLength) => {
  return str.length > maxLength ? str.substring(0, maxLength + 1) + ' ...' : str
}

export default truncateString
