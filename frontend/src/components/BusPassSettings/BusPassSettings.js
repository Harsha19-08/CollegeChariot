import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Switch, Button, Space, Select, InputNumber, Divider, message } from 'antd';
import { ArrowLeftOutlined, BellOutlined, NotificationOutlined, SecurityScanOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useBusPass } from '../../contexts/BusPassContext';
import './BusPassSettings.css';

const { Option } = Select;

const BusPassSettings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useBusPass();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate('/busspass');
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateSettings(values);
      message.success('Settings updated successfully');
    } catch (error) {
      message.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <Card 
        title={
          <Space>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              className="back-button"
            >
              Back
            </Button>
            <span>Bus Pass Settings</span>
          </Space>
        }
        className="settings-card"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
          onFinish={onFinish}
        >
          <div className="settings-section">
            <h3><NotificationOutlined /> Notifications</h3>
            <Form.Item
              name="emailNotifications"
              label="Email Notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="smsNotifications"
              label="SMS Notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="expiryReminder"
              label="Expiry Reminder (days before)"
            >
              <InputNumber min={1} max={30} />
            </Form.Item>
          </div>

          <Divider />

          <div className="settings-section">
            <h3><SecurityScanOutlined /> Security</h3>
            <Form.Item
              name="twoFactorAuth"
              label="Two-Factor Authentication"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="loginNotifications"
              label="Login Notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Divider />

          <div className="settings-section">
            <h3><CreditCardOutlined /> Payment Preferences</h3>
            <Form.Item
              name="defaultPaymentMethod"
              label="Default Payment Method"
            >
              <Select>
                <Option value="upi">UPI</Option>
                <Option value="card">Credit/Debit Card</Option>
                <Option value="netbanking">Net Banking</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="autoRenewal"
              label="Auto-Renewal"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Divider />

          <div className="settings-section">
            <h3><BellOutlined /> Alerts</h3>
            <Form.Item
              name="lowBalanceAlert"
              label="Low Balance Alert"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="lowBalanceThreshold"
              label="Low Balance Threshold (₹)"
            >
              <InputNumber min={100} max={1000} step={100} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="save-button"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BusPassSettings; 