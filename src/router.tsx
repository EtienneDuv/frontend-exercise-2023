import {Navbar} from './components';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import {Home, About, Login, NotFound} from './pages';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {createContext, useState} from 'react';
import {getJwt} from './services/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime           : 10*60*1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const JwtContext = createContext<string|null>(null);

export default () => {
  const [jwtState, setJwtState] = useState<string|null>(getJwt()||null);

  return (
    <Container className='pt-5'>
      <Container className="p-5 mb-4 rounded-3">
        <QueryClientProvider client={queryClient}>
          <JwtContext.Provider value={jwtState}>
            <Navbar setJwtState={setJwtState}/>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login setJwtState={setJwtState}/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </JwtContext.Provider>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </Container>
    </Container>
  );
};
