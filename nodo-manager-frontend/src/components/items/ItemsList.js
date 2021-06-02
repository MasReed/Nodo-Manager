import React from 'react'
import { useSelector } from 'react-redux'
import ItemInfo from './ItemInfo'


const ItemList = () => {

  const items = useSelector(state => state.items)

  return (
    <React.Fragment>
      {
        items.map(item =>
          <ItemInfo key={item._id} item={item} />
        )
      }
    </React.Fragment>
  )
}

export default ItemList
