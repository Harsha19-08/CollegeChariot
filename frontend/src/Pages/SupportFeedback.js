import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QuestionCircleOutlined,
  MessageOutlined,
  SendOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import './SupportFeedback.css';

const SupportFeedback = () => {
  const [activeTab, setActiveTab] = useState('support');
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const faqs = [
    {
      question: "How do I book a bus pass?",
      answer: "You can book a bus pass through our website or mobile app. Simply create an account, select your route, and choose a pass duration that suits you."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, UPI, and net banking. Payment is secure and encrypted."
    },
    {
      question: "How can I track my bus?",
      answer: "Use our mobile app or website to track your bus in real-time. You'll receive notifications about bus location and estimated arrival time."
    },
    {
      question: "What if I miss my bus?",
      answer: "If you miss your scheduled bus, you can use our app to find the next available bus on your route. We recommend arriving 5 minutes before the scheduled departure time."
    },
    {
      question: "How do I report an issue?",
      answer: "You can report issues through our support portal, mobile app, or by contacting our 24/7 customer support team."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer refunds for unused passes. The refund amount depends on the remaining validity period and our refund policy terms."
    }
  ];

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFeedbackData({
        name: '',
        email: '',
        type: 'general',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-feedback-container">
      {/* Hero Section */}
      <motion.section 
        className="support-hero"
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
            Support & Feedback
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We're here to help and value your feedback
          </motion.p>
        </div>
      </motion.section>

      <div className="support-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <QuestionCircleOutlined /> Support
          </button>
          <button 
            className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <MessageOutlined /> Feedback
          </button>
        </div>

        {/* Support Section */}
        {activeTab === 'support' && (
          <motion.section 
            className="support-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="faq-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
          <motion.section 
            className="feedback-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Share Your Feedback</h2>
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={feedbackData.name}
                  onChange={handleFeedbackChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={feedbackData.email}
                  onChange={handleFeedbackChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Feedback Type</label>
                <select
                  id="type"
                  name="type"
                  value={feedbackData.type}
                  onChange={handleFeedbackChange}
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                  <option value="praise">Praise</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={feedbackData.message}
                  onChange={handleFeedbackChange}
                  required
                  placeholder="Your feedback"
                  rows="5"
                />
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <SendOutlined /> Submit Feedback
                  </>
                )}
              </button>
              {submitStatus === 'success' && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircleOutlined /> Thank you for your feedback!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CloseCircleOutlined /> Sorry, there was an error. Please try again.
                </motion.div>
              )}
            </form>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default SupportFeedback;