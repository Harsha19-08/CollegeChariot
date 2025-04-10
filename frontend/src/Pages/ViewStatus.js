import React from 'react';
import { List, Button } from 'antd';

const ViewStatus = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>View Pass Status</h2>
        <p>This page allows users to view the status of their bus passes.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <List
          header={<div>Pass Status</div>}
          bordered
          dataSource={['Pass 1', 'Pass 2', 'Pass 3']}
          renderItem={item => (
            <List.Item>
              {item} <Button type="link">View Status</Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ViewStatus;