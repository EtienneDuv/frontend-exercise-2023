import {useState, useEffect} from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {logo} from '../assets';

export default () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const rootHtml = document.getElementsByTagName('html')[0];
  rootHtml.classList.add(theme);

  const toggleTheme = () => {
    rootHtml.classList.toggle('light');
    rootHtml.classList.toggle('dark');
    if (theme=='light') return setTheme('dark');
    if (theme=='dark') return setTheme('light');
  };

  // Save in local storage when state is updated
  useEffect(() => localStorage.setItem('theme', theme), [theme]);

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
