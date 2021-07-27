import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import truncateString from '../../utilities/truncateString';

const MenuItemCard = ({
  item, setShow, setSelectedItem,
}) => {
  const callCustomizeModal = () => {
    setSelectedItem(item);
    setShow(true);
  };

  return (
    <Card
      /* eslint-disable-next-line no-underscore-dangle */
      key={item._id}
      className="mx-0 my-0"
      style={{
        height: '32rem',
        minWidth: '18rem',
      }}
    >
      {/* Item name, category, price, description */}
      <Card.Header style={{ height: '12rem' }}>
        <Card.Title className="d-flex justify-content-between">
          {item.name}
          <span>
            $
            {item.price}
          </span>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {item.category}
        </Card.Subtitle>

        <Card.Text>{item.description}</Card.Text>
      </Card.Header>

      {/* Item Image, Ingredients */}
      <Card.Body>
        <Card.Img variant="top" src="/assets/burger.svg" height="55%" />
        <hr />

        <Card.Text className="mb-0">
          <u>Ingredients:</u>
        </Card.Text>

        <Card.Text>
          {
            truncateString(item.ingredients.join(', '), 130)
          }
        </Card.Text>
      </Card.Body>

      {/* Item availability, Delete and Update Buttons */}
      <Card.Footer>
        <div className="d-flex justify-content-between">
          <h6 className="m-0 py-auto align-self-center">{item.availability}</h6>
          {
            (item.availability === 'Available')
              ? <Button onClick={callCustomizeModal}>Make it Yours</Button>
              : <Button disabled>Add to Order</Button>
          }
        </div>
      </Card.Footer>
    </Card>
  );
};

export default MenuItemCard;
