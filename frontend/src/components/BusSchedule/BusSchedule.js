import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BusSchedule.css';
import { busRoutes, getUniqueLocations } from '../../data/busRoutes';
import { Select, DatePicker, message, Table, Input, Button, Dropdown } from 'antd';
import moment from 'moment';
import { SearchOutlined, DownloadOutlined, FileTextOutlined, CodeOutlined, FilePdfOutlined, DownOutlined, SwapOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // Function to convert routes data to CSV
  const convertToCSV = (routes) => {
    const headers = [
      'Route No',
      'From',
      'To',
      'Via',
      'Driver Name',
      'Driver Contact',
      'Bus Incharge',
      'Incharge Contact',
      'Stops'
    ];

    const rows = routes.map(route => [
      route.routeNo,
      route.from,
      route.to,
      route.via,
      route.driverName,
      route.driverNo,
      route.busIncharge,
      route.busInchargeNo,
      route.stops.join(' -> ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  };

  // Function to generate PDF
  const generatePDF = (routes) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(23, 67, 227);
    doc.text('College Chariot - Bus Routes', 14, 15);
    
    // Prepare data for table
    const headers = [
      ['Route No', 'From', 'To', 'Driver', 'Contact', 'Incharge']
    ];
    
    const data = routes.map(route => [
      route.routeNo,
      route.from,
      route.to,
      route.driverName,
      route.driverNo,
      route.busIncharge
    ]);

    // Add table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 25,
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [23, 67, 227],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      }
    });

    return doc;
  };

  // Function to handle downloads
  const handleDownload = (format) => {
    try {
      let content, fileName, mimeType;
      
      switch(format) {
        case 'csv':
          content = convertToCSV(busRoutes);
          fileName = 'college_chariot_bus_routes.csv';
          mimeType = 'text/csv;charset=utf-8;';
          const blob = new Blob([content], { type: mimeType });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;

        case 'json':
          content = JSON.stringify(busRoutes, null, 2);
          fileName = 'college_chariot_bus_routes.json';
          mimeType = 'application/json';
          const jsonBlob = new Blob([content], { type: mimeType });
          const jsonUrl = window.URL.createObjectURL(jsonBlob);
          const jsonLink = document.createElement('a');
          jsonLink.href = jsonUrl;
          jsonLink.setAttribute('download', fileName);
          document.body.appendChild(jsonLink);
          jsonLink.click();
          document.body.removeChild(jsonLink);
          break;

        case 'pdf':
          const doc = generatePDF(busRoutes);
          doc.save('college_chariot_bus_routes.pdf');
          break;

        default:
          throw new Error('Unsupported format');
      }
      
      message.success(`Routes exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      message.error('Failed to export routes. Please try again.');
      console.error('Export error:', error);
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
        <h4>Bus Stops</h4>
        <div className="stops-list">
          {route.stops.map((stop, index) => (
            <div 
              key={index}
              className={`stop-item ${
                stop === route.from ? 'first' : 
                stop === route.to ? 'last' : ''
              }`}
            >
              <span className="stop-number">{index + 1}</span>
              {stop}
            </div>
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
              <label>From</label>
              <Select
                value={searchParams.from}
                onChange={(value) => handleLocationChange(value, 'from')}
                options={locations.map(loc => ({ value: loc, label: loc }))}
                placeholder="Select pickup point"
              />
            </div>
            
            <button 
              className="swap-icon-button"
              onClick={() => {
                setSearchParams(prev => ({
                  ...prev,
                  from: prev.to,
                  to: prev.from
                }));
              }}
              aria-label="Swap locations"
            >
              <SwapOutlined className="swap-icon" />
            </button>
            
            <div className="form-group">
              <label>To</label>
              <Select
                value={searchParams.to}
                onChange={(value) => handleLocationChange(value, 'to')}
                options={locations.map(loc => ({ value: loc, label: loc }))}
                placeholder="Select destination"
              />
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
          <div className="button-container">
            <button 
              type="submit"
              className="search-button"
              disabled={!searchParams.from || !searchParams.to || loading}
            >
              {loading ? 'Searching...' : 'Find Routes'}
            </button>

            <div className="action-buttons">
              <button 
                className={`show-all-button ${showAllRoutes ? 'active' : ''}`}
                onClick={toggleAllRoutes}
                disabled={loading}
                type="button"
              >
                {showAllRoutes ? 'Hide All Routes' : 'Show All Routes'}
              </button>
              
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'csv',
                      label: 'Export as CSV',
                      icon: <FileTextOutlined />,
                      onClick: () => handleDownload('csv')
                    },
                    {
                      key: 'json',
                      label: 'Export as JSON',
                      icon: <CodeOutlined />,
                      onClick: () => handleDownload('json')
                    },
                    {
                      key: 'pdf',
                      label: 'Export as PDF',
                      icon: <FilePdfOutlined />,
                      onClick: () => handleDownload('pdf')
                    }
                  ]
                }}
                placement="bottomRight"
                trigger={['click']}
                overlayClassName="export-dropdown-overlay"
              >
                <Button className="export-dropdown-btn" type="button">
                  <DownloadOutlined />
                  <span>Export</span>
                  <DownOutlined className="dropdown-arrow" />
                </Button>
              </Dropdown>
            </div>
          </div>
        </form>
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