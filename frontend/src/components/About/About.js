import React from 'react';
import { motion } from 'framer-motion';
import { 
  SafetyCertificateOutlined,
  TeamOutlined,
  RocketOutlined,
  HeartOutlined,
  TrophyOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "Safety First",
      description: "Your safety is our top priority. We maintain strict safety protocols and regular vehicle maintenance."
    },
    {
      icon: <TeamOutlined />,
      title: "Expert Team",
      description: "Our experienced drivers and support staff ensure a smooth journey every day."
    },
    {
      icon: <RocketOutlined />,
      title: "Modern Technology",
      description: "Real-time tracking, digital passes, and smart notifications keep you informed."
    },
    {
      icon: <HeartOutlined />,
      title: "Student-Centric",
      description: "Built by students, for students. We understand your needs and work to exceed expectations."
    },
    {
      icon: <TrophyOutlined />,
      title: "Excellence",
      description: "Committed to providing the best transportation service with continuous improvement."
    },
    {
      icon: <GlobalOutlined />,
      title: "Sustainability",
      description: "Eco-friendly practices and efficient routes to reduce our environmental impact."
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About College Chariot
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Revolutionizing student transportation with safety, convenience, and innovation
          </motion.p>
        </div>
        <div className="hero-overlay"></div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        className="mission-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At College Chariot, we're dedicated to transforming the student transportation experience. 
            Our mission is to provide a safe, reliable, and comfortable journey for every student, 
            making campus commute a seamless part of your academic life.
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Sets Us Apart
        </motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Happy Students</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Routes Covered</p>
          </div>
          <div className="stat-card">
            <h3>99%</h3>
            <p>On-Time Performance</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Join Us?</h2>
        <p>Experience the future of student transportation</p>
        <button className="cta-button">Get Started</button>
      </motion.section>
    </div>
  );
};

export default About;