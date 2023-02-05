import React from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {logo} from '../svg';

export default () => (
  <Navbar>
    <Navbar.Brand href="#home" className=''>
      <img
        alt="Appliting"
        src={logo.toString()}
        width="50"
        className="me-1 bg-light roundedCornerMax"
      />
      <span> React Bootstrap </span>
    </Navbar.Brand>

    <Nav className='me-auto'>
      <Nav.Link href="/articles">Recent articles</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
    </Nav>
    <Button variant="light" size="sm" href="/login">
      Login
      <i className='icon bi-arrow-right ms-1'></i>
    </Button>
  </Navbar>
);
