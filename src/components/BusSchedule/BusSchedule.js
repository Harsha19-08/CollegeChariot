import React, { useState, useEffect } from 'react';
import './BusSchedule.css';
import { busRoutes, getUniqueLocations } from '../../data/busRoutes';
import { Select } from 'antd';

const { Option } = Select;

const BusSchedule = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: ''
  });
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Get unique locations for dropdowns
    setLocations(getUniqueLocations());
  }, []);

  const handleLocationChange = (value, type) => {
    setSearchParams(prev => ({
      ...prev,
      [type]: value
    }));
    setShowAllRoutes(false); // Reset show all when location changes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchParams.from && !searchParams.to) return;

    const results = busRoutes.filter(route => {
      const fromMatch = route.stops.includes(searchParams.from);
      const toMatch = route.stops.includes(searchParams.to);
      
      if (fromMatch && toMatch) {
        // Check if 'from' comes before 'to' in the route
        const fromIndex = route.stops.indexOf(searchParams.from);
        const toIndex = route.stops.indexOf(searchParams.to);
        return fromIndex < toIndex;
      }
      return false;
    });

    setSearchResults(results);
    setShowAllRoutes(false);
  };

  const toggleAllRoutes = () => {
    if (showAllRoutes) {
      // If currently showing all routes, hide them and clear results
      setShowAllRoutes(false);
      setSearchResults([]);
      // Also clear the search params
      setSearchParams({ from: '', to: '' });
    } else {
      // If not showing all routes, show them all
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
          {/* Estimated time based on number of stops */}
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
              <i className="fas fa-user"></i>
              <span>Bus Incharge: {route.busIncharge}</span>
            </div>
            <div>
              <i className="fas fa-phone"></i>
              <span>Contact: {route.busInchargeNo}</span>
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
          </div>
          <button type="submit" className="search-button" disabled={!searchParams.from || !searchParams.to}>
            Find Routes
          </button>
        </form>
        <button 
          className={`show-all-button ${showAllRoutes ? 'active' : ''}`}
          onClick={toggleAllRoutes}
        >
          {showAllRoutes ? 'Hide All Routes' : 'Show All Routes'}
        </button>
      </div>

      <div className="results-section">
        {searchResults.length > 0 ? (
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