import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { busRoutes } from '../../data/busRoutes';
import { EnvironmentOutlined, ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './PopularRoutes.css';

const PopularRoutes = () => {
  const navigate = useNavigate();
  
  // Get first 6 routes as popular routes
  const popularRoutes = busRoutes.slice(0, 6);

  const handleFindRoute = (from, to) => {
    navigate('/schedule', {
      state: {
        from,
        to,
        date: new Date().toISOString().split('T')[0]
      }
    });
  };

  return (
    <div className="popular-routes-section">
      <div className="section-header">
        <h2>Popular Bus Routes</h2>
        <p>Discover the most frequently traveled routes by our students and staff</p>
      </div>
      
      <div className="routes-container">
        <Row gutter={[16, 16]}>
          {popularRoutes.map((route) => (
            <Col xs={24} sm={12} lg={8} key={route.routeNo}>
              <Card 
                className="route-card"
                hoverable
              >
                <div className="route-card-cover">
                  <div className="route-number">Route {route.routeNo}</div>
                </div>
                <div className="route-info">
                  <div className="route-locations">
                    <EnvironmentOutlined className="location-icon" />
                    <div className="location-details">
                      <span className="from">{route.from}</span>
                      <ArrowRightOutlined className="arrow-icon" />
                      <span className="to">{route.to}</span>
                    </div>
                  </div>
                  
                  <div className="route-stops">
                    <ClockCircleOutlined className="stops-icon" />
                    <span>{route.stops.length} Stops</span>
                  </div>

                  <div className="route-via">
                    <p>Via: {route.via.split('-').slice(0, 2).join(' - ')}...</p>
                  </div>

                  <Button 
                    type="primary" 
                    className="find-route-btn"
                    onClick={() => handleFindRoute(route.from, route.to)}
                  >
                    View Schedule
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PopularRoutes; 