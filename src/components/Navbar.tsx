import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {logo} from '../assets';
import {default as ThemeToggler} from './ThemeToggler';
import {SetJwtStateProps} from '../@types/interfaces';
import {JwtContext} from '../router';

export default ({setJwtState}: SetJwtStateProps) => {
  const removeJwtCookie = () => {
    setJwtState(null);
    document.cookie='jwt=;expires=0;SameSite=None;secure';
  };

  const LoginLogoutButton = ():JSX.Element => <JwtContext.Consumer>
    {jwt => {
      if (!jwt)
        return (
          <NavLink to='/login'>
            <Button>
              Login
              <i className='icon bi-person ms-1'></i>
            </Button>
          </NavLink>
        );
      else
        return (
          <Button onClick={() => { removeJwtCookie() } }>
            Logout
            <i className='icon bi-box-arrow-right ms-1'></i>
          </Button>
        );
    }}
  </JwtContext.Consumer>;

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

      <LoginLogoutButton />
    </Navbar>
  );
};
