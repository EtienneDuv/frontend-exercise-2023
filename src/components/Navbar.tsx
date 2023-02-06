import {useState} from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {logo} from '../assets';

export default () => {
  const [theme, setTheme] = useState('light');  //todo get default theme from OS/cookie
  const toggleTheme = () => {
    document.getElementsByTagName('html')[0].classList.toggle('dark');
    if (theme=='light') return setTheme('dark');
    if (theme=='dark') return setTheme('light');
  };

  return (
    <Navbar>
      <Navbar.Brand href="#" className=''>
        <img alt="Appliting" src={logo.toString()} width="50" className="me-1" />
        <span> React Bootstrap  </span>
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
