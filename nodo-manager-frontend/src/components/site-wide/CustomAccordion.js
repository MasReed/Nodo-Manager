import React from 'react'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import AccordionToggle from './AccordionToggle'

const CustomAccordion = ({ children, text }) => {

  return (
    <Accordion>
      <Card className='mb-2 border-0'>
        <AccordionToggle eventKey="0">
          <h4 className='mtb-4 text-muted'>{text}</h4>
          <hr />
        </AccordionToggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body className='p-0'>

            {children}

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default CustomAccordion
