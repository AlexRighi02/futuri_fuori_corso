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
      {/*<img src={process.env.PUBLIC_URL + '/img/Sfondo_FFC_tmp_3.JPG'} id="sfondoSito" alt="Sfondo FFC" />*/}
      <img src={process.env.PUBLIC_URL + '/img/Sfondo_FFC_tmp.png'} id="sfondoSito" alt="Sfondo FFC" />
      <App />
    </div>
  </React.StrictMode>
);
