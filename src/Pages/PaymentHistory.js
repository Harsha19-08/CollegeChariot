import React from 'react';
import { List } from 'antd';

const PaymentHistory = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div>
        <h2>Payment History</h2>
        <p>This page displays the payment history related to bus passes.</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <List
          header={<div>Payment Transactions</div>}
          bordered
          dataSource={['Transaction 1', 'Transaction 2', 'Transaction 3']}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
