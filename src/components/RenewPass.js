import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
 // Import Ant Design styles
 

const { Option } = Select;

const RenewPass = () => {
  const onFinish = (values) => {
    console.log('Form values: ', values);
    // Handle form submission
  };

  return (
    <div>
      <h3>Renew Bus Pass</h3>
      <Form
        name="renew_pass"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Pass ID"
          name="passId"
          rules={[{ required: true, message: 'Please enter your Pass ID!' }]}
        >
          <Input placeholder="Enter your Pass ID" />
        </Form.Item>
        
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your Name!' }]}
        >
          <Input placeholder="Enter your Name" />
        </Form.Item>
        
        <Form.Item
          label="Student ID"
          name="studentId"
          rules={[{ required: true, message: 'Please enter your Student ID!' }]}
        >
          <Input placeholder="Enter your Student ID" />
        </Form.Item>
        
        <Form.Item
          label="Current Expiry Date"
          name="expiryDate"
          rules={[{ required: true, message: 'Please select the current expiry date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          label="New Validity Period"
          name="newValidity"
          rules={[{ required: true, message: 'Please select the new validity period!' }]}
        >
          <Select placeholder="Select New Validity Period">
            <Option value="3_months">3 Months</Option>
            <Option value="6_months">6 Months</Option>
            <Option value="12_months">12 Months</Option>
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Renew Pass
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RenewPass;
