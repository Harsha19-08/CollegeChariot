import React from 'react';
import { Button, List } from 'antd';

const AccountSettings = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>Account Settings</h2>
        <p>This page allows users to manage their account settings.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <List
          header={<div>Settings</div>}
          bordered
          dataSource={['Profile', 'Notifications', 'Security']}
          renderItem={item => (
            <List.Item>
              {item} <Button type="link">Edit</Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
