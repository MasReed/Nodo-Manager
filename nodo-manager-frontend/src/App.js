import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ItemInfo = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <h4>{item.description}</h4>
      <p>{item.category}</p>
      <ul>
        {item.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))
        }
      </ul>
    </div>
  )
}

function App() {

  const [items, setItems] = useState()

  useEffect(() => {
      axios
        .get('http://localhost:3000/api/items')
        .then(response => {
          setItems(response.data)
        })
  }, [])

  console.log('ITEMS', items)



  return (
    <div>
      {items && items.map(item => <ItemInfo key={item._id} item={item} />)}
    </div>
  );
}

export default App;
