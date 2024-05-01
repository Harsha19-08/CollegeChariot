import React from 'react';
import { Helmet } from 'react-helmet';
import './Banner.css';

const Banner = () => {
  
  
  return (
    <section className="banner-section" style={{ position: 'relative',background: "url(https://script.viserlab.com/viserbus/assets/images/frontend/banner/61f118f07f1151643190512.png) repeat-x bottom" ,minHeight:"150px",}}>

<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
       
    
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="https://script.viserlab.com/viserbus/assets/images/logoIcon/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="ViserBus - Home" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ViserBus - Bus Ticket Booking System" />
        <meta property="og:description" content="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ff" />
        <meta property="og:image" content="https://script.viserlab.com/viserbus/assets/images/seo/6210e34d4726e1645273933.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="200" />
        <meta property="og:url" content="https://script.viserlab.com/viserbus" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/bootstrap.min.css" />
        {/* Icon CSS */}
        <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" ></link>

        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/global/css/all.min.css" />
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/global/css/line-awesome.min.css" />
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/flaticon.css" />
        
        {/* Plugins CSS */}
        {/* <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/main.css" /> */}

        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/slick.css" />
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/global/css/select2.min.css" />
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/jquery-ui.css" />
        
        {/* Cookie CSS */}
        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/cookie.css" />
        
        {/* Custom CSS */}

        <link rel="stylesheet" href="https://script.viserlab.com/viserbus/assets/templates/basic/css/custom.css" />

      </Helmet>
      
      <div className="container" style={{minHeight:"100px",    position: "unset"}}>
        <div className="banner-wrapper">
          <div className="banner-content">
            <h1 className="title">Get Your Ticket Online, Easy and Safely</h1>
            <a href="tickets" className="cmn--btn"style={{background:"#1743e3",textDecoration:"none",}}>Get ticket now</a>
          </div>
          <div className="ticket-form-wrapper">
            <div className="ticket-header nav-tabs nav border-0">
              <h4 className="title"style={{position:"unset"}}>Choose Your Ticket</h4>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="one-way">
                <form action="https://script.viserlab.com/viserbus/ticket/search" className="ticket-form row g-3 justify-content-center m-0">
                  <div className="col-md-6">
                    <div className="form--group">
                    <i class="las la-location-arrow"></i>
                      <select className="form--control select2" name="pickup"style={{border:".1px solid #1743e3 ",}}>
                        <option value="">Pickup Point</option>
                        <option value="1">Gandimisamma</option>
                        <option value="2">mlrit</option>
                        <option value="3">Miyapur</option>
                        <option value="4">Balanagar</option>
                        <option value="5">sangareddy</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group">
                      <i className="las la-map-marker"></i>
                      <select name="destination" style={{border:".1px solid #1743e3 ",} }className="form--control select2">
                        <option value="">Dropping Point</option>
                        <option value="1">MLRIT</option>
                        <option value="2">Gandimisamma</option>
                        <option value="3">Miyapur</option>
                        <option value="4">Nijampet</option>
                        <option value="5">JNTUH</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form--group">
                      <i className="las la-calendar-check"></i>
                      <input type="text" name="date_of_journey"style={{border:".1px solid #1743e3 ",}} className="form--control datepicker" placeholder="Departure Date" autoComplete="off" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group" style={{background:"#1743e3",borderRadius:'5px',}}>
                      <button style={{background:"#1743e3",borderRadius:'5px',textAlign:"center",}}>Find Tickets</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shape">
        <img src="busss.png" alt="bg" />
      </div>
    </section>
  );
};

export default Banner;
