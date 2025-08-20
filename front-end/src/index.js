import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar_FFC from './components/Navbar_FFC';
import Carosello_FFC from './components/Carosello_FFC';
import Carosello_Avversari from './components/Carosello_Avversari';
import Risultati from './components/Risultati';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Calendario from './components/Calendario';
import Footer from './components/Footer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Navbar_FFC />
    <div id="toBlur">
      <Carosello_FFC />
      <div id="container_carosello">
        <Carosello_Avversari />
      </div>
      <App />

      <div id="risultati">
        <Risultati />
      </div>

    </div>*/}
    <Router>
      <Navbar_FFC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Calendario />} />
        {/* <Route path="/rosa" element={<Rosa />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />  */}
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);
