import React from 'react';

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const AccordionToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <div type="button" onClick={decoratedOnClick}>
      {children}
    </div>
  );
};

export default AccordionToggle;
