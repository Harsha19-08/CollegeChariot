import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Dropdown } from 'antd';
import './Navbar2.css';
import { 
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  StarOutlined,
  PhoneOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

const Navbar2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isServicesActive, setIsServicesActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const authItems = [
    {
      key: 'login',
      label: (
        <RouterLink to="/login" className="auth-dropdown-item" onClick={closeMobileMenu}>
          <LoginOutlined /> Login
        </RouterLink>
      ),
    },
    {
      key: 'signup',
      label: (
        <RouterLink to="/signup" className="auth-dropdown-item" onClick={closeMobileMenu}>
          <UserAddOutlined /> Sign Up
        </RouterLink>
      ),
    },
  ];

  const scrollToServices = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const servicesSection = document.getElementById('our-services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const servicesSection = document.getElementById('our-services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // For services section active state
      if (location.pathname === '/') {
        const servicesSection = document.getElementById('our-services');
        if (servicesSection) {
          const rect = servicesSection.getBoundingClientRect();
          setIsServicesActive(rect.top <= 100 && rect.bottom >= 100);
        }
      }

      // For navbar background
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <RouterLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
        <span>College Chariot</span>
      </RouterLink>

      <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      <div className="nav-content">
        <ul className="nav-list">
          <li className="nav-item">
            <RouterLink 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              title="Home"
              onClick={closeMobileMenu}
            >
              <HomeOutlined className="nav-icon" />
              <span>Home</span>
            </RouterLink>
            <div className="nav-indicator" />
          </li>

          <li className="nav-item">
            <RouterLink 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              title="About"
              onClick={closeMobileMenu}
            >
              <InfoCircleOutlined className="nav-icon" />
              <span>About</span>
            </RouterLink>
            <div className="nav-indicator" />
          </li>

          <li className="nav-item">
            <ScrollLink 
              to="services"
              spy={true}
              smooth={true}
              offset={-100}
              duration={300}
              className={`nav-link ${isServicesActive ? 'active' : ''}`}
              activeClass="active"
              title="Services"
              onClick={closeMobileMenu}
            >
              <AppstoreOutlined className="nav-icon" />
              <span>Services</span>
            </ScrollLink>
            <div className="nav-indicator" />
          </li>

          <li className="nav-item">
            <RouterLink 
              to="/explore" 
              className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
              title="Features"
              onClick={closeMobileMenu}
            >
              <StarOutlined className="nav-icon" />
              <span>Features</span>
            </RouterLink>
            <div className="nav-indicator" />
          </li>

          <li className="nav-item">
            <RouterLink 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              title="Contact Us"
              onClick={closeMobileMenu}
            >
              <PhoneOutlined className="nav-icon" />
              <span>Contact Us</span>
            </RouterLink>
            <div className="nav-indicator" />
          </li>

          <li className="nav-item">
            <RouterLink 
              to="/feedback" 
              className={`nav-link ${isActive('/feedback') ? 'active' : ''}`}
              title="Support & Feedback"
              onClick={closeMobileMenu}
            >
              <CustomerServiceOutlined className="nav-icon" />
              <span>Support & Feedback</span>
            </RouterLink>
            <div className="nav-indicator" />
          </li>
        </ul>

        <div className="auth-section">
          <Dropdown
            menu={{ items: authItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <button 
              className={`nav-link ${isActive('/login') || isActive('/signup') ? 'active' : ''}`}
              title="Login/Signup"
            >
              <UserOutlined className="nav-icon" />
              <span>Login/Signup</span>
            </button>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
