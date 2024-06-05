import React, { useState } from 'react';
import './Navbar2.css'; // Import the CSS file for styling
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';



const Navbar2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Here you can perform any additional actions based on the selected role, such as redirecting to the appropriate login page
  };

  return (
    <nav className="navbarr">
      <div className="navbar-container">
        <div className="navbar-logo">
        <RouterLink to="/">College Chariot</RouterLink>
        </div>
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
             <RouterLink to="/" className="navbar-link">Home</RouterLink>
          </li>
          <li className="navbar-item">
            <ScrollLink to="about" smooth={true} duration={300} className="navbar-link">About</ScrollLink>
          </li>
          <li className="navbar-item">
          <ScrollLink to="services" smooth={true} duration={300} className="navbar-link">Services</ScrollLink>
          </li>
          <li className="navbar-item">
          <RouterLink to="/features" className="navbar-link">Features</RouterLink>
          </li>
          <li className="navbar-item">
          <RouterLink to="/contact" className="navbar-link">Contact</RouterLink>
          </li>
          <li className="navbar-item dropdown">
            <button className="dropbtn">Login</button>
            {/* <div className="dropdown-content">
              <a onClick={() => handleRoleSelect('admin')}>Admin Login</a>
              <a onClick={() => handleRoleSelect('student')}>Student Login</a>
            </div> */}
          </li>
          {/* <img style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginLeft: '10px'
          
          }} src='man.png' alt='profile' className='profile-icon'/> */}
        </ul>
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <span className={`toggle-icon ${isMobileMenuOpen ? 'open' : ''}`}>&#9776;</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
