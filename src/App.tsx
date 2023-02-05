import React from 'react';
import {Navbar} from './components';
import Container from 'react-bootstrap/Container';

export default () => (
  <Container className="p-3">
    <Navbar />
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">React app V1</h1>
    </Container>
  </Container>
);
