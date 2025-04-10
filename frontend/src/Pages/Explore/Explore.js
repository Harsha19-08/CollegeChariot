import React from 'react';
import { motion } from 'framer-motion';
import { 
  CarOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  MobileOutlined,
  HeartOutlined
} from '@ant-design/icons';
import './Explore.css';

const Explore = () => {
  const features = [
    {
      icon: <CarOutlined />,
      title: "Smart Bus Tracking",
      description: "Real-time bus location tracking through our mobile app. Never miss your ride again!",
      color: "#1890ff"
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Punctual Service",
      description: "Our buses run on a strict schedule, ensuring you reach your destination on time.",
      color: "#52c41a"
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "Safety First",
      description: "Well-maintained vehicles and experienced drivers for your safety.",
      color: "#faad14"
    },
    {
      icon: <DollarOutlined />,
      title: "Affordable Fares",
      description: "Student-friendly pricing with flexible payment options.",
      color: "#eb2f96"
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Eco-Friendly",
      description: "Modern, fuel-efficient buses reducing our carbon footprint.",
      color: "#13c2c2"
    },
    {
      icon: <TeamOutlined />,
      title: "Community",
      description: "Join a community of students making campus commute easier.",
      color: "#722ed1"
    },
    {
      icon: <MobileOutlined />,
      title: "Digital Pass",
      description: "Show your digital pass on your phone - no physical cards needed.",
      color: "#f5222d"
    },
    {
      icon: <HeartOutlined />,
      title: "Student Support",
      description: "24/7 customer support dedicated to helping students.",
      color: "#fa8c16"
    }
  ];

  const benefits = [
    {
      title: "Save Time",
      description: "No more waiting in long queues or searching for parking spots.",
      icon: "⏰"
    },
    {
      title: "Save Money",
      description: "Affordable monthly passes and student discounts available.",
      icon: "💰"
    },
    {
      title: "Stay Connected",
      description: "Real-time updates and notifications about your bus.",
      icon: "📱"
    },
    {
      title: "Go Green",
      description: "Reduce your carbon footprint by choosing shared transportation.",
      icon: "🌱"
    }
  ];

  return (
    <div className="explore-container">
      {/* Hero Section */}
      <motion.section 
        className="explore-hero"
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
            Explore Our Features
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover how College Chariot makes your campus commute easier
          </motion.p>
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
          What We Offer
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
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose College Chariot?
        </motion.h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="steps-container">
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account and verify your student status</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="step-number">2</div>
            <h3>Choose Your Route</h3>
            <p>Select from our network of campus routes</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="step-number">3</div>
            <h3>Book Your Pass</h3>
            <p>Purchase your monthly or semester pass</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="step-number">4</div>
            <h3>Start Riding</h3>
            <p>Show your digital pass and enjoy the ride</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of students who trust College Chariot for their daily commute</p>
        <button className="cta-button">Sign Up Now</button>
      </motion.section> */}
    </div>
  );
};

export default Explore;
