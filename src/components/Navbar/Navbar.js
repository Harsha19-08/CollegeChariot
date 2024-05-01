import React from 'react'
import './Navbar.css'




const Navbar = () => {
  
  return (

  <>
    
    <div className='navbar-container'>
      
        {/* <img src='menu-svgrepo-com.svg' alt='menu' className='menu-icon'/>
       */}
       
       <div className='col-6 col-md-4 logo-container'>
      
      <a href='home' className='logo'>College Chariot.</a>
      </div>
      
      <div className='col-6 col-md-8 navbar-menu'>
        <a href='home'style={{'--i': 1, }}className='menu-item' id='active'>Home</a>
        <a href='about'  style={{'--i': 2, }} className='menu-item'>About</a>
        <a href='services'style={{'--i': 3, }}  className='menu-item'>Services</a>
        <a href='contact' style={{'--i': 4, }} className='menu-item'>Featured</a>
        <a href='contact' style={{'--i': 5, }}className='menu-item'>Contact us</a>
      <img src='man.png' alt='profile' className='profile-icon'/>
      </div>
      
      
    </div>
    
  
  </>  
  )
}

export default Navbar