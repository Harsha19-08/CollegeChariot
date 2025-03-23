import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    attachments: []
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'payment', label: 'Payment Issues' },
    { value: 'buspass', label: 'Bus Pass Information' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'route', label: 'Route & Schedule' },
    { value: 'other', label: 'Other Queries' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: '',
        attachments: []
      });
    }, 3000);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Support & Feedback</h1>
        <p>We're here to help! Submit your query and we'll get back to you as soon as possible.</p>
      </div>

      <div className="feedback-content">
        <div className="support-info">
          <div className="info-card">
            <div className="icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Our support team is available round the clock to assist you</p>
          </div>
          <div className="info-card">
            <div className="icon">⚡</div>
            <h3>Quick Response</h3>
            <p>Get responses within 24 hours for all your queries</p>
          </div>
          <div className="info-card">
            <div className="icon">📱</div>
            <h3>Multiple Channels</h3>
            <p>Reach us through various communication channels</p>
          </div>
        </div>

        <div className="feedback-form-container">
          <h2>Submit Your Query</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Issue Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief subject of your query"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Describe your issue in detail"
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="attachments">
                Attachments (Optional)
                <span className="attachment-hint">Upload screenshots or relevant documents</span>
              </label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleFileChange}
                multiple
                className="file-input"
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Query
            </button>
          </form>

          {submitted && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <p>Your query has been submitted successfully!</p>
              <p>We'll get back to you soon.</p>
            </div>
          )}
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I track my bus pass application?</h3>
              <p>You can track your application status in the "My Applications" section of your dashboard.</p>
            </div>
            <div className="faq-item">
              <h3>What if I face payment issues?</h3>
              <p>Contact our support team immediately with your transaction ID and screenshot of the error.</p>
            </div>
            <div className="faq-item">
              <h3>How can I update my bus pass information?</h3>
              <p>Visit the "Edit Profile" section to update your personal information and bus pass details.</p>
            </div>
            <div className="faq-item">
              <h3>What's the bus pass renewal process?</h3>
              <p>Renewal notifications are sent 15 days before expiry. You can renew through the "Renew Pass" section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 