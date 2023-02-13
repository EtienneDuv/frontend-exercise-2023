import {useRef} from 'react';
import {MyNavbar} from './components';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {createContext, useState} from 'react';
import {getCookie} from './services/utils';
import {
  Home, About, Login, NotFound,
  Article, Profile, OwnProfile, OwnProfileEdit,
  ArticleEdit, ArticleNew
} from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime           : 10*60*1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const JwtContext = createContext<string|null>(null);


export const Router = () => {
  const [jwtState, setJwtState] = useState<string|null>(getCookie('jwt')||null);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const width = windowSize.current[0];
  const isSmallWidth = width<700;

  return (
    <Container className={[
      isSmallWidth ? 'p-2' : 'p-5',
      isSmallWidth ? 'w-100' : 'w-75'
    ].join(' ')}>
      <QueryClientProvider client={queryClient}>
        <JwtContext.Provider value={jwtState}>
          <MyNavbar setJwtState={setJwtState}/>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setJwtState={setJwtState}/>} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/article/:id/edit" element={<ArticleEdit />} />
            <Route path="/article/new" element={<ArticleNew />} />
            <Route path="/@me" element={<OwnProfile />} />
            <Route path="/@me/edit" element={<OwnProfileEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </JwtContext.Provider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Container>
  );
};
