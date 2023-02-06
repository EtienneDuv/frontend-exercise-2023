import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {logo} from '../assets';
import {default as ThemeToggler} from './ThemeToggler';

export default () => {
  return (
    <Navbar>
      <NavLink to='/' className="navbar-brand">
        <Navbar.Brand>
          <img alt="Appliting" src={logo.toString()} width="50" className="me-2" />
          <span> React Bootstrap </span>
        </Navbar.Brand>
      </NavLink>

      <Nav className='me-auto'>
        <NavLink to="/articles" className='nav-link'> Recent articles </NavLink>
        <NavLink to="/about" className='nav-link'> About </NavLink>
      </Nav>

      <ThemeToggler />
      <NavLink to='/login'>
        <Button>
          Login
          <i className='icon bi-arrow-right ms-1'></i>
        </Button>
      </NavLink>
    </Navbar>
  );
};
