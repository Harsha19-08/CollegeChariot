import React, { useState } from 'react';
import './Navbar2.css'; // Import the CSS file for styling

const Navbar2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbarr">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">College Chariot</a>
        </div>
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="/services" className="navbar-link">Services</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Features</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact</a>
          </li>
          <img style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginLeft: '10px'
          
          }} src='man.png' alt='profile' className='profile-icon'/>
        </ul>
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <span className={`toggle-icon ${isMobileMenuOpen ? 'open' : ''}`}>&#9776;</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
