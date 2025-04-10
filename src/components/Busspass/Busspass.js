import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Row, Col, Card, Statistic, List, Space, Typography, Form, Switch, InputNumber, Select, message } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  UserOutlined,
  CreditCardOutlined,
  CarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
  SettingOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useBusPass } from '../../contexts/BusPassContext';
import NewApplication from '../BusPass/NewApplication';
import './Busspass.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Busspass = () => {
    const [collapsed, setCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('1');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activePass, recentActivity } = useBusPass();

  const toggleMobileNav = () => {
    setMobileVisible(!mobileVisible);
  };
  
    const handleMenuClick = (key) => {
    setActiveSection(key);
    if (window.innerWidth <= 768) {
      setMobileVisible(false);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const renderContent = () => {
    switch (activeSection) {
      case '1':
        return <WelcomeSection user={user} />;
      case '2':
        return <BusPassHistory />;
      case '3':
        return <NewApplication />;
      case '4':
        return <BusPassSettings />;
      default:
        return <WelcomeSection user={user} />;
    }
  };

        return (
    <Layout className="dashboard-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`modern-sidebar ${mobileVisible ? 'mobile-visible' : ''}`}
        width={200}
      >
        <div className="logo-container">
          <span className="logo-text">Bus Pass</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeSection]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<HistoryOutlined />}>
            Pass History
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            New Application
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="modern-header">
          <div className="header-content">
            {window.innerWidth <= 768 ? (
              <Button
                type="text"
                icon={mobileVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={toggleMobileNav}
                className="mobile-nav-trigger"
              />
            ) : (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            <h2 className="welcome-text">Welcome, {user?.name || 'User'}</h2>
          </div>
          <div className="header-content">
            <Avatar 
              size="large" 
              className="user-avatar"
            >
              {getInitial(user?.name)}
            </Avatar>
          </div>
        </Header>
        <Content className="content-container">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

const iconMap = {
  CreditCardOutlined: <CreditCardOutlined />,
  CarOutlined: <CarOutlined />,
  CheckCircleOutlined: <CheckCircleOutlined />,
  FileTextOutlined: <FileTextOutlined />
};

const WelcomeSection = ({ user }) => {
  const { activePass, recentActivity } = useBusPass();
  const navigate = useNavigate();

  const stats = [
    { title: 'Active Passes', value: activePass.count, icon: <CreditCardOutlined />, color: '#1890ff' },
    { title: 'Total Routes', value: activePass.totalRoutes, icon: <CarOutlined />, color: '#52c41a' },
    { title: 'Days Remaining', value: activePass.daysRemaining, icon: <CalendarOutlined />, color: '#722ed1' },
    { title: 'Pass Status', value: activePass.status, icon: <CheckCircleOutlined />, color: '#13c2c2' }
  ];

  const getIcon = (iconName) => {
    return iconMap[iconName] || <FileTextOutlined />;
  };

              return (
    <div className="welcome-section">
      <div className="stats-overview">
        <Row gutter={[16, 16]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="stat-card" bordered={false}>
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  className="stat-value"
                />
              </Card>
            </Col>
          ))}
        </Row>
                  </div>
      
      <Row gutter={[16, 16]} className="dashboard-sections">
        <Col xs={24} lg={16}>
          <Card title="Recent Activity" className="activity-card">
            <List
              dataSource={recentActivity}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={getIcon(item.icon)} />}
                    title={item.title}
                    description={item.timestamp}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="actions-card">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                block 
                icon={<CreditCardOutlined />}
                onClick={() => navigate('/busspass/new')}
              >
                Apply for New Pass
              </Button>
              <Button 
                block 
                icon={<HistoryOutlined />}
                onClick={() => navigate('/busspass/history')}
              >
                View Pass History
              </Button>
              <Button 
                block 
                icon={<SettingOutlined />}
                onClick={() => navigate('/busspass/settings')}
              >
                Manage Settings
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
                    </div>
  );
};

const BusPassHistory = () => {
  const { passHistory } = useBusPass();

  return (
    <div className="pass-history">
      <Card title="Bus Pass History" className="history-card">
        <List
          dataSource={passHistory}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CreditCardOutlined />} />}
                title={`Pass ID: ${item.passId}`}
                description={
                  <Space direction="vertical">
                    <Text>Type: {item.type}</Text>
                    <Text>Issue Date: {item.issueDate}</Text>
                    <Text>Expiry Date: {item.expiryDate}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Amount: ₹{item.amount}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
                      </div>
  );
};

const BusPassSettings = () => {
  const { settings, updateSettings } = useBusPass();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const result = await updateSettings(values);
    if (result.success) {
      message.success('Settings updated successfully');
    } else {
      message.error(result.error || 'Failed to update settings');
    }
  };

        return (
    <div className="pass-settings">
      <Card title="Bus Pass Settings" className="settings-card">
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
          onFinish={handleSubmit}
        >
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
          <Form.Item
            name="defaultPaymentMethod"
            label="Default Payment Method"
          >
            <Select>
              <Option value="upi">UPI</Option>
              <Option value="card">Card</Option>
              <Option value="netbanking">Net Banking</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="autoRenewal"
            label="Auto Renewal"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Busspass; 