import React, { useEffect } from 'react';

import './BusScheduler.css';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const BusScheduler = () => {
 const gsapRef =useRef();
 useGSAP(() => {
    gsap.to(gsapRef.current, { duration: 3,delay:3, x: 1500, rotate:720, scale: 0.5 });
  }, []);

  useEffect(() => { 
    gsap.to('.box1', { duration: 3, x: -1500,delay:3, rotate: 720, scale: 0.5 });
  }, []);

  useEffect(() => { 

  gsap.to(".flair", {
    duration: 3, y: 1500,delay:3, rotate: 720, scale: 0.5 
     
    
  });
}, []);
useEffect(() => { 

  gsap.to(".flair1", {
    duration: 3, y: -1500,delay:3, rotate: 720, scale: 0.5 
     
    
  });
}, []);
  return (
    
    <div className='page-container'>
     <div class="flair flair--25"></div>
     <div class="flair1 flair--251"></div>
    <div className="bus-route-search">
    <div ref={gsapRef} className="box1"></div>
      <div className="hero-section" style={{backgroundImage: 'url(path-to-bus-image.jpg)'}}>
        <h1>Discover available bus routes and timings.</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for bus routes" />
          <button className="search-button">search</button>
        </div>
        <Link to="/bus-routes"><p>Find bus routes and timings for convenient travel.</p></Link>
        {/* className="view-routes */}
      </div>
      <div className="info-section">
        <div className="info-item">
          <i className="icon-bus"></i>
          <span>Bus Routes</span>
        </div>
        <div className="info-item">
          <i className="icon-map-pin"></i>
          <span>Route Numbers</span>
        </div>
        <div className="info-item">
          <i className="icon-clock"></i>
          <span>Departure</span>
        </div>
        <div className="info-item">
          <i className="icon-clock"></i>
          <span>Arrival Times</span>
        </div>
        <div className="info-item">
          <i className="icon-calendar"></i>
          <span>Other</span>
        </div>
        <div className="info-item">
          <i className="icon-info"></i>
          <span>Additional</span>
        </div>
        <div className="info-item">
          <i className="icon-info"></i>
          <span>Details</span>
        </div>
        <div className="info-item">
          <i className="icon-info"></i>
          <span>Information</span>
        </div>
      </div>
      
      <div ref={gsapRef} className="box"></div>
    </div>
    
    </div>
  );
};

export default BusScheduler;