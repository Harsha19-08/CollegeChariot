import React from 'react';
import { Button } from 'antd';

const SupportFeedback = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>Support & Feedback</h2>
        <p>This page provides support and allows users to submit feedback.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <Button type="primary">Contact Support</Button>
        <Button style={{ marginLeft: '16px' }}>Submit Feedback</Button>
      </div>
    </div>
  );
};

export default SupportFeedback;