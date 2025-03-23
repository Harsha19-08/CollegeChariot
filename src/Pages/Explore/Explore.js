import React from 'react';
import { Link } from 'react-router-dom';
import './Explore.css'; // Assuming you have a CSS file for styling

const Explore = () => {
  return (
    <div className="explore-chariot">
      <h1>Explore College Chariot</h1>
      <section className="intro">
        <h2>Welcome to MLRIT College Chariot</h2>
        <p>Discover the convenience, safety, and efficiency of our college bus service.</p>
        <video src="path-to-overview-video.mp4" controls />
      </section>
      
      <section className="services">
        <h2>Services</h2>
        <h3>Bus Pass Issuance</h3>
        <p>Apply for your bus pass online with ease. Click <Link to="/apply">here</Link> to apply now.</p>
        <h3>Routes and Schedules</h3>
        <p>Explore our interactive map and detailed schedules for each route.</p>
        <h3>Special Services</h3>
        <p>We offer additional services including weekend transportation and special event buses.</p>
      </section>
      
      <section className="features">
        <h2>Features</h2>
        <h3>Real-Time Tracking</h3>
        <p>Track your bus in real-time using our GPS tracking system. Available on our mobile app and website.</p>
        <h3>Notifications and Alerts</h3>
        <p>Subscribe to notifications for bus delays, route changes, and emergencies.</p>
        <h3>Safety Measures</h3>
        <p>Learn about our comprehensive safety protocols, including COVID-19 measures.</p>
      </section>
      
      <section className="benefits">
        <h2>Benefits</h2>
        <h3>Convenience</h3>
        <p>Enjoy a hassle-free commute, saving time and reducing stress.</p>
        <h3>Cost-Effectiveness</h3>
        <p>Our bus service is a cost-effective alternative to other transportation methods.</p>
        <h3>Environmental Impact</h3>
        <p>Reduce your carbon footprint by using our eco-friendly bus service.</p>
      </section>
      
      <section className="resources">
        <h2>Student and Parent Resources</h2>
        <h3>FAQ</h3>
        <p>Find answers to common questions about our bus service.</p>
        <h3>Guidelines and Policies</h3>
        <p>Review our guidelines and policies to ensure a smooth experience.</p>
        <h3>Feedback and Support</h3>
        <p>Contact us for support or provide feedback via our contact form.</p>
      </section>
      
      <section className="testimonials">
        <h2>Testimonials</h2>
        <p>Hear from students and parents who love our bus service.</p>
        {/* Include actual testimonials here */}
      </section>
      
      <section className="gallery">
        <h2>Gallery</h2>
        <div className="photo-gallery">
          {/* Add images */}
        </div>
        <div className="video-tours">
          <video src="path-to-video-tour.mp4" controls />
        </div>
      </section>
      
      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>Get in touch with us for any inquiries or support.</p>
        <p>Phone: [Phone Number]</p>
        <p>Email: [Email Address]</p>
        <p>Office Hours: [Office Hours]</p>
        <div className="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=your-google-map-embed-link"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      
      <section className="cta">
        <h2>Get Started</h2>
        <Link to="/apply" className="btn">Apply Now</Link>
        <a href="path-to-mobile-app" className="btn">Download App</a>
        <Link to="/contact" className="btn">Get in Touch</Link>
      </section>
    </div>
  );
};

export default Explore;
