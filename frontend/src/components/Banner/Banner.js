import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Banner.css';
// import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getUniqueLocations } from '../../data/busRoutes';

const Banner = () => {
  
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get unique locations for dropdowns
    setLocations(getUniqueLocations());
  }, []);

  const handleFindBus = (e) => {
    e.preventDefault();

    if (!startPoint || !endPoint) {
      message.error('Please select both pickup and destination points.');
      return;
    }

    if (!journeyDate) {
      message.error('Please select a journey date.');
      return;
    }

    // Navigate to bus schedule with search params
    navigate('/schedule', {
      state: {
        from: startPoint,
        to: endPoint,
        date: journeyDate
      }
    });
  };
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
            <h1 className="title">Get Your Buss Pass Online, Easy and Safely</h1>
            <a href="tickets" className="cmn--btn"style={{background:"#1743e3",textDecoration:"none",}}>Get Pass now</a>
          </div>
          <div className="ticket-form-wrapper">
            <div className="ticket-header nav-tabs nav border-0">
              <h4 className="title"style={{position:"unset"}}>Find Your Bus</h4>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="one-way">
                <form className="ticket-form row g-3 justify-content-center m-0" onSubmit={handleFindBus}>
                  <div className="col-md-6">
                    <div className="form--group">
                    <i class="las la-location-arrow"></i>
                      <select 
                        className="form--control select2"
                        value={startPoint}
                        onChange={(e) => setStartPoint(e.target.value)}
                        name="pickup"
                        style={{border:".1px solid #1743e3 ",}}>
                        <option value="">Pickup Point</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group">
                      <i className="las la-map-marker"></i>
                      <select 
                        name="destination"
                        style={{border:".1px solid #1743e3 ",} }className="form--control select2" 
                        value={endPoint}
                        onChange={(e) => setEndPoint(e.target.value)}>
                        <option value="">Dropping Point</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form--group">
                      <i className="las la-calendar-check"></i>
                      <input 
                        type="date" 
                        name="date_of_journey"
                        style={{border:".1px solid #1743e3 ",}}
                        className="form--control datepicker"
                        placeholder="Departure Date"
                        value={journeyDate}
                        onChange={(e) => setJourneyDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group" style={{background:"#1743e3",borderRadius:'5px',}}>
                      <button type="submit" style={{background:"#1743e3",borderRadius:'5px',textAlign:"center",width:"100%"}}>Find Bus</button>
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
