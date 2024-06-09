import React from 'react';
import './Hompage.css';
import Banner from '../Banner/Banner';
import Navbar2 from '../Navbar2/Navbar2';
import {  Col,  Row } from 'antd';
import Footer from '../Footer/Footer';
import Tickets from '../Ticket/Tickets';
import Services from '../Services/Services';
import { Element } from 'react-scroll';
import { Link } from 'react-router-dom';
import Quicklinks from '../../Pages/QuickLinks/Quicklinks';



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
      
      <div className='container-fluid top'>
        <div class="row">
      <div className=' col-8 top-head'>
           <h1>College Chariot</h1>
           <h3>Get the Bus pass right now!!</h3>
         <p>Welcome to MLRIT Engineering College Bus Service! Ensuring safe, reliable, and convenient transportation for our students and staff. Explore our services and find out how we make your daily commute easier.  
          College Chariot is a platform that provides bus pass services to  students
           </p>
           <Link to='/explore' className='bttn'>Explore College Chariot</Link>
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
      
       <Element name="about" className="element">
       <div className='home-page2'>
         <Banner />
       </div>
     </Element>
      <Element name="services" className="element">
        <Services />
      </Element>
          <div class="planet"></div>
          <div class="moon"></div>
          <div class="shimmering">
            Hover over me to see the shimmer effect!
          </div>
          <div class="stars">
            <Tickets/>
          </div>

        <div>
          <Quicklinks/>
        </div>
        <div style={{paddingTop:"20px"}}>
        <Footer/>
        </div>
    </div>
  );
};

export default Homepage;