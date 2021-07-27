const charactersRemaining = (str, limit) => {
  const diff = limit - str.length
  return (diff < 21) ? `${diff} character(s) remaining` : null
}

export default charactersRemaining
