import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar_FFC from './components/Navbar_FFC';
import Carosello_FFC from './components/Carosello_FFC';
import Carosello_Avversari from './components/Carosello_Avversari';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar_FFC />
    <div id="toBlur">
      <Carosello_FFC />
      <div id="container_carosello">
        <Carosello_Avversari />
      </div>
      {/* <App /> */}
    </div>
  </React.StrictMode>
);
