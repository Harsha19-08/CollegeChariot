import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { 
  CompassOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined 
} from '@ant-design/icons';

const MainPage = () => {
  return (
    <div className="main-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="brand">
            <div className="chariot-symbol">☸</div>
            <h1>College Chariot</h1>
            <p className="tagline">
              "Like Arjuna's divine chariot, guiding students on their path to knowledge"
            </p>
            <p className="sub-tagline">
              Your modern chariot for college transportation
            </p>
          </div>
          <div className="hero-buttons">
            <Link to="/signup" className="primary-button">Get Started</Link>
            <Link to="/login" className="secondary-button">Already have an account?</Link>
          </div>
        </div>
        <div className="divine-wheels">
          <div className="wheel left"></div>
          <div className="wheel right"></div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h6>DIVINE FEATURES</h6>
          <h2>Guided by Excellence</h2>
          <p>Like the celestial chariot that carried Arjuna, we offer divine features to guide your college journey.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <CompassOutlined />
            </div>
            <h3>Divine Navigation</h3>
            <p>Track your routes with precision, like Krishna guiding Arjuna's path.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ThunderboltOutlined />
            </div>
            <h3>Swift Updates</h3>
            <p>Real-time updates as swift as divine arrows, keeping you informed.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <SafetyOutlined />
            </div>
            <h3>Sacred Security</h3>
            <p>Travel with the assurance of divine protection and reliable service.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TeamOutlined />
            </div>
            <h3>United Community</h3>
            <p>Join a community bound by the spirit of unity and excellence.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="chariot-symbol">☸</div>
            <h3>College Chariot</h3>
          </div>
          <p className="copyright">© 2024 College Chariot. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage; 