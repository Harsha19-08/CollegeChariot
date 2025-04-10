import React, { useState, useContext, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  Layout,
  Menu,
  Breadcrumb,
  message,
  theme,
  Card,
  Row,
  Col,
  Avatar,
  Statistic,
  Button,
  Space,
  List,
  Spin
} from 'antd';
import {
  DesktopOutlined,
  PayCircleOutlined,
  IdcardOutlined,
  PieChartOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Form, Input, Select, DatePicker, Upload } from 'antd';
import RenewPass from '../../Pages/RenewPass';
import ViewPass from '../../Pages/ViewPass';
import ManagePass from '../../Pages/ManagePass';
import PaymentHistory from '../../Pages/PaymentHistory';
import ViewStatus from '../../Pages/ViewStatus';
import SupportFeedback from '../../Pages/SupportFeedback';
import AccountSettings from '../../Pages/AccountSettings';
import dashboad from './dashboard.png';
import Bussform from '../Bussform/Bussform';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import './Busspass.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useBusPass } from '../../contexts/BusPassContext';
import NewApplication from '../BusPass/NewApplication';

const { Header, Content, Footer, Sider } = Layout;

const { MonthPicker } = DatePicker;
// eslint-disable-next-line
const { Item: FormItem } = Form;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MyFormItemContext = React.createContext([]);

function toArr(str) {
  return Array.isArray(str) ? str : [str];
};

function onChange(date, dateString) {
  console.log(date, dateString);
};

const handleFinish = async (values) => {
  try {
    // Submit form data to backend
    const response = await fetch('/api/submitBusPassForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (result.success) {
      // Redirect to payment gateway with necessary parameters
      window.location.href = `/payment?amount=${result.amount}&orderId=${result.orderId}`;
    } else {
      // Handle error
      message.error('Form submission failed. Please try again.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    message.error('Form submission failed. Please try again.');
  }
};

const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

// eslint-disable-next-line

const items = [
  getItem('Dashboard', 'welcome', <PieChartOutlined />),
  getItem('Get Bus Pass', 'getPass', <UserOutlined />, [
    getItem('New Application', '3'),
    getItem('Renew Pass', '4'),
    getItem('View Pass Status', 'viewStatus'),
  ]),
  getItem('View Pass', 'viewPass', <IdcardOutlined />),
  getItem('Manage pass', 'managePass', <TeamOutlined />),
  getItem('Payment History', 'paymentHistory', <PayCircleOutlined />),
  getItem('Support & Feedback', 'supportFeedback', <DesktopOutlined />),
  getItem('Notifications', 'notifications', <NotificationOutlined />),
];

const Busspass = () => {
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useContext(AuthContext);
  const { handleBusPassSubmission, loading } = useBusPass();

  const handleMenuClick = (key) => {
    setActiveSection(key);
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const getInitial = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'welcome':
        return <WelcomeSection user={user} />;
      case '3':
        return <NewApplication />;
      case 'viewStatus':
        return <ViewStatusSection />;
      case 'managePass':
        return <ManagePassSection />;
      case 'paymentHistory':
        return <PaymentHistorySection />;
      case 'notifications':
        return <NotificationsSection />;
      case '4':
        return <RenewPass />;
      case '2':
        return <ViewPass />;
      case 'sub2':
        return <ManagePass />;
      case '6':
        return <PaymentHistory />;
      case '5':
        return <ViewStatus />;
      case '7':
        return <SupportFeedback />;
      case '9':
        return <AccountSettings />;
      default:
        return <WelcomeSection user={user} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="dashboard-layout">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        className="modern-sider"
      >
        <div className="logo-container">
          <CarOutlined className="logo-icon" />
          {!collapsed && <span className="logo-text">College Chariot</span>}
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['welcome']}
          mode="inline"
          items={items}
          onClick={({ key }) => handleMenuClick(key)}
          className="modern-menu"
        />
      </Sider>
      <Layout>
        <Header className="modern-header">
          <div className="header-content">
            <div className="header-left">
              <button className="back-button" onClick={handleBackToHome}>
                <ArrowLeftOutlined />
                Back To Home
              </button>
              <div className="header-divider" />
              <Breadcrumb 
                className="header-breadcrumb"
                items={[
                  { title: <DashboardOutlined />, href: '/home' },
                  { title: 'Bus Pass', href: '/busspass' }
                ]}
              />
            </div>
            <div className="header-right">
              <span className="header-welcome">
                Welcome, <span className="user-name">{user?.name || user?.email || 'User'}</span>
              </span>
              <button className="notification-button">
                <BellOutlined />
              </button>
              <div className="user-avatar">
                {getInitial(user?.name || user?.email)}
              </div>
            </div>
          </div>
        </Header>
        <Content className="modern-content">
          <div className="content-container">
            {loading && (
              <div className="loading-overlay">
                <Spin size="large" />
              </div>
            )}
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Welcome Section Component
const WelcomeSection = ({ user }) => {
  const { activePass, recentActivity } = useBusPass();
  const navigate = useNavigate();

  const stats = [
    { title: 'Active Passes', value: activePass.count, icon: <CreditCardOutlined />, color: '#1890ff' },
    { title: 'Total Routes', value: activePass.totalRoutes, icon: <CarOutlined />, color: '#52c41a' },
    { title: 'Days Remaining', value: activePass.daysRemaining, icon: <CalendarOutlined />, color: '#722ed1' },
    { title: 'Pass Status', value: activePass.status, icon: <CheckCircleOutlined />, color: '#13c2c2' }
  ];

  const handleApplyNewPass = () => {
    navigate('/busspass/new');
  };

  const handleViewPassHistory = () => {
    navigate('/busspass/history');
  };

  const handleManageSettings = () => {
    navigate('/busspass/settings');
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
                    avatar={<Avatar icon={item.icon || <FileTextOutlined />} />}
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
                onClick={handleApplyNewPass}
              >
                Apply for New Pass
              </Button>
              <Button 
                block 
                icon={<HistoryOutlined />}
                onClick={handleViewPassHistory}
              >
                View Pass History
              </Button>
              <Button 
                block 
                icon={<SettingOutlined />}
                onClick={handleManageSettings}
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

// Other section components remain the same
const GetPassSection = () => {
  return <div>Get Pass Content</div>;
};

const ViewStatusSection = () => {
  return <div>View Status Content</div>;
};

const ManagePassSection = () => {
  return <div>Manage Pass Content</div>;
};

const PaymentHistorySection = () => {
  return <div>Payment History Content</div>;
};

const NotificationsSection = () => {
  return <div>Notifications Content</div>;
};

export default Busspass;