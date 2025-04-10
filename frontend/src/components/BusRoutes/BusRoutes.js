// BusRoutes.jsx
import React from 'react';
import { Layout, Menu, Input, Select, Button, Row, Col, Checkbox, Pagination } from 'antd';
import { SearchOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './BusRoutes.css';

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;

const BusRoutes = () => {
  return (
    <Layout className="bus-routes-layout2">
      <Header className="header2">
        <div className="logo2">BusRoutes</div>
        <Menu mode="horizontal" className="header-menu2">
          <Menu.Item key="starting">Starting</Menu.Item>
          <Menu.Item key="college">College Address</Menu.Item>
          <Menu.Item key="bus-numbers">Bus Numbers</Menu.Item>
          <Menu.Item key="view-routes">
            <Button type="primary">View Routes</Button>
          </Menu.Item>
        </Menu>
      </Header>
      
      <Layout>
        <Sider width={300} className="sider2">
          <h3>Refine your search</h3>
          <Search placeholder="Enter location" />
          
          <h4>Route Type</h4>
          <Checkbox.Group className="checkbox-group2">
            <Checkbox style={{ color: "white" }} value="route-number">Route Number</Checkbox>
            <Checkbox style={{ color: "white" }} value="departure-time">Departure Time</Checkbox>
            <Checkbox style={{ color: "white" }} value="arrival-time">Arrival Time</Checkbox>
            <Checkbox style={{ color: "white" }} value="route-map">Route Map</Checkbox>
            <Checkbox style={{ color: "white" }} value="bus-schedule">Bus Schedule</Checkbox>
            <Checkbox style={{ color: "white" }} value="college-location">College Location</Checkbox>
            <Checkbox style={{ color: "white" }} value="bus-stops">Bus Stops</Checkbox>
          </Checkbox.Group>
          
          <Input placeholder="View more" />
          
          <h4>Bus Details</h4>
          <Checkbox.Group className="checkbox-group2">
            <Checkbox  style={{ color: "white" }}value="route-info">Route Info</Checkbox>
            <Checkbox style={{ color: "white" }} value="bus-stops">Bus Stops</Checkbox>
            <Checkbox style={{ color: "white" }} value="timings">Timings</Checkbox>
            <Checkbox style={{ color: "white" }} value="route-type">Route Type</Checkbox>
          </Checkbox.Group>
          
          <h4>Location</h4>
          <Input placeholder="Enter College Address" suffix={<EnvironmentOutlined />} />
          
          <h4>Destination</h4>
          <Select defaultValue="select-route" style={{ width: '100%' }}>
            <Option value="select-route">Select Bus Route</Option>
          </Select>
          
          <Button type="primary" block className="find-route-btn">Find Route</Button>
        </Sider>
        
        <Content className="content2">
          <h1>Available Bus Routes and Schedule</h1>
          <p>Select route and time slot to view details</p>
          
          <div className="schedule-search2">
            <h3>View Bus Schedule</h3>
            <Row gutter={16}>
              <Col span={8}>
                <Select defaultValue="route" style={{ width: '100%' }}>
                  <Option value="route">Route / Bus Number</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select defaultValue="departure" style={{ width: '100%' }} suffixIcon={<ClockCircleOutlined />}>
                  <Option value="departure">Departure Time</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select defaultValue="arrival" style={{ width: '100%' }} suffixIcon={<ClockCircleOutlined />}>
                  <Option value="arrival">Arrival Time</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Button type="primary" block>Search</Button>
              </Col>
            </Row>
          </div>
          
          <div className="results-header2">
            <span>Showing 175 bus routes</span>
            <Select defaultValue="departure-time" style={{ width: 200 }}>
              <Option value="departure-time">Sort by: Departure Time</Option>
            </Select>
          </div>
          
          <Row gutter={[24, 24]} className="route-list2">
            {[101, 202, 303, 404, 505, 606, 707, 808, 909].map(route => (
              <Col span={8} key={route}>
                <div className="route-item2">
                  <div className="route-image2">
                    <img alt={`Route ${route}`} src={`https://picsum.photos/200?random=${route}`} />
                  </div>
                  <h3>Route {route}</h3>
                  <p>{getRouteDescription(route)}</p>
                </div>
              </Col>
            ))}
          </Row>
          
          <div className="pagination-container2">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </Content>
      </Layout>
      
      <Footer className="footer2">
        <div className="footer-section2">
          <h4>Bus Tracker</h4>
          <h4>Connect with us</h4>
          <div className="social-icons2">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-linkedin"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
        <div className="footer-section2">
          <h4>About</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
        <div className="footer-section2">
          <h4>Community</h4>
          <p>Available Routes User</p>
          <p>Guide</p>
        </div>
        <div className="footer-section2">
          <h4>Help</h4>
          <p>Contact Support</p>
        </div>
      </Footer>
    </Layout>
  );
};

function getRouteDescription(route) {
  const descriptions = {
    101: 'Morning Departures',
    202: 'Afternoon Departures',
    303: 'Evening Departures',
    404: 'Night Departures',
    505: 'All Day Service',
    606: 'Weekend Schedule',
    707: 'Holiday Timetable',
    808: 'Special Event Routes',
    909: 'Emergency Shuttle Service'
  };
  return descriptions[route] || 'Regular Service';
}

export default BusRoutes;