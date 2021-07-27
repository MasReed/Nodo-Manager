import React from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';

const MyAccountPage = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <Container className="pt-5">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="m-0">My Account</h1>
        <h1>{currentUser.name}</h1>
      </div>
      <hr />
      <p>
        Username:
        {currentUser.username}
      </p>
      <p>
        Email:
        {currentUser.email}
      </p>
    </Container>
  );
};

export default MyAccountPage;
