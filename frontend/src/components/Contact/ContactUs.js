import React, { useState } from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const ContactUs = () => {
  const [activeSection, setActiveSection] = useState('welcome');

  const renderSection = () => {
    switch (activeSection) {
      case 'getPass':
        return <GetBusPass />;
      case 'viewStatus':
        return <ViewPassStatus />;
      case 'managePass':
        return <ManagePass />;
      case 'paymentHistory':
        return <PaymentHistory />;
      case 'supportFeedback':
        return <SupportFeedback />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
};

const Sidebar = ({ setActiveSection }) => (
  <div className="sidebar">
    <ul>
      <li onClick={() => setActiveSection('welcome')}>Welcome</li>
      <li onClick={() => setActiveSection('getPass')}>Get Bus Pass</li>
      <li onClick={() => setActiveSection('viewStatus')}>View Pass Status</li>
      <li onClick={() => setActiveSection('managePass')}>Manage Pass</li>
      <li onClick={() => setActiveSection('paymentHistory')}>Payment History</li>
      <li onClick={() => setActiveSection('supportFeedback')}>Support & Feedback</li>
      <li onClick={() => setActiveSection('notifications')}>Notifications</li>
    </ul>
  </div>
);

const Welcome = () => (
  <div>
    <h2>Welcome to the Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>
  </div>
);

const GetBusPass = () => (
  <div>
    <h2>Apply for Bus Pass</h2>
    <form>
      {/* Add form fields here */}
    </form>
  </div>
);

const ViewPassStatus = () => (
  <div>
    <h2>View Pass Status</h2>
    {/* Add status display here */}
  </div>
);

const ManagePass = () => (
  <div>
    <h2>Manage Pass</h2>
    {/* Add manage pass options here */}
  </div>
);

const PaymentHistory = () => (
  <div>
    <h2>Payment History</h2>
    {/* Add payment history display here */}
  </div>
);

const SupportFeedback = () => (
  <div>
    <h2>Support & Feedback</h2>
    <form>
      {/* Add feedback form here */}
    </form>
  </div>
);

const Notifications = () => (
  <div>
    <h2>Notifications</h2>
    {/* Add notifications display here */}
  </div>
);

export default ContactUs;
