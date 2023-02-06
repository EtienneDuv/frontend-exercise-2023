import {createContext, useState} from 'react';
import {ContextType} from '../interfaces';

const defaultTheme = 'light';  //TODO get from OS/cookie

export const ThemeContext = createContext<ContextType|null>(null);

const ThemeProvider = () => {
  const [theme, setTheme] = useState(defaultTheme);

  return {theme, setTheme};
};

export default ThemeProvider;