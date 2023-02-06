import {useState} from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {logo} from '../assets';

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
      <Navbar.Brand href="#" className=''>
        <img alt="Appliting" src={logo.toString()} width="50" className="me-2" />
        <span>React Bootstrap</span>
      </Navbar.Brand>

      <Nav className='me-auto'>
        <Nav.Link href="#articles">Recent articles</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
      </Nav>

      <Button onClick={toggleTheme} className="me-1">
        <i className={['icon', 'large', 'rounded',
          theme=='dark' ? 'bi-moon' : 'bi-sun'
        ].join(' ')}></i>
      </Button>
      <Button href="#login">
      Login
        <i className='icon bi-arrow-right ms-1'></i>
      </Button>
    </Navbar>
  );
};
