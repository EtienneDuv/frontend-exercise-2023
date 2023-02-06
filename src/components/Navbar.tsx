import {useState} from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {logo} from '../assets';
import {NavLink} from 'react-router-dom';

export default () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  if (theme=='dark') {
    document.getElementsByTagName('html')[0].classList.add('dark');
  }
  const toggleTheme = () => {
    document.getElementsByTagName('html')[0].classList.toggle('dark');
    if (theme=='light') {
      setTheme('dark');
      return localStorage.setItem('theme', 'dark');
    }
    if (theme=='dark') {
      setTheme('light');
      return localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Navbar>
      <Navbar.Brand href="/" className=''>
        <NavLink to='/' className="navbar-brand">
          <img alt="Appliting" src={logo.toString()} width="50" className="me-2" />
          <span> React Bootstrap </span>
        </NavLink>
      </Navbar.Brand>

      <Nav className='me-auto'>
        <NavLink to="/articles" className='nav-link'> Recent articles </NavLink>
        <NavLink to="/about" className='nav-link'> About </NavLink>
      </Nav>

      <Button onClick={toggleTheme} className="me-1">
        <i className={[
          'icon',
          'large',
          theme=='dark' ? 'bi-moon' : 'bi-sun'
        ].join(' ')}></i>
      </Button>
      <NavLink to='/login'>
        <Button>
          Login
          <i className='icon bi-arrow-right ms-1'></i>
        </Button>
      </NavLink>
    </Navbar>
  );
};
