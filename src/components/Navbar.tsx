import {Navbar, Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {applifting} from '../assets';
import {ThemeToggler} from './ThemeToggler';
import {SetJwtStateProps} from '../@types/interfaces';
import {JwtContext} from '../router';
import {getCookie} from '../services/utils';

export const MyNavbar = ({setJwtState}: SetJwtStateProps) => {
  const removeJwtCookie = () => {
    setJwtState(null);
    document.cookie='jwt=;expires=0';
  };

  const OwnProfileButton = ():JSX.Element => {
    if (getCookie('jwt'))
      return (
        <NavLink to='/@me'>
          <Button className='icon bi-person'>
          </Button>
        </NavLink>
      );
    else return <></>;
  };

  const LoginLogoutButton = ():JSX.Element => (
    <JwtContext.Consumer>
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
    </JwtContext.Consumer>
  );

  return (
    <Navbar className='mb-3'>
      <NavLink to='/' className="navbar-brand">
        <Navbar.Brand>
          <img alt="Appliting" src={applifting.toString()} width="50" className="me-2" />
        </Navbar.Brand>
      </NavLink>

      <Nav className='me-auto'>
        <NavLink to="/about" className='nav-link'> About </NavLink>
      </Nav>

      <div className="me-1">
        <ThemeToggler />
      </div>
      <div className="me-1">
        <OwnProfileButton />
      </div>
      <LoginLogoutButton />
    </Navbar>
  );
};
