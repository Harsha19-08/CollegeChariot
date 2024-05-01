import React from 'react';

import './Hompage.css';

import Banner from '../Banner/Banner';
import Navbar2 from '../Navbar2/Navbar2';
import {  Card, Col,  Row } from 'antd';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

import Tickets from '../Ticket/Tickets';



const style = {
  background: '#ffffff',
  padding: '8px 0',
  borderRadius:'5px',
  display: "flex",
  alignItems: "center",
  
  marginTop:'50px',
 marginBottom:'50px',
  
};

const Homepage = () => {
  return (
    <div>
      <Navbar2/>
      <div className='container-fluid top'>
        <div class="row">
      <div className=' col-8 top-head'>
           <h1>College Chariot</h1>
           <h3>Get the Bus pass right now!!</h3>
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

           </p>
           <a href='boom' className='bttn'>Explore College Chariot</a>

      </div>
      <div className='col-4 home-img'>
        <div className='rhombus'>
          
          <img src='bushome.png' alt='bus'/>
        </div>
      </div>
      <div className='rhombus2'>
        
      </div>
       </div>


    </div>
    <div className='head-2'style={{ background: '#1743e3', padding: '20px 0' }}>
      <h1 style={{color:"white", textAlign:"center",}}>For Enguiry </h1>
    <Row
      gutter={16} justify="center"
      // xs: 8,  
        // sm: 16,
        // md: 24,
        // lg: 32,
    >
      <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
        <div className="customer" style={{ ...style, textAlign: 'center', margin: '0 10px' }}>
          <img src='phone.png' alt='customer' style={{ maxWidth: '50px', marginRight: '10px' }}/>
            <div style={{  textAlign: 'center', margin: '0 10px' }}>
            <p>Customer Care:</p>
            <p  style={{fontWeight:"200",color:"black",}}>123-456-7890</p>
            </div>
        </div>
      </Col>
      <Col className="gutter-row"xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
        <div className='Pass' style={{ ...style, textAlign: 'center', margin: '0 10px' }}>
        <img src='eeticket.png' alt='buspass' style={{ maxWidth: '50px', marginRight: '10px' }}/>
            <div className='div1' style={{  textAlign: 'center', margin: '0 10px' }}>
            <p>Bus Pass related issues:</p>
            <p  style={{fontWeight:"200",color:"black",}}>+91 7893582454/+91 7893582454</p>
            </div>
        </div>
      </Col>
      <Col className="gutter-row"xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
        <div  className='mail'style={{ ...style, textAlign: 'center', margin: '0 10px' }}>
        <img src='email.png' alt='email' style={{ maxWidth: '50px', marginRight: '10px' }}/>
            <div style={{  textAlign: 'center', margin: '0 10px' }}>
            <p>E-Mail:</p>
            <p  style={{fontWeight:"200",color:"black",text:"center"}}>feedback@Collegechariot.com</p>
            </div>
        </div>
      </Col>
     
    </Row>
  </div>
      
      <div className='home-page2'>
        
      <Banner/>
      </div>
      <div className='cool'>
        
      <div className='container'>
        
        <div className='row head'>
          <h1>Our Services</h1>
        <div className=' col-3 thumbnail'>
        <Link to="/Busspass" style={{ textDecoration: 'none' }}>
          <p>Get College Passes</p>
        </Link>
        </div>
        <div className='col-3 thumbnail'>
            <p>Bus Scheduling / Tracking</p>
            
        </div>
        <div className='col-3 thumbnail'>
            <p>Student Information </p>
            
        </div>
        <div className='col-3 thumbnail'>
            <p>Payment GateWay</p>
            
        </div>
        </div>
      </div>
      </div>
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
              <Card.Meta
                title={<span className="text-white">Get College Passes</span>}
                description={<span className="text-white">card content</span>}
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
          <div class="planet"></div>
          <div class="moon"></div>
          <div class="shimmering">
            Hover over me to see the shimmer effect!
          </div>
          <div class="stars">
            <Tickets/>
          </div>

          
        <div style={{paddingTop:"20px"}}>
        <Footer/>
        </div>
    </div>
  );
};

export default Homepage;