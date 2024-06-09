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
              cover={<img alt="example" src="https://picsum.photos/200/300" />}
              className="transition-transform transform hover:scale-105"
            >
              <Link to="/Busspass" style={{ textDecoration: 'none' }}>
              <Card.Meta
                title={<span className="text-white"style={{fontSize:"15px", fontWeight:"bold",letterSpacing:"1px"}}>Get College Passes</span>}
                description={<span className="text-white">Apply online for your college bus pass quickly and easily.</span>}
              />
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://picsum.photos/200/300" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white"style={{letterSpacing:"1px",fontSize:"15px", fontWeight:"bold"}}>Bus Scheduling & Tracking</span>}
                description={<span className="text-white">View schedules and track buses in real-time with our app.</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://picsum.photos/200/300" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white"style={{letterSpacing:"1px",fontSize:"15px", fontWeight:"bold"}}>Student Information</span>}
                description={<span className="text-white">Access and manage your personal and bus-related information.</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              style={{ backgroundColor: '#1743e3', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              cover={<img alt="example" src="https://picsum.photos/200/300" />}
              className="transition-transform transform hover:scale-105"
            >
              <Card.Meta
                title={<span className="text-white"style={{letterSpacing:"1px",fontSize:"15px", fontWeight:"bold"}}>Feedback and Support</span>}
                description={<span className="text-white">Provide feedback or get support for any bus-related issues.</span>}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Services