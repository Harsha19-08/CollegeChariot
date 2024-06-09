// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Busspass from './components/Busspass/Busspass';
import Services from './components/Services/Services';
import About from './components/About/About';
import Explore from './Pages/Explore/Explore';
import Navbar2 from './components/Navbar2/Navbar2';


const App = () => {
  return (
    <div>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/explore" element ={<Explore/>} />
          <Route path="/Busspass" element={<Busspass />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<div>Features Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
