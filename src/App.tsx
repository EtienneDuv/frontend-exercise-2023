import {useContext, useState, useEffect} from 'react';
import {Navbar} from './components';
import Container from 'react-bootstrap/Container';

import {ThemeContext} from './contexts';

export default () => {
  // const [theme] = useContext(themeContext);

  return (
    <Container className={['p-3', 'theme'].join(' ')}>
      <Navbar />
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">React app V1</h1>
      </Container>
    </Container>
  );
};
