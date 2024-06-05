import React from 'react'
import {  Card, Col,  Row } from 'antd';
import { Link } from 'react-router-dom';
const Services = () => {
  return (
    <div style={{ background: "white", paddingTop: "20px" }}>
      <h1 style={{textAlign:"center",}}>Our Services</h1>
      <div className='container' style={{ marginTop: "20px" }}>
        <Row gutter={16} justify="center">
          
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://source.unsplash.com/random" />}
              className="transition-transform transform hover:scale-105"
            >
              <Link to="/Busspass" style={{ textDecoration: 'none' }}>
              <Card.Meta
                title={<span className="text-white">Get College Passes</span>}
                description={<span className="text-white">card content</span>}
              />
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://source.unsplash.com/random" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white">Bus Scheduling & Tracking</span>}
                description={<span className="text-white">Card content</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://source.unsplash.com/random" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white">Student Information</span>}
                description={<span className="text-white">Card content</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://source.unsplash.com/random" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white">Payment GateWay</span>}
                description={<span className="text-white">Card content</span>}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Services