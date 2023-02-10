/// <reference types="vite-plugin-svgr/client" />

import ReactDOM from 'react-dom/client';
import {Router} from './router';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

import './styles/index.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
