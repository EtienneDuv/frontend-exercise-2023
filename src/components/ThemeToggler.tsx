import {useContext, useState, useEffect} from 'react';
import {themeContext} from '../contexts';
import {Button,} from 'react-bootstrap';


export default () => {
  // const { value, setValue } = useContext(themeContext);

  const toggleTheme = () => {
    console.log('TOGGLE');
    // setValue('new value');
  };
  return (
    <Button onClick={toggleTheme}>
      <i className='icon bi-sun large'></i>
    </Button>
  );
};
//  {
//         props.listState ? <button onClick={hideList}>Hide List</button> :
//         <button onClick={showList}>Show List</button>

// let theme = 'light'
// createContext('light')
// subscribe('toggleTheme', () => {
//   if (theme=='light') theme = 'dark'
//   if (theme=='dark') theme = 'light'
// })

//        }
