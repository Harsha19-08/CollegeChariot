import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PopularRoutes.scss';

const popularRoutes = [
  { from: 'Shmshabad', to: 'Miyapur' },
  { from: 'Balanagar', to: 'MLRIT College' },
  { from: 'Miyapur', to: 'MLRIT College' }
];

const PopularRoutes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="popular-routes">
      <div className="header">
        <h2>Track Ur Bus</h2>
        <p>Here are the most popular bus routes to help you plan your journey to and from college efficiently.</p>
      </div>
      <Slider {...settings}>
        {popularRoutes.map((route, index) => (
          <div key={index} className="card">
            <div className="route-info">
              <h3>{route.from}</h3>
              <p>&#8595;</p>
              <h3>{route.to}</h3>
            </div>
            <button>Track Now</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularRoutes;
