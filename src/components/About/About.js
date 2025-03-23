import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About College Chariot</h1>
          <p>Revolutionizing student transportation with safety, reliability, and convenience.</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>At College Chariot, we're committed to providing safe, reliable, and affordable transportation solutions for college students. Our mission is to make commuting to campus stress-free and environmentally friendly.</p>
          </div>
          <div className="image-content">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957" alt="Students on bus" />
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="icon">🛡️</div>
            <h3>Safety First</h3>
            <p>Your safety is our top priority. All our vehicles are regularly maintained and equipped with modern safety features.</p>
          </div>
          <div className="value-card">
            <div className="icon">⏰</div>
            <h3>Reliability</h3>
            <p>We understand the importance of being on time for classes. Our service is designed to be punctual and dependable.</p>
          </div>
          <div className="value-card">
            <div className="icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We're committed to reducing carbon emissions by providing efficient shared transportation solutions.</p>
          </div>
          <div className="value-card">
            <div className="icon">💡</div>
            <h3>Innovation</h3>
            <p>We continuously improve our service with modern technology and user feedback.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;