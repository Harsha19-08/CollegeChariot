import React from 'react';
import { List, Button } from 'antd';
import Random from './Random';

const ViewPass = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>View Pass</h2>
        <p>This page allows users to view their bus passes.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <List
          header={<div>Active Passes</div>}
          bordered
          dataSource={['Pass 1', 'Pass 2', 'Pass 3']}
          renderItem={item => (
            <List.Item>
              {item} <Button type="link">View Details</Button>
            </List.Item>
          )}
        />
        <div>
        <img src="/Group1.png" alt="Header" />
        </div>
        <div>
          <Random/>
        </div>
      </div>
    </div>
  );
};

export default ViewPass;