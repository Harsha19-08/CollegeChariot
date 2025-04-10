import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BusSchedule.css';
import { busRoutes, getUniqueLocations } from '../../data/busRoutes';
import { Select, DatePicker, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

const BusSchedule = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: null
  });
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialSearchDone, setInitialSearchDone] = useState(false);

  useEffect(() => {
    // Get unique locations for dropdowns
    setLocations(getUniqueLocations());

    // Handle search params from Banner component
    if (location.state && !initialSearchDone) {
      const { from, to, date } = location.state;
      
      // Update search parameters
      setSearchParams({
        from: from || '',
        to: to || '',
        date: date ? moment(date) : null
      });
      
      // Automatically search if we have both from and to
      if (from && to) {
        // Small delay to ensure state is updated before search
        setTimeout(() => {
          handleSearch(null, { from, to, date });
          setInitialSearchDone(true);
        }, 100);
      }
    }
  }, [location.state, initialSearchDone]);

  const handleLocationChange = (value, type) => {
    setSearchParams(prev => ({
      ...prev,
      [type]: value
    }));
    setShowAllRoutes(false);
  };

  const handleDateChange = (date) => {
    setSearchParams(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleSearch = async (e, params = null) => {
    if (e) e.preventDefault();
    
    const searchData = params || searchParams;
    if (!searchData.from || !searchData.to) {
      message.error('Please select both pickup and destination points');
      return;
    }

    setLoading(true);
    try {
      const results = busRoutes.filter(route => {
        const fromMatch = route.stops.includes(searchData.from);
        const toMatch = route.stops.includes(searchData.to);
        
        if (fromMatch && toMatch) {
          // Check if 'from' comes before 'to' in the route
          const fromIndex = route.stops.indexOf(searchData.from);
          const toIndex = route.stops.indexOf(searchData.to);
          return fromIndex < toIndex;
        }
        return false;
      });

      if (results.length === 0) {
        message.info('No direct routes found. Try different locations or view all routes.');
      } else {
        message.success(`Found ${results.length} route(s) for your journey`);
      }

      setSearchResults(results);
      setShowAllRoutes(false);
    } catch (error) {
      message.error('Error searching for routes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAllRoutes = () => {
    if (showAllRoutes) {
      setShowAllRoutes(false);
      setSearchResults([]);
      setSearchParams({ from: '', to: '', date: null });
    } else {
      setShowAllRoutes(true);
      setSearchResults(busRoutes);
    }
  };

  const RouteCard = ({ route }) => (
    <div className="route-card">
      <div className="route-header">
        <div className="route-number">Route {route.routeNo}</div>
        <div className="journey-time">
          <i className="far fa-clock"></i>
          {`${Math.max(20, route.stops.length * 5)} mins`}
        </div>
      </div>
      <div className="route-main-info">
        <div className="route-points">
          <div className="start-point">
            <div className="point-marker start"></div>
            <span>{route.from}</span>
          </div>
          <div className="route-line"></div>
          <div className="end-point">
            <div className="point-marker end"></div>
            <span>{route.to}</span>
          </div>
        </div>
        <div className="route-details">
          <p><strong>Via:</strong> {route.via}</p>
          <div className="schedule-info">
            <div>
              <i className="fas fa-clock"></i>
              <span>Departure: {route.departureTime}</span>
            </div>
            <div>
              <i className="fas fa-clock"></i>
              <span>Arrival: {route.arrivalTime}</span>
            </div>
          </div>
          <div className="driver-info">
            <div>
              <i className="fas fa-user"></i>
              <span>Driver: {route.driverName}</span>
            </div>
            <div>
              <i className="fas fa-phone"></i>
              <span>Contact: {route.driverNo}</span>
            </div>
          </div>
          <div className="bus-info">
            <div>
              <i className="fas fa-bus"></i>
              <span>Bus Number: {route.busNumber}</span>
            </div>
            <div>
              <i className="fas fa-user"></i>
              <span>Bus Incharge: {route.busIncharge}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="route-stops">
        <h4>Stops:</h4>
        <div className="stops-list">
          {route.stops.map((stop, index) => (
            <span key={index} className="stop-item">
              {stop}
              {index < route.stops.length - 1 && " → "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bus-schedule-container">
      <div className="schedule-header">
        <h1>Bus Schedule & Route Finder</h1>
        <p>Find the perfect route for your journey</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <Select
                id="from"
                showSearch
                style={{ width: '100%' }}
                placeholder="Select pickup point"
                optionFilterProp="children"
                onChange={(value) => handleLocationChange(value, 'from')}
                value={searchParams.from || undefined}
                allowClear
              >
                {locations.map(location => (
                  <Option key={location} value={location}>{location}</Option>
                ))}
              </Select>
            </div>
            <div className="swap-icon" onClick={() => {
              setSearchParams(prev => ({
                ...prev,
                from: prev.to,
                to: prev.from
              }));
            }}>
              <i className="fas fa-exchange-alt"></i>
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <Select
                id="to"
                showSearch
                style={{ width: '100%' }}
                placeholder="Select destination"
                optionFilterProp="children"
                onChange={(value) => handleLocationChange(value, 'to')}
                value={searchParams.to || undefined}
                allowClear
              >
                {locations.map(location => (
                  <Option key={location} value={location}>{location}</Option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <DatePicker
                style={{ width: '100%' }}
                value={searchParams.date}
                onChange={handleDateChange}
                disabledDate={(current) => current && current < moment().startOf('day')}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <button type="submit" className="search-button" disabled={!searchParams.from || !searchParams.to || loading}>
            {loading ? 'Searching...' : 'Find Routes'}
          </button>
        </form>
        <button 
          className={`show-all-button ${showAllRoutes ? 'active' : ''}`}
          onClick={toggleAllRoutes}
          disabled={loading}
        >
          {showAllRoutes ? 'Hide All Routes' : 'Show All Routes'}
        </button>
      </div>

      <div className="results-section">
        {loading ? (
          <div className="loading-message">
            <p>Searching for routes...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="routes-grid">
            {searchResults.map(route => (
              <RouteCard key={route.routeNo} route={route} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>{showAllRoutes ? 'Loading routes...' : 'No routes found. Try different locations or view all routes.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusSchedule; 