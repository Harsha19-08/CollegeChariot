import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';


import { Layout, Menu, Breadcrumb, message, theme } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';

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
  getItem('Passes', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedOption, setSelectedOption] = useState('1');
  
    const handleMenuClick = (key) => {
      setSelectedOption(key);
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
            <h4>Option 1 Selected</h4>
            <p>Display some information for Option 1</p>
          </div>
        );
        ////////////////////////////////////////////////////////////////////////////////////////
      case '2':
        return (
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="firstName" label="First Name">
                  <Input />
                </MyFormItem>
                <MyFormItem name="lastName" label="Last Name">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>
      
              <MyFormItem name="age" label="Age">
                <Input />
              </MyFormItem>
            </MyFormItemGroup>
      <MyFormItem name="contactNumber" label="Contact Number">
              <Input />
            </MyFormItem>
      
            <MyFormItem name="email" label="Email Address">
              <Input />
            </MyFormItem>
      
            <MyFormItem name="identType" label="Ident type">
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
          <br />
             <MyFormItem name="destination" label="Profile Image">
              <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
            </MyFormItem>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        );
      default:
        return null;
    }
  };
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleMenuClick(key)} />
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </div>
  );
};
export default App;