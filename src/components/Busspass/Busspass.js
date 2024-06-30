import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';


import { Layout, Menu, Breadcrumb, message, theme } from 'antd';
import { DesktopOutlined, PayCircleOutlined,IdcardOutlined, PieChartOutlined,NotificationOutlined , TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import RenewPass from '../RenewPass';
import ViewPass from '../../Pages/ViewPass';
import ManagePass from '../../Pages/ManagePass';
import PaymentHistory from '../../Pages/PaymentHistory';
import ViewStatus from '../../Pages/ViewStatus';
import SupportFeedback from '../../Pages/SupportFeedback';
import AccountSettings from '../../Pages/AccountSettings';
import dashboad from './dashboard.png';
import Bussform from '../Bussform/Bussform';
import { Option } from 'antd/es/mentions';

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
  getItem('Dashboard', '1', <PieChartOutlined />),
  
  getItem('Get Bus Pass', 'sub1', <UserOutlined />, [
    getItem('New Application', '3'),
    getItem('Renew Pass', '4'),
    getItem('View Pass Status', '5'),
  ]),
  getItem('View Pass', '2',<IdcardOutlined />),
  getItem('Manage pass', 'sub2', <TeamOutlined />),
  getItem('Payment History', '6', <PayCircleOutlined />),
  getItem('Support & Feedback', '7',  <DesktopOutlined />),
  getItem('Notifiactions', '9', <NotificationOutlined /> ),
];
const App = () => {
  const [form] = Form.useForm();
  

  const [isRenewal, setIsRenewal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedOption, setSelectedOption] = useState('1');
  
    const handleMenuClick = (key) => {
      setSelectedOption(key);
      if (key === '4') {
        setIsRenewal(true);
      } else {
        setIsRenewal(false);
      }
    };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  ////////////////////////
  
  const onFinish = (values) => {
    console.log(values);
  };
  //////////

  const renderContent = () => {
    switch (selectedOption) {
      case '1':
        return (
          <div>
            <h4>Welcome to the Dashboard</h4>
            <p>Select an option from the sidebar to get started.</p>
            <img  style={{ backgroundPosition: 'center', // Center align the background image
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}src={dashboad}/>
          </div>
        );
        /////
        case '4':
          return (
             <div>
              <RenewPass/>
            </div>
          )
          /////
          case '2':
            return(
              <div>
                <ViewPass/>
              </div>
            )

            ////
            case 'sub2':
              return (
                <div>
                  <ManagePass/>
                </div>
              )

              ///
            case '6':
              return (
                <div>
                   <PaymentHistory/>
                </div>
              )
              ///
              case '5':
                return(
                  <div>
                    <ViewStatus/>
                  </div>
                )
                //
                case '7':
                  return(
                    <div>
                      <SupportFeedback/>
                    </div>
                  )
                  //
                  case '9':
                    return(
                      <div>
                        <AccountSettings/>
                      </div>
                    )

        ////////////////////////////////////////////////////////////////////////////////////////
      case '3':
        // return(
        // //   <div>
        // // <Bussform/>
        // // </div>
        // )
        return (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="serialNumber" label="S.No" rules={[{ required: true, message: 'Please enter Serial Number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your Name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="branch" label="Branch" rules={[{ required: true, message: 'Please select your Branch' }]}>
            <Select placeholder="Select Branch">
              <Option value="IT">IT</Option>
              <Option value="CSE">CSE</Option>
              <Option value="CSIT">CSIT</Option>
              <Option value="CSE(AIML)">CSE(AIML)</Option>
              <Option value="CSE(DS)">CSE(DS)</Option>
              <Option value="ECE">ECE</Option>
              <Option value="EEE">EEE</Option>
              <Option value="Aero">Aero</Option>
              <Option value="Mechanical">Mechanical</Option>
              <Option value="MBA">MBA</Option>
              <Option value="BBA">BBA</Option>
              <Option value="M.Tech">M.Tech</Option>
            </Select>
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please select your Year' }]}>
            <Select placeholder="Select Year">
              <Option value="1">1st Year</Option>
              <Option value="2">2nd Year</Option>
              <Option value="3">3rd Year</Option>
              <Option value="4">4th Year</Option>
            </Select>
          </Form.Item>
          <Form.Item name="rollNumber" label="Roll Number" rules={[{ required: true, message: 'Please enter your Roll Number' }]}>
            <Input />
          </Form.Item>
          {!isRenewal && (
            <>
              <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true, message: 'Please enter your Blood Group' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true, message: 'Please enter your Father\'s Name' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="presentAddress" label="Present Address" rules={[{ required: true, message: 'Please enter your Present Address' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="permanentAddress" label="Permanent Address" rules={[{ required: true, message: 'Please enter your Permanent Address' }]}>
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your Phone Number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Please enter your Email Address' }]}>
            <Input />
          </Form.Item>
          {isRenewal && (
            <Form.Item name="previousPassNumber" label="Previous Pass Number" rules={[{ required: true, message: 'Please enter your Previous Pass Number' }]}>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="routeNumber" label="Route Number" rules={[{ required: false, message: 'Please enter your Route Number' }]}>
            <Input />
            <a href="URL_TO_BUS_ROUTE_DETAILS" target="_blank" style={{ display: 'block', marginTop: '8px', color: 'red' }}>Click here to view bus route details</a>
          </Form.Item>
          <Form.Item name="boardingPoint" label="Boarding Point" rules={[{ required: true, message: 'Please enter your Boarding Point' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="passDuration" label="Pass Duration" rules={[{ required: true, message: 'Please select Pass Duration' }]}>
            <Select placeholder="Select Pass Duration">
              <Option value="halfSemester">Half Semester</Option>
              <Option value="oneSemester">One Semester</Option>
              <Option value="twoSemesters">Two Semesters (One Year)</Option>
            </Select>
          </Form.Item>
          <Form.Item name="receiptNumber" label="Receipt Number" rules={[{ required: true, message: 'Please enter your Receipt Number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="photo" label="Profile Image" rules={[{ required: true, message: 'Please upload your Profile Image' }]}>
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>

             
        );
      default:
        return null;
    }
  };

        
            {/* <MyFormItem name="identType" label="Ident type">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </MyFormItem>
      
            <MyFormItem name="source" label="Source">
              <Input />
            </MyFormItem>
      
            <MyFormItem name="destination" label="Destination">
              <Input />
            </MyFormItem>
          <DatePicker onChange={onChange} />
          <br />
          <MonthPicker onChange={onChange} placeholder="Select month" />
          <br /> */}
///////////////////////////////////////////////////////////////////////////////
  return (
    
    <div> 
       <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ marginLeft: '20px', color: 'black',fontSize: '20px' }}>Get Bus Passes</h1>
        <div className="profile-info" style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
        <img style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginLeft: '10px'
          
          }} src='man.png' alt="Logo or Profile" />
          
        </div>
      </Header>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >

        
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
        onClick={handleMenuClick} 
        theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleMenuClick(key)} />
      </Sider>
      <Layout>
        
        <Header
          style={{
            padding: 0,
            background: 'white',
            fontSize:"20px",
            
          }}
        >
            <h1 style={{fontSize:"35px"}}>DashBoard</h1>
        </Header>
        
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Student</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundImage:'URL(./dashboard.png)'
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Chariot ©{new Date().getFullYear()} Created by Trio
        </Footer>
      </Layout>
    </Layout>
    </div>
  );
};
export default App;