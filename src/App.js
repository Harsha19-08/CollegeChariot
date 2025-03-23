// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Busspass from './components/Busspass/Busspass';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Explore from './Pages/Explore/Explore';
import Navbar2 from './components/Navbar2/Navbar2';
import Preloader from './Preloader/Preloader';
import Signup from './components/Signuppage/Signup';
import Login from './components/LoginPage/Login';
import Feedback from './components/Feedback/Feedback';
import BusSchedule from './components/BusSchedule/BusSchedule';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or other async operation
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Change this to match your actual loading time
  }, []);

  return (
    <div>
      {loading && <Preloader />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Router>
          <Navbar2 />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/schedule" element={<BusSchedule />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            } />
            <Route path="/explore" element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } />
            <Route path="/Busspass" element={
              <ProtectedRoute>
                <Busspass />
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;