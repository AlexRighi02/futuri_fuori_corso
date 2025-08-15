import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar_FFC from './components/Navbar_FFC';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar_FFC />
    <div id="toBlur">
      <App />
    </div>
  </React.StrictMode>
);
