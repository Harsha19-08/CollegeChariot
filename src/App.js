// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Busspass from './components/Busspass/Busspass';
import Services from './components/Services/Services';
import About from './components/About/About';
import Explore from './Pages/Explore/Explore';
import Navbar2 from './components/Navbar2/Navbar2';
import Preloader from './Preloader/Preloader';
import Signup from './components/Signuppage/Signup';
import Login from './components/LoginPage/Login';
import { UserProvider } from './components/Context/UserContext';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or other async operation
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Change this to match your actual loading time
  }, []);
  return (
    <UserProvider>
    <div>
       {loading && <Preloader />}
       <div style={{ display: loading ? 'none' : 'block' }}>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/explore" element ={<Explore/>} />
          <Route path="/Busspass" element={<Busspass />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/features" element={<div>Features Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          
        </Routes>
      </Router>
    </div>
    </div>
    </UserProvider>
  );
};

export default App;
