import React from 'react';
import { Button, List } from 'antd';

const ManagePass = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>Manage Pass</h2>
        <p>This page allows administrators to manage bus passes.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <Button type="primary" style={{ marginRight: '16px' }}>Add Pass</Button>
        <Button>Edit Pass</Button>
      </div>
      <div style={{ marginTop: '24px' }}>
        <List
          header={<div>Pass List</div>}
          bordered
          dataSource={['Pass 1', 'Pass 2', 'Pass 3']}
          renderItem={item => (
            <List.Item>
              {item} <Button type="link">View Details</Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ManagePass;
