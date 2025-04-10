// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar2 from './components/Navbar2/Navbar2';
import MainPage from './components/MainPage/MainPage';
import Login from './components/LoginPage/Login';
import Signup from './components/Signuppage/Signup';
import BusSchedule from './components/BusSchedule/BusSchedule';
import Homepage from './components/Homepage/Homepage';
import Busspass from './components/Busspass/Busspass';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Explore from './Pages/Explore/Explore';
import Feedback from './components/Feedback/Feedback';
import { BusPassProvider } from './contexts/BusPassContext';
import { AuthProvider } from './contexts/AuthContext';
import NewApplication from './components/BusPass/NewApplication';
import BusPassHistory from './components/BusPassHistory/BusPassHistory';
import BusPassSettings from './components/BusPassSettings/BusPassSettings';

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true' && 
           (localStorage.getItem('token') || sessionStorage.getItem('token'));
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      // Clear any stale auth data
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <BusPassProvider>
        <Router>
          <Routes>
            {/* Landing and Auth Routes */}
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Navbar2 />
                <Homepage />
              </ProtectedRoute>
            } />

            <Route path="/schedule" element={
              <ProtectedRoute>
                <Navbar2 />
                <BusSchedule />
              </ProtectedRoute>
            } />

            <Route path="/explore" element={
              <ProtectedRoute>
                <Navbar2 />
                <Explore />
              </ProtectedRoute>
            } />

            <Route path="/busspass" element={
              <ProtectedRoute>
                <Busspass />
              </ProtectedRoute>
            } />

            <Route path="/busspass/new" element={<NewApplication />} />
            <Route path="/busspass/history" element={<BusPassHistory />} />
            <Route path="/busspass/settings" element={<BusPassSettings />} />

            <Route path="/services" element={
              <ProtectedRoute>
                <Navbar2 />
                <Services />
              </ProtectedRoute>
            } />

            <Route path="/about" element={
              <ProtectedRoute>
                <Navbar2 />
                <About />
              </ProtectedRoute>
            } />

            <Route path="/contact" element={
              <ProtectedRoute>
                <Navbar2 />
                <Contact />
              </ProtectedRoute>
            } />

            <Route path="/feedback" element={
              <ProtectedRoute>
                <Navbar2 />
                <Feedback />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </BusPassProvider>
    </AuthProvider>
  );
};

export default App;