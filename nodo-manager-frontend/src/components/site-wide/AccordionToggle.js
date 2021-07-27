import React from 'react'

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'

const AccordionToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey)

  return (
    <div
      type='button'
      role='button'
      tabIndex='0'
      onClick={decoratedOnClick}
      onKeyDown={decoratedOnClick}
    >
      {children}
    </div>
  )
}

export default AccordionToggle
