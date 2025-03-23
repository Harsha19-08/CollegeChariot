import React from 'react';
import { Helmet } from 'react-helmet';
import './Banner.css';
// import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  
  const [startPoint, setStartPoint] = React.useState('');
  const [endPoint, setEndPoint] = React.useState('');
  const navigate =useNavigate();

  const handleFindBus = (e) => {
    e.preventDefault();

    if (startPoint && endPoint) {
      // Redirect to /route page with starting and ending points as URL parameters
      navigate(`/route?start=${startPoint}&end=${endPoint}`);
    } else {
      alert('Please select both pickup and destination points.');
    }
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
              <h4 className="title"style={{position:"unset"}}>Choose Your Pass</h4>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="one-way">
                <form action="https://script.viserlab.com/viserbus/ticket/search" className="ticket-form row g-3 justify-content-center m-0" onClick={handleFindBus}>
                  <div className="col-md-6">
                    <div className="form--group">
                    <i class="las la-location-arrow"></i>
                      <select className="form--control select2" 
                       onChange={(e) => setStartPoint(e.target.value)}
                      name="pickup"style={{border:".1px solid #1743e3 ",}}>
                        <option value="">Pickup Point</option>
                        <option value="Gandimisamma">Gandimisamma</option>
                        <option value="Mlrit College">mlrit</option>
                        <option value="Miyapur">Miyapur</option>
                        <option value="Balanagar">Balanagar</option>
                        <option value="sangareddy">sangareddy</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group">
                      <i className="las la-map-marker"></i>
                      <select name="destination"
                       style={{border:".1px solid #1743e3 ",} }className="form--control select2"  onChange={(e) => setEndPoint(e.target.value)}>
                        <option value="">Dropping Point</option>
                        <option value="MLRIT">MLRIT</option>
                        <option value="Gandimisamma">Gandimisamma</option>
                        <option value="Miyapur">Miyapur</option>
                        <option value="Nijampet">Nijampet</option>
                        <option value="JNTUH">JNTUH</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form--group">
                      <i className="las la-calendar-check"></i>
                      <input type="date" name="date_of_journey"style={{border:".1px solid #1743e3 ",}} className="form--control datepicker" placeholder="Departure Date" autoComplete="off" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form--group" style={{background:"#1743e3",borderRadius:'5px',}}>
                      <button style={{background:"#1743e3",borderRadius:'5px',textAlign:"center",}}>Find Bus</button>
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
