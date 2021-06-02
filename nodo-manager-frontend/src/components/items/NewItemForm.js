import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemActionCreator } from '../../reducers/itemReducer'

const NewItemForm = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [ingredients, setIngredients] = useState([])

  const createItem = (event) => {
    event.preventDefault()

    const ingredientsArray = ingredients.split(/\s*(?:,|$)\s*/)

    const newItemObject = {
      name: name,
      description: description,
      category: category,
      ingredients: ingredientsArray
    }

    dispatch(addItemActionCreator(newItemObject))

    setName('')
    setDescription('')
    setCategory('')
    setIngredients([])
  }


  return (
    <div>
      <h4>New Item</h4>
      <form onSubmit={ createItem } style={{ margin: '2% 0' }}>
        <label>Name:</label>
        <input
          value={name}
          onChange={ ({ target }) => setName(target.value) }
        />

        <label>Description:</label>
        <input
          value={description}
          onChange={ ({ target }) => setDescription(target.value) }
        />

        <label>Category:</label>
        <input
          value={category}
          onChange={ ({ target }) => setCategory(target.value) }
        />

        <label>Ingredients:</label>
        <input
          value={ingredients}
          onChange={ ({ target }) => setIngredients(target.value) }
          placeholder='Separate with a comma'
        />
        <button type='submit'>Create Item</button>
      </form>
    </div>
  )
}

export default NewItemForm
