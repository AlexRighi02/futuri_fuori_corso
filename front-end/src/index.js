import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarFFC from './components/Navbar_FFC';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Calendario from './components/Calendario';
import Rosa from './components/Rosa';
import Footer from './components/Footer';
import ChiSiamo from './components/ChiSiamo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>      
      <NavbarFFC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/rosa" element={<Rosa />} />
         <Route path="/chi-siamo" element={<ChiSiamo />} />
      </Routes>
    </Router>
    <div className="toBlur">
      <Footer />
    </div>
  </React.StrictMode>
);
