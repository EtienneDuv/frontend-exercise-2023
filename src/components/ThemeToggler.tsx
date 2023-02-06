import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

export default () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const rootHtml = document.getElementsByTagName('html')[0];
  rootHtml.classList.add(theme);

  const toggleTheme = () => {
    rootHtml.classList.toggle('light');
    rootHtml.classList.toggle('dark');
    if (theme=='light') return setTheme('dark');
    if (theme=='dark') return setTheme('light');
  };

  // Save in local storage when state is updated
  useEffect(() => localStorage.setItem('theme', theme), [theme]);

  return (
    <Button onClick={toggleTheme} className="me-1">
      <i className={[
        'icon',
        'large',
        theme=='dark' ? 'bi-moon' : 'bi-sun'
      ].join(' ')}></i>
    </Button>
  );
};