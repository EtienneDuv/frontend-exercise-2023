import {Navbar} from './components';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import {Home, About, Login, NotFound} from './pages';

export default () => {
  return (
    <Container className='pt-5'>
      <Navbar />
      <Container className="p-5 mb-4 rounded-3">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Container>
  );
};
